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
            player.runCommand('tellraw @a {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b has reached Level One, §bBeginner!"}]}');
        }
        if ((score.getScore(player) >= 500) && !player.hasTag('l2')) {
            player.runCommand('tag @s add l2');
            player.runCommand('scoreboard players set @s level 2');
            player.runCommand('give @s bucket');
            player.runCommand('tellraw @s {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier One, §lBeginner§r§b. Tiers are based off of playtime, so keep playing to gain more levels and tiers! §dYou have received 100 points as a reward of playing for 10 minutes."}]}');
            player.runCommand('tellraw @a {"rawtext":[{"text":"[§vProgression§r]§d "},{"selector":"@s"},{"text":"§b has reached Level One, §bBeginner!"}]}');
        }
    }
});
