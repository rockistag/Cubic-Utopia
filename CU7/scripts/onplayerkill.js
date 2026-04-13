import { world, ItemStack, system, Player } from "@minecraft/server";

world.afterEvents.entityDie.subscribe((e) => {
	const level = world.scoreboard.getObjective('level');
	const victim = e.deadEntity;
	const source = e.damageSource;
	const sourceEntity = source.damager;
	if (victim.typeId === "minecraft:player" && sourceEntity && sourceEntity.typeId === "minecraft:player") {
		sourceEntity.runCommand('scoreboard players add @s kills 1');
		victim.runCommand('scoreboard players add @s deaths 1');
		if ((victim.hasTag('pvp')) && (sourceEntity.hasTag('pvp'))) {
			if (level.getScore(victim) == 0) {
				sourceEntity.runCommand('scoreboard players remove @s points 100');
			}
			else if (level.getScore(victim) == 1) {
				sourceEntity.runCommand('scoreboard players add @s points 100');
				sourceEntity.runCommand('scoreboard players add @s score 1');
				victim.runCommand('scoreboard players remove @s points 100');
			}
			else if (level.getScore(victim) == 2) {
				sourceEntity.runCommand('scoreboard players add @s points 300');
				sourceEntity.runCommand('scoreboard players add @s score 5');
				victim.runCommand('scoreboard players remove @s points 200');
			}
			else if (level.getScore(victim) == 3) {
				sourceEntity.runCommand('scoreboard players add @s points 600');
				sourceEntity.runCommand('scoreboard players add @s score 10');
				victim.runCommand('scoreboard players remove @s points 400');
			}
			else if (level.getScore(victim) == 4) {
				sourceEntity.runCommand('scoreboard players add @s points 1000');
				sourceEntity.runCommand('scoreboard players add @s score 20');
				victim.runCommand('scoreboard players remove @s points 600');
			}
			else if (level.getScore(victim) == 5) {
				sourceEntity.runCommand('scoreboard players add @s points 1500');
				sourceEntity.runCommand('scoreboard players add @s score 35');
				victim.runCommand('scoreboard players remove @s points 1000');
			}
			else if (level.getScore(victim) == 6) {
				sourceEntity.runCommand('scoreboard players add @s points 2000');
				sourceEntity.runCommand('scoreboard players add @s score 50');
				victim.runCommand('scoreboard players remove @s points 1500');
			}
		}
		else {
			if (sourceEntity.hasTag('pvp')) {
				victim.runCommand('say I have been killed without having the PvP Tag! This is against the rules.');
			}
			else {
				sourceEntity.runCommand('say I have killed someone without having the PvP Tag! This is against the rules.');
			}
		}
	}
	else if (victim.typeId === "minecraft:player") {
		victim.runCommand('scoreboard players add @s deaths 1');
		if (level.getScore(victim) == 1) {
			victim.runCommand('scoreboard players remove @s points 100')
		}
		else if (level.getScore(victim) == 2) {
			victim.runCommand('scoreboard players remove @s points 200')
		}
		else if (level.getScore(victim) == 3) {
			victim.runCommand('scoreboard players remove @s points 400')
		}
		else if (level.getScore(victim) == 4) {
			victim.runCommand('scoreboard players remove @s points 600')
		}
		else if (level.getScore(victim) == 5) {
			victim.runCommand('scoreboard players remove @s points 1000')
		}
		else if (level.getScore(victim) == 6) {
			victim.runCommand('scoreboard players remove @s points 1500')
		}
	}
});

