import { world, ItemStack, system, Player } from "@minecraft/server";

system.runInterval(() => {
    const score = world.scoreboard.getObjective('score');
    for (const player of world.getAllPlayers()) {
        if ((score.getScore(player) >= 10) && !player.hasTag('l1')) {
            player.runCommand('tag @s add l1');
            player.runCommand('tag @s add rank:§bBeginner');
            player.runCommand('scoreboard players set @s level 1');
            player.runCommand('give @s bucket');
            player.runCommand('tellraw @s {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Level One, §lBeginner§r§b. Levels are based off your score, so keep playing to gain more levels! §dYou have received a bucket as a reward for gaining 10 score."}]}');
            player.runCommand('tellraw @a {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b has reached Level One!"}]}');
        }
        if ((score.getScore(player) >= 500) && !player.hasTag('l2')) {
            player.runCommand('tag @s add l2');
            player.runCommand('tag @s add rank:§6Apprentice');
            player.runCommand('tag @s remove rank:§bBeginner');
            player.runCommand('scoreboard players set @s level 2');
            player.runCommand('give @s ender_chest');
            player.runCommand('tellraw @s {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Level Two, §l§6Apprentice§r§b. §dYou have received an ender chest as a reward for getting 500 score."}]}');
            player.runCommand('tellraw @a {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b has reached Level Two, §6Apprentice!"}]}');
        }
        if ((score.getScore(player) >= 2000) && !player.hasTag('l3')) {
            player.runCommand('tag @s add l3');
            player.runCommand('scoreboard players set @s level 3');
            player.runCommand('tag @s remove rank:§6Apprentice');
            player.runCommand('tag @s add rank:§gArtisan');
            player.runCommand('give @s dune_armor_trim_smithing_template');
            player.runCommand('tellraw @s {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Level Three, §l§gArtisan§r§b. §dYou have received a dune trim as a reward for getting 2000 score."}]}');
            player.runCommand('tellraw @a {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b has reached Level Three, §gArtisan!"}]}');
        }
        if ((score.getScore(player) >= 5000) && !player.hasTag('l4')) {
            player.runCommand('tag @s add l4');
            player.runCommand('scoreboard players set @s level 4');
            player.runCommand('tag @s remove rank:§gArtisan');
            player.runCommand('tag @s add rank:§9Pro');
            player.runCommand('give @s netherite_upgrade_smithing_template');
            player.runCommand('tellraw @s {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Level Four, §l§9Pro§r§b. §dYou have received a netherite upgrade template as a reward for getting 5000 score."}]}');
            player.runCommand('tellraw @a {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b has reached Level Four, §9Pro!"}]}');
        }
        if ((score.getScore(player) >= 10000) && !player.hasTag('l5')) {
            player.runCommand('tag @s add l5');
            player.runCommand('scoreboard players set @s level 5');
            player.runCommand('tag @s remove rank:§9Pro');
            player.runCommand('tag @s add rank:§2Expert');
            player.runCommand('scoreboard players set @s peffect5 1');
            player.runCommand('tellraw @s {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Level Five, §l§2Expert§r§b. §dYou have received the water breathing perm effect as a reward for getting 10 thousand score. §ePerm Effects can be disabled and re-enabled from the cubic menu settings tab."}]}');
            player.runCommand('tellraw @a {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b has reached Level Five, §2Expert!"}]}');
        }
        if ((score.getScore(player) >= 25000) && !player.hasTag('l6')) {
            player.runCommand('tag @s add l6');
            player.runCommand('scoreboard players set @s level 6');
            player.runCommand('tag @s remove rank:§2Expert');
            player.runCommand('tag @s add rank:§dUtopian');
            player.runCommand('scoreboard players set @s peffect2 1');
            player.runCommand('tellraw @s {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Level Six, §l§dUtopian§r§b. §dYou have received the haste perm effect as a reward for getting 25 thousand score. §ePerm Effects can be disabled and re-enabled from the cubic menu settings tab."}]}');
            player.runCommand('tellraw @a {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b has reached Level Six, §dUtopian!"}]}');
        }
        if ((score.getScore(player) >= 100000) && !player.hasTag('l7')) {
            player.runCommand('tag @s add l7');
            player.runCommand('scoreboard players set @s level 7');
            player.runCommand('tag @s remove rank:§dUtopian');
            player.runCommand('tag @s add rank:§4Super_Utopian');
            player.runCommand('scoreboard players set @s peffect6 1');
            player.runCommand('tellraw @s {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Level Seven, §l§4Super Utopian§r§b. §dYou have received the fire resistance effect as a reward for getting 100 thousand score. That is clinically insane."}]}');
            player.runCommand('tellraw @a {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b has reached Level Seven, §4Super Utopian!"}]}');
        }
        if ((score.getScore(player) >= 250000) && !player.hasTag('l8')) {
            player.runCommand('tag @s add l8');
            player.runCommand('scoreboard players set @s level 8');
            player.runCommand('tag @s remove rank:§4Super_Utopian');
            player.runCommand('tag @s add rank:§5Ultra_Utopian');
            player.runCommand('scoreboard players set @s peffect1 1');
            player.runCommand('tellraw @s {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Level Eight, §l§5Ultra Utopian§r§b. §dYou have received the fire resistance effect as a reward for getting 250 thousand score. §eThis is the final level. You have nothing else to prove, so please, for your own health and safety, take a break."}]}');
            player.runCommand('tellraw @a {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b has reached Level Eight, §5Ultra Utopian!"}]}');
        }
    }
});
