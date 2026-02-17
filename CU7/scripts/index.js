import { world, ItemStack, system, Player } from "@minecraft/server";
import "./adminui.js";
import "./gui_menu.js";
import "./report.js";

world.beforeEvents.itemUse.subscribe((e) => {
    if (e.itemStack.typeId == 'cubic:insta_pearl') 
      system.run(() =>  { pearl(e.source) })
    if (e.itemStack.typeId == 'cubic:shrieker_mob_key') 
      system.run(() =>  { shrieker(e.source) })
    if (e.itemStack.typeId == 'cubic:uncommon_mob_key') 
      system.run(() =>  { uncommon(e.source) })
    if (e.itemStack.typeId == 'cubic:rare_mob_key') 
      system.run(() =>  { rare(e.source) })
    if (e.itemStack.typeId == 'cubic:very_rare_mob_key') 
      system.run(() =>  { very_rare(e.source) })
    if (e.itemStack.typeId == 'cubic:super_mob_key') 
      system.run(() =>  { sper(e.source) })
});

function pearl(player) {
  player.runCommand('execute if block ~ -63 ~ air run tag @s add Restrict')
  player.runCommand('execute if block ~ -63 ~ bedrock run tp @p 0 73 0')
  player.playSound('portal.travel')
  player.runCommand('execute if block ~ 0 ~ bedrock in overworld run tp @p 0 73 0')
  player.runCommand('execute in the_end if block ~ 0 ~ air in overworld run tp @p 0 73 0')
  player.runCommand('execute in the_end if block ~ 0 ~ deny in overworld run tp @p 0 73 0')
  player.runCommand('execute in nether if block ~ 0 ~ deny in overworld run tp @s 0 73 0')
  player.runCommand('clear @s[tag=!Restrict] cubic:insta_pearl 0 1')
  player.runCommand('title @s[tag=Restrict] title You cannot use that here!')
  player.runCommand('tag @s remove Restrict')
};

function shrieker(player) {
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