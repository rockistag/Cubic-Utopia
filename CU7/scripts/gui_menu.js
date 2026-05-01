import { world, system, Player, EntityTypes } from "@minecraft/server";
import { ActionFormData, ModalFormData, FormCancelationReason, MessageFormData } from "@minecraft/server-ui"

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        if (player.hasTag('cubicmenu')) {
            main(player);
            player.runCommand('tag @s remove cubicmenu');
        }
        if (player.hasTag('startmenu')) {
            rulespre(player);
            player.runCommand('tag @s remove startmenu');
        }
        if (player.hasTag('firstpvp')) {
            firstpvp(player);
            player.runCommand('tag @s add firstpvpdone');
            player.runCommand('tag @s remove firstpvp');
        }
    }
});

world.beforeEvents.itemUse.subscribe((e) => {
    if (e.itemStack.typeId == 'cubic:ui') 
      system.run(() =>  { main(e.source) })
    if (e.itemStack.typeId == 'cubic:start_ui') 
      system.run(() =>  { rulespre(e.source) })
});

world.afterEvents.playerLeave.subscribe((e) => {
    world.getDimension("overworld").runCommand("scoreboard objectives remove displaypoints");
    world.getDimension("overworld").runCommand('scoreboard objectives add displaypoints dummy "§l§5Player Points"');
    world.getDimension("overworld").runCommand('scoreboard objectives setdisplay sidebar displaypoints');
});

world.afterEvents.playerSpawn.subscribe((e) => {
    const player = e.player;
    if (!player.hasTag("menuGot")) {
        player.runCommand('give @s[hasitem={item=cubic:ui, quantity=0}] cubic:ui 1 0 {"item_lock":{"mode":"lock_in_inventory"}}')
        if (!player.hasTag("Valid"))
        {
            player.runCommand('clear @s')
        }
    } 
    else {
        return;
    }
    if (!player.hasTag("joined")) {
        player.addTag("joined");
        player.runCommand('function add');
        player.runCommand('scoreboard players add @s score 0');
        player.runCommand('scoreboard players add playersJoined points 1');
        player.runCommand('execute as @s run tellraw @a {"rawtext":[{"text":"[§aNew Player§r]§d "},{"selector":"@s"},{"text":"§b has joined for the first time!"}]}');
        player.runCommand('tellraw @a {"rawtext":[{"text":"§bThere are now §d"},{"score":{"name":"playersJoined","objective":"points"}},{"text":" players §bwho have joined §5Season Seven."}]}');
    }
    if (!player.hasTag("e"))
    {
        player.runCommand('tag @s add e');
    }
    if (!player.hasTag("Valid")) {
        start(player);
    } 
    else {
        return;
    }
});

function firstpvp(player) {
  const main = new ActionFormData();
  main.title('NOTICE');
  main.body("Hey there! Looks like you're about to enter an arena. There's a couple things you should know before you start:\n\n1. This realm has a thing called a PVP tag which is used to regulate pvp. If you have not already disabled it (which can be done via the cubic menu settings section), players will be allowed to kill you without consequence. If you kill other players while not having it on, you can also be punished.\n\n2. Your PVP Tag will be automatically applied in PVP arenas. It will be temporary, however in order for it to be automatically disabled after leaving you will have to use a quick warp.\n\nWith these things in mind, happy fighting!");
  main.button('Enable PVP Tag');
  main.button('Disable PVP Tag');
  main.show(player).then(({ selection, canceled }) => {
      if (canceled) firstpvp(player);
      switch(selection) {
      case 0:
         player.runCommand('tag @s add pvp');
         player.playSound('note.bell')
         break;
      case 1:
         player.runCommand('tag @s remove pvp');
         player.playSound('note.bell')
         break;
      }
  })
}

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
         player.runCommand('tp @s 0 -50 0')
         player.runCommand('clear @s')
         player.runCommand('give @s cubic:ui 1 0 {"item_lock":{"mode":"lock_in_inventory"}}')
         break;
      
      }
  })
}

