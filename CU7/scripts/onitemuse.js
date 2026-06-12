import { world, ItemStack, system, Player } from "@minecraft/server";
import { ActionFormData, ModalFormData, FormCancelationReason, MessageFormData } from "@minecraft/server-ui";

world.beforeEvents.itemUse.subscribe((e) => {
    let player = e.source;
    let pos = e.source.location;
    if (e.itemStack.typeId == 'cubic:admin_ui') 
      if (e.source.hasTag('admin'))
        system.run(() =>  { admin(e.source) })
    else if (e.itemStack.typeId == 'cubic:insta_pearl') 
      system.run(() =>  { pearl(e.source) })
    else if (e.itemStack.typeId == 'cubic:infectious_pearl') 
      system.run(() =>  { pearl2(e.source) })
    else if ((e.itemStack.typeId == 'cubic:ui') || (e.itemStack.typeId == 'cubic:insta_pearl') || (e.itemStack.typeId == 'cubic:infectious_pearl')) // Excluded from spawn prot
      e.cancel = false;  
    else if ((pos.x < 500 && pos.x > -500) && (pos.z < 500 && pos.z > -500) && pos.y < 0) {
        if (!player.hasTag('admin')) {
            e.cancel = true;
            player.sendMessage("You cannot use non-menu items at spawn!");
        }
    }
    else if (e.itemStack.typeId == 'cubic:shrieker_mob_key') 
      system.run(() =>  { shrieker(e.source) })
    else if (e.itemStack.typeId == 'cubic:uncommon_mob_key') 
      system.run(() =>  { uncommon(e.source) })
    else if (e.itemStack.typeId == 'cubic:rare_mob_key') 
      system.run(() =>  { rare(e.source) })
    else if (e.itemStack.typeId == 'cubic:very_rare_mob_key') 
      system.run(() =>  { very_rare(e.source) })
    else if (e.itemStack.typeId == 'cubic:super_mob_key') 
      system.run(() =>  { sper(e.source) })
    else if (e.itemStack.typeId == 'minecraft:golden_shovel') 
      system.run(() =>  { landd(e.source) })
});

world.beforeEvents.playerBreakBlock.subscribe((e) => {
    let player = e.player;
    let pos = e.block.location;
    if ((pos.x < 500 && pos.x > -500) && (pos.z < 500 && pos.z > -500) && pos.y < 0) {
        if (!player.hasTag('admin')) { 
            e.cancel = true;
            player.sendMessage("You cannot break blocks at spawn!");
        }
    }
});

world.beforeEvents.playerPlaceBlock.subscribe((e) => {
    let player = e.player;
    let pos = e.block.location;
    if ((pos.x < 500 && pos.x > -500) && (pos.z < 500 && pos.z > -500) && pos.y < 0) {
        if (!player.hasTag('admin')) {
            e.cancel = true;
            player.sendMessage("You cannot place blocks at spawn!");
        }
    }
});

function admin(player) {
  const main = new ActionFormData();
  main.title('Admin Menu');
  main.body("Please check reports frequently and record your actions in the discord.");
  main.button('Admin Utils');
  main.button('Reports');
  main.button('Teleport to admin hub');
  main.show(player).then(({ selection, canceled }) => {
      if (canceled) firstpvp(player);
      switch(selection) {
      case 0:
         player.runCommand('tag @s add utilitymenu');
         break;
      case 1:
         player.runCommand('tag @s add reportmenu');
         break;
      case 2:
         player.runCommand('tp @s[tag=admin] 300 -10 0');
         break;
      }
  })
};

function pearl(player) {
  player.runCommand('execute if block ~ -63 ~ air run tag @s add Restrict')
  player.runCommand('execute if block ~ -63 ~ bedrock run tp @p 0 -50 0')
  player.playSound('portal.travel')
  player.runCommand('execute if block ~ 0 ~ bedrock in overworld run tp @p 0 -50 0')
  player.runCommand('execute in the_end if block ~ 0 ~ air in overworld run tp @p 0 -50 0')
  player.runCommand('execute in the_end if block ~ 0 ~ deny in overworld run tp @p 0 -50 0')
  player.runCommand('execute in nether if block ~ 0 ~ deny in overworld run tp @s 0 -50 0')
  player.runCommand('clear @s[tag=!Restrict] cubic:insta_pearl 0 1')
  player.runCommand('title @s[tag=Restrict] title You cannot use that here!')
  player.runCommand('tag @s remove Restrict')
};

function pearl2(player) {
  player.runCommand('execute if block ~ -63 ~ air run tag @s add Restrict')
  player.runCommand('execute if block ~ -63 ~ bedrock run tp @p 321.50 -25.00 580.50')
  player.playSound('portal.travel')
  player.runCommand('execute if block ~ 0 ~ bedrock in overworld run tp @p 321.50 -25.00 580.50')
  player.runCommand('execute in the_end if block ~ 0 ~ air in overworld run tp @p 321.50 -25.00 580.50')
  player.runCommand('execute in the_end if block ~ 0 ~ deny in overworld run tp @p 321.50 -25.00 580.50')
  player.runCommand('execute in nether if block ~ 0 ~ deny in overworld run tp @s 321.50 -25.00 580.50')
  player.runCommand('clear @s[tag=!Restrict] cubic:infectious_pearl 0 1')
  player.runCommand('title @s[tag=Restrict] title You cannot use that here!')
  player.runCommand('tag @s remove Restrict')
};

