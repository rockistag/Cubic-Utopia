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
  main.body("Welcome to Cubic Utopia Season Seven!\n\nCubic Utopia is an SMP realm that is based around accessibility and vanilla gameplay with various enhancements. With Season Seven, we are adding advancements, playtime rewards, and discoverable warps, along with a refresh for land claims, homes, and teleport requests, among other things.\n\nUpon joining, you were prompted to download required packs and optional packs. The required packs are all the necessary packs that allow things like our menus and custom items to show up correctly. Our optional packs are the new Enhanced Cubic Experience, which offers lower fire effects, invisible item frames, and custom shaders (coming soon). If you want to play with the enhanced experience, you can rejoin and select the download optional packs option when prompted.\n\nWe recommend you start a tutorial walk to learn how to use some of the features on the realm. You can also look in the FAQs in the Cubic Menu, but the tutorial walk provides a better visual overview.");
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
    rules.title('Cubic Utopia 7 Rules')
    rules.body("The realm rules for Cubic Utopia 7 have been reorganized. This means that rules previously organized as numbers (i.e; rule 8) are now organized differently based on the punishment given, as that is the new organization scheme.\n\nSection A \nThe following rules will result in a warning or mute if broken, and single day temp-ban if broken at the expense or direction of an admin.\n\nA1 - No Spawn-Fighting.\nMore specifically, absolutely no pvp in any way, shape, or form is allowed at spawn or any protected area* that isn\u2019t explicitly a pvp arena.\nA2 - No Advertising.\nDo not advertise other realms, servers, or other things using chat or other forms of communication.\nA3 - No Spamming.\nThis one is pretty self-explanatory. If you trigger the anti-spam you should stop.\nA4 - No Spamming TP Requests.\nAlso pretty self-explanatory. If done towards admins, you may get an extended ban.\n\nSection B\nThe following rules will result in a definite temp-ban if broken.\n\nB1 - No PVP without the PVP tag.\nIn CU, we use a PVP tag to regulate PVP. This is essentially a rank that determines your PVP status and can be toggled. Players who do not have the PVP tag, which is present on their tag as well as in chat, do not consent to being fought with, and it is against the rules to do so. In addition, players who kill others without having the PVP tag themselves can also receive punishment.\nB2 - No Spam-Killing Players.\nIf two players are involved in more than 5 consecutive deaths, it will be assumed that you are farming for points or trapping someone for malicious purposes.\nB3 - No Combat Logging or Teleporting out of Combat.\nThis is a practice which already has preventative measures tied to it, but for the sake of PVP not being totally useless, this is, of course, a rule.\nB4 - Rule 8.\nDo not ask for free stuff, admin, operator, or any realm permissions, PERIOD. If you want to be an admin you must apply on our discord. You will get one warning and any further violations may result in a permanent ban.\nB5 - No giving new players OP items.\nThis also has preventative measures tied to it. OP things such as fully enchanted armor, god apples, totems, and much more is not allowed to be given to new players.\nB6 - Second-Hand Duping.\nSecond-Hand Duping is the act of intentionally accepting duped items or duped shulkers from others. This can also include taking unmistakably OP items from public containers. Due to the nature of this rule largely being up to the interpretation of our admins, punishments for this cannot exceed a tempban, however; if you are found to have been in collaboration with known dupers, a permban may result.\n\nSection C\nIf you are found to have broken the following rules, you will be permanently banned.\n\nC1 - No Harassment or Bullying.\nBe nice. Don't threaten people. Do we really need to specify?\nC2 - No Hate Speech.\nNo slurs or derogatory insults. Swearing is fine, to an extent. This is a PG-13 realm.\nC3 - No Stealing or Griefing.\nDo not alter anything or take anything that isn't yours. Griefing protected areas* will result in a permanent ban without appeal.\nC4 - No Hacking.\nNo using external programs to screw up things or cheat. Bans for this are not appealable.\nC5 - No Duping or Cheating.\nDo not use exploits to dupe or gain items, including the use of X-Ray or auto-clickers. You are the reason we cannot use bundles.\nC6 - No Building Inappropriate Structures or Art.\nYou know what we mean.\n\n*A protected area is an area in which players are intentionally unable to place or break blocks, such as spawn.\n\nWhile no big rules have been added, it should be noted that killing other players illegally now results in a points penalty, which can be hefty.")
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
    rules.title('Cubic Utopia 7')
    rules.body('To start your journey in Season 7, press the start button!\n\n§cBy starting using the button below, you agree that you have read the CU rules and will accept the punishments listed for any rules you breach.')
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
         player.runCommand('tp @s 0 -50 0')
         player.runCommand('clear @s')
         player.runCommand('give @s cubic:ui 1 0 {"item_lock":{"mode":"lock_in_inventory"}}')
         player.playSound('random.levelup')
         break;
      
      }
  })
}

