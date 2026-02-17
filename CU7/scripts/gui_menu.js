import { world, system, Player, EntityTypes } from "@minecraft/server";
import { ActionFormData, ModalFormData, FormCancelationReason, MessageFormData } from "@minecraft/server-ui"

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        if (player.hasTag('cubicmenu')) {
            main(player);
            player.runCommand('tag @s remove cubicmenu');
        }
    }
});

world.beforeEvents.itemUse.subscribe((e) => {
    if (e.itemStack.typeId == 'cubic:ui') 
      system.run(() =>  { main(e.source) })
    if (e.itemStack.typeId == 'cubic:start_ui') 
      system.run(() =>  { rulespre(e.source) })
    if (e.itemStack.typeId == 'minecraft:golden_shovel') 
      system.run(() =>  { landd(e.source) })
});

world.afterEvents.playerSpawn.subscribe((e) => {
    const player = e.player;
    if (!player.hasTag("menuGot") && player.hasTag("Valid")) {
        player.runCommand('give @s[hasitem={item=cubic:ui, quantity=0}] cubic:ui 1 0 {"item_lock":{"mode":"lock_in_inventory"}}')
    } 
    else {
        return;
    }
    if (!player.hasTag("joined")) {
        player.addTag("joined");
        player.runCommand('scoreboard players add playersJoined points 1');
        player.runCommand('execute as @s run tellraw @a {"rawtext":[{"text":"[§aNew Player§r]§d "},{"selector":"@s"},{"text":"§b has joined for the first time!"}]}');
        player.runCommand('tellraw @a {"rawtext":[{"text":"§bThere are now §d"},{"score":{"name":"playersJoined","objective":"points"}},{"text":" players §bwho have joined §uSeason Six."}]}');
    }
    if (!player.hasTag("Valid")) {
        start(player);
    } 
    else {
        return;
    }
});

world.afterEvents.entityDie.subscribe(({ damageSource: { damagingEntity }, deadEntity }) => {
  if (deadEntity.typeId === 'minecraft:ender_dragon') {
     damagingEntity.addTag('dragonKilled');
     damagingEntity.runCommand('execute at @a[r=100] run tellraw @a {“rawtext”:[{"text":"[§5Boss§r] §d"},{"selector":"@p"},{"text":"§b has defeated the §5ender dragon."}]}');
     damagingEntity.runCommand('scoreboard players add @a[rm=3, r=100] points 1000');
     damagingEntity.runCommand('playsound mob.enderdragon.death @a[scores={sound=!2}]');
  }
  if (deadEntity.typeId === 'minecraft:wither') {
     damagingEntity.addTag('witherKilled');
     damagingEntity.runCommand('execute at @p run tellraw @a {“rawtext”:[{"text":"[§5Boss§r] §d"},{"selector":"@p"},{"text":"§b has defeated the §5wither."}]}');
  }
  if (deadEntity.typeId === 'minecraft:elder_guardian') {
     damagingEntity.addTag('elderKilled');
  }
});

function landd(player) {
   player.runCommand('tellraw @p[r=5] {"rawtext":[{"text":"You have "},{"score":{"name":"@p","objective":"claimblocks"}},{"text":" available claimblocks. These are gained based on playtime or from the market."}]}');
   player.sendMessage('To set the end corner of your land, crouch and use the same shovel. Type .land claim in chat to claim the land from the corners you set.')
};


function start(player) {
  const main = new ActionFormData();
  main.title('Welcome');
  main.body("Welcome to Cubic Utopia Season Six!\n\nCubic Utopia is an SMP realm that is based around accessibility and vanilla gameplay with various enhancements. These include;\n\nCustom UI\nFusion Shaderpack\nLand Claims\nHomes [Personal warp locations]\nTPA & RTP\nBiome & Structure Warps\nDynamic Lights [Refreshed for S6]\nMob Health Indicators\nDark Mode GUI\nInvisible Item Frames\nVein Miner\nCustom Trials\nArenas\nParkour\n[NEW] PVP Toggle!\n[NEW] Auction House!\n[NEW] Market!\n[NEW] Points Exchange!\n[NEW] Chest Shops!\n[NEW] Tree Miner!\n[NEW] Quests!\n[NEW] Playtime Tiers!\n\nWe recommend you start a tutorial walk to learn how to use some of the features on the realm. You can also look in the FAQs in the Cubic Menu, but the tutorial walk provides a better visual overview.\n");
  main.button('Start Tutorial Walk');
  main.button('Skip Tutorials\n§c[Not Recommended]');
  main.show(player).then(({ selection, canceled }) => {
      if (canceled) start(player);
      switch(selection) {
      case 0:
         player.runCommand('tag @s add Tut');
         player.playSound('note.bell')
         break;
      case 1:
         rulespre(player);
         break;
      }
  })
}

function rulespre(player) {
    const rules = new ActionFormData();
    rules.title('Cubic Utopia 6 Rules')
    rules.body('§cSeverity Color Codes\n§6Orange- Warnings\n§cRed- Tempban\n§uPurple- Permban\n§cIf any violations are towards admins, the punishments will go up a level unless otherwise stated.\n\n§c1-No PVP without the PVP tag being enabled for both players. If you are in a combat arena it is fair game.\n§62-No spawn fighting or hitting players within 100 blocks of spawn. For admins you get one warning only.\n§c3-You may not spam-kill players. If the same parties are involved in 4 consecutive death messages or more, it will be assumed you are points farming and the killing person will be punished.\n4-No combat-logging or teleporting out of a combat arena in the middle of a fight.\n§u5-Do not be disrespectful or harass other players.\n6-No hate-speech or offensive language, even jokingly. Swears are tolerated (to an extent), slurs are not.\n§67-No advertising and/or spamming in chat.\n§c8-Do not ask for admin, operator, or any realm permissions, PERIOD. If you want to be an admin you must apply on our discord. §uYou will get one warning and any further violations will result in a permanent ban.\n9-No stealing, griefing, or unwanted destruction or altercations of anything without the permission from the owner of said thing. Griefing protected areas will result in a permban with no appeal.\n10-No hacking. This is not appealable if confirmed. You will be added to the UniqueShield global banlist.\n11-No duping or using exploits to gain points. This includes the use of tools like X-Ray and auto-clickers. This also includes using the second journey / account function to give your first account more points.\n§c12-Do not give new players overpowered items.\n13-Do not attempt to breach areas that you clearly do not or should not have access to.\n14-Do not bloat reports with duplicate reports / requests.\n§615-Do not spam tp requests to people. §cYou will only get one warning if you tp request an admin.\n16-Second-hand duping. Knowingly accepting items that have been duped will result in a tempban and your points and / or stuff reset.\n§u17-Offensive builds, including symbols, map art, and other things, will result in a permban (or an extended tempban).\n\n§cMain Rules Changes from Season Five:\n-Hackers are added to the UniqueShield global banlist.\n-PVP is now regulated by a PVP tag that you can enable in the Cubic Menu.\n-Asking for any position on our team is not tolerated, you must apply via the discord server.\n-Not new, but we will be continuing to enforce our duping rules, including second-hand duping. If you find free OP items in any chest or container, it has likely been duped or stolen, and you do not have permission to take them.')
    rules.button('Next')
    rules.show(player).then(({ selection, canceled }) => {
      if (canceled) rulespre(player);
      switch(selection) {
      case 0:
         confirm(player);
         break;
      }
  })
}

function confirm(player) {
    const rules = new ActionFormData();
    rules.title('Cubic Utopia 6')
    rules.body('To start your journey, press the start button!\n\n§cBy starting using the button below, you agree that you have read the CU rules and will accept the punishments listed for any rules you breach.')
    rules.button('Back')
    rules.button('Accept and Start')
    rules.show(player).then(({ selection, canceled }) => {
      if (canceled) rulespre(player);
      switch(selection) {
      case 0:
         rulespre(player);
         break;
      case 1:
         player.addTag('rank:beginner')
         player.runCommand('tag @s add Valid')
         player.runCommand('function start')
         player.runCommand('function reset')
         player.sendMessage('Welcome! Use the Cubic Menu in your inventory to get more information, access warps, report or request things, and access rtp and homes.')
         player.playSound('random.levelup')
         player.runCommand('tp @s 0 73 0')
         player.runCommand('clear @s')
         player.runCommand('give @s cubic:ui 1 0 {"item_lock":{"mode":"lock_in_inventory"}}')
         break;
      
      }
  })
}

function main(player) {
  const main = new ActionFormData();
  main.title('§5CU §uv6.2 §2- Menu');
  main.body('§eWelcome to Cubic Utopia 6! Head to the FAQ section to find more information about our realms unique functions!');
  main.button('§2QUICK TELEPORT\n§0[Spawn TP & Random TP]', 'textures/items/cu1');
  main.button('§vPLAYER HUB\n§0[Tpa, Homes, Auctions]', 'textures/items/cu2');
  main.button('§dQUESTS\n§0[Story & Achievements]', 'textures/items/cu19');
  main.button('§sWARPS\n§0[Biomes, Structures, Realm]', 'textures/items/cu3');
  main.button('§1FAQ\n§0[Tutorials & Docs]', 'textures/items/cu4');
  main.button('§cSETTINGS\n§0[Cosmetics & UI]', 'textures/items/cu5');
  main.button('§vFORMS\n§0[Reports & Requests]', 'textures/items/cu11');
  main.button('§4EXIT');
  main.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         spawn(player);
         break;
        
      case 1:
         return MCE.runCommand(player, `menu`);
         break;
      
      case 2:
         player.runCommand('execute at @s[scores={quests=3}] run tag @s add ql2');
         player.runCommand('execute at @s[scores={quests=4}] run tag @s add ql2');
         player.runCommand('execute at @s[scores={quests=5}] run tag @s add ql2');
         player.runCommand('execute at @s[scores={quests=6}] run tag @s add ql2');
         player.runCommand('execute at @s[scores={quests=7}] run tag @s add ql2');
         player.runCommand('execute at @s[scores={quests=8}] run tag @s add ql2');
         player.runCommand('execute at @s[scores={quests=9}] run tag @s add ql3');
         player.runCommand('execute at @s[scores={quests=10}] run tag @s add ql3');
         player.runCommand('execute at @s[scores={quests=11}] run tag @s add ql3');
         player.runCommand('execute at @s[scores={quests=12}] run tag @s add ql3');
         quest(player);
         break;
        
      case 3: 
         warp(player);
         break;

      case 4:
         faqs(player);
         break;
      
      case 5:
         settings(player);
         break;
      
      case 6:
         player.addTag('reportmenu')
         break;
      
      //case 7:   
      //   if (player.hasTag('tag_ex')) warp(player); 
      //   else faqs(player);
      //   break;
         
      }
  })
}




//spawn

function spawn(player) {
  const spawn = new ActionFormData();
  spawn.title('Quick Teleport');
  spawn.body('Choose an option to conveniently teleport.');
  spawn.button('Warp directly to spawn', 'textures/items/ender_pearl');
  spawn.button('Get Insta-Pearls for later', 'textures/items/insta_pearl');
  spawn.button('Randomly Teleport', 'textures/items/infectious_pearl')
  spawn.button('Back');
  spawn.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         player.runCommand('execute in overworld run tp @s 0 73 0')
         player.sendMessage('Teleported to spawn.')
         player.playSound('random.levelup')
         break;
        
      case 1:
         player.runCommand('give @s cubic:insta_pearl 4')
         player.sendMessage('Insta-Pearl Given.')
         player.playSound('random.levelup')
         break;

      case 2:
         return MCE.runCommand(player, `rtp`);
         player.playSound('random.levelup')
         break;

      case 3:
         main(player);
         break;
      }
  })
}






//quests

function quest(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('New for Season Six! Complete unique tasks and journeys to earn rewards!\n§eQuests are in early access. Expect many more to be added over time.');
  quests.button('Achievements \n§0[Undergo unique tasks]', 'textures/items/ender_pearl');
  quests.button('Story \n§0[Discover the infection]', 'textures/items/infectious_pearl');
  quests.button('Progression \n§0[Game-loop quests]', 'textures/items/ender_eye');
  quests.button('Tiered \n§0[Playtime tiered]', 'textures/items/insta_pearl');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         qAchieve(player);
         break;
        
      case 1:
         qStory(player);
         break;

      case 2:
         qProg(player);
         break;

      case 3:
         qTiered(player);
         break;

      case 4:
         main(player);
         break;
      }
  })
}

