execute as @a[scores={hours=15, tier=2}] run tag @s add rank:pro
execute as @a[scores={hours=15, tier=2}] run tag @s add pro
execute as @a[scores={hours=15, tier=2}] run tag @s remove rank:crafter
execute as @a[scores={hours=15, tier=2}] run give @s spire_armor_trim_smithing_template
execute as @a[scores={hours=15, tier=2}] run tellraw @a {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b has reached Tier Three, §9Pro!"}]}
execute as @a[scores={hours=15, tier=2}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier Three, §9Pro. §dYou have received a spire armor trim as a reward. §bThe next tier is reached at 30 hours of playtime."}]}
execute as @a[scores={hours=18, level=1}] run give @s end_crystal 32
execute as @a[scores={hours=18, level=1}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 3, Level 2. §dYou have received 32 end crystals as a reward."}]}
execute as @a[scores={hours=21, level=2}] run give @s vault
execute as @a[scores={hours=21, level=2}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 3, Level 3. §dYou have received a placeable vault as a reward."}]}
execute as @a[scores={hours=24, level=3}] run give @s enchanted_golden_apple
execute as @a[scores={hours=24, level=3}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 3, Level 4. §dYou have received a god apple as a reward."}]}
execute as @a[scores={hours=27, level=4}] run give @s cubic:very_rare_mob_key
execute as @a[scores={hours=27, level=4}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 3, Level 5. §dYou have received a very rare mob key as a reward."}]}