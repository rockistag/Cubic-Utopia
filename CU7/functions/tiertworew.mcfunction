execute as @a[scores={hours=4, tier=1}] run tag @s add rank:crafter
execute as @a[scores={hours=4, tier=1}] run tag @s add crafter
execute as @a[scores={hours=4, tier=1}] run tag @s remove rank:beginner
execute as @a[scores={hours=4, tier=1}] run give @s dune_armor_trim_smithing_template
execute as @a[scores={hours=4, tier=1}] run tellraw @a {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b has reached Tier Two, §6Crafter!"}]}
execute as @a[scores={hours=4, tier=1}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier Two, §6Crafter. §dYou have received a dune armor trim as a reward. §bThe next tier is reached at 15 hours of playtime."}]}
execute as @a[scores={hours=6, level=1}] run give @s magenta_shulker_box
execute as @a[scores={hours=6, level=1}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 2, Level 2. §dYou have received a magenta shulker box as a reward."}]}
execute as @a[scores={hours=8, level=2}] run scoreboard players add @s claimblocks 2000
execute as @a[scores={hours=8, level=2}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 2, Level 3. §dYou have received 2000 claim blocks as a reward."}]}
execute as @a[scores={hours=10, level=3}] run give @s netherite_ingot
execute as @a[scores={hours=10, level=3}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 2, Level 4. §dYou have received a netherite ingot as a reward."}]}
execute as @a[scores={hours=12, level=4}] run give @s cubic:rare_mob_key
execute as @a[scores={hours=12, level=4}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 2, Level 5. §dYou have received a rare mob key as a reward."}]}