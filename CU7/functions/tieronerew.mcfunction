execute as @a[scores={minutes=10, tier=0}] run scoreboard players add @s points 100 
execute as @a[scores={minutes=10, tier=0}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier One, §lBeginner§r§b. Tiers are based off of playtime, so keep playing to gain more levels and tiers! §dYou have received 100 points as a reward of playing for 10 minutes."}]}
execute as @a[scores={minutes=30, level=1, tier=1}] run give @s saddle
execute as @a[scores={minutes=30, level=1, tier=1}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 1, Level 2. §dYou have received a saddle as a reward."}]}
execute as @a[scores={hours=1, level=2}] run give @s ender_chest
execute as @a[scores={hours=1, level=2}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 1, Level 3. §dYou have received an ender chest as a reward."}]}
execute as @a[scores={hours=2, level=3}] run give @s golden_apple
execute as @a[scores={hours=2, level=3}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 1, Level 4. §dYou have received a golden apple as a reward."}]}
execute as @a[scores={hours=3, level=4}] run give @s cubic:uncommon_mob_key
execute as @a[scores={hours=3, level=4}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 1, Level 5. §dYou have received an §euncommon mob key§d as a reward. You can use this as if it were a spawn egg to get a random uncommon mob, more info in the FAQ of the Cubic Menu!"}]}