function qAchieve(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('Achievements involve sequential tasks like obtaining items and defeating mobs. You unlock higher level quests the more you complete!');
  quests.button('Level 1 Quests', 'textures/items/ender_pearl');
  if (player.hasTag('ql2')) quests.button('Level 2 Quests', 'textures/items/insta_pearl');
  if (player.hasTag('ql3')) quests.button('Challenges', 'textures/items/infectious_pearl');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         qAchieve1(player);
         break;
        
      case 1:
         if (player.hasTag('ql2')) qAchieve2(player);
         else quest(player);
         break;

      case 2:
         if (player.hasTag('ql3')) qAchieve2(player);
         else quest(player);
         break;

      case 3:
         quest(player);
         break;
      }
  })
}

function qAchieve1(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('Level 1 Achievement Quests');
  if (player.hasTag('ach_sco')) quests.button('Scoot Scute\n§2[Complete]', 'textures/items/wolf_armor');
  else if (player.hasTag('ach_scoIN')) quests.button('Scoot Scute\n§1[In Progress]', 'textures/items/wolf_armor');
  else quests.button('Scoot Scute\n§0[Get the wolf armors]', 'textures/items/wolf_armor');
  if (player.hasTag('ach_pas')) quests.button('Passing the Time\n§2[Complete]', 'textures/items/clock_item');
  else if (player.hasTag('ach_pasIN')) quests.button('Passing the Time\n§1[In Progress]', 'textures/items/clock_item');
  else quests.button('Passing the Time\n§0[Time is of essense]', 'textures/items/clock_item');
  if (player.hasTag('ach_han')) quests.button('Hang in there\n§2[Complete]', 'textures/items/mangrove_propagule');
  else if (player.hasTag('ach_hanIN')) quests.button('Hang in there\n§1[In Progress]', 'textures/items/mangrove_propagule');
  else quests.button('Hang in there\n§0[Plants defy gravity]', 'textures/items/mangrove_propagule');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         ach_sco(player);
         break;
        
      case 1:
         ach_pas(player);
         break;

      case 2:
         ach_han(player);
         break;

      case 3:
         quest(player);
         break;
      }
  })
}

function ach_sco(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§2Level 1 Achievement - Scoot Scute\n§eStep 1- Brush (10 Pts) \nStep 2- Scutes (50 Pts) \nStep 3- Wolf Armor (100 Pts)\n§vGet yourself some scutes and craft wolf armor!\n');
  if (player.hasTag('ach_sco')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_scoIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_sco')) {
            qAchieve1(player)
            break;
         }
         else if (player.hasTag('ach_scoIN')) {
            player.runCommand('tag @s[scores={ach_sco=3}] add brush')
            player.runCommand('tag @s[scores={ach_sco=2}] add brush')
            player.runCommand('tag @s[scores={ach_sco=3}] add armadillo_scute')
            player.runCommand('tag @s remove ach_scoIN')
            player.runCommand('scoreboard players set @s ach_sco 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_scoIN')
            player.runCommand('scoreboard players set @s ach_sco 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qAchieve1(player);
         break;
      }
  })
}

function ach_pas(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§2Level 1 Achievement - Passing the time\n§eStep 1- Quartz (10 Pts) \nStep 2- Clock (50 Pts) \nStep 3- Daylight Detector (100 Pts)\n§vIt is time to get a watch! And some other things...\n');
  if (player.hasTag('ach_pas')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_pasIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_pas')) {
            qAchieve1(player)
            break;
         }
         else if (player.hasTag('ach_pasIN')) {
            player.runCommand('tag @s[scores={ach_pas=3}] add quartz')
            player.runCommand('tag @s[scores={ach_pas=2}] add quartz')
            player.runCommand('tag @s[scores={ach_pas=3}] add daylight_detector')
            player.runCommand('tag @s remove ach_pasIN')
            player.runCommand('scoreboard players set @s ach_pas 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_pasIN')
            player.runCommand('scoreboard players set @s ach_pas 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qAchieve1(player);
         break;
      }
  })
}

function ach_han(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§2Level 1 Achievement - Hang in there\n§eStep 1- Cocoa Beans (10 Pts) \nStep 2- Mangrove Propagules (50 Pts) \nStep 3- Hanging Pale Moss (100 Pts)\n§vFind some plants that happen to be hanging!\n');
  if (player.hasTag('ach_han')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_hanIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_han')) {
            qAchieve1(player)
            break;
         }
         else if (player.hasTag('ach_hanIN')) {
            player.runCommand('tag @s[scores={ach_han=3}] add cocoa_beans')
            player.runCommand('tag @s[scores={ach_han=2}] add cocoa_beans')
            player.runCommand('tag @s[scores={ach_han=3}] add mangrove_propagule')
            player.runCommand('tag @s remove ach_hanIN')
            player.runCommand('scoreboard players set @s ach_han 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_hanIN')
            player.runCommand('scoreboard players set @s ach_han 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qAchieve1(player);
         break;
      }
  })
}

function qAchieve2(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('Level 2 Achievement Quests');
  if (player.hasTag('ach_bee')) quests.button('Bee our Guest\n§2[Complete]', 'textures/items/honey_bottle');
  if (player.hasTag('ach_beeIN')) quests.button('Bee our Guest\n§1[In Progress]', 'textures/items/honey_bottle');
  else quests.button('Bee our Guest\n§0[Befriend the Bees]', 'textures/items/honey_bottle');
  if (player.hasTag('ach_cou')) quests.button('Country Lode\n§2[Complete]', 'textures/items/compass');
  else if (player.hasTag('ach_couIN')) quests.button('Country Lode\n§1[In Progress]', 'textures/items/compass');
  else quests.button('Country Lode\n§0[Navigation assistance]', 'textures/items/compass');
  if (player.hasTag('ach_tag')) quests.button('TAGCraft\n§2[Complete]', 'textures/items/name_tag');
  else if (player.hasTag('ach_tagIN')) quests.button('TAGCraft\n§1[In Progress]', 'textures/items/name_tag');
  else quests.button('TAGCraft\n§0[Become a TAGCrafter]', 'textures/items/name_tag');
  if (player.hasTag('ach_buc')) quests.button('Bucket Bukkit\n§2[Complete]', 'textures/items/tadpole_bucket');
  else if (player.hasTag('ach_bucIN')) quests.button('Bucket Bukkit\n§1[In Progress]', 'textures/items/tadpole_bucket');
  else quests.button('Bucket Bukkit\n§0[Use a bucket, a lot]', 'textures/items/tadpole_bucket');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         ach_bee(player);
         break;
        
      case 1:
         ach_cou(player);
         break;

      case 2:
         ach_tag(player);
         break;

      case 3:
         ach_buc(player);
         break;

      case 4:
         quest(player);
         break;
      }
  })
}

function ach_bee(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§2Level 2 Achievement - Bee our Guest\n§eStep 1- Honeycomb (10 Pts) \nStep 2- Bee Nest (100 Pts) \nStep 3- Honey Block (500 Pts)\n§vBecome the bees nees! Or the opposite, they might not be so happy...\n');
  if (player.hasTag('ach_bee')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_beeIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_bee')) {
            qAchieve1(player)
            break;
         }
         else if (player.hasTag('ach_beeIN')) {
            player.runCommand('tag @s[scores={ach_bee=3}] add honeycomb')
            player.runCommand('tag @s[scores={ach_bee=2}] add honeycomb')
            player.runCommand('tag @s[scores={ach_bee=3}] add bee_nest')
            player.runCommand('tag @s remove ach_beeIN')
            player.runCommand('scoreboard players set @s ach_bee 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_beeIN')
            player.runCommand('scoreboard players set @s ach_bee 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qAchieve2(player);
         break;
      }
  })
}

function ach_cou(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§2Level 2 Achievement - Country Lode\n§eStep 1- Chiseled Stone Bricks (10 Pts) \nStep 2- Lodestone (100 Pts) \nStep 3- Lodestone Compass (500 Pts)\n§vGet familiar with lodestones and get unnecessary navigation!\n');
  if (player.hasTag('ach_cou')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_couIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_cou')) {
            qAchieve1(player)
            break;
         }
         else if (player.hasTag('ach_couIN')) {
            player.runCommand('tag @s[scores={ach_cou=3}] add chiseled_stone_bricks')
            player.runCommand('tag @s[scores={ach_cou=2}] add chiseled_stone_bricks')
            player.runCommand('tag @s[scores={ach_cou=3}] add lodestone')
            player.runCommand('tag @s remove ach_couIN')
            player.runCommand('scoreboard players set @s ach_cou 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_couIN')
            player.runCommand('scoreboard players set @s ach_cou 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qAchieve2(player);
         break;
      }
  })
}

function ach_tag(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§2Level 2 Achievement - TAGCraft\n§eStep 1- Blue Wool (10 Pts) \nStep 2- Name Tag (100 Pts) \nStep 3- Crafter (500 Pts)\n§vBecome the ultimate TAGCrafter, totally not an easter egg quest and/or promotion for the TAGCraft YouTube Channel or anything, no...\n');
  if (player.hasTag('ach_tag')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_tagIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_tag')) {
            qAchieve1(player)
            break;
         }
         else if (player.hasTag('ach_tagIN')) {
            player.runCommand('tag @s[scores={ach_tag=3}] add blue_wool')
            player.runCommand('tag @s[scores={ach_tag=2}] add blue_wool')
            player.runCommand('tag @s[scores={ach_tag=3}] add name_tag')
            player.runCommand('tag @s remove ach_tagIN')
            player.runCommand('scoreboard players set @s ach_tag 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_tagIN')
            player.runCommand('scoreboard players set @s ach_tag 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qAchieve2(player);
         break;
      }
  })
}

function ach_buc(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§2Level 2 Achievement - Bucket Bukkit\n§eStep 1- Milk Bucket (10 Pts) \nStep 2- Powder Snow Bucket (100 Pts) \nStep 3- Tadpole Bucket (500 Pts)\n§vBuckets are interesting... so use them!\n');
  if (player.hasTag('ach_buc')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_bucIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_buc')) {
            qAchieve1(player)
            break;
         }
         else if (player.hasTag('ach_bucIN')) {
            player.runCommand('tag @s[scores={ach_buc=3}] add milk_bucket')
            player.runCommand('tag @s[scores={ach_buc=2}] add milk_bucket')
            player.runCommand('tag @s[scores={ach_buc=3}] add powder_snow_bucket')
            player.runCommand('tag @s remove ach_bucIN')
            player.runCommand('scoreboard players set @s ach_buc 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_bucIN')
            player.runCommand('scoreboard players set @s ach_buc 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qAchieve2(player);
         break;
      }
  })
}

function qAchieve3(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('Achievement Challenges');
  if (player.hasTag('ach_moc')) quests.button('Mock Straw Man\n§2[Complete]', 'textures/items/heart_of_the_sea');
  else if (player.hasTag('ach_mocIN')) quests.button('Mock Straw Man\n§1[In Progress]', 'textures/items/heart_of_the_sea');
  else quests.button('Mock Straw Man\n§5[Obtain conduit power]', 'textures/items/heart_of_the_sea');
  if (player.hasTag('ach_ser')) quests.button('Serious Dedication\n§2[Complete]', 'textures/items/netherite_hoe');
  else if (player.hasTag('ach_serIN')) quests.button('Serious Dedication\n§1[In Progress]', 'textures/items/netherite_hoe');
  else quests.button('Serious Dedication\n§5[Reconsider everything]', 'textures/items/netherite_hoe');
  if (player.hasTag('ach_tri')) quests.button('Tricky Trials\n§2[Complete]', 'textures/items/ominous_trial_key');
  else if (player.hasTag('ach_triIN')) quests.button('Tricky Trials\n§1[In Progress]', 'textures/items/ominous_trial_key');
  else quests.button('Tricky Trials\n§5[Master the Chambers]', 'textures/items/ominous_trial_key');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         ach_moc(player);
         break;
        
      case 1:
         ach_ser(player);
         break;

      case 2:
         ach_tri(player);
         break;

      case 3:
         quest(player);
         break;
      }
  })
}

function ach_moc(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§5Challenge Achievement - Mock Straw Man\n§eStep 1- Nautilus Shell (100 Pts) \nStep 2- Heart of the Sea (1000 Pts) \nStep 3- Conduit (5000 Pts)\n§dGet yourself a conduit for convinient underwater abilities!\n');
  if (player.hasTag('ach_moc')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_mocIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_moc')) {
            qAchieve1(player)
            break;
         }
         else if (player.hasTag('ach_mocIN')) {
            player.runCommand('tag @s[scores={ach_moc=3}] add nautilus_shell')
            player.runCommand('tag @s[scores={ach_moc=2}] add nautilus_shell')
            player.runCommand('tag @s[scores={ach_moc=3}] add heart_of_the_sea')
            player.runCommand('tag @s remove ach_mocIN')
            player.runCommand('scoreboard players set @s ach_moc 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_mocIN')
            player.runCommand('scoreboard players set @s ach_moc 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qAchieve3(player);
         break;
      }
  })
}