function main(player) {
  const main = new ActionFormData();
  main.title('Cubic Utopia 7');
  main.body('§eWelcome to Cubic Utopia 7! Head to the Wiki section to find more information about our realms unique functions!');
  main.button('Quick Teleport', 'textures/items/cu1');
  main.button('Player Utilities', 'textures/items/cu2');
  main.button('Featured Warps', 'textures/items/cu3');
  main.button('Achievements', 'textures/items/cu19');
  main.button('Settings', 'textures/items/cu4');
  main.button('Forms', 'textures/items/cu5');
  main.button('Wiki', 'textures/items/cu11');
  main.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         quick(player);
         break;
        
      case 1:
         player.addTag('utilitymenu');
         break;
      
      case 2:
         warp(player);
         break;
        
      case 3: 
         quest(player);
         break;
              
      case 4:
         settings(player);
         break;
      
      case 5:
         player.addTag('reportmenu')
         break;
      
      case 6:
         faqs(player);
         break;
      }
  })
}




//spawn

function quick(player) {
  const spawn = new ActionFormData();
  spawn.title('Quick Teleport');
  spawn.body('Choose an option to conveniently teleport.');
  spawn.button('Warp directly to spawn', 'textures/items/ender_pearl');
  spawn.button('Get Insta-Pearls for spawn', 'textures/items/insta_pearl');
  spawn.button('Randomly Teleport', 'textures/items/infectious_pearl')
  if (player.hasTag('warp1')) spawn.button('Realm Market', 'textures/items/infectious_pearl')
  else spawn.button('Undiscovered Warp', 'textures/items/cuempty')
  if (player.hasTag('warp2')) spawn.button('Combat Central', 'textures/items/infectious_pearl')
  else spawn.button('Undiscovered Warp', 'textures/items/cuempty')
  if (player.hasTag('warp3')) spawn.button('Public Warps', 'textures/items/infectious_pearl')
  else spawn.button('Undiscovered Warp', 'textures/items/cuempty')
  if (player.hasTag('warp4')) spawn.button('Depths Central', 'textures/items/infectious_pearl')
  else spawn.button('Undiscovered Warp', 'textures/items/cuempty')
  if (player.hasTag('warp5')) spawn.button('Enderman XP Farm', 'textures/items/infectious_pearl')
  else spawn.button('Undiscovered Warp', 'textures/items/cuempty')
  spawn.button('Back');
  spawn.show(player).then(({ selection, canceled }) => {
      if (canceled) main(player);
      switch(selection) {
      case 0:
         player.runCommand('execute in overworld run tp @s 0 -50 0')
         player.runCommand('tag @s[tag=pvpoff] remove pvp')
         player.runCommand('tag @s[tag=pvpoff] remove pvpoff')
         player.sendMessage('Teleported to spawn.')
         player.playSound('random.levelup')
         break;
        
      case 1:
         player.runCommand('give @s cubic:insta_pearl 4')
         player.sendMessage('Insta-Pearl Given.')
         player.playSound('random.levelup')
         break;

      case 2:
         player.playSound('random.levelup')
         player.sendMessage('Randomly Teleported.')
         player.runCommand('tag @s[tag=pvpoff] remove pvp')
         player.runCommand('tag @s[tag=pvpoff] remove pvpoff')
         player.runCommand('function rtp')
         break;

      case 3:
         if (player.hasTag('warp1')) {
             player.runCommand('execute in overworld run tp @s 100.50 -47.00 0.50')
             player.sendMessage('Teleported to market.')
             player.runCommand('tag @s[tag=pvpoff] remove pvp')
             player.runCommand('tag @s[tag=pvpoff] remove pvpoff')
             player.playSound('random.levelup')
             break;
         }

         else {
             main(player);
             break;
         }

      case 4:
         if (player.hasTag('warp2')) {
             player.runCommand('execute in overworld run tp @s 63.00 -47.00 -87.00')
             player.sendMessage('Teleported to combat hub.')
             player.runCommand('tag @s[tag=pvpoff] remove pvp')
             player.runCommand('tag @s[tag=pvpoff] remove pvpoff')
             player.playSound('random.levelup')
             break;
         }

         else {
             main(player);
             break;
         }
      
      case 5:
         if (player.hasTag('warp3')) {
             player.runCommand('execute in overworld run tp @s 63.00 -47.00 98.00')
             player.sendMessage('Teleported to community hub.')
             player.runCommand('tag @s[tag=pvpoff] remove pvp')
             player.runCommand('tag @s[tag=pvpoff] remove pvpoff')
             player.playSound('random.levelup')
             break;
         }

         else {
             main(player);
             break;
         }

      case 6:
         if (player.hasTag('warp4')) {
             player.runCommand('execute in overworld run tp @s 321.50 -25.00 580.50')
             player.sendMessage('Teleported to the depths of deepslate.')
             player.playSound('random.levelup')
             player.runCommand('tag @s[tag=pvpoff] remove pvp')
             player.runCommand('tag @s[tag=pvpoff] remove pvpoff')
             break;
         }

         else {
             main(player);
             break;
         }
      
      case 7:
         if (player.hasTag('warp5')) {
             player.runCommand('execute in the_end run tp @s 155.50 7.00 0.50')
             player.sendMessage('Teleported to xp farm.')
             player.runCommand('tag @s[tag=pvpoff] remove pvp')
             player.runCommand('tag @s[tag=pvpoff] remove pvpoff')
             player.playSound('random.levelup')
             break;
         }

         else {
             main(player);
             break;
         }

      case 8:
         main(player);
         break;
      }
  })
}






