import { world, ItemStack, system, Player } from "@minecraft/server";

system.runInterval(() => {
    world.getDimension("overworld").runCommand("function worldborders");
});