function ach_ser(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§5Challenge Achievement - Serious Dedication\n§eStep 1- Ancient Debris (100 Pts) \nStep 2- Netherite Ingot (1000 Pts) \nStep 3- Netherite Hoe (5000 Pts)\n§dCraft the ultimate sacrifice and proceed to heavily question your life decisions.\n');
  if (player.hasTag('ach_ser')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_serIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_ser')) {
            qAchieve1(player)
            break;
         }
         else if (player.hasTag('ach_serIN')) {
            player.runCommand('tag @s[scores={ach_ser=3}] add ancient_debris')
            player.runCommand('tag @s[scores={ach_ser=2}] add ancient_debris')
            player.runCommand('tag @s[scores={ach_ser=3}] add netherite_ingot')
            player.runCommand('tag @s remove ach_serIN')
            player.runCommand('scoreboard players set @s ach_ser 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_serIN')
            player.runCommand('scoreboard players set @s ach_ser 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qAchieve3(player);
         break;
      }
  })
}

function ach_tri(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§5Challenge Achievement - Tricky Trials\n§eStep 1- Trial Key (100 Pts) \nStep 2- Ominous Trial Key (1000 Pts) \nStep 3- Mace (5000 Pts)\n§dMaster the Trials and reap the rewards!\n');
  if (player.hasTag('ach_tri')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_triIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_tri')) {
            qAchieve1(player)
            break;
         }
         else if (player.hasTag('ach_triIN')) {
            player.runCommand('tag @s[scores={ach_tri=3}] add trial_key')
            player.runCommand('tag @s[scores={ach_tri=2}] add trial_key')
            player.runCommand('tag @s[scores={ach_tri=3}] add ominous_trial_key')
            player.runCommand('tag @s remove ach_triIN')
            player.runCommand('scoreboard players set @s ach_tri 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_triIN')
            player.runCommand('scoreboard players set @s ach_tri 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qAchieve3(player);
         break;
      }
  })
}

function qStory(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('The infection is deadly and harmful to the world around you, and you must stop it. You unlock higher chapters the more general quests and / or story quests you complete!');
  quests.button('Chapter 1', 'textures/items/ender_pearl');
  //if (player.hasTag('ql2')) quests.button('Chapter 2', 'textures/items/insta_pearl');
  //if (player.hasTag('ql3')) quests.button('Final Chapter', 'textures/items/infectious_pearl');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         qStory1(player);
         break;
        
      case 1:
         quest(player);
         break;
      }
  })
}

function qStory1(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§3Chapter 1: The Cubic world has been overrun by a strange infection. It bubbles and listens to everything, consuming more area as things perish. What is causing this?');
  if (player.hasTag('ach_inf')) quests.button('The Infected Cavern\n§2[Complete]', 'textures/items/echo_shard');
  else if (player.hasTag('ach_infIN')) quests.button('The Infected Cavern\n§1[In Progress]', 'textures/items/echo_shard');
  else quests.button('The Infected Cavern\n§0[Quest 1]', 'textures/items/echo_shard');
  if (player.hasTag('ach_anc')) quests.button('Ancient Remnants\n§2[Complete]', 'textures/items/spiked_echo_shard');
  else if (player.hasTag('ach_ancIN')) quests.button('Ancient Remnants\n§1[In Progress]', 'textures/items/spiked_echo_shard');
  else if (player.hasTag('ach_inf')) quests.button('Ancient Remnants\n§0[Quest 2]', 'textures/items/spiked_echo_shard');
  if (player.hasTag('ach_aba')) quests.button('Abandoned Outpost\n§2[Complete]', 'textures/items/outpost_token');
  else if (player.hasTag('ach_abaIN')) quests.button('Abandoned Outpost\n§1[In Progress]', 'textures/items/outpost_token');
  else if (player.hasTag('ach_anc')) quests.button('Abandoned Outpost\n§0[Final Quest]', 'textures/items/outpost_token');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         ach_inf(player);
         break;
        
      case 1:
         if (player.hasTag('ach_inf')) ach_anc(player);
         else quest(player);
         break;

      case 2:
         if (player.hasTag('ach_anc')) ach_aba(player);
         else quest(player);
         break;

      case 3:
         quest(player);
         break;
      }
  })
}

function ach_inf(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§3Much of the world has the infection, but one peculiarly large area of sculk may hide some goodies…\n§vExplore the infected cavern near spawn and find the hidden room (250 Points)\n');
  if (player.hasTag('ach_inf')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_infIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_inf')) {
            qStory1(player)
            break;
         }
         else if (player.hasTag('ach_scoIN')) {
            player.runCommand('tag @s remove ach_infIN')
            player.runCommand('scoreboard players set @s ach_inf 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_infIN')
            player.runCommand('scoreboard players set @s ach_inf 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qStory1(player);
         break;
      }
  })
}

function ach_anc(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§3A temple once looked upon as the central for the greats, now abandoned and a victim to the infection.\n§vFind the sculk temple and obtain a spiked echo shard (250 Points)\n');
  if (player.hasTag('ach_anc')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_ancIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_anc')) {
            qStory1(player)
            break;
         }
         else if (player.hasTag('ach_ancIN')) {
            player.runCommand('tag @s remove ach_ancIN')
            player.runCommand('scoreboard players set @s ach_anc 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_ancIN')
            player.runCommand('scoreboard players set @s ach_anc 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qStory1(player);
         break;
      }
  })
}

function ach_aba(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§3One day, a Pillager thought it was a good idea to bring some sculk to his outpost. That, as it turns out, was not a good idea.\n§vTravel to the abandoned outpost and use an outpost token to craft the infectious pearl (250 Points)\n');
  if (player.hasTag('ach_aba')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_abaIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_aba')) {
            qStory1(player)
            break;
         }
         else if (player.hasTag('ach_abaIN')) {
            player.runCommand('tag @s remove ach_abaIN')
            player.runCommand('scoreboard players set @s ach_aba 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_abaIN')
            player.runCommand('scoreboard players set @s ach_aba 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qStory1(player);
         break;
      }
  })
}

function qProg(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('Progression quests are just like achievement quests, except they are constantly active and all are unlocked from the start! You can still use these to unlock higher quests in other categories!');
  if (player.hasTag('ach_its')) quests.button('Level 1: Its a Start!\n§2[Complete]', 'textures/items/diamond');
  else quests.button('Level 1: Its a Start!\n§0[Begin your adventures]', 'textures/items/diamond');
  if (player.hasTag('ach_int')) quests.button('Level 1: Into the depths\n§2[Complete]', 'textures/items/diamond_pickaxe');
  else quests.button('Level 1: Into the depths\n§0[Enter the nether]', 'textures/items/diamond_pickaxe');
  if (player.hasTag('ach_bun')) quests.button('Level 2: Bundles of storage\n§2[Complete]', 'textures/items/shulker_shell');
  else quests.button('Level 2: Bundles of storage\n§0[Upgrade your storages]', 'textures/items/shulker_shell');
  if (player.hasTag('ach_end')) quests.button('Challenge: The End\n§2[Complete]', 'textures/items/ender_eye');
  else quests.button('Challenge: The End\n§0[Defeat the dragon]', 'textures/items/ender_eye');
  if (player.hasTag('ach_beg')) quests.button('Challenge: The Beginning\n§2[Complete]', 'textures/items/nether_star');
  else quests.button('Challenge: The Beginning\n§0[Defeat the wither]', 'textures/items/nether_star');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         ach_its(player);
         break;
        
      case 1:
         ach_int(player);
         break;

      case 2:
         ach_bun(player);
         break;
      
      case 3:
         ach_end(player);
         break;

      case 4:
         ach_beg(player);
         break;
      
      case 5:
         quest(player);
         break;
      }
  })
}

function ach_its(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§2Level 1 Progression Achievement - Its a Start\n§eStep 1- Cobblestone (10 Pts) \nStep 2- Iron Ingot (50 Pts) \nStep 3- Diamond (100 Pts)\n§vGet your start in the game!\n\n§7This quest is in progress.');
  if (player.hasTag('ach_its')) quests.body('§2You have completed this quest.');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         qProg(player);
         break;
      }
  })
}

function ach_int(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§2Level 1 Progression Achievement - Into the depths\n§eStep 1- Diamond Pickaxe (10 Pts) \nStep 2- Obsidian (50 Pts) \nStep 3- Enter the Nether (100 Pts)\n§vEnter the depths of the hellish dimension.\n\n§7This quest is in progress.');
  if (player.hasTag('ach_int')) quests.body('§2You have completed this quest.');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         qProg(player);
         break;
      }
  })
}

function ach_bun(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§2Level 2 Progression Achievement - Bundles of Storage\n§eStep 1- Barrel (10 Pts) \nStep 2- Bundle (100 Pts) \nStep 3- Shulker Box (500 Pts)\n§vUpgrade your storage as you progress thru the game!\n\n§7This quest is in progress.');
  if (player.hasTag('ach_bun')) quests.body('§2You have completed this quest.');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         qProg(player);
         break;
      }
  })
}

function ach_end(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§5Progression Challenge Achievement - The End\n§eStep 1- Enter the End (100 Pts) \nStep 2- Collect Dragon Breath (1000 Pts) \nStep 3- Defeat the Dragon (5000 Pts)\n§dEnter the dark, barren end and defeat the dragon.\n\n§7This quest is in progress.');
  if (player.hasTag('ach_end')) quests.body('§2You have completed this quest.');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         qProg(player);
         break;
      }
  })
}

function ach_beg(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§5Progression Challenge Achievement - The Beginning\n§eStep 1- Get Soul Sand (100 Pts) \nStep 2- Collect Wither Skulls (1000 Pts) \nStep 3- Defeat the Wither (5000 Pts)\n§dDefeat the weathe- er, wither*, and get a nether star!\n\n§7This quest is in progress.');
  if (player.hasTag('ach_beg')) quests.body('§2You have completed this quest.');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         qProg(player);
         break;
      }
  })
}

function qTiered(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('Achievements involve sequential tasks like obtaining items and defeating mobs. You unlock higher level quests the more you complete! If you do not see any, it is because you are not yet at Crafter tier.');
  if (player.hasTag('crafter')) quests.button('Crafter Quests', 'textures/items/ender_pearl');
  if (player.hasTag('pro')) quests.button('Pro Quests', 'textures/items/insta_pearl');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('crafter')) qTiered1(player);
         else quest(player);
         break;
        
      case 1:
         if (player.hasTag('pro')) qTiered2(player);
         else quest(player);
         break;

      case 2:
         quest(player);
         break;
      }
  })
}

function qTiered1(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('Crafter Tier Quests');
  if (player.hasTag('ach_gar')) quests.button('Gardener\n§2[Complete]', 'textures/items/flower_pot');
  else if (player.hasTag('ach_garIN')) quests.button('Gardener\n§1[In Progress]', 'textures/items/flower_pot');
  else quests.button('Gardener\n§0[Green Thumb it is]', 'textures/items/flower_pot');
  if (player.hasTag('ach_fri')) quests.button('Friendly Frolics\n§2[Complete]', 'textures/items/sniffer_egg');
  else if (player.hasTag('ach_friIN')) quests.button('Friendly Frolics\n§1[In Progress]', 'textures/items/sniffer_egg');
  else quests.button('Friendly Frolics\n§0[Get friend(s)]', 'textures/items/sniffer_egg');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         ach_gar(player);
         break;
        
      case 1:
         ach_fri(player);
         break;

      case 2:
         quest(player);
         break;
      }
  })
}

function ach_gar(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§6Crafter Achievement - Gardener\n§eStep 1- Flower Pot (10 Pts) \nStep 2- Cactus Flower (100 Pts) \nStep 3- Creaking Heart (1000 Pts)\n§vGet the flowers and the... hearts? Not sure this is ethical gardening...\n');
  if (player.hasTag('ach_gar')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_garIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_gar')) {
            qTiered1(player)
            break;
         }
         else if (player.hasTag('ach_garIN')) {
            player.runCommand('tag @s[scores={ach_gar=3}] add flower_pot')
            player.runCommand('tag @s[scores={ach_gar=2}] add flower_pot')
            player.runCommand('tag @s[scores={ach_gar=3}] add cactus_flower')
            player.runCommand('tag @s remove ach_garIN')
            player.runCommand('scoreboard players set @s ach_gar 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_garIN')
            player.runCommand('scoreboard players set @s ach_gar 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qTiered1(player);
         break;
      }
  })
}