//achievements

function quest(player) {
  const quests = new ActionFormData();
  quests.title('Achievements');
  quests.body('Your hub for progression');
  quests.button('Achievements \n§0[Undergo unique tasks]', 'textures/items/ender_pearl');
  quests.button('Progression Info \n§0[Levels & Info]', 'textures/items/ender_eye');
  quests.button('Playtime Rewards \n§0[Playtime shtuff]', 'textures/items/insta_pearl');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         player.runCommand('tag @s add advancementmenu');
         break;

      case 1:
         qProg(player);
         break;

      case 2:
         playtime(player);
         break;

      case 3:
         main(player);
         break;
      }
  })
}

function qProg(player) {
  const quests = new ActionFormData();
  quests.title('Achievements');
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

function playtime(player) {
    const que = new ActionFormData();
    que.title('Achievements')
    que.body('Redeem playtime rewards!')
    if (player.hasTag('p1') && player.hasTag('pr1')) que.button('§0Reward Redeemed', 'textures/items/cu7')
    else if (player.hasTag('p1')) que.button('§21 Hour: Golden Apple', 'textures/items/cu9')
    else que.button('§0You have not reached 1 Hour', 'textures/items/cu11')
    if (player.hasTag('p2') && player.hasTag('pr2')) que.button('§0Reward Redeemed', 'textures/items/cu7')
    else if (player.hasTag('p2')) que.button('§25 Hours: Mob Key', 'textures/items/cu9')
    else que.button('§0You have not reached 5 Hours', 'textures/items/cu11')
    if (player.hasTag('p3') && player.hasTag('pr3')) que.button('§0Reward Redeemed', 'textures/items/cu7')
    else if (player.hasTag('p3')) que.button('§210 Hours: Spire Trim', 'textures/items/cu9')
    else que.button('§0You have not reached 10 Hours', 'textures/items/cu11')
    if (player.hasTag('p4') && player.hasTag('pr4')) que.button('§0Reward Redeemed', 'textures/items/cu7')
    else if (player.hasTag('p4')) que.button('§215 Hours: Rare Mob Key', 'textures/items/cu9')
    else que.button('§0You have not reached 15 Hours', 'textures/items/cu11')
    if (player.hasTag('p5') && player.hasTag('pr5')) que.button('§0Reward Redeemed', 'textures/items/cu7')
    else if (player.hasTag('p5')) que.button('§220 Hours: Snout Trim', 'textures/items/cu9')
    else que.button('§0You have not reached 20 Hours', 'textures/items/cu11')
    if (player.hasTag('p6') && player.hasTag('pr6')) que.button('§0Reward Redeemed', 'textures/items/cu7')
    else if (player.hasTag('p6')) que.button('§230 Hours: Very Rare Mob Key', 'textures/items/cu9')
    else que.button('§0You have not reached 30 Hours', 'textures/items/cu11')
    if (player.hasTag('p7') && player.hasTag('pr7')) que.button('§0Reward Redeemed', 'textures/items/cu7')
    else if (player.hasTag('p7')) que.button('§240 Hours: Ward Trim', 'textures/items/cu9')
    else que.button('§0You have not reached 40 Hours', 'textures/items/cu11')
    if (player.hasTag('p8') && player.hasTag('pr8')) que.button('§0Reward Redeemed', 'textures/items/cu7')
    else if (player.hasTag('p8')) que.button('§250 Hours: Super Mob Key', 'textures/items/cu9')
    else que.button('§0You have not reached 50 Hours', 'textures/items/cu11')
    if (player.hasTag('p9') && player.hasTag('pr9')) que.button('§0Reward Redeemed', 'textures/items/cu7')
    else if (player.hasTag('p9')) que.button('§275 Hours: Jump Boost Perm Effect', 'textures/items/cu9')
    else que.button('§0You have not reached 75 Hours', 'textures/items/cu11')
    if (player.hasTag('p10') && player.hasTag('pr10')) que.button('§0Reward Redeemed', 'textures/items/cu7')
    else if (player.hasTag('p10')) que.button('§2100 Hours: Night Vision Perm Effect', 'textures/items/cu9')
    else que.button('§0You have not reached 100 Hours', 'textures/items/cu11')
    que.button('Back')
    que.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         if (player.hasTag('p1') && !(player.hasTag('pr1'))) {
            player.runCommand('give @s golden_apple')
            player.runCommand('tag @s add pr1')
            player.sendMessage('Reward Redeemed!');
            player.playSound('random.orb')
            break;
         }
         else { 
            quest(player);
            break;
         }
        
      case 1:
         if (player.hasTag('p2') && !(player.hasTag('pr2'))) {
            player.runCommand('give @s cubic:uncommon_mob_key')
            player.runCommand('tag @s add pr2')
            player.sendMessage('Mob Key Redeemed! You can use this to spawn a mob from a selection of 3. Go to the wiki to find more out about this key!');
            player.playSound('random.orb')
            break;
         }
         else { 
            quest(player);
            break;
         }

      case 2:
         if (player.hasTag('p3') && !(player.hasTag('pr3'))) {
            player.runCommand('give @s spire_armor_trim_smithing_template')
            player.runCommand('tag @s add pr3')
            player.sendMessage('Reward Redeemed!');
            player.playSound('random.orb')
            break;
         }
         else { 
            quest(player);
            break;
         }

      case 3:
         if (player.hasTag('p4') && !(player.hasTag('pr4'))) {
            player.runCommand('give @s cubic:rare_mob_key')
            player.runCommand('tag @s add pr4')
            player.sendMessage('Reward Redeemed!');
            player.playSound('random.orb')
            break;
         }
         else { 
            quest(player);
            break;
         }

      case 4:
         if (player.hasTag('p5') && !(player.hasTag('pr5'))) {
            player.runCommand('give @s snout_armor_trim_smithing_template')
            player.runCommand('tag @s add pr5')
            player.sendMessage('Reward Redeemed!');
            player.playSound('random.orb')
            break;
         }
         else { 
            quest(player);
            break;
         }
      
      case 5:
         if (player.hasTag('p6') && !(player.hasTag('pr6'))) {
            player.runCommand('give @s cubic:very_rare_mob_key')
            player.runCommand('tag @s add pr6')
            player.sendMessage('Reward Redeemed!');
            player.playSound('random.orb')
            break;
         }
         else { 
            quest(player);
            break;
         }

      case 6:
         if (player.hasTag('p7') && !(player.hasTag('pr7'))) {
            player.runCommand('give @s ward_armor_trim_smithing_template')
            player.runCommand('tag @s add pr7')
            player.sendMessage('Reward Redeemed!');
            player.playSound('random.orb')
            break;
         }
         else { 
            quest(player);
            break;
         }
      
      case 7:
         if (player.hasTag('p8') && !(player.hasTag('pr8'))) {
            player.runCommand('give @s cubic:super_mob_key')
            player.runCommand('tag @s add pr8')
            player.sendMessage('Reward Redeemed!');
            player.playSound('random.orb')
            break;
         }
         else { 
            quest(player);
            break;
         }

      case 8:
         if (player.hasTag('p9') && !(player.hasTag('pr9'))) {
            player.runCommand('scoreboard players set @s peffect3 1')
            player.runCommand('tag @s add pr9')
            player.sendMessage('Reward Redeemed!');
            player.playSound('random.orb')
            break;
         }
         else { 
            quest(player);
            break;
         }
      case 9:
         if (player.hasTag('p10') && !(player.hasTag('pr10'))) {
            player.runCommand('scoreboard players set @s peffect4 1')
            player.runCommand('tag @s add pr10')
            player.sendMessage('Reward Redeemed!');
            player.playSound('random.orb')
            break;
         }
         else { 
            quest(player);
            break;
         }

      case 10:
         quest(player);
         break;
      }
  })
}


