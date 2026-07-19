import { world, ItemStack, system, Player } from "@minecraft/server";

system.runInterval(() => {
    world.getDimension("overworld").runCommand("function worldborders");
    world.getDimension("overworld").runCommand("function bot");
    world.getDimension("overworld").runCommand("function cosmetics");
    world.getDimension("overworld").runCommand("function illegalg");
    world.getDimension("overworld").runCommand("execute at @a[tag=!bot] run scoreboard players operation @p displaypoints = @p points");
    const points = world.scoreboard.getObjective('points');
    for (const player of world.getAllPlayers()) {
        if ((player.hasTag('rank1')) && !(player.hasTag('rank1done')))
        {
            player.runCommand('function rank');
        }
        else if ((player.hasTag('rank2')) && !(player.hasTag('rank2done')))
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
    'tellraw @a[tag=broadcast] {"rawtext":[{"text":"[§bBroadcast§r] §bNeed an SMP with more community-driven events? Join our partners at §eValmere SMP! §dRealm Code: RNG6x3UsKGZRWWs"}]}',
    'tellraw @a {"rawtext":[{"text":"[§6News§r] §dCubic Utopia 7.1 §bhas been made available with the new §5Utopian Kit! §bAlso enjoy various QoL fixes and changes."}]}',
    'tellraw @a[tag=broadcast] {"rawtext":[{"text":"[§bBroadcast§r] §bSubscribe to §eTAGCraft §bon §cYouTube §bto see new Cubic Realms trailers and other content!"}]}',
    'tellraw @a {"rawtext":[{"text":"[§6News§r] §vNew kits §bare now available in the §dRealm Market! §bBuy kits and more from the leveled sales section."}]}',
    'tellraw @a[tag=broadcast] {"rawtext":[{"text":"[§bBroadcast§r] §bPlease refer to §aAdmins §bon our §sDiscord §bfor any questions on the §crules."}]}',
    'tellraw @a {"rawtext":[{"text":"[§cNotice§r] §bA new rule has been added prohibiting laggy farms. §cMalicious activity will be punished."}]}'
];
const tips = [
    'tellraw @a[tag=tips] {"rawtext":[{"text":"[§eTip§r] §bUsing the §aclaim shovel, §byou can create land claims to protect your builds. You need to crouch and use it at the same time."}]}',
    'tellraw @a[tag=tips] {"rawtext":[{"text":"[§eTip§r] §bYou can request for a public warp to be made by sending the name and coords you want in the forms section of the §dCubic Menu."}]}',
    'tellraw @a[tag=tips] {"rawtext":[{"text":"[§eTip§r] §bUse §dInsta-Pearls §bfrom the quick teleport menu to escape to spawn in emergencies!"}]}',
    'tellraw @a[tag=tips] {"rawtext":[{"text":"[§eTip§r] §bYou can redeem §aPlaytime Rewards §bfrom the §vAchievements §bsection of the §dCubic Menu."}]}',
    'tellraw @a[tag=tips] {"rawtext":[{"text":"[§eTip§r] §bThere is a wiki at the bottom of the §dCubic Menu §bthat holds any information you might need."}]}',
    'tellraw @a[tag=tips] {"rawtext":[{"text":"[§eTip§r] §bWant to disable these or other things related to our realm? Just go to the §csettings §bsection of the §dCubic Menu!"}]}'
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