function ach_fri(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§6Crafter Achievement - Friendly Frolics\n§eStep 1- Bone (10 Pts) \nStep 2- Saddle (100 Pts) \nStep 3- Sniffer Egg (1000 Pts)\n§vFriends are nice! Go get some! Please?\n');
  if (player.hasTag('ach_fri')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_friIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_fri')) {
            qTiered1(player)
            break;
         }
         else if (player.hasTag('ach_friIN')) {
            player.runCommand('tag @s[scores={ach_fri=3}] add bone')
            player.runCommand('tag @s[scores={ach_fri=2}] add bone')
            player.runCommand('tag @s[scores={ach_fri=3}] add saddle')
            player.runCommand('tag @s remove ach_friIN')
            player.runCommand('scoreboard players set @s ach_fri 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_friIN')
            player.runCommand('scoreboard players set @s ach_fri 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qTiered1(player);
         break;
      }
  })
}

function qTiered2(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('Pro Tier Quests');
  if (player.hasTag('ach_pay')) quests.button('Payback\n§2[Complete]', 'textures/items/phantom_membrane');
  else if (player.hasTag('ach_payIN')) quests.button('Payback\n§1[In Progress]', 'textures/items/phantom_membrane');
  else quests.button('Payback\n§0[Get Revenge]', 'textures/items/phantom_membrane');
  if (player.hasTag('ach_cav')) quests.button('Cave Diver\n§2[Complete]', 'textures/items/coal');
  if (player.hasTag('ach_cavIN')) quests.button('Cave Diver\n§1[In Progress]', 'textures/items/coal');
  else quests.button('Cave Diver\n§0[Wife and 2 kids]', 'textures/items/coal');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         ach_pay(player);
         break;
        
      case 1:
         ach_cav(player);
         break;

      case 2:
         quest(player);
         break;
      }
  })
}

function ach_pay(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§dPro Achievement - Gardener\n§eStep 1- Gunpowder (10 Pts) \nStep 2- Phantom Membrane (100 Pts) \nStep 3- Ghast Tear (1000 Pts)\n§vThe mobs that have torrented you for years are finally recieving their reckoning.\n');
  if (player.hasTag('ach_pay')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_payIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_pay')) {
            qTiered2(player)
            break;
         }
         else if (player.hasTag('ach_payIN')) {
            player.runCommand('tag @s[scores={ach_pay=3}] add gunpowder')
            player.runCommand('tag @s[scores={ach_pay=2}] add gunpowder')
            player.runCommand('tag @s[scores={ach_pay=3}] add phantom_membrane')
            player.runCommand('tag @s remove ach_payIN')
            player.runCommand('scoreboard players set @s ach_pay 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_payIN')
            player.runCommand('scoreboard players set @s ach_pay 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qTiered2(player);
         break;
      }
  })
}

function ach_cav(player) {
  const quests = new ActionFormData();
  quests.title('Quests');
  quests.body('§dPro Achievement - Cave Diver\n§eStep 1- Pointed Dripstone (10 Pts) \nStep 2- Spore Blossom (100 Pts) \nStep 3- Sculk Shrieker (1000 Pts)\n§vYea this meme is way too old to be relevant but go explore the caves anyway idc\n');
  if (player.hasTag('ach_cav')) quests.body('§2You have completed this quest.');
  else if (player.hasTag('ach_cavIN')) quests.button('Cancel Quest');
  else quests.button('Begin Quest!');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('ach_cav')) {
            qTiered2(player)
            break;
         }
         else if (player.hasTag('ach_cavIN')) {
            player.runCommand('tag @s[scores={ach_cav=3}] add pointed_dripstone')
            player.runCommand('tag @s[scores={ach_cav=2}] add pointed_dripstone')
            player.runCommand('tag @s[scores={ach_cav=3}] add spore_blossom')
            player.runCommand('tag @s remove ach_cavIN')
            player.runCommand('scoreboard players set @s ach_cav 0')
            player.sendMessage('Quest Cancelled.')
            player.playSound('random.levelup')
            break;
         }
         else {
            player.runCommand('tag @s add ach_cavIN')
            player.runCommand('scoreboard players set @s ach_cav 1')
            player.sendMessage('Quest Begun!')
            player.playSound('random.levelup')
            break;
         }
      case 1:
         qTiered2(player);
         break;
      }
  })
}





//warps

function warp(player) {
    const warps = new ActionFormData();
    warps.title('Warps');
    warps.body('NOTICE: Rtp has been relocated to the quick teleport menu. This menu holds all public warps besides spawn.');
    warps.button('Realm Locations\n§0[Market, Nether Hub, Farms]', 'textures/items/ui');
    warps.button('Structures\n§0[Natural structures]', 'textures/items/trial_key');
    warps.button('Biomes\n§0[Nearly all overworld biomes]', 'textures/items/resin_clump');
    warps.button('Back')
    warps.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         server(player);
         break;
        
      case 1:
         struc(player); 
         break;
        
      case 2: 
         biome(player);
         break;

      case 3:
         main(player);
         break;
      }
  })
}

function server(player) {
    const warps = new ActionFormData();
    warps.title('Realm Warps')
    warps.body('All the big locations to teleport to.')
    warps.button('Realm Market', 'textures/items/diamond')
    warps.button('Combat & Events Central', 'textures/items/diamond_sword')
    warps.button('Trading & Player Central', 'textures/items/insta_pearl')
    warps.button('XP Farm & Enchantment Table', 'textures/items/ender_pearl')
    warps.button('Back')
    warps.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         player.runCommand('execute in overworld run tp @s 29.50 -49.00 0.50')
         player.sendMessage('Teleported to shop.')
         player.playSound('random.levelup')
         break;
        
      case 1:
         player.runCommand('execute in overworld run tp @s 0.44 74.00 -21.69')
         player.sendMessage('Teleported to central.')
         player.playSound('random.levelup')
         break;

      case 2: 
         player.runCommand('execute in overworld run tp @s 0.50 74.00 26.50')
         player.sendMessage('Teleported to Sugarcane Farm.')
         player.playSound('random.levelup')
         break;
        
      case 3: 
         player.runCommand('execute in the_end run tp @s 114.47 38.00 0.54')
         player.sendMessage('Teleported to XP Farm.')
         player.playSound('random.levelup')
         break;

      case 4:
         warp(player);
         break;
      }
  })
}

function struc(player) {
    const warps = new ActionFormData();
    warps.title('Structures')
    warps.body('All the structures to teleport to.')
    warps.button('Trial Chamber', 'textures/blocks/tuff_bricks')
    warps.button('Stronghold', 'textures/blocks/end_bricks')
    warps.button('Ancient City', 'textures/blocks/deepslate/cracked_deepslate_bricks')
    warps.button('Ocean Monument', 'textures/blocks/prismarine_dark')
    warps.button('Mineshaft', 'textures/blocks/planks_oak')
    warps.button('Nether Fortress', 'textures/blocks/nether_brick')
    warps.button('Bastion', 'textures/blocks/cracked_polished_blackstone_bricks')
    warps.button('Mansion', 'textures/blocks/planks_big_oak')
    warps.button('Back')
    warps.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         player.runCommand('execute in overworld run tp @s -294.52 -21.00 31.55')
         player.sendMessage('Teleported to chamber.')
         player.playSound('random.levelup')
         break;
      case 1:
         player.runCommand('execute in overworld run tp @s 1545.57 -19.00 -2112.48')
         player.sendMessage('Teleported to stronghold.')
         player.playSound('random.levelup')
         break;  
      case 2: 
         player.runCommand('execute in overworld run tp @s -1007.45 -48.94 1677.60')
         player.sendMessage('Teleported to ancient city.')
         player.playSound('random.levelup')
         break;
      case 3:
         player.runCommand('execute in overworld run tp @s -407.87 70.98 3351.72')
         player.sendMessage('Teleported to monument.')
         player.playSound('random.levelup')
         break;
      case 4:
         player.runCommand('execute in overworld run tp @s 1030.58 -25.00 -633.55')
         player.sendMessage('Teleported to mineshaft.')
         player.playSound('random.levelup')
         break;
      case 5:
         player.runCommand('execute in nether run tp @s 150.30 65.00 110.30')
         player.sendMessage('Teleported to fortress.')
         player.playSound('random.levelup')
         break;
      case 6:
         player.runCommand('execute in nether run tp @s -365.70 52.00 79.52')
         player.sendMessage('Teleported to bastion.')
         player.playSound('random.levelup')
         break;
      case 7:
         player.runCommand('execute in overworld run tp @s 8591.48 69.50 -6946.70')
         player.sendMessage('Teleported to mansion.')
         player.playSound('random.levelup')
         break;
      case 8:
         warp(player);
         break;
      }
  })
}

function biome(player) {
    const warps = new ActionFormData();
    warps.title('Biomes')
    warps.body('All the biome types to teleport to.')
    warps.button('Rare Biomes', 'textures/blocks/pale_oak_planks')
    warps.button('Cold Biomes', 'textures/blocks/ice')
    warps.button('Common Forests', 'textures/blocks/planks_oak')
    warps.button('Warm Biomes', 'textures/blocks/sand')
    warps.button('Cave Biomes', 'textures/blocks/deepslate/deepslate')
    warps.button('Back')
    warps.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         rare(player);
         break;
      case 1:
         cold(player);
         break;  
      case 2: 
         temp(player);
         break;
      case 3:
         warm(player);
         break;
      case 4:
         cave(player);
         break;
      case 5:
         warp(player);
         break;
      }
  })
}

function rare(player) {
    const warps = new ActionFormData();
    warps.title('Rare Biomes')
    warps.body('All the rare biomes to teleport to.')
    warps.button('Mushroom Island', 'textures/blocks/mycelium_side')
    warps.button('Cherry Grove', 'textures/blocks/cherry_planks')
    warps.button('Pale Garden', 'textures/blocks/pale_oak_planks')
    warps.button('Back')
    warps.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         player.runCommand('execute in overworld run tp @s -5759.51 72.00 -5391.48')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 1:
         player.runCommand('execute in overworld run tp @s -5035.47 134.00 -7047.51')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;  
      case 2: 
         player.runCommand('execute in overworld run tp @s 4152.49 131.00 -8217.49')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 3:
         biome(player);
         break;
      }
  })
}

function cold(player) {
    const warps = new ActionFormData();
    warps.title('Cold Biomes')
    warps.body('All the cold biomes to teleport to.')
    warps.button('Jagged Mountain', 'textures/blocks/stone')
    warps.button('Icy Mountain', 'textures/blocks/ice')
    warps.button('Stony Mountain', 'textures/blocks/calcite')
    warps.button('Taiga', 'textures/blocks/planks_spruce')
    warps.button('Mega Taiga', 'textures/blocks/dirt_podzol_side')
    warps.button('Ice Spikes', 'textures/blocks/blue_ice')
    warps.button('Back')
    warps.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         player.runCommand('execute in overworld run tp @s 3160.65 183.00 -4999.47')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 1:
         player.runCommand('execute in overworld run tp @s 880.47 200.00 -9906.25')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;  
      case 2: 
         player.runCommand('execute in overworld run tp @s 4861.19 185.00 4612.59')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 3: 
         player.runCommand('execute in overworld run tp @s 5330.16 77.00 708.70')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 4: 
         player.runCommand('execute in overworld run tp @s -5039.52 68.00 6032.44')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 5: 
         player.runCommand('execute in overworld run tp @s -3844.48 139.00 2500.54')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 6:
         biome(player);
         break;
      }
  })
}

function temp(player) {
    const warps = new ActionFormData();
    warps.title('Common Forests')
    warps.body('All the common forests to teleport to.')
    warps.button('Birch Forest', 'textures/blocks/planks_birch')
    warps.button('Deep Forest', 'textures/blocks/planks_big_oak')
    warps.button('Forest', 'textures/blocks/planks_oak')
    warps.button('Flower Forest', 'textures/blocks/flower_rose')
    warps.button('Back')
    warps.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         player.runCommand('execute in overworld run tp @s -557.52 100.00 -5386.43')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 1:
         player.runCommand('execute in overworld run tp @s 2194.52 83.00 -9226.58')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;  
      case 2: 
         player.runCommand('execute in overworld run tp @s -907.94 102.00 1483.25')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 3:
         player.runCommand('execute in overworld run tp @s -5570.42 79.00 7555.40')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 4:
         biome(player);
         break;
      }
  })
}

