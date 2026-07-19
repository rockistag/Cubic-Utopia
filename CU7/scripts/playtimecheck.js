import { world, ItemStack, system, Player } from "@minecraft/server";

system.runInterval(() => {
    world.getDimension("overworld").runCommand('function timer');
    const minutes = world.scoreboard.getObjective('minutes');
    const hours = world.scoreboard.getObjective('hours');
    for (const player of world.getAllPlayers()) {
        if ((minutes.getScore(player) == 0) && (hours.getScore(player) == 1)) {
            player.sendMessage('[\u00A7vProgression\u00A7r]\u00A7b You have played \u00A7v1 hour\u00A7b and unlocked a \u00A7aplaytime reward!\u00A7b Head to the \u00A7dQuests Hub \u00A7binside the Cubic Menu to redeem it!');
            player.runCommand('function timer2');
            player.runCommand('playsound random.bell @s[scores={sound=!2}]');
        }
        else if ((minutes.getScore(player) == 0) && (hours.getScore(player) == 5)) {
            player.sendMessage('[\u00A7vProgression\u00A7r]\u00A7b You have played \u00A7v5 hours\u00A7b and unlocked another \u00A7aplaytime reward!\u00A7b Head to the \u00A7dQuests Hub \u00A7binside the Cubic Menu to redeem it!');
            player.runCommand('function timer2');
            player.runCommand('playsound random.bell @s[scores={sound=!2}]');
        }
        else if ((minutes.getScore(player) == 0) && (hours.getScore(player) == 10)) {
            player.sendMessage('[\u00A7vProgression\u00A7r]\u00A7b You have played \u00A7v10 hours\u00A7b and unlocked a new \u00A7aplaytime reward!\u00A7b Head to the \u00A7dQuests Hub \u00A7binside the Cubic Menu to redeem it!');
            player.runCommand('function timer2');
            player.runCommand('playsound random.bell @s[scores={sound=!2}]');
        }
        else if ((minutes.getScore(player) == 0) && (hours.getScore(player) == 15)) {
            player.sendMessage('[\u00A7vProgression\u00A7r]\u00A7b You have played \u00A7v15 hours\u00A7b and unlocked a new \u00A7aplaytime reward!');
            player.runCommand('function timer2');
            player.runCommand('playsound random.bell @s[scores={sound=!2}]');
        }
        else if ((minutes.getScore(player) == 0) && (hours.getScore(player) == 20)) {
            player.sendMessage('[\u00A7vProgression\u00A7r]\u00A7b You have played \u00A7v20 hours\u00A7b and unlocked a new \u00A7aplaytime reward!');
            player.runCommand('function timer2');
            player.runCommand('playsound random.bell @s[scores={sound=!2}]');
        }
        else if ((minutes.getScore(player) == 0) && (hours.getScore(player) == 30)) {
            player.sendMessage('[\u00A7vProgression\u00A7r]\u00A7b You have played \u00A7d30 hours\u00A7b and unlocked a new \u00A7aplaytime reward!');
            player.runCommand('function timer2');
            player.runCommand('playsound random.levelup @s[scores={sound=!2}]');
        }
        else if ((minutes.getScore(player) == 0) && (hours.getScore(player) == 40)) {
            player.sendMessage('[\u00A7vProgression\u00A7r]\u00A7b You have played \u00A7d40 hours\u00A7b and unlocked a new \u00A7aplaytime reward!');
            player.runCommand('function timer2');
            player.runCommand('playsound random.levelup @s[scores={sound=!2}]');
        }
        else if ((minutes.getScore(player) == 0) && (hours.getScore(player) == 50)) {
            player.sendMessage('[\u00A7vProgression\u00A7r]\u00A7b You have played \u00A7d50 hours\u00A7b and unlocked a new \u00A7aplaytime reward! \u00A7bYou also have unlocked some market sales, so go check that out too!');
            player.runCommand('function timer2');
            player.runCommand('playsound random.levelup @s[scores={sound=!2}]');
        }
        else if ((minutes.getScore(player) == 0) && (hours.getScore(player) == 75)) {
            player.sendMessage('[\u00A7vProgression\u00A7r]\u00A7b You have played \u00A7575 hours\u00A7b and unlocked a new \u00A7aplaytime reward!');
            player.runCommand('function timer2');
            player.runCommand('playsound random.levelup @s[scores={sound=!2}]');
        }
        else if ((minutes.getScore(player) == 0) && (hours.getScore(player) == 100)) {
            player.sendMessage('[\u00A7vProgression\u00A7r]\u00A7b You have played \u00A75100 hours\u00A7b and unlocked your last \u00A7aplaytime reward.');
            player.runCommand('function timer2');
            player.runCommand('playsound random.levelup @s[scores={sound=!2}]');
        }
    }
}, 1200);