function main(player) {
  const main = new ActionFormData();
  main.title('Cubic Utopia 7');
  main.body('§eWelcome to Cubic Utopia 7! Head to the Wiki section to find more information about our realms unique functions!');
  main.button('Quick Teleport', 'textures/items/quick');
  main.button('Player Utilities', 'textures/items/utilities');
  main.button('Featured Warps', 'textures/items/warps');
  main.button('Achievements', 'textures/items/achievements');
  main.button('Settings', 'textures/items/settings');
  main.button('Forms', 'textures/items/forms');
  main.button('Wiki', 'textures/items/wiki');
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
  spawn.button('Warp directly to spawn', 'textures/items/spawn');
  spawn.button('Get Insta-Pearls for spawn', 'textures/items/pearl');
  spawn.button('Randomly Teleport', 'textures/items/rtp')
  if (player.hasTag('warp1')) spawn.button('Realm Market', 'textures/items/warp1')
  else spawn.button('Undiscovered Warp', 'textures/items/warp_undiscovered')
  if (player.hasTag('warp2')) spawn.button('Combat Central', 'textures/items/warp2')
  else spawn.button('Undiscovered Warp', 'textures/items/warp_undiscovered')
  if (player.hasTag('warp3')) spawn.button('Public Warps', 'textures/items/warp3')
  else spawn.button('Undiscovered Warp', 'textures/items/warp_undiscovered')
  if (player.hasTag('warp4')) spawn.button('Depths Central', 'textures/items/warp4')
  else spawn.button('Undiscovered Warp', 'textures/items/warp_undiscovered')
  if (player.hasTag('warp5')) spawn.button('Enderman XP Farm', 'textures/items/warp5')
  else spawn.button('Undiscovered Warp', 'textures/items/warp_undiscovered')
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
  quests.body('Your hub for progression!');
  quests.button('Advancements \n§0[Complete goals for Score]', 'textures/items/cuadvance');
  quests.button('Progression Info \n§7[Coming Soon]', 'textures/items/prog');
  quests.button('Playtime Rewards \n§0[Playtime shtuff]', 'textures/items/playtime');
  quests.button('Back');
  quests.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         player.runCommand('tag @s add advancementmenu');
         break;

      case 1:
         quest(player);
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
    if (player.hasTag('p1') && player.hasTag('pr1')) que.button('§0Reward Redeemed', 'textures/items/enabled')
    else if (player.hasTag('p1')) que.button('§21 Hour: Golden Apple', 'textures/items/disabled')
    else que.button('§0You have not reached 1 Hour', 'textures/items/greyed')
    if (player.hasTag('p2') && player.hasTag('pr2')) que.button('§0Reward Redeemed', 'textures/items/enabled')
    else if (player.hasTag('p2')) que.button('§25 Hours: Mob Key', 'textures/items/disabled')
    else que.button('§0You have not reached 5 Hours', 'textures/items/greyed')
    if (player.hasTag('p3') && player.hasTag('pr3')) que.button('§0Reward Redeemed', 'textures/items/enabled')
    else if (player.hasTag('p3')) que.button('§210 Hours: Spire Trim', 'textures/items/disabled')
    else que.button('§0You have not reached 10 Hours', 'textures/items/greyed')
    if (player.hasTag('p4') && player.hasTag('pr4')) que.button('§0Reward Redeemed', 'textures/items/enabled')
    else if (player.hasTag('p4')) que.button('§215 Hours: Rare Mob Key', 'textures/items/disabled')
    else que.button('§0You have not reached 15 Hours', 'textures/items/greyed')
    if (player.hasTag('p5') && player.hasTag('pr5')) que.button('§0Reward Redeemed', 'textures/items/enabled')
    else if (player.hasTag('p5')) que.button('§220 Hours: Snout Trim', 'textures/items/disabled')
    else que.button('§0You have not reached 20 Hours', 'textures/items/greyed')
    if (player.hasTag('p6') && player.hasTag('pr6')) que.button('§0Reward Redeemed', 'textures/items/enabled')
    else if (player.hasTag('p6')) que.button('§230 Hours: Very Rare Mob Key', 'textures/items/disabled')
    else que.button('§0You have not reached 30 Hours', 'textures/items/greyed')
    if (player.hasTag('p7') && player.hasTag('pr7')) que.button('§0Reward Redeemed', 'textures/items/enabled')
    else if (player.hasTag('p7')) que.button('§240 Hours: Ward Trim', 'textures/items/disabled')
    else que.button('§0You have not reached 40 Hours', 'textures/items/greyed')
    if (player.hasTag('p8') && player.hasTag('pr8')) que.button('§0Reward Redeemed', 'textures/items/enabled')
    else if (player.hasTag('p8')) que.button('§250 Hours: Super Mob Key', 'textures/items/disabled')
    else que.button('§0You have not reached 50 Hours', 'textures/items/greyed')
    if (player.hasTag('p9') && player.hasTag('pr9')) que.button('§0Reward Redeemed', 'textures/items/enabled')
    else if (player.hasTag('p9')) que.button('§275 Hours: Jump Boost Perm Effect', 'textures/items/disabled')
    else que.button('§0You have not reached 75 Hours', 'textures/items/greyed')
    if (player.hasTag('p10') && player.hasTag('pr10')) que.button('§0Reward Redeemed', 'textures/items/enabled')
    else if (player.hasTag('p10')) que.button('§2100 Hours: Night Vision Perm Effect', 'textures/items/disabled')
    else que.button('§0You have not reached 100 Hours', 'textures/items/greyed')
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
    warps.button('Structures', 'textures/items/structure');
    warps.button('Rare Biomes', 'textures/items/biome1')
    warps.button('Cold Biomes', 'textures/items/biome2')
    warps.button('Common Forests', 'textures/items/biome3')
    warps.button('Warm Biomes', 'textures/items/biome4')
    warps.button('Cave Biomes \n§a[New Biome!]', 'textures/items/biome5')
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
         player.runCommand('execute in overworld run tp @s 780.50 -17.00 -418.50')
         player.sendMessage('Teleported to chamber.')
         player.playSound('random.levelup')
         break;
      case 1:
         player.runCommand('execute in overworld run tp @s -1456.50 10.00 -305.50')
         player.sendMessage('Teleported to stronghold.')
         player.playSound('random.levelup')
         break;  
      case 2: 
         player.runCommand('execute in overworld run tp @s 2050.50 -49.00 2016.50')
         player.sendMessage('Teleported to ancient city.')
         player.playSound('random.levelup')
         break;
      case 3:
         player.runCommand('execute in overworld run tp @s 3688.50 65.00 1708.50')
         player.sendMessage('Teleported to monument.')
         player.playSound('random.levelup')
         break;
      case 4:
         player.runCommand('execute in overworld run tp @s 1238.50 -15.00 758.50')
         player.sendMessage('Teleported to mineshaft.')
         player.playSound('random.levelup')
         break;
      case 5:
         player.runCommand('execute in nether run tp @s -705.50 67.00 165.50')
         player.sendMessage('Teleported to fortress.')
         player.playSound('random.levelup')
         break;
      case 6:
         player.runCommand('execute in nether run tp @s -163.50 85.00 -118.50')
         player.sendMessage('Teleported to bastion.')
         player.playSound('random.levelup')
         break;
      case 7:
         player.runCommand('execute in overworld run tp @s 1654.50 74.00 -782.50')
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
         player.runCommand('execute in overworld run tp @s -25.50 73.00 2454.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 1:
         player.runCommand('execute in overworld run tp @s 2636.50 133.00 2404.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;  
      case 2: 
         player.runCommand('execute in overworld run tp @s -1933.50 121.00 2253.50')
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
         player.runCommand('execute in overworld run tp @s 2177.50 167.00 1797.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 1:
         player.runCommand('execute in overworld run tp @s -1606.50 182.00 -5059.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;  
      case 2: 
         player.runCommand('execute in overworld run tp @s 5914.50 180.00 -3924.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 3: 
         player.runCommand('execute in overworld run tp @s 4840.50 66.00 809.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 4: 
         player.runCommand('execute in overworld run tp @s -2040.50 67.00 -5838.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 5: 
         player.runCommand('execute in overworld run tp @s 4994.50 82.00 2165.50')
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
         player.runCommand('execute in overworld run tp @s -1524.50 109.00 -2143.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 1:
         player.runCommand('execute in overworld run tp @s 2670.50 107.00 3273.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;  
      case 2: 
         player.runCommand('execute in overworld run tp @s 2892.50 73.00 1581.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 3:
         player.runCommand('execute in overworld run tp @s 3350.50 97.00 5846.50')
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
         player.runCommand('execute in overworld run tp @s 813.50 87.00 6962.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 1:
         player.runCommand('execute in overworld run tp @s -431.50 67.00 6040.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;  
      case 2: 
         player.runCommand('execute in overworld run tp @s -331.50 73.00 -987.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 3:
         player.runCommand('execute in overworld run tp @s -689.50 66.00 -2767.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to biome.')
         player.playSound('random.levelup')
         break;
      case 4:
         player.runCommand('execute in overworld run tp @s 4370.50 71.00 -5259.50')
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
    warps.button('Sulfur Cave', 'textures/blocks/sulfur')
    warps.button('Back')
    warps.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         player.runCommand('execute in overworld run tp @s 2287.50 -22.00 -4957.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to cave.')
         player.playSound('random.levelup')
         break;
      case 1:
         player.runCommand('execute in overworld run tp @s 1618.50 8.00 -1533.50')
         player.runCommand('effect @s slow_falling 30 1 true')
         player.sendMessage('Teleported to cave.')
         player.playSound('random.levelup')
         break;  
      case 2:
         player.runCommand('execute in overworld run tp @s 5063.50 -27.00 1509.50')
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
    faq.button('Rules\n§c[REDONE FOR S7]', 'textures/items/rules')
    faq.button('Docs\n§0[Tutorials & Info]', 'textures/items/docs')
    faq.button('Changelogs\n§2[Pre-6.0 is out!]', 'textures/items/change')
    faq.button('Credits\n§0[Contributors to CU7]', 'textures/items/credits')
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
    faq.button('Levels & Score', 'textures/items/experience_bottle')
    faq.button('Advancements', 'textures/items/ender_eye')
    faq.button('Land Claims', 'textures/items/compass_item')
    faq.button('Mob Keys', 'textures/items/very_rare_mob_key')
    faq.button('Playtime Rewards', 'textures/items/diamond')
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
         playtimerew(player);
         break;

      case 6:
         tpfaq(player);
         break;

      case 7:
         faqs(player);
         break;
      }
  })
}

function rules(player) {
    const rules = new ActionFormData();
    rules.title('Rules')
    rules.body("The realm rules for Cubic Utopia 7 have been reorganized. This means that rules previously organized as numbers (i.e; rule 8) are now organized differently based on the punishment given, as that is the new organization scheme.\n\nSection A \nThe following rules will result in a warning or mute if broken, and single day temp-ban if broken at the expense or direction of an admin.\n\nA1 - No Spawn-Fighting.\nMore specifically, absolutely no pvp in any way, shape, or form is allowed at spawn or any protected area* that isn\u2019t explicitly a pvp arena.\nA2 - No Advertising.\nDo not advertise other realms, servers, or other things using chat or other forms of communication.\nA3 - No Spamming.\nThis one is pretty self-explanatory. If you trigger the anti-spam you should stop.\nA4 - No Spamming TP Requests.\nAlso pretty self-explanatory. If done towards admins, you may get an extended ban.\n\nSection B\nThe following rules will result in a definite temp-ban if broken.\n\nB1 - No PVP without the PVP tag.\nIn CU, we use a PVP tag to regulate PVP. This is essentially a rank that determines your PVP status and can be toggled. Players who do not have the PVP tag, which is present on their tag as well as in chat, do not consent to being fought with, and it is against the rules to do so. In addition, players who kill others without having the PVP tag themselves can also receive punishment.\nB2 - No Spam-Killing Players.\nIf two players are involved in more than 5 consecutive deaths, it will be assumed that you are farming for points or trapping someone for malicious purposes.\nB3 - No Combat Logging or Teleporting out of Combat.\nThis is a practice which already has preventative measures tied to it, but for the sake of PVP not being totally useless, this is, of course, a rule.\nB4 - Rule 8.\nDo not ask for free stuff, admin, operator, or any realm permissions, PERIOD. If you want to be an admin you must apply on our discord. You will get one warning and any further violations may result in a permanent ban.\nB5 - No giving new players OP items.\nThis also has preventative measures tied to it. OP things such as fully enchanted armor, god apples, totems, and much more is not allowed to be given to new players.\nB6 - Second-Hand Duping.\nSecond-Hand Duping is the act of intentionally accepting duped items or duped shulkers from others. This can also include taking unmistakably OP items from public containers. Due to the nature of this rule largely being up to the interpretation of our admins, punishments for this cannot exceed a tempban, however; if you are found to have been in collaboration with known dupers, a permban may result.\n\nSection C\nIf you are found to have broken the following rules, you will be permanently banned.\n\nC1 - No Harassment or Bullying.\nBe nice. Don't threaten people. Do we really need to specify?\nC2 - No Hate Speech.\nNo slurs or derogatory insults. Swearing is fine, to an extent. This is a PG-13 realm.\nC3 - No Stealing or Griefing.\nDo not alter anything or take anything that isn't yours. Griefing protected areas* will result in a permanent ban without appeal.\nC4 - No Hacking.\nNo using external programs to screw up things or cheat. Bans for this are not appealable.\nC5 - No Duping or Cheating.\nDo not use exploits to dupe or gain items, including the use of X-Ray or auto-clickers. You are the reason we cannot use bundles.\nC6 - No Building Inappropriate Structures or Art.\nYou know what we mean.\n\n*A protected area is an area in which players are intentionally unable to place or break blocks, such as spawn.")
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
    faq.body("Points are a currency system for Cubic Utopia. You can spend points for items at chest shops and for ranks, kits, and more items from the market. There are a few main ways to earn points:\n\nPLAYTIME\nYou earn 5 points per minute by simply being on the realm. You can also receive playtime rewards by meeting certain playtime requirements. More information can be found in the achievements tab of the Cubic Menu.\n\nADVANCEMENTS\nYou can earn anywhere from 100 to 10000 points for completing advancements. More information on advancements can be found in the advancements section of the docs.\n\nSELLING\nYou can earn points by selling minerals, jewels, keys, or woods at the market. You can also sell items to other players using the trading posts in the trading / warps hub.\n\nCOMBAT\nYou can earn points by fighting mobs or players. The points earned by fighting players correlate with their levels, and more info on that can be found in the levels section of the docs. You can find the points rewards for mobs using the button below!")
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
    faq.body("The following is a directory for the amount of points you can gain from killing specific mobs.\n\nLvl 1 Mobs: Passive Animals\nRewards: 5 Points, 1 Score per kill\nIncludes;\n- Pigs\n- Cows\n- Chickens\n- Sheep\n- Goats\n- Cod\n- Salmon\n- Tropical Fish\n\nLvl 2 Mobs: Neutral & Weak Aggressive Mobs\nRewards: 10 Points, 2 Score per kill\nIncludes;\n- Zombies\n- Drowned\n- Skeletons\n- Spiders\n- Slimes\n- Endermites\n- Silverfish\n- Pufferfish\n\nLvl 3 Mobs: Medium Aggressive Mobs\nRewards: 25 Points, 5 Score per Kill\nIncludes;\n- Creepers\n- Husks\n- Strays\n- Bogged\n- Parched\n- Pillagers\n- Cave Spiders\n- Magma Cubes\n\nLvl 4 Mobs: Hard Aggressive Mobs\nRewards: 50 Points, 10 Score per Kill\nIncludes;\n- Witch\n- Breeze\n- Blaze\n- Iron Golem\n- Piglin\n- Hoglin\n- Shulker\n- Phantoms\n\nLvl 5 Mobs: Very Aggressive Mobs\nRewards: 100 Points, 20 Score per Kill\nIncludes;\n- Guardian\n- Vex\n- Piglin Brute\n- Ghast\n- Evoker\n- Vindicator\n- Ravager\n- Zombie Nautilus\n\nBosses\n- Warden: 1000 Points, 50 Score\n- Elder Guardian: 1000 Points, 50 Score\n- Ender Dragon: 5000 Points, 100 Score\n- Wither: 5000 Points, 100 Score")
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
    faq.title('Levels & Score')
    faq.body("A new levels system has been introduced for Season Seven, reintroducing score from CU3 to determine your progress! You can get score from killing mobs (see the points tab in the docs), killing players with the PVP tag, and completing advancements (see the advancements tab in the docs).\n\nThere are a total of eight levels;\n\n- Level 1: Beginner\n10 Score Required\nReward: Bucket\n- Level 2: Apprentice\n500 Score Required\nReward: Ender Chest\n- Level 3: Artisan\n2000 Score Required\nReward: Dune Armor Trim\n- Level 4: Pro\n5000 Score Required\nReward: Netherite Upgrade\n- Level 5: Expert\n10000 Score Required\nReward: Water Breathing Effect\n- Level 6: Utopian\n25000 Score Required\nReward: Haste Perm Effect + Utopian Kit Access\n- Level 7: Super Utopian\n100000 Score Required\nReward: Fire Resistance Perm Effect\n- Level 8: Ultra Utopian\n250000 Score Required\nReward: Speed Perm Effect\n\nEach level has its own section in the Levels hall of the market, in which exclusive sales and rewards can be redeemed!\n\nCombat rewards and penalties are also scaled based on player levels, with a cap at level 6.")
    faq.button('Combat Level Scale')
    faq.button('Back')
    faq.show(player).then(({ selection, canceled }) => {
      if (canceled) return;
      switch(selection) {
      case 0:
         leveltwo(player);
         break;
      case 1:
         docs(player);
         break;
      }
  })
}

function leveltwo(player) {
    const faq = new ActionFormData();
    faq.title('Levels & Score')
    faq.body("The following is a list of level-scaled combat rewards and penalties.\n\nCombat Rewards, Given to the killing player based on the dying player\u2019s level;\nLvl 0: 0 Score - 100 Pts\nLvl 1: 1 Score + 100 Pts\nLvl 2: 5 Score + 300 Pts\nLvl 3: 10 Score + 600 Pts\nLvl 4: 20 Score + 1000 Pts\nLvl 5: 35 Score + 1500 Pts \nLvl 6 and Up: 50 Score + 2000 Pts\n\nDeath Penalties, Given to a dying player based on their level;\nLvl 1: -100 Points\nLvl 2: -200 Points\nLvl 3: -400 Points\nLvl 4: -600 Points\nLvl 5: -1000 Points\nLvl 6 and Up: -1500 Points")
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
    faq.title('Advancements')
    faq.body("New for Season Seven, Advancements are a system carried over from Java Edition using the Alylica's Advancements addon. Advancements check for progression and challenge requirements and give rewards once they're met, requiring no menu input, unlike quests. There are several tiers of advancements, including the advancement, challenge, and goal tiers, which scale their rewards. \n\n- Advancements Reward a range of values in score from 10 to 100 based on their difficulty.\n- Goals & Challenges reward 250 or 500 score based on their difficulty.\n- The How Did We Get Here Advancement exclusively rewards a whopping 1000 score.\n\nAll advancements also reward points, with the specific amounts being correlated to their score; for any score reward in an advancement, you will receive five times as much in points.")
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
    faq.body("New for Season Seven, Advancements are a system carried over from Java Edition using the Alylica's Advancements addon. Advancements check for progression and challenge requirements and give rewards once they're met, requiring no menu input, unlike quests. There are several tiers of advancements, including the advancement, challenge, and goal tiers, which scale their rewards. \n\n- Advancements Reward a range of values in score from 10 to 100 based on their difficulty.\n- Goals & Challenges reward 250 or 500 score based on their difficulty.\n- The How Did We Get Here Advancement exclusively rewards a whopping 1000 score.\n\nAll advancements also reward points, with the specific amounts being correlated to their score; for any score reward in an advancement, you will receive five times as much in points.")
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

function playtimerew(player) {
    const faq = new ActionFormData();
    faq.title('Playtime Rewards Docs')
    faq.body("Playtime Rewards are redeemable rewards that can be unlocked by reaching playtime goals. Rewards are redeemed in the achievements hub of the Cubic Menu.\n\nRewards for hours reached;\n1 Hour: Gapple\n5 Hours: Uncommon Mob Key\n10 Hours: Spire Trim\n15 Hours: Rare Mob Key\n20 Hours: Snout Trim\n30 Hours: Very Rare Mob Key\n40 Hours: Ward Trim\n50 Hours: Super Mob Key\n75 Hours: Jump Boost Perm Effect\n100 Hours: Night Vision Perm Effect")
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
    faq.body("Land Claims are used to protect your base from griefers and bad actors.\n\nA new addon is being used for land claims in CU7! This addon uses its own menu, which is accessed with the claim shovel (obtained via spawn barrel). This menu can be used for pretty much anything land claim related, including permissions, resizing and claiming land, and even customization!\n\nAt the start, you receive 200 claim blocks. Claim blocks are needed to claim an area of land, and is independently handled by the addon; you will receive 60 additional claim blocks for every hour of playtime, which, due to the nature of the addon, may be handled out of sync of CU playtime.")
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
    faq.body('Our addons and packs have an assortment of custom commands! Commands from the Paradox Utilities can also be found by typing the §6!help§r command in chat when you forget.\n\n§dWith Season Seven, custom commands have the prefix §6!§r instead of §6/§r or §6.§r\n\nTELEPORT REQUESTS\nTeleport requests are a simple way to get to your friends quickly.\n\nUse §6!tpr <playername>§r to make a teleport request to someone without going through the menu.\nUse §6!tpr deny§r to deny incoming teleport requests.\nUse §6!tpr accept§r to accept a teleport request.\nUse §6!tpr help§r to configure personal teleport request settings.\n\nHOMES\nHomes are custom teleport locations that only you can access.\n\nUse §6!home§r to access the homes menu from chat.\nUse §6!home teleport <homename>§r to teleport directly to a home you have set.\nUse §6!home set <homename>§r to set a home at your current location.\nUse §6!home delete <homename>§r to delete a home you have set.\nUse §6!home rename <homename>§r to delete a home you have set.\nUse §6!home list§r to list your homes in chat.\n\nOTHER\nThese commands are useful for certain functions and information but do not fit in a specific category.\n\nUse §6!gui§r to bring up the Paradox Utilities Menu.\nUse §6!info§r to bring up the Paradox Project Info.')
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
    set.button('General\n§0[Sidebar, Tips, PVP]', 'textures/items/general')
    set.button('Audio\n§0[Realm Sounds]', 'textures/items/audio')
    set.button('Perm Effects\n§0[Indefinite Effects]', 'textures/items/effects')
    set.button('Trails\n§0[Particle Trails]', 'textures/items/trails')
    set.button('Ranks\n§0[Visibility of Ranks]', 'textures/items/ranks')
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
   if (player.hasTag('pvp')) set.button('§4Disable PVP', 'textures/items/enabled')
   else set.button('§2Enable PVP', 'textures/items/disabled')
   if (player.hasTag('ignorescoreboard')) set.button('§2Enable Sidebar', 'textures/items/disabled')
   else set.button('§4Disable Sidebar', 'textures/items/enabled')
   if (player.hasTag('tips')) set.button('§4Disable Tips', 'textures/items/enabled')
   else set.button('§2Enable Tips', 'textures/items/disabled')
   if (player.hasTag('broadcast')) set.button('§4Disable Broadcast Messages', 'textures/items/enabled')
   else set.button('§2Enable Broadcast Messages', 'textures/items/disabled')
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
        if (player.hasTag('broadcast')) {
           player.runCommand('tag @s remove broadcast')
           player.sendMessage('Disabled broadcast messages.')
           player.playSound('random.orb')
           break;
        }
        else {
           player.runCommand('tag @s add broadcast')
           player.sendMessage('Enabled broadcast messages.')
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
    set.button('§2All Sounds On', 'textures/items/audio1')
    set.button('§eLimited Sounds', 'textures/items/audio2')
    set.button('§4All Sounds Off', 'textures/items/audio3')
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
    if (player.hasTag('trail1') && player.hasTag('tr1')) set.button('§4Disable Simple Trail', 'textures/items/enabled')
    else if (player.hasTag('trail1')) set.button('§2Enable Simple Trail', 'textures/items/disabled')
    else set.button('§0You do not have this trail', 'textures/items/greyed')
    if (player.hasTag('trail2') && player.hasTag('tr2')) set.button('§4Disable Water Trail', 'textures/items/enabled')
    else if (player.hasTag('trail2')) set.button('§2Enable Water Trail', 'textures/items/disabled')
    else set.button('§0You do not have this trail', 'textures/items/greyed')
    if (player.hasTag('trail3') && player.hasTag('tr3')) set.button('§4Disable Catalyst Trail', 'textures/items/enabled')
    else if (player.hasTag('trail3')) set.button('§2Enable Catalyst Trail', 'textures/items/disabled')
    else set.button('§0You do not have this trail', 'textures/items/greyed')
    if (player.hasTag('trail4') && player.hasTag('tr4')) set.button('§4Disable Shrieker Trail', 'textures/items/enabled')
    else if (player.hasTag('trail4')) set.button('§2Enable Shrieker Trail', 'textures/items/disabled')
    else set.button('§0You do not have this trail', 'textures/items/greyed')
    if (player.hasTag('trail5') && player.hasTag('tr5')) set.button('§4Disable Crafter Trail', 'textures/items/enabled')
    else if (player.hasTag('trail5')) set.button('§2Enable Crafter Trail', 'textures/items/disabled')
    else set.button('§0You do not have this trail', 'textures/items/greyed')
    if (player.hasTag('trail6') && player.hasTag('tr6')) set.button('§4Disable Pro Trail', 'textures/items/enabled')
    else if (player.hasTag('trail6')) set.button('§2Enable Pro Trail', 'textures/items/disabled')
    else set.button('§0You do not have this trail', 'textures/items/greyed')
    if (player.hasTag('trail7') && player.hasTag('tr7')) set.button('§4Disable Beast Trail', 'textures/items/enabled')
    else if (player.hasTag('trail7')) set.button('§2Enable Beast Trail', 'textures/items/disabled')
    else set.button('§0You do not have this trail', 'textures/items/greyed')
    if (player.hasTag('trail8') && player.hasTag('tr8')) set.button('§4Disable Ultra Trail', 'textures/items/enabled')
    else if (player.hasTag('trail8')) set.button('§2Enable Ultra Trail', 'textures/items/disabled')
    else set.button('§0You do not have this trail', 'textures/items/greyed')
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
    if (player.hasTag('peffect1') && player.hasTag('ef1')) set.button('§4Disable Speed', 'textures/items/enabled')
    else if (player.hasTag('peffect1')) set.button('§2Enable Speed', 'textures/items/disabled')
    if (player.hasTag('peffect2') && player.hasTag('ef2')) set.button('§4Disable Haste', 'textures/items/enabled')
    else if (player.hasTag('peffect2')) set.button('§2Enable Haste', 'textures/items/disabled')
    if (player.hasTag('peffect3') && player.hasTag('ef3')) set.button('§4Disable Jump Boost', 'textures/items/enabled')
    else if (player.hasTag('peffect3')) set.button('§2Enable Jump Boost', 'textures/items/disabled')
    if (player.hasTag('peffect4') && player.hasTag('ef4')) set.button('§4Disable Night Vision', 'textures/items/enabled')
    else if (player.hasTag('peffect4')) set.button('§2Enable Night Vision', 'textures/items/disabled')
    if (player.hasTag('peffect5') && player.hasTag('ef5')) set.button('§4Disable Water Breathing', 'textures/items/enabled')
    else if (player.hasTag('peffect5')) set.button('§2Enable Water Breathing', 'textures/items/disabled')
    if (player.hasTag('peffect6') && player.hasTag('ef6')) set.button('§4Disable Fire Resistance', 'textures/items/enabled')
    else if (player.hasTag('peffect6')) set.button('§2Enable Fire Resistance', 'textures/items/disabled')
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
    if (player.hasTag('rank:warrior') && player.hasTag('war')) set.button('§4Disable Warrior Rank', 'textures/items/enabled')
    else if (player.hasTag('war')) set.button('§2Enable Warrior Rank', 'textures/items/disabled')
    else set.button('§0You do not have this rank', 'textures/items/greyed')
    if (player.hasTag('rank:infectious') && player.hasTag('inf')) set.button('§4Disable Infectious Rank', 'textures/items/enabled')
    else if (player.hasTag('inf')) set.button('§2Enable Infectious Rank', 'textures/items/disabled')
    else set.button('§0You do not have this rank', 'textures/items/greyed')
    if (player.hasTag('rank:catalyst') && player.hasTag('rank1done')) set.button('§4Disable Catalyst Rank\n§0[Visbility Only]', 'textures/items/enabled')
    else if (player.hasTag('rank1done')) set.button('§2Enable Catalyst Rank', 'textures/items/disabled')
    else set.button('§0You do not have this rank', 'textures/items/greyed')
    if (player.hasTag('rank:shrieker') && player.hasTag('rank2done')) set.button('§4Disable Shrieker Rank\n§0[Visbility Only]', 'textures/items/enabled')
    else if (player.hasTag('rank2done')) set.button('§2Enable Shrieker Rank', 'textures/items/disabled')
    else set.button('§0You do not have this rank', 'textures/items/greyed')
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
    sec.button('Confirm', 'textures/items/disabled')
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


