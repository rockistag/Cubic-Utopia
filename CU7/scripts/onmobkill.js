import { world, ItemStack, system, Player, EntityTypes } from "@minecraft/server";

world.afterEvents.entityDie.subscribe(({ damageSource: { damagingEntity }, deadEntity }) => {
  if (deadEntity.typeId === 'minecraft:ender_dragon') {
     damagingEntity.runCommand('execute at @a[r=100] run tellraw @a {“rawtext”:[{"text":"[§5Boss§r] §d"},{"selector":"@p"},{"text":"§b has defeated the §5ender dragon."}]}');
     damagingEntity.runCommand('scoreboard players add @a[rm=3, r=100] points 1000');
     damagingEntity.runCommand('scoreboard players add @s[rm=3, r=100] points 5000');
     damagingEntity.runCommand('scoreboard players add @s[rm=3, r=100] score 100');
     damagingEntity.runCommand('playsound mob.enderdragon.death @a[scores={sound=!2}]');
  }
  else if (deadEntity.typeId === 'minecraft:wither') {
     damagingEntity.runCommand('execute at @p run tellraw @a {“rawtext”:[{"text":"[§5Boss§r] §d"},{"selector":"@p"},{"text":"§b has defeated the §5wither."}]}');
     damagingEntity.runCommand('scoreboard players add @s[rm=3, r=100] points 5000');
     damagingEntity.runCommand('scoreboard players add @s[rm=3, r=100] score 100');
  }
  else if (deadEntity.typeId === 'minecraft:elder_guardian') {
     damagingEntity.runCommand('scoreboard players add @s[rm=3, r=100] points 1000');
     damagingEntity.runCommand('scoreboard players add @s[rm=3, r=100] score 100');
  }
  else if (deadEntity.typeId === 'minecraft:pig' || deadEntity.typeId === 'minecraft:cow' || deadEntity.typeId === 'minecraft:chicken' || ) {
     damagingEntity.runCommand('scoreboard players add @s[rm=3, r=100] points 5');
     damagingEntity.runCommand('scoreboard players add @s[rm=3, r=100] score 1');
  }
});
