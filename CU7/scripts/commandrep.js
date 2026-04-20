import { world, ItemStack, system, Player } from "@minecraft/server";

system.runInterval(() => {
    world.getDimension("overworld").runCommand("function worldborders");
    world.getDimension("overworld").runCommand("function bot");
    world.getDimension("overworld").runCommand("function cosmetics");
    world.getDimension("overworld").runCommand("function illegalg");
    const points = world.scoreboard.getObjective('points');
    for (const player of world.getAllPlayers()) {
        if ((player.hasTag('rank1')) || (player.hasTag('rank2')))
        {
            player.runCommand('function rank');
        }
        if (points.getScore(player) < 0)
        {
            player.runCommand('scoreboard players set @s points 0');
        }
    }
});

const messages = [
    'tellraw @a[tag=broadcast] {"rawtext":[{"text":"[§bBroadcast§r] §bWelcome to Cubic Utopia 7!"}]}',
    'tellraw @a {"rawtext":[{"text":"[§6News§r] §bWelcome to Cubic Utopia 7!"}]}',
    'tellraw @a[tag=broadcast] {"rawtext":[{"text":"[§bBroadcast§r] §bWelcome to Cubic Utopia 7!"}]}',
    'tellraw @a {"rawtext":[{"text":"[§6News§r] §bWelcome to Cubic Utopia 7!"}]}',
    'tellraw @a[tag=broadcast] {"rawtext":[{"text":"[§bBroadcast§r] §bWelcome to Cubic Utopia 7!"}]}',
    'tellraw @a {"rawtext":[{"text":"[§cNotice§r] §bWelcome to Cubic Utopia 7!"}]}'
];
const tips = [
    'tellraw @a[tag=tips] {"rawtext":[{"text":"[§eTip§r] §bWelcome to Cubic Utopia 7!"}]}',
    'tellraw @a[tag=tips] {"rawtext":[{"text":"[§eTip§r] §bWelcome to Cubic Utopia 7!"}]}',
    'tellraw @a[tag=tips] {"rawtext":[{"text":"[§eTip§r] §bWelcome to Cubic Utopia 7!"}]}',
    'tellraw @a[tag=tips] {"rawtext":[{"text":"[§eTip§r] §bWelcome to Cubic Utopia 7!"}]}',
    'tellraw @a[tag=tips] {"rawtext":[{"text":"[§eTip§r] §bWelcome to Cubic Utopia 7!"}]}',
    'tellraw @a[tag=tips] {"rawtext":[{"text":"[§eTip§r] §bWelcome to Cubic Utopia 7!"}]}'
];

let messageIndex = 0;
let tipIndex = 0;
system.runInterval(() => {
    if (messages.length > 0) {
        world.getDimension("overworld").runCommand(messages[messageIndex]);
        messageIndex = (messageIndex + 1) % messages.length;
    }
}, 7200);
system.runInterval(() => {
    if (tips.length > 0) {
        world.getDimension("overworld").runCommand(tips[tipIndex]);
        tipIndex = (tipIndex + 1) % tips.length;
    }
}, 9230);