function shrieker(player) {
// will be 40% nau, 30% cam, 30% sul cube
  player.runCommand('execute if block ~ -64 ~ deny run tag @s add Restrict')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=1}] run summon nautilus')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=2}] run summon nautilus')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=3}] run summon nautilus')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=4}] run summon nautilus')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=5}] run summon nautilus')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=6}] run summon camel_husk')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=7}] run summon camel_husk')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=8}] run summon camel_husk')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=9}] run summon camel_husk')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=10}] run summon camel_husk')
  player.runCommand('clear @s[tag=!Restrict] cubic:shrieker_mob_key 0 1')
  player.playSound('block.creaking_heart.step')
  player.runCommand('title @s[tag=Restrict] title You cannot use that here!')
  player.runCommand('tag @s remove Restrict')
};

function uncommon(player) {
  player.runCommand('execute if block ~ -64 ~ deny run tag @s add Restrict')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=1}] run summon frog ~ ~ ~ 0 0 spawn_cold')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=2}] run summon frog ~ ~ ~ 0 0 spawn_cold')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=3}] run summon frog ~ ~ ~ 0 0 spawn_cold')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=4}] run summon armadillo')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=5}] run summon armadillo')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=6}] run summon armadillo')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=7}] run summon bee')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=8}] run summon bee')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=9}] run summon camel')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=10}] run summon camel')
  player.runCommand('clear @s[tag=!Restrict] cubic:uncommon_mob_key 0 1')
  player.playSound('block.creaking_heart.step')
  player.runCommand('title @s[tag=Restrict] title You cannot use that here!')
  player.runCommand('tag @s remove Restrict')
};

function rare(player) {
  player.runCommand('execute if block ~ -64 ~ deny run tag @s add Restrict')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=1}] run summon mooshroom ~ ~ ~ 0 0 minecraft:become_brown')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=2}] run summon mooshroom ~ ~ ~ 0 0 minecraft:become_brown')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=3}] run summon panda ~ ~ ~ 0 0 minecraft:panda_brown')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=4}] run summon panda ~ ~ ~ 0 0 minecraft:panda_brown')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=5}] run summon panda ~ ~ ~ 0 0 minecraft:panda_brown')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=6}] run summon wolf ~ ~ ~ 0 0 minecraft:spawn_wild_snowy')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=7}] run summon wolf ~ ~ ~ 0 0 minecraft:spawn_wild_snowy')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=8}] run summon wolf ~ ~ ~ 0 0 minecraft:spawn_wild_snowy')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=9}] run summon wolf ~ ~ ~ 0 0 minecraft:spawn_wild_snowy')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=10}] run summon wolf ~ ~ ~ 0 0 minecraft:spawn_wild_snowy')
  player.runCommand('clear @s[tag=!Restrict] cubic:rare_mob_key 0 1')
  player.playSound('block.creaking_heart.step')
  player.runCommand('title @s[tag=Restrict] title You cannot use that here!')
  player.runCommand('tag @s remove Restrict')
};

function very_rare(player) {
  player.runCommand('execute if block ~ -64 ~ deny run tag @s add Restrict')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=1}] run summon happy_ghast ~ ~ ~ 0 0 minecraft:spawn_baby')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=2}] run summon happy_ghast ~ ~ ~ 0 0 minecraft:spawn_baby')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=3}] run summon sniffer ~ ~ ~ 0 0')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=4}] run summon sniffer ~ ~ ~ 0 0')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=5}] run summon sniffer ~ ~ ~ 0 0')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=6}] run summon allay ~ ~ ~ 0 0')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=7}] run summon allay ~ ~ ~ 0 0')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=8}] run summon allay ~ ~ ~ 0 0')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=9}] run summon allay ~ ~ ~ 0 0')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=10}] run summon allay ~ ~ ~ 0 0')
  player.runCommand('clear @s[tag=!Restrict] cubic:very_rare_mob_key 0 1')
  player.playSound('block.creaking_heart.step')
  player.runCommand('title @s[tag=Restrict] title You cannot use that here!')
  player.runCommand('tag @s remove Restrict')
};

function sper(player) {
  player.runCommand('execute if block ~ -64 ~ deny run tag @s add Restrict')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=1}] run summon axolotl ~ ~ ~ 0 0 minecraft:entity_born')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=2}] run summon axolotl ~ ~ ~ 0 0 minecraft:entity_born')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=3}] run summon skeleton_horse ~ ~ ~ 0 0')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=4}] run summon skeleton_horse ~ ~ ~ 0 0')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=5}] run summon skeleton_horse ~ ~ ~ 0 0')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=6}] run summon zombie_horse ~ ~ ~ 0 0')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=7}] run summon zombie_horse ~ ~ ~ 0 0')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=8}] run summon zombie_horse ~ ~ ~ 0 0')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=9}] run summon zombie_horse ~ ~ ~ 0 0')
  player.runCommand('execute at @s[tag=!Restrict, scores={random=10}] run summon zombie_horse ~ ~ ~ 0 0')
  player.runCommand('clear @s[tag=!Restrict] cubic:super_mob_key 0 1')
  player.playSound('block.creaking_heart.step')
  player.runCommand('title @s[tag=Restrict] title You cannot use that here!')
  player.runCommand('tag @s remove Restrict')
};

function landd(player) {
   player.runCommand('tellraw @p[r=5] {"rawtext":[{"text":"You have "},{"score":{"name":"@p","objective":"claimblocks"}},{"text":" available claimblocks. These are gained based on playtime or from the market."}]}');
   player.sendMessage('To set the end corner of your land, crouch and use the same shovel. Type .land claim in chat to claim the land from the corners you set.')
};
