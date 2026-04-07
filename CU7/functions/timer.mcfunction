scoreboard players add @a[tag=Valid] minutes 1
scoreboard players add @a[tag=Valid] points 5
scoreboard players add @a[scores={minutes=60}] hours 1
scoreboard players add @a random 1
scoreboard players add @a[tag=Valid] claimblocks 1
scoreboard players set @a[scores={minutes=60}] minutes 0
scoreboard players set @a[scores={random=11}] random 1
execute at @a[scores={hours=1}, tag=!p1] run tellraw @s {"rawtext":[{"text":"[§vProgression§r]§b You have played §v1 hour§b and unlocked a §aplaytime reward!§b Head to the §dQuests Hub §binside the Cubic Menu to redeem it!"}]}
execute at @a[scores={hours=5}, tag=!p2] run tellraw @s {"rawtext":[{"text":"[§vProgression§r]§b You have played §v5 hours§b and unlocked another §aplaytime reward!§b Head to the §dQuests Hub §binside the Cubic Menu to redeem it!"}]}
execute at @a[scores={hours=10}, tag=!p3] run tellraw @s {"rawtext":[{"text":"[§vProgression§r]§b You have played §v10 hours§b and unlocked a new §aplaytime reward!§b Head to the §dQuests Hub §binside the Cubic Menu to redeem it!"}]}
execute at @a[scores={hours=15}, tag=!p4] run tellraw @s {"rawtext":[{"text":"[§vProgression§r]§b You have played §v15 hours§b and unlocked a new §aplaytime reward!"}]}
execute at @a[scores={hours=20}, tag=!p5] run tellraw @s {"rawtext":[{"text":"[§vProgression§r]§b You have played §v20 hours§b and unlocked a new §aplaytime reward!"}]}
execute at @a[scores={hours=30}, tag=!p6] run tellraw @s {"rawtext":[{"text":"[§vProgression§r]§b You have played §d30 hours§b and unlocked a new §aplaytime reward!"}]}
execute at @a[scores={hours=40}, tag=!p7] run tellraw @s {"rawtext":[{"text":"[§vProgression§r]§b You have played §d40 hours§b and unlocked a new §aplaytime reward!"}]}
execute at @a[scores={hours=50}, tag=!p8] run tellraw @s {"rawtext":[{"text":"[§vProgression§r]§b You have played §d50 hours§b and unlocked a new §aplaytime reward!"}]}
execute at @a[scores={hours=75}, tag=!p9] run tellraw @s {"rawtext":[{"text":"[§vProgression§r]§b You have played §575 hours§b and unlocked a new §aplaytime reward!"}]}
execute at @a[scores={hours=100}, tag=!p10] run tellraw @s {"rawtext":[{"text":"[§vProgression§r]§b You have played §5100 hours§b and unlocked your last §aplaytime reward."}]}
tag @a[scores={hours=1}, tag=!p1] add p1
tag @a[scores={hours=5}, tag=!p2] add p2
tag @a[scores={hours=10}, tag=!p3] add p3
tag @a[scores={hours=15}, tag=!p4] add p4
tag @a[scores={hours=20}, tag=!p5] add p5
tag @a[scores={hours=30}, tag=!p6] add p6
tag @a[scores={hours=40}, tag=!p7] add p7
tag @a[scores={hours=50}, tag=!p8] add p8
tag @a[scores={hours=75}, tag=!p9] add p9
tag @a[scores={hours=100}, tag=!p10] add p10