function warm(player) {
    const warps = new ActionFormData();
    warps.title('Warm Biomes')
    warps.body('All the warm biomes to teleport to.')
    warps.button('Jungle', 'textures/blocks/planks_jungle')
    warps.button('Mangrove Swamp', 'textures/blocks/mangrove_planks')
    warps.button('Desert', 'textures/blocks/sand')
    warps.button('Savanna', 'textures/blocks/planks_acacia')
    warps.button('Badlands', 'textures/blocks/hardened_clay')
    warps.button('Back')
    warps.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         player.runCommand('execute in overworld run tp @s 2599.24 124.00 -5682.67')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 1:
         player.runCommand('execute in overworld run tp @s 2611.48 70.88 3001.42')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;  
      case 2: 
         player.runCommand('execute in overworld run tp @s -6279.46 91.00 4552.55')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 3:
         player.runCommand('execute in overworld run tp @s 7352.73 140.00 12.94')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 4:
         player.runCommand('execute in overworld run tp @s 2476.41 93.00 -6479.41')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 5:
         biome(player);
         break;
      }
  })
}

function cave(player) {
    const warps = new ActionFormData();
    warps.title('Cave Biomes')
    warps.body('All the cave biomes to teleport to.')
    warps.button('Deep Dark', 'textures/blocks/sculk_catalyst_side')
    warps.button('Lush Cave', 'textures/blocks/moss_block')
    warps.button('Dripstone Cave', 'textures/blocks/dripstone_block')
    warps.button('Massive Cave', 'textures/blocks/stone')
    warps.button('Back')
    warps.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         player.runCommand('execute in overworld run tp @s 2638.72 -35.00 -4667.47')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to cave.')
         player.playSound('random.levelup')
         break;
      case 1:
         player.runCommand('execute in overworld run tp @s -7171.42 -17.00 4567.37')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to cave.')
         player.playSound('random.levelup')
         break;  
      case 2:
         player.runCommand('execute in overworld run tp @s 5026.65 -19.00 5126.34')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to cave.')
         player.playSound('random.levelup')
         break;
      case 3:
         player.runCommand('execute in overworld run tp @s 3211.62 34.00 -5125.44')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to cave.')
         player.playSound('random.levelup')
         break;
      case 4:
         biome(player);
         break;
      }
  })
}









//FAQSSSS

function faqs(player) {
    const faq = new ActionFormData();
    faq.title('FAQ')
    faq.body('All needed info for new and returning players.')
    faq.button('Rules\n§c[NEW Changes for S6]', 'textures/items/diamond_axe')
    faq.button('Docs\n§0[Tutorials & Info]', 'textures/items/book_normal')
    faq.button('Changelogs\n§2[Season Six is out!]', 'textures/items/infectious_pearl')
    faq.button('Credits\n§0[Contributors to CU6]', 'textures/items/amethyst_shard')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         rules(player);
         break;

      case 1:
         docs(player);
         break;

      case 2:
         change(player);
         break;

      case 3:
         credits(player);
         break;

      case 4:
         main(player);
         break;
      }
  })
}

function docs(player) {
    const faq = new ActionFormData();
    faq.title('Docs')
    faq.body('Info on built-in realm systems.')
    faq.button('Points', 'textures/items/emerald')
    faq.button('Tiers', 'textures/items/experience_bottle')
    faq.button('Quests', 'textures/items/diamond')
    faq.button('Mob Keys', 'textures/items/very_rare_mob_key')
    faq.button('Addons', 'textures/items/compass_item')
    faq.button('Commands', 'textures/items/ender_pearl')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         points(player);
         break;
      
      case 1:
         level(player);
         break;

      case 2: 
         achieve(player);
         break;

      case 3: 
         mobkeys(player);
         break;

      case 4:
         addon(player);
         break;

      case 5:
         tpfaq(player);
         break;

      case 6:
         faqs(player);
         break;
      }
  })
}

function rules(player) {
    const rules = new ActionFormData();
    rules.title('Rules')
    rules.body('§cSeverity Color Codes\n§6Orange- Warnings\n§cRed- Tempban\n§uPurple- Permban\n§cIf any violations are towards admins, the punishments will go up a level unless otherwise stated.\n\n§c1-No PVP without the PVP tag being enabled for both players. If you are in a combat arena it is fair game.\n§62-No spawn fighting or hitting players within 100 blocks of spawn. For admins you get one warning only.\n§c3-You may not spam-kill players. If the same parties are involved in 4 consecutive death messages or more, it will be assumed you are points farming and the killing person will be punished.\n4-No combat-logging or teleporting out of a combat arena in the middle of a fight.\n§u5-Do not be disrespectful or harass other players.\n6-No hate-speech or offensive language, even jokingly. Swears are tolerated (to an extent), slurs are not.\n§67-No advertising and/or spamming in chat.\n§c8-Do not ask for admin, operator, or any realm permissions, PERIOD. If you want to be an admin you must apply on our discord. §uYou will get one warning and any further violations will result in a permanent ban.\n9-No stealing, griefing, or unwanted destruction or altercations of anything without the permission from the owner of said thing. Griefing protected areas will result in a permban with no appeal.\n10-No hacking. This is not appealable if confirmed. You will be added to the UniqueShield global banlist.\n11-No duping or using exploits to gain points. This includes the use of tools like X-Ray and auto-clickers. This also includes using the second journey / account function to give your first account more points.\n§c12-Do not give new players overpowered items.\n13-Do not attempt to breach areas that you clearly do not or should not have access to.\n14-Do not bloat reports with duplicate reports / requests.\n§615-Do not spam tp requests to people. §cYou will only get one warning if you tp request an admin.\n16-Second-hand duping. Knowingly accepting items that have been duped will result in a tempban and your points and / or stuff reset.\n§u17-Offensive builds, including symbols, map art, and other things, will result in a permban (or an extended tempban).\n\n§cMain Rules Changes from Season Five:\n-Hackers are added to the UniqueShield global banlist.\n-PVP is now regulated by a PVP tag that you can enable in the Cubic Menu.\n-Asking for any position on our team is not tolerated, you must apply via the discord server.\n-Not new, but we will be continuing to enforce our duping rules, including second-hand duping. If you find free OP items in any chest or container, it has likely been duped or stolen, and you do not have permission to take them.')
    rules.button('Back')
    rules.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         faqs(player);
         break;
      }
  })
}


//points

function points(player) {
    const faq = new ActionFormData();
    faq.title('Points')
    faq.body('Points are a currency / rewards system for Cubic Utopia. You can spend points for items at chest shops and for ranks, kits, and more items from the market. There are a few main ways to earn points:\n\nPLAYTIME\nYou earn 5 points (and 1 claim block) per minute by simply being on the realm. You will also earn levels and/or tiers procedurally corresponding to your playtime. More info on playtime tiers is found in the tiers section of the FAQ.\n\nQUESTS\nYou can earn anywhere from 10 to 5000 points for completing steps in quests. You do not have to fully complete quests to receive points! More information can be found in the quests section of the FAQ.\n\nSELLING\nYou can earn points by selling minerals, jewels, keys, or woods at the market. You can also earn points by creating a chest shop, which can be done by placing a chest and then placing a sign on the front of it and writing CREATESHOP.\n\nCOMBAT\nYou can earn points by fighting mobs or players. The points earned by fighting players correlate with their playtime tiers, and more info on that can be found in the tiers section of the FAQ. You can find the points rewards for mobs using the button below!')
    faq.button('Mobs Kill Value')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
       case 0:
         pointsone(player);
         break;
      case 1:
         docs(player);
         break;
      }
  })
}

function pointsone(player) {
    const faq = new ActionFormData();
    faq.title('Points')
    faq.body('The following is a directory for the amount of points you can gain from killing specific mobs.\n\nCOMMON ANIMALS & FISH\n+5 Points for each killed\n-Pig\n-Cow\n-Sheep\n-Chicken\n-Cod\n-Salmon\n-Pufferfish\n-Tropical Fish\n\nMEDIUM ENEMIES\n+10 Points for each killed\n-Zombie\n-Zombie Villager\n-Husk\n-Drowned\n-Skeleton\n-Bogged\n-Stray\n-Parched\n-Spider\n-Cave Spider\n-Slime\n-Magma Cube\n-Pillager\n\nHARD ENEMIES\n+50 Points for each killed\n-Creeper\n-Phantom\n-Witch\n-Breeze\n-Blaze\n-Guardian\n-Iron Golem\n-Endermite\n-Piglin\n-Hoglin\n-Shulker\n\nVERY HARD ENEMIES\n+100 Points for each killed\n-Vex\n-Piglin Brute\n-Ghast\n-Evoker\n-Vindicator\n-Ravager\n\nBOSSES\nVarying points rewards\n-Warden +1000\n-Elder Guardian +1000\n-Ender Dragon +5000\n-Wither +10000\n')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         points(player);
         break;
      }
  })
}

//Level

function level(player) {
    const faq = new ActionFormData();
    faq.title('Tiers')
    faq.body('Playtime tiers are an evolution of the previous levels system, new for season six! There are 30 unique rewards you can attain by simply playing long enough - 200% more than last season. There are six tiers in CU6, which all have corresponding ranks:\n\n-Tier 1: Beginner, Starter Tier\n-Tier 2: Crafter, Reached at four hours\n-Tier 3: Pro, Reached at fifteen hours\n-Tier 4: Beast, Reached at thirty hours\n-Tier 5: Ultra, Reached at fifty hours\n-Tier 6: God, Reached at ninety hours\nEach tier has five levels. For each level you reach, you get a reward!\nCombat and deaths are scaled based on tiers.')
    faq.button('Tier Rewards')
    faq.button('Combat & Deaths')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         levelone(player);
         break;
      case 1:
         leveltwo(player);
         break;
      case 2:
         docs(player);
         break;
      }
  })
}

function levelone(player) {
    const faq = new ActionFormData();
    faq.title('Tiers')
    faq.body('The following is a list of tier and level rewards.\n\nTIER 1: BEGINNER\n10 Minutes = Level 1 > 100 Points\n30 Minutes = Level 2 > Saddle\n1 Hour = Level 3 > Ender Chest\n2 Hour = Level 4 > Gapple\n3 Hour = Level 5 > Uncommon Mob Key\n\nTIER 2: CRAFTER\n4 Hour = Level 1 > Dunes Trim\n6 Hour = Level 2 > Magenta Shulker Box\n8 Hour = Level 3 > 2000 Claim Blocks\n10 Hour = Level 4 > Netherite Ingot\n12 Hour = Level 5 > Rare Mob Key\n\nTIER 3: PRO\n15 Hour = Level 1 > Spire Trim\n18 Hour = Level 2 > 32 End Crystals\n21 Hour = Level 3 > Vault\n24 Hour = Level 4 > God Apple\n27 Hour = Level 5 > Very Rare Mob Key\n\nTIER 4: BEAST\n30 Hour = Level 1 > Snout Trim\n34 Hour = Level 2 > Relic Disc\n38 Hour = Level 3 > Super Mob Key\n42 Hour = Level 4 > Heavy Core\n46 Hour = Level 5 > Beacon\n\nTIER 5: ULTRA\n50 Hour = Level 1 > Ward Trim\n55 Hour = Level 2 > Netherite Block\n60 Hour = Level 3 > Perm Effect: Speed\n70 Hour = Level 4 > Perm Effect: Haste\n80 Hour = Level 5 > Perm Effect: Leap\n\nTIER 6: GOD\n90 Hour = Level 1 >  Utopia Kit Access\n105 Hour = Level 2 > Perm Effect: Night Vision\n120 Hour = Level 3 > Perm Effect: Water Breathing\n135 Hour = Level 4 > Perm Effect: Fire Resistance\n150 Hour = Level MAX > Silence Trim')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         level(player);
         break;
      }
  })
}

function leveltwo(player) {
    const faq = new ActionFormData();
    faq.title('Tiers')
    faq.body('The following is a list of tier-scaled points rewards and penalties.\n\nPVP REWARDS\nPoints for killing a player of a certain tier\nTier 1 = 200 Points\nTier 2 = 400 Points\nTier 3 = 700 Points\nTier 4 = 1000 Points\nTier 5 = 1400 Points\nTier 6 = 2000 Points\n\nDEATH PENALTIES\nPoints lost for players of certain tiers\nTier 1 - 100 Points\nTier 2 - 300 Points\nTier 3 - 500 Points\nTier 4 - 750 Points\nTier 5 - 1000 Points\nTier 6 - 1500 Points')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         level(player);
         break;
      }
  })
}





//achieve