//warps

function warp(player) {
    const warps = new ActionFormData();
    warps.title('Warps');
    warps.body('NOTICE: Server locations have been relocated to the quick menu. This menu holds all non-discoverable warps.');
    warps.button('Structures', 'textures/items/trial_key');
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
         struc(player); 
         break;
      case 1:
         rare(player);
         break;
      case 2:
         cold(player);
         break;  
      case 3: 
         temp(player);
         break;
      case 4:
         warm(player);
         break;
      case 5:
         cave(player);
         break;
      case 6:
         main(player);
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
         warp(player);
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
         warp(player);
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
         warp(player);
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
         warp(player);
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
         warp(player);
         break;
      }
  })
}









//FAQSSSS

function faqs(player) {
    const faq = new ActionFormData();
    faq.title('Wiki')
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
    faq.button('Levels', 'textures/items/experience_bottle')
    faq.button('Advancements', 'textures/items/diamond')
    faq.button('Land Claims', 'textures/items/compass_item')
    faq.button('Mob Keys', 'textures/items/very_rare_mob_key')
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
         claim(player);
         break;

      case 4:
         mobkeys(player);
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
         docs(player);
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
    faq.button('Version 7.0', 'textures/items/ui')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         changeone(player);
         break;
      
      case 1: 
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
    set.body('All Applicable Realm Settings.')
    set.button('General\n§0[Sidebar, Tips, PVP]', 'textures/items/cu15')
    set.button('Audio\n§0[Realm Sounds]', 'textures/items/cu15')
    set.button('Perm Effects\n§0[Indefinite Effects]', 'textures/items/cu14')
    set.button('Trails\n§0[Particle Trails]', 'textures/items/cu10')
    set.button('Ranks\n§0[Visibility of Ranks]', 'textures/items/cu11')
    set.button('Back')
    set.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         settingsGen(player);
         break;

      case 1:
         sound(player);
         break;

      case 2:
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

      case 3:
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

      case 4:
         player.runCommand('tag @s[tag=rank:warrior] add war');
         player.runCommand('tag @s[tag=rank:infectious] add inf');
         ranks(player);
         break;

      case 5:
         main(player);
         break;
      }
  })
}

function settingsGen(player) {
   const set = new ActionFormData();
   set.title('Settings')
   set.body('General settings for tags related to simple realm functionality.')
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
         settings(player);
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
            settings(player);
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
            settings(player);
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
            settings(player);
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
            settings(player);
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
            settings(player);
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
            settings(player);
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
            settings(player);
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
            settings(player);
            break;
         }

      case 8:
         settings(player);
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
            settings(player);
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
            settings(player);
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
            settings(player);
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
            settings(player);
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
            settings(player);
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
            settings(player);
            break;
         }

      case 6:
         settings(player);
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
            settings(player);
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
            settings(player);
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
            settings(player);
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
            settings(player);
            break;
         }

      case 4:
         settings(player);
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
         player.runCommand('tp @s 0 -50 0');
         break;
      case 1:
         reset(player);
         break;
      }
  })

}


