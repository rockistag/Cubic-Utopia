import { world, ItemStack, system, Player } from "@minecraft/server";
import * as MCE from "./Modules/MinecraftEssentials";

world.beforeEvents.itemUse.subscribe((e) => {
    if (e.itemStack.typeId == 'cubic:admin_ui') 
      system.run(() =>  { pearl(e.source) })
});

function pearl(player) {
   return MCE.runCommand(player, `adminpanel`);
};
