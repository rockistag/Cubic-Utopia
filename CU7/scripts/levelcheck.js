import { world, ItemStack, system, Player } from "@minecraft/server";

system.runInterval(() => {
    const score = world.scoreboard.getObjective('score');
    for (const player of world.getAllPlayers()) {
        if ((score.getScore(player) >= 10) && !player.hasTag('l1')) {
            player.runCommand('function l1');
        }
    }
});