function achieve(player) {
    const faq = new ActionFormData();
    faq.title('Quests')
    faq.body('Quests are task-based journeys that function as both an evolution of the old achievement systems and as a new story-based system. Quests (and their points rewards) are scaled on three levels, those being level one (chapter 1 in the case of story quests), level two, and challenges (level three). There are three main types of quests:\n\nSTORY QUESTS\nA new story awaits in season six! Travel to infected monuments and complete tasks in order to save the world from the sculk infection. Currently, only chapter 1 is available, but more chapters are coming soon!\n\nACHIEVEMENT QUESTS\nAn evolution of the old achievement system that was being used from Season two, these are task-based and involve obtaining items from certain places and killing certain mobs. Points scale based on significance! Level 2 achievements are unlocked once three level 1 quests have been completed (from any quest type), and challenges are unlocked when nine quests have been completed. There are also playtime tier-exclusive achievement quests that are independently scaled!\n\nPROGRESSION QUESTS\nThese are similar to achievement quests, but do not require tasks to be completed in any particular order, involve natural game progression, and are always active. All progression quests / challenges are unlocked from the start, so if you dont complete any quests beforehand, you can still get rewarded for completing higher level progression quests.\n\nUnlike previous seasons, its up to you to find out what quests there are and what the rewards are (these are visible on individual quest pages once theyre unlocked) - so good luck, and happy journeys!')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         docs(player);
         break;
      }
  })
}



function addon(player) {
    const faq = new ActionFormData();
    faq.title('Docs')
    faq.body('Info on realm addon functions.')
    faq.button('Land Claims', 'textures/items/compass_normal')
    faq.button('Chest Shops', 'textures/items/diamond')
    faq.button('Vein & Tree Miner', 'textures/items/diamond_axe')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         claim(player);
         break;
      
      case 1:
         chest(player);
         break;

      case 2: 
         vein(player);
         break;

      case 3:
         docs(player);
         break;
      }
  })
}

function mobkeys(player) {
    const faq = new ActionFormData();
    faq.title('Mob Keys')
    faq.body('Mob Keys are a new addition to the rewards system for Season Six! You will get mob keys for reaching new playtime tiers and by completing events. You can also buy the Shrieker Mob Key from the market by simply purchasing the Shrieker rank.\n\nMob keys spawn a random mob of its selection at the players position when used. You cannot use mob keys in protected areas. All the mob keys;\n\nSHRIEKER MOB KEY\nNautilus 50%\nCamel Husk 50%\n\nUNCOMMON MOB KEY\nCold Frog 30%\nArmadillo 30%\nBee 20%\nCamel 20%\n\nRARE MOB KEY\nBrown Mooshroom 20%\nBrown Panda 30%\nMountain Wolf 50%\n\nVERY RARE MOB KEY\nGhastling 20%\nSniffer 30%\nAllay 50%\n\nSUPER MOB KEY\nBlue Axolotl 20%\nSkeleton Horse 30%\nZombie Horse 50%')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         docs(player);
         break;
      }
  })
}

//claim

function claim(player) {
    const faq = new ActionFormData();
    faq.title('Land Claims')
    faq.body('Land claims are a neat way to protect your builds from bad guys! Claims can be made with a golden shovel and require a claim block for every block you claim. Claims can be configured to allow certain or all players to open chests and do other things (commands for this found in the command section of the FAQ), but by default it is your own plot of land, safe from griefing.\n\nHOW TO CLAIM\nSimply use a golden shovel on the first corner of the land you want to claim, and then crouch and use the golden shovel on the opposite corner diagonal from the initial one. After that, just use the §d.land claim§r command to claim the land!')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         addon(player);
         break;
      }
  })
}

function chest(player) {
    const faq = new ActionFormData();
    faq.title('Chest Shops')
    faq.body('New for season six, chest shops are simple ways to buy and sell items! \n\nHOW TO CREATE A CHEST SHOP\nIts really simple!\nJust place a chest, then place a sign on the front of it and type CREATESHOP into it. Then, when you click the sign again, a menu will appear! You can configure numerous aspects of your chest shop from this menu.\n\nTo delete your chest shop, simply use the break trigger and delete it in that menu.')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         addon(player);
         break;
      }
  })
}

function vein(player) {
    const faq = new ActionFormData();
    faq.title('Vein & Tree Miner')
    faq.body('Cubic Utopia has had the vein miner for a while now, but the tree miner has made its return for season six. These are really easy to use - by simply crouching while using a pickaxe or axe on ores or logs respectively, you can mine all the connected ores / logs instantly! This will result in the same durability penalty on your tools as if you mined it all individually.\n\nCertain trees are not applicable to the addon due to their size respective to logs (too OP!).')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         addon(player);
         break;
      }
  })
}






//commands

function tpfaq(player) {
    const faq = new ActionFormData();
    faq.title('Commands')
    faq.body('Our addons and packs have an assortment of custom commands! Commands for the TPA / Homes / Land Claiming / RTP / Report Addon can also be found by typing the §u.help§r command in chat when you forget.\n\n§cAll custom commands have the prefix . instead of / or !§r')
    faq.button('Tpa & Homes')
    faq.button('Land Claims')
    faq.button('Other')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         tpfaqone(player);
         break;
      case 1:
         tpfaqtwo(player);
         break;
      case 2:
         tpfaqthree(player);
         break;
      case 3:
         docs(player);
         break;
      }
  })
}

function tpfaqone(player) {
    const faq = new ActionFormData();
    faq.title('Commands')
    faq.body('The following can be done in the homes / tpa menu, but may be quicker in chat.\n\nTeleport Requests\nUse §u.tpa §6<playername>§r to make a teleport request to someone without going through the menu.\nUse .tpahere §6<playername>§r to make a request for someone to teleport to you.\nUse §u.tpacancel§r to cancel teleport requests.\nUse §u.tpaccept§r to accept a teleport request.\nUse §u.tpasetting§r to configure personal teleport request settings.\n\nHomes\nPlayer-created homes are custom teleport locations that only you can access.\nUse §u.home§r to access the homes menu from chat.\nUse §u.home §6<homename>§r to teleport directly to a home you have set.\nUse §u.sethome §6<homename>§r to set a home at your current location.\nUse §u.delhome §6<homename>§r to delete a home you have set.\nUse §u.listhome§r to list your homes in chat.')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         tpfaq(player);
         break;
      }
  })
}

function tpfaqtwo(player) {
    const faq = new ActionFormData();
    faq.title('Commands')
    faq.body('Land claims have specific commands for claim setting and configuration. Some of these functions can be accessed in the land claims menu, but may be quicker in chat.\n\nUse §u.land§r to get a full list of land commands, including commands you can use as a substitute for the golden shovels.\nUse §u.land setting§r in a land claim to open a settings menu for that land claim, including changing permissions for certain players.')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         tpfaq(player);
         break;
      }
  })
}

function tpfaqthree(player) {
    const faq = new ActionFormData();
    faq.title('Commands')
    faq.body('These commands are useful for certain functions and information but do not fit in a specific category.\n\nUse §u.rtp§r to randomly teleport without using this menu.\nUse §u.back§r to go back to the location you were at before you last teleported or died.\nUse §u.playerlist§r to get a list of currently online players.\nUse §u.auctionhouse§r to immediately access the auction house.\nUse §u.tps§r to get the current ticks per second, which if is more than 2-3 below 20, should be relayed to an admin or owner immediately.')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         tpfaq(player);
         break;
      }
  })
}





//changelogs

function change(player) {
    const faq = new ActionFormData();
    faq.title('Changelogs')
    faq.body('These are changelogs for all the major (and non-hotfix minor) updates to Cubic Utopia.')
    faq.button('Version 6.0', 'textures/items/ui')
    faq.button('Version 6.1', 'textures/items/emerald')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         changeone(player);
         break;

      case 1:
         changetwo(player);
         break;
      
      case 2: 
         faqs(player);
         break;
      }
  })
}

function changeone(player) {
    const set = new ActionFormData();
    set.title('Changelogs')
    set.body('VERSION 6.0\nAfter months of waiting, countless hours of development, and multiple days of delays, we are finally ready to launch Cubic Utopia 6! \n\nCLIMBS & QUESTS\nWelcome to the new season, where we are introducing numerous features related to the market, tiers, ranks, and our new quest system!  \n\nQuest System\nOur new quest system evolves the previous achievements system and adds additional adventures, including new story and progression quests.\n- 22 New Quests have been added!\n- This includes five progression quests, ten achievement quests (and an additional four tiered achievement quests), and chapter one of the story mode quests (three).\n- Achievement quests involve individual steps that the player must complete in sequential order to complete the achievement. Each step rewards the player points seperately. If each step were an achievement in the old system, there would be twice as many as we had last season.\n- Progression quests are similar, but can be completed out of order and are activated until the player completes them. As a result, there are no tip objectives for Progression quests.\n- Story Mode: Discover the Infection. Chapter 1 is now available with three unique quests, where youll find ancient ruins and craft special items. In further changelogs, Story Mode will have its own section. We plan on bringing two more chapters in further updates.\n\nMarket\nThe realm shop has been renamed to the realm market to differentiate it from other shops, which will come up later in this changelog. The Season 6 Market throws back to a Season 3 / 4 style layout, with sections for Ranks, Featured Sales, Selling & Buying, Kits, and Cosmetics.\n- The Market features a record amount of sales!\n- For the first time ever, the Market can be accessed directly from spawn with no teleporting needed (although there is a warp for convinience).\n- Mounts of Mayhem items are available!\n\nRanks\nThe Market will feature two ranks this system, which are cheaper than previously but have less sales. This is to compensate for the introduction of tiered ranks (see Tier System).\n- Catalyst and Shrieker ranks are now available\n- New cosmetic ranks are available including the Warrior rank, which is an ode to Season Two\n\nTier System\nThe new playtime tier system is an overhaul of the levels system, introducing 30 levels across 6 different tiers. Each tier has a unique rank tied to it.\n- Each tier and/or level reached has a unique reward, which scales up in value based on the tier.\n- All tiers have their own sales in the Realm Market via the new Tiered Sales section.\n- Crafter Tiers (Tier 2) and up also have their own quests in the quest system.\n\nMob Keys\n- New Tier Rewards.\n- Spawn a random mob out of a selection of 2-4.\n- Players can only get one of each\n- Shrieker Key can be bought at the Market\n\nGENERAL\nNumerous Quality-of-life enhancements have been made, including the reorganization of the Cubic Menu and some new addons!\n\nNOTICE\nThe Health Bar pack was planned to be a continued inclusion in Season Six, however there appears to be a visual bug related to input that affects packs like this, and as a result we have decided to disable it until the aforementioned bug has been fixed.\nAlso, please report any bugs you encounter! As with any launch, the realm isnt perfectly stable, and wed like to have most of these fixed before the release of 6.1.\n\nMenu\nThe Cubic Menu has been reorganized and made more readable!\n- RTP is now in the Quick Teleport Tab\n- TPA / Homes Button has been renamed to Player Hub due to the addition of the Auction House (see below)\n- Added Quests Menu which is responsible for handling all quests in the new system\n- Added Trading Hub Warp\n- Reorganized FAQ tab with tons of new info stored inside simpler menus\n- Reorganized settings in a similar way, with toggles just showing as one button instead of two in a separate menu\n\nPvp Tag (IMPORTANT!)\nA new PVP tag has been added which will dictate whether players are open to combat with others or not. Punishment will be issued if players kill others that dont have the PVP tag. This can be configured in settings and is enabled by default.\n\nAddons\nSimple Dynamic Lights by AlienEdd\nIntroducing a new dynamic lights addon for CU! This addon is relatively lag-free and non-dependent on the marketplace, so we should have less problems. This addon adds;\n- Lighting when holding or wearing an item that emits light\n- Enchantment Lighting\n- No Nonsense\n\nEdds VeinCapitator by AlienEdd\nThis addon has been present for a little while on CU, but was only used for its vein mining functions. Thanks to some tweaking, weve made the full thing work with this season of Cubic Utopia! This means that we now have;\n- Tree Decapitation when mined with an axe while crouching, works for trees that dont have 4x4 variants\n- Vein Miner (functions like normal)\n- Gravel patches get fully mined when using a shovel while crouching\n\nEssentials Addon by Pao\nChest shops and the auction house are here!\n- Chest Shops allow you to buy and sell items without the need of admin approval\n- Easy to set up and use\n- Auction house allows you to auction items for points\n- Admins may remove auction house items if theyre one-time items like mob keys or overpriced compared to market sales\n\nInfrastructure\nThis seasons spawn is the largest one yet! Were bringing back a Season Two-esque layout with much more simplicity yet much more functionality.\n- Market building drops you into the Realm Market, which is underneath spawn\n- Trading Hub & Public Warps building features trading posts and public warps, as youd expect\n- Combat & Arenas building features physical warps to all Pvp Arenas, Trials, and Parkours\n- Nether and End Portals are present for the first time since Season Three\n- A survival portal is present for the first time, as spawn is enclosed and we would like to avoid the whole issue where players with not very much literacy ask us how to get out of spawn\n\n- Added a tutorial walk for new players\n\nArenas\nPlease note that some arenas are unfinished at the start of Season Six, and we plan on finishing them shortly after release.\n- 1 Combat Arena is present: Spleef-Style Arena. Sculk Maze (an ode to season five) is coming soon.\n- 4 Trials are present: Glassbox Trial, Infectious Cavern, Mineshaft Trial (CU3), and Mountain Trial (CU2)\n- 2 Parkours are present: Aqua Parkour and Ice Parkour (CU4)\n- In addition, a parkour is present at spawn like in Season Five.\n\nPoints Rewards\n- Combat rewards now only work when the killed player has the PVP tag\n- A number of mobs can now be killed for points, including the new Parched mob\n- Boss fights are no longer tracked using command blocks, instead using script\n\nResource Pack\n- Changed logos to reflect new Season\n- Changed some menu textures\n- Added textures for new buttons\n- Added textures for new quest items\n- Added textures for mob keys\n- Freed up space to decrease loading time\n\nBehavior Pack\n- Added functions for new quest and tier systems\n- Added mob key functionality\n- Changed insta pearls to not be used up when above areas that you cant teleport out of\n- World Border now affects all dimensions and is slightly smaller\n- This change is in reaction to the insane file size that CU5 ended up with, making it undownloadable')
    set.button('Back')
    set.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         change(player);
         break;
      }
  })
}

