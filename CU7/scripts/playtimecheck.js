import { world, ItemStack, system, Player } from "@minecraft/server";

system.runInterval(() => {
    for (const player of world.getAllPlayers()) {
        player.runCommand('function timer')
    }
}, 1200);
