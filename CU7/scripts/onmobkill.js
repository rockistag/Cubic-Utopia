import { world, ItemStack, system, Player, EntityTypes } from "@minecraft/server";

world.afterEvents.entityDie.subscribe(({ damageSource: { damagingEntity }, deadEntity }) => {
  // BOSSES
  if (damagingEntity.typeId === 'minecraft:player') {
      if (deadEntity.typeId === 'minecraft:ender_dragon') {
         damagingEntity.runCommand('execute as @a[r=100] run tellraw @a {"rawtext":[{"text":"[§5Boss§r] §d"},{"selector":"@s"},{"text":"§b has defeated the §5ender dragon."}]}');
         damagingEntity.runCommand('scoreboard players add @a[rm=3, r=100, hasitem={item=mace, quantity=0}] points 1000');
         damagingEntity.runCommand('scoreboard players add @s[hasitem={item=mace, quantity=0}] points 5000');
         damagingEntity.runCommand('scoreboard players add @s[hasitem={item=mace, quantity=0}] score 500');
         damagingEntity.runCommand('playsound mob.enderdragon.death @a[scores={sound=!2}]');
      }
      else if (deadEntity.typeId === 'minecraft:wither') {
         damagingEntity.runCommand('execute at @p run tellraw @a {"rawtext":[{"text":"[§5Boss§r] §d"},{"selector":"@p"},{"text":"§b has defeated the §5wither."}]}');
         damagingEntity.runCommand('scoreboard players add @s points 5000');
         damagingEntity.runCommand('scoreboard players add @s score 500');
         damagingEntity.runCommand('playsound mob.wither.death @a[scores={sound=!2}]');
      }
      else if (deadEntity.typeId === 'minecraft:elder_guardian' || deadEntity.typeId === 'minecraft:warden') {
         damagingEntity.runCommand('scoreboard players add @s points 1000');
         damagingEntity.runCommand('scoreboard players add @s score 100');
      }
      // LEVEL 1
      else if (deadEntity.typeId === 'minecraft:pig' || deadEntity.typeId === 'minecraft:cow' || deadEntity.typeId === 'minecraft:chicken' || deadEntity.typeId === 'minecraft:sheep') {
         damagingEntity.runCommand('scoreboard players add @s points 5');
         damagingEntity.runCommand('scoreboard players add @s score 1');
      }
      else if (deadEntity.typeId === 'minecraft:goat' || deadEntity.typeId === 'minecraft:cod' || deadEntity.typeId === 'minecraft:salmon' || deadEntity.typeId === 'minecraft:tropical_fish') {
         damagingEntity.runCommand('scoreboard players add @s points 5');
         damagingEntity.runCommand('scoreboard players add @s score 1');
      }
      // LEVEL 2
      else if (deadEntity.typeId === 'minecraft:zombie' || deadEntity.typeId === 'minecraft:drowned' || deadEntity.typeId === 'minecraft:skeleton' || deadEntity.typeId === 'minecraft:spider') {
         damagingEntity.runCommand('scoreboard players add @s points 10');
         damagingEntity.runCommand('scoreboard players add @s score 2');
      }
      else if (deadEntity.typeId === 'minecraft:slime' || deadEntity.typeId === 'minecraft:endermite' || deadEntity.typeId === 'minecraft:silverfish' || deadEntity.typeId === 'minecraft:pufferfish') {
         damagingEntity.runCommand('scoreboard players add @s points 10');
         damagingEntity.runCommand('scoreboard players add @s score 2');
      }
      // LEVEL 3
      else if (deadEntity.typeId === 'minecraft:creeper' || deadEntity.typeId === 'minecraft:husk' || deadEntity.typeId === 'minecraft:stray' || deadEntity.typeId === 'minecraft:bogged') {
         damagingEntity.runCommand('scoreboard players add @s points 25');
         damagingEntity.runCommand('scoreboard players add @s score 5');
      }
      else if (deadEntity.typeId === 'minecraft:parched' || deadEntity.typeId === 'minecraft:pillager' || deadEntity.typeId === 'minecraft:cave_spider' || deadEntity.typeId === 'minecraft:magma_cube') {
         damagingEntity.runCommand('scoreboard players add @s points 25');
         damagingEntity.runCommand('scoreboard players add @s score 5');
      }
      // LEVEL 4
      else if (deadEntity.typeId === 'minecraft:witch' || deadEntity.typeId === 'minecraft:breeze' || deadEntity.typeId === 'minecraft:blaze' || deadEntity.typeId === 'minecraft:iron_golem') {
         damagingEntity.runCommand('scoreboard players add @s points 50');
         damagingEntity.runCommand('scoreboard players add @s score 10');
      }
      else if (deadEntity.typeId === 'minecraft:piglin' || deadEntity.typeId === 'minecraft:hoglin' || deadEntity.typeId === 'minecraft:shulker' || deadEntity.typeId === 'minecraft:phantom') {
         damagingEntity.runCommand('scoreboard players add @s points 50');
         damagingEntity.runCommand('scoreboard players add @s score 10');
      }
      // LEVEL 5
      else if (deadEntity.typeId === 'minecraft:guardian' || deadEntity.typeId === 'minecraft:vex' || deadEntity.typeId === 'minecraft:piglin_brute' || deadEntity.typeId === 'minecraft:ghast') {
         damagingEntity.runCommand('scoreboard players add @s points 100');
         damagingEntity.runCommand('scoreboard players add @s score 20');
      }
      else if (deadEntity.typeId === 'minecraft:evocation_illager' || deadEntity.typeId === 'minecraft:vindicator' || deadEntity.typeId === 'minecraft:ravager' || deadEntity.typeId === 'minecraft:zombie_nautilus') {
         damagingEntity.runCommand('scoreboard players add @s points 100');
         damagingEntity.runCommand('scoreboard players add @s score 20');
      }
  }
});