function changetwo(player) {
    const set = new ActionFormData();
    set.title('Changelogs')
    set.body('VERSION 6.1\nThe first minor update is out for Cubic Utopia 6! We have got fixes, leftovers, and some Quality of Life tweaks! Maybe the new arena will interest you? Maybe the new market sales will satisfy you? Who knows!\n\nNOTICE\n- With this update, we are doing a reset of playtime for players out of sync on tiers. We apologize if this inconviniences you, but it is for the best going forward as many players were not receiving rewards.\n- Bundles have been disabled with this update. While you can still craft bundles and have them in your inventory, they no longer store items or have any functionality. This is due to a duping issue that Mojang basically refuses to patch, as they always seem to do with any issue that actually matters.\n- Rank toggles were planned for this update, however we were not able to fit it in with all the other concerns that were more negatively affecting player experience.\n\nQuests\n- Quests now make sounds! Different sounds result from completing steps and completing full quests.\n\nAddons\nLow Fire by The Cubic Company\n- Added a new pack!\n- A small texture pack that lowers the fire effect when you’re on fire.\n- This enhances visibility in situations where you’re on fire, usually in combat.\n\nEssentials Addon by Pao\n- Added a new version, fixing some issues with the Auction House.\n- This also fixes the RTP issue where players were being teleported into caves. If you’d like to warp to caves, you can do so thru the cave biome warps.\n\nTiers\n- Tiers will now make sounds! These can be configured in the settings section of the cubic menu.\n- We have done some tier resets for certain players, see the notice above.\n\nMenu\n- Players with quests activated will now see buttons identifying that they are in progress when in the quests menus.\n- Added credits for new packs.\n\nMarket\nHuge new things have come to the market!\n- Added sales for Pro and Beast Tiers.\n- Added new kits.\n- Added the Shrieker Vault Room.\n- Added new limited-time sales.\n\nInfrastructure\n- The Admin Board has been set up.\n- Changed the theme to winter instead of holidays.\n\nArenas\n- Added the sculk maze arena! We hope you enjoy this CU5-inspired maze.\n\nBehavior Packs\n- Changed some tier functions to reflect the recent tier resets for out-of-sync players.\n- Made some redundancy efforts to many quest and tier functions.')
    set.button('Back')
    set.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         change(player);
         break;
      }
  })
}





//credits

function credits(player) {
    const faq = new ActionFormData();
    faq.title('Credits')
    faq.body('§5Realm Owner & Lead Developer§r - Rocked4129 (§cTAGCraft on YouTube§r)\n§1Lead Builder§r - Navyman\n§2Essentials Addon§r - Pao\n§6Luminous Dreams§r - Poggy / FoxyStar Studios\n§vVanilla Vibrant Visuals§r - cubeir\n§uDynamic Lights§r - AlienEdd\n§cHealth Bar§r - Cromite\n§0Invisible Item Frame§r - LionCat6\n§3Vein Miner§r - AlienEdd\n§eUnique Shield§r - Herm\n§9Dark Mode§r - OffRoaders123\n§vLow Fire§r - The Cubic Company\n§aRealms+ - ARAS Team')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         faqs(player);
         break;
      }
  })
}









//settings

function settings(player) {
    const set = new ActionFormData();
    set.title('Settings')
    set.body('All Applicable Realm Settings. Note that for land you must be standing in land you own to configure it.\n§dNEW! Toggle Ranks in the effects tab.')
    set.button('General\n§0[Sidebar, Tips, PVP]', 'textures/items/cu15')
    set.button('Effects\n§0[Perm Effects, Trails]', 'textures/items/cu14')
    set.button('Land\n§1[Must be standing in a claim!]', 'textures/items/cu10')
    set.button('Reset\n§c[Deletes your data]', 'textures/items/cu12')
    set.button('Back')
    set.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         settingsGen(player);
         break;

      case 1:
         effect(player);
         break;

      case 2:
         return MCE.runCommand(player, `land setting`);
         break;

      case 3:
         reset(player);
         break;

      case 4:
         main(player);
         break;
      }
  })
}

function settingsGen(player) {
   const set = new ActionFormData();
   set.title('Settings')
   set.body('General settings for tags related to simple realm functionality. [NEWS: Fixed in 6.0.1]')
   if (player.hasTag('pvp')) set.button('§4Disable PVP', 'textures/items/cu7')
   else set.button('§2Enable PVP', 'textures/items/cu9')
   if (player.hasTag('ignorescoreboard')) set.button('§2Enable Sidebar', 'textures/items/cu9')
   else set.button('§4Disable Sidebar', 'textures/items/cu7')
   if (player.hasTag('tips')) set.button('§4Disable Tips', 'textures/items/cu7')
   else set.button('§2Enable Tips', 'textures/items/cu9')
   if (player.hasTag('lags')) set.button('§4Disable Lag Clear Notify', 'textures/items/cu7')
   else set.button('§2Enable Lag Clear Notify', 'textures/items/cu9')
   set.button('Back')
   set.show(player).then(({ selection, canceled }) => {
     if (canceled) return;
     switch(selection) {
     case 0:
        if (player.hasTag('pvp')) {
           player.runCommand('tag @s remove pvp')
           player.sendMessage('Disabled PVP Tag.')
           player.playSound('note.bell')
           break;
        }
        else {
           player.runCommand('tag @s add pvp')
           player.sendMessage('Enabled PVP Tag!')
           player.playSound('random.orb')
           break;
        }


     case 1:
        if (player.hasTag('ignorescoreboard')) {
           player.runCommand('tag @s remove ignorescoreboard')
           player.sendMessage('Enabled Sidebar.')
           player.playSound('random.orb')
           break;
        }
        else {
           player.runCommand('tag @s add ignorescoreboard')
           player.sendMessage('Disabled Sidebar.')
           player.playSound('random.orb')
           break;
        }


     case 2:
        if (player.hasTag('tips')) {
           player.runCommand('tag @s remove tips')
           player.sendMessage('Disabled tips.')
           player.playSound('random.orb')
           break;
        }
        else {
           player.runCommand('tag @s add tips')
           player.sendMessage('Enabled tips.')
           player.playSound('random.orb')
           break;
        }


     case 3:
        if (player.hasTag('lags')) {
           player.runCommand('tag @s remove lags')
           player.sendMessage('Disabled Notifications.')
           player.playSound('random.orb')
           break;
        }
        else {
           player.runCommand('tag @s add lags')
           player.sendMessage('Enabled Notifications.')
           player.playSound('random.orb')
           break;
        }


     case 4:
        settings(player);
        break;
     }
 })
}


function effect(player) {
    const set = new ActionFormData();
    set.title('Settings')
    set.body('Various Effect Settings.')
    set.button('Audio\n§0[Realm Sounds]', 'textures/items/cu15')
    set.button('Perm Effects\n§0[Indefinite Effects]', 'textures/items/cu14')
    set.button('Trails\n§0[Particle Trails]', 'textures/items/cu10')
    set.button('Ranks\n§0[Visibility of Ranks]', 'textures/items/cu11')
    set.button('Back')
    set.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         sound(player);
         break;

      case 1:
         player.runCommand('tag @s[scores={peffect1=1}] add peffect1');
         player.runCommand('tag @s[scores={peffect2=1}] add peffect2');
         player.runCommand('tag @s[scores={peffect3=1}] add peffect3');
         player.runCommand('tag @s[scores={peffect4=1}] add peffect4');
         player.runCommand('tag @s[scores={peffect5=1}] add peffect5');
         player.runCommand('tag @s[scores={peffect6=1}] add peffect6');
         player.runCommand('tag @s[scores={peffect1=1}] add ef1');
         player.runCommand('tag @s[scores={peffect2=1}] add ef2');
         player.runCommand('tag @s[scores={peffect3=1}] add ef3');
         player.runCommand('tag @s[scores={peffect4=1}] add ef4');
         player.runCommand('tag @s[scores={peffect5=1}] add ef5');
         player.runCommand('tag @s[scores={peffect6=1}] add ef6');
         effects(player);
         break;

      case 2:
         player.runCommand('tag @s[scores={trail1=1}] add trail1');
         player.runCommand('tag @s[scores={trail2=1}] add trail2');
         player.runCommand('tag @s[scores={trail3=1}] add trail3');
         player.runCommand('tag @s[scores={trail4=1}] add trail4');
         player.runCommand('tag @s[scores={trail5=1}] add trail5');
         player.runCommand('tag @s[scores={trail6=1}] add trail6');
         player.runCommand('tag @s[scores={trail7=1}] add trail7');
         player.runCommand('tag @s[scores={trail8=1}] add trail8');
         player.runCommand('tag @s[scores={trail1=1}] add tr1');
         player.runCommand('tag @s[scores={trail2=1}] add tr2');
         player.runCommand('tag @s[scores={trail3=1}] add tr3');
         player.runCommand('tag @s[scores={trail4=1}] add tr4');
         player.runCommand('tag @s[scores={trail5=1}] add tr5');
         player.runCommand('tag @s[scores={trail6=1}] add tr6');
         player.runCommand('tag @s[scores={trail7=1}] add tr7');
         player.runCommand('tag @s[scores={trail8=1}] add tr8');
         trails(player);
         break;

      case 3:
         player.runCommand('tag @s[tag=rank:warrior] add war');
         player.runCommand('tag @s[tag=rank:infectious] add inf');
         ranks(player);
         break;

      case 4:
         settings(player);
         break;
      }
  })
}

function sound(player) {
    const set = new ActionFormData();
    set.title('Settings')
    set.body('§2All Sounds On- Sound will play for player achievements, boss fights, and level-ups.\n§eLimited Sounds- Sound will play only for boss fights.\n§cAll Sounds Off- No Realm Sounds at all.')
    set.button('§2All Sounds On', 'textures/items/cu7all')
    set.button('§eLimited Sounds', 'textures/items/cu7some')
    set.button('§4All Sounds Off', 'textures/items/cu7none')
    set.button('Back')
    set.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         player.runCommand('scoreboard players set @s sound 0')
         player.sendMessage('Enabled all external sounds.')
         player.playSound('random.orb')
         break;
        
      case 1:
         player.runCommand('scoreboard players set @s sound 1')
         player.sendMessage('Limited all external sounds.')
         player.playSound('random.orb')
         break;

      case 2:
         player.runCommand('scoreboard players set @s sound 2')
         player.sendMessage('Disabled all external sounds.')
         player.playSound('random.orb')
         break;

      case 3:
         effect(player);
         break;
      }
  })
}

function trails(player) {
    const set = new ActionFormData();
    set.title('Settings')
    set.body('Toggle trails. Trails are available in the realm market, if you have not bought a trail you cannot toggle it.')
    if (player.hasTag('trail1') && player.hasTag('tr1')) set.button('§4Disable Simple Trail', 'textures/items/cu7')
    else if (player.hasTag('trail1')) set.button('§2Enable Simple Trail', 'textures/items/cu9')
    else set.button('§0You do not have this trail', 'textures/items/cu11')
    if (player.hasTag('trail2') && player.hasTag('tr2')) set.button('§4Disable Water Trail', 'textures/items/cu7')
    else if (player.hasTag('trail2')) set.button('§2Enable Water Trail', 'textures/items/cu9')
    else set.button('§0You do not have this trail', 'textures/items/cu11')
    if (player.hasTag('trail3') && player.hasTag('tr3')) set.button('§4Disable Catalyst Trail', 'textures/items/cu7')
    else if (player.hasTag('trail3')) set.button('§2Enable Catalyst Trail', 'textures/items/cu9')
    else set.button('§0You do not have this trail', 'textures/items/cu11')
    if (player.hasTag('trail4') && player.hasTag('tr4')) set.button('§4Disable Shrieker Trail', 'textures/items/cu7')
    else if (player.hasTag('trail4')) set.button('§2Enable Shrieker Trail', 'textures/items/cu9')
    else set.button('§0You do not have this trail', 'textures/items/cu11')
    if (player.hasTag('trail5') && player.hasTag('tr5')) set.button('§4Disable Crafter Trail', 'textures/items/cu7')
    else if (player.hasTag('trail5')) set.button('§2Enable Crafter Trail', 'textures/items/cu9')
    else set.button('§0You do not have this trail', 'textures/items/cu11')
    if (player.hasTag('trail6') && player.hasTag('tr6')) set.button('§4Disable Pro Trail', 'textures/items/cu7')
    else if (player.hasTag('trail6')) set.button('§2Enable Pro Trail', 'textures/items/cu9')
    else set.button('§0You do not have this trail', 'textures/items/cu11')
    if (player.hasTag('trail7') && player.hasTag('tr7')) set.button('§4Disable Beast Trail', 'textures/items/cu7')
    else if (player.hasTag('trail7')) set.button('§2Enable Beast Trail', 'textures/items/cu9')
    else set.button('§0You do not have this trail', 'textures/items/cu11')
    if (player.hasTag('trail8') && player.hasTag('tr8')) set.button('§4Disable Ultra Trail', 'textures/items/cu7')
    else if (player.hasTag('trail8')) set.button('§2Enable Ultra Trail', 'textures/items/cu9')
    else set.button('§0You do not have this trail', 'textures/items/cu11')
    set.button('Back')
    set.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('trail1') && player.hasTag('tr1')) {
            player.runCommand('scoreboard players set @s trail1 0')
            player.runCommand('tag @s remove tr1')
            player.sendMessage('Trail Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('trail1')) {
            player.runCommand('scoreboard players set @s trail1 1')
            player.addTag('tr1')
            player.sendMessage('Trail Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }
        
      case 1:
         if (player.hasTag('trail2') && player.hasTag('tr2')) {
            player.runCommand('scoreboard players set @s trail2 0')
            player.runCommand('tag @s remove tr2')
            player.sendMessage('Trail Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('trail2')) {
            player.runCommand('scoreboard players set @s trail2 1')
            player.addTag('tr2')
            player.sendMessage('Trail Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }

      case 2:
         if (player.hasTag('trail3') && player.hasTag('tr3')) {
            player.runCommand('scoreboard players set @s trail3 0')
            player.runCommand('tag @s remove tr3')
            player.sendMessage('Trail Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('trail3')) {
            player.runCommand('scoreboard players set @s trail3 1')
            player.addTag('tr3')
            player.sendMessage('Trail Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }

      case 3:
         if (player.hasTag('trail4') && player.hasTag('tr4')) {
            player.runCommand('scoreboard players set @s trail4 0')
            player.runCommand('tag @s remove tr4')
            player.sendMessage('Trail Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('trail4')) {
            player.runCommand('scoreboard players set @s trail4 1')
            player.addTag('tr4')
            player.sendMessage('Trail Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }

      case 4:
         if (player.hasTag('trail5') && player.hasTag('tr5')) {
            player.runCommand('scoreboard players set @s trail5 0')
            player.runCommand('tag @s remove tr5')
            player.sendMessage('Trail Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('trail5')) {
            player.runCommand('scoreboard players set @s trail5 1')
            player.addTag('tr5')
            player.sendMessage('Trail Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }
      
      case 5:
         if (player.hasTag('trail6') && player.hasTag('tr6')) {
            player.runCommand('scoreboard players set @s trail6 0')
            player.runCommand('tag @s remove tr6')
            player.sendMessage('Trail Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('trail6')) {
            player.runCommand('scoreboard players set @s trail6 1')
            player.addTag('tr6')
            player.sendMessage('Trail Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }

      case 6:
         if (player.hasTag('trail7') && player.hasTag('tr7')) {
            player.runCommand('scoreboard players set @s trail7 0')
            player.runCommand('tag @s remove tr7')
            player.sendMessage('Trail Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('trail7')) {
            player.runCommand('scoreboard players set @s trail7 1')
            player.addTag('tr7')
            player.sendMessage('Trail Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }
      
      case 7:
         if (player.hasTag('trail8') && player.hasTag('tr8')) {
            player.runCommand('scoreboard players set @s trail8 0')
            player.runCommand('tag @s remove tr8')
            player.sendMessage('Trail Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('trail8')) {
            player.runCommand('scoreboard players set @s trail8 1')
            player.addTag('tr8')
            player.sendMessage('Trail Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }

      case 8:
         effect(player);
         break;
      }
  })
}

function effects(player) {
    const set = new ActionFormData();
    set.title('Settings')
    set.body('Toggle perm effects. Perm effects are only available for high tiers, and none can be toggled if you have not been rewarded any.')
    if (player.hasTag('peffect1') && player.hasTag('ef1')) set.button('§4Disable Speed', 'textures/items/cu7')
    else if (player.hasTag('peffect1')) set.button('§2Enable Speed', 'textures/items/cu9')
    if (player.hasTag('peffect2') && player.hasTag('ef2')) set.button('§4Disable Haste', 'textures/items/cu7')
    else if (player.hasTag('peffect2')) set.button('§2Enable Haste', 'textures/items/cu9')
    if (player.hasTag('peffect3') && player.hasTag('ef3')) set.button('§4Disable Jump Boost', 'textures/items/cu7')
    else if (player.hasTag('peffect3')) set.button('§2Enable Jump Boost', 'textures/items/cu9')
    if (player.hasTag('peffect4') && player.hasTag('ef4')) set.button('§4Disable Night Vision', 'textures/items/cu7')
    else if (player.hasTag('peffect4')) set.button('§2Enable Night Vision', 'textures/items/cu9')
    if (player.hasTag('peffect5') && player.hasTag('ef5')) set.button('§4Disable Water Breathing', 'textures/items/cu7')
    else if (player.hasTag('peffect5')) set.button('§2Enable Water Breathing', 'textures/items/cu9')
    if (player.hasTag('peffect6') && player.hasTag('ef6')) set.button('§4Disable Fire Resistance', 'textures/items/cu7')
    else if (player.hasTag('peffect6')) set.button('§2Enable Fire Resistance', 'textures/items/cu9')
    set.button('Back')
    set.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('peffect1') && player.hasTag('ef1')) {
            player.runCommand('scoreboard players set @s peffect1 0')
            player.runCommand('tag @s remove ef1')
            player.sendMessage('Effect Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('peffect1')) {
            player.runCommand('scoreboard players set @s peffect1 1')
            player.addTag('ef1')
            player.sendMessage('Effect Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }
        
      case 1:
         if (player.hasTag('peffect2') && player.hasTag('ef2')) {
            player.runCommand('scoreboard players set @s peffect2 0')
            player.runCommand('tag @s remove ef2')
            player.sendMessage('Effect Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('peffect2')) {
            player.runCommand('scoreboard players set @s peffect2 1')
            player.addTag('ef2')
            player.sendMessage('Effect Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }

      case 2:
         if (player.hasTag('peffect3') && player.hasTag('ef3')) {
            player.runCommand('scoreboard players set @s peffect3 0')
            player.runCommand('tag @s remove ef3')
            player.sendMessage('Effect Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('peffect3')) {
            player.runCommand('scoreboard players set @s peffect3 1')
            player.addTag('ef3')
            player.sendMessage('Effect Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }

      case 3:
         if (player.hasTag('peffect4') && player.hasTag('ef4')) {
            player.runCommand('scoreboard players set @s peffect4 0')
            player.runCommand('tag @s remove ef4')
            player.sendMessage('Effect Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('peffect4')) {
            player.runCommand('scoreboard players set @s peffect4 1')
            player.addTag('ef4')
            player.sendMessage('Effect Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }

      case 4:
         if (player.hasTag('peffect5') && player.hasTag('ef5')) {
            player.runCommand('scoreboard players set @s peffect5 0')
            player.runCommand('tag @s remove ef5')
            player.sendMessage('Effect Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('peffect5')) {
            player.runCommand('scoreboard players set @s peffect5 1')
            player.addTag('ef5')
            player.sendMessage('Effect Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }

      case 5:
         if (player.hasTag('peffect6') && player.hasTag('ef6')) {
            player.runCommand('scoreboard players set @s peffect6 0')
            player.runCommand('tag @s remove ef6')
            player.sendMessage('Effect Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('peffect6')) {
            player.runCommand('scoreboard players set @s peffect6 1')
            player.addTag('ef6')
            player.sendMessage('Effect Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }

      case 6:
         effect(player);
         break;
      }
  })
}

function ranks(player) {
    const set = new ActionFormData();
    set.title('Settings')
    set.body('Toggle perm effects. Perm effects are only available for high tiers, and none can be toggled if you have not been rewarded any.')
    if (player.hasTag('rank:warrior') && player.hasTag('war')) set.button('§4Disable Warrior Rank', 'textures/items/cu7')
    else if (player.hasTag('war')) set.button('§2Enable Warrior Rank', 'textures/items/cu9')
    else set.button('§0You do not have this rank', 'textures/items/cu11')
    if (player.hasTag('rank:infectious') && player.hasTag('inf')) set.button('§4Disable Infectious Rank', 'textures/items/cu7')
    else if (player.hasTag('inf')) set.button('§2Enable Infectious Rank', 'textures/items/cu9')
    else set.button('§0You do not have this rank', 'textures/items/cu11')
    if (player.hasTag('rank:catalyst') && player.hasTag('rank1done')) set.button('§4Disable Catalyst Rank\n§0[Visbility Only]', 'textures/items/cu7')
    else if (player.hasTag('rank1done')) set.button('§2Enable Catalyst Rank', 'textures/items/cu9')
    else set.button('§0You do not have this rank', 'textures/items/cu11')
    if (player.hasTag('rank:shrieker') && player.hasTag('rank2done')) set.button('§4Disable Shrieker Rank\n§0[Visbility Only]', 'textures/items/cu7')
    else if (player.hasTag('rank2done')) set.button('§2Enable Shrieker Rank', 'textures/items/cu9')
    else set.button('§0You do not have this rank', 'textures/items/cu11')
    set.button('Back')
    set.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('rank:warrior') && player.hasTag('war')) {
            player.runCommand('tag @s remove rank:warrior')
            player.sendMessage('Rank Visibility Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('war')) {
            player.addTag('rank:warrior')
            player.sendMessage('Rank Visibility Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }
        
      case 1:
         if (player.hasTag('rank:infectious') && player.hasTag('inf')) {
            player.runCommand('tag @s remove rank:infectious')
            player.sendMessage('Rank Visibility Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('inf')) {
            player.addTag('rank:infectious')
            player.sendMessage('Rank Visibility Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }

      case 2:
         if (player.hasTag('rank:catalyst') && player.hasTag('rank1done')) {
            player.runCommand('tag @s remove rank:catalyst')
            player.sendMessage('Rank Visibility Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('rank1done')) {
            player.addTag('rank:catalyst')
            player.sendMessage('Rank Visibility Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }

      case 3:
         if (player.hasTag('rank:shrieker') && player.hasTag('rank2done')) {
            player.runCommand('tag @s remove rank:shrieker')
            player.sendMessage('Rank Visibility Disabled.');
            player.playSound('random.orb')
            break;
         }
         else if (player.hasTag('rank2done')) {
            player.addTag('rank:shrieker')
            player.sendMessage('Rank Visibility Enabled!');
            player.playSound('random.orb')
            break;
         }
         else { 
            effect(player);
            break;
         }

      case 4:
         effect(player);
         break;
      }
  })
}



//resets
function reset(player) {
    const sec = new ActionFormData();
    sec.title('Reset')
    sec.body('§cWARNING: Resetting is a permanent action that will delete your items, scoreboard data, and numerous other things. It not recommended to go forward.')
    sec.button('Reset Data', 'textures/items/cu12')
    sec.button('Back')
    sec.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         resetCon(player);
         break;
      case 1:
         settings(player);
         break;
      }
  })
}

function resetCon(player) {
    const sec = new ActionFormData();
    sec.title('Reset')
    sec.body('§cYou sure about this? This will delete the majority of your progress. It is a permanent action that cannot be undone!')
    sec.button('Confirm', 'textures/items/cu9')
    sec.button('Back')
    sec.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         player.runCommand('function reset');
         player.runCommand('execute at @s run clear @s');
         player.runCommand('tp @s 0 73 0');
         break;
      case 1:
         reset(player);
         break;
      }
  })
}