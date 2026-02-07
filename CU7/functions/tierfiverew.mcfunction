execute as @a[scores={hours=50, tier=4}] run tag @s add rank:ultra
execute as @a[scores={hours=50, tier=4}] run tag @s add ultra
execute as @a[scores={hours=50, tier=4}] run tag @s remove rank:beast
execute as @a[scores={hours=50, tier=4}] run give @s ward_armor_trim_smithing_template
execute as @a[scores={hours=50, tier=4}] run tellraw @a {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b has reached Tier Five, §5Ultra!"}]}
execute as @a[scores={hours=50, tier=4}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier Five, §5Ultra. §dYou have received a ward armor trim as a reward. §bThe next tier is reached at 90 hours of playtime."}]}
execute as @a[scores={hours=55, level=1}] run give @s netherite_block
execute as @a[scores={hours=55, level=1}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 5, Level 2. §dYou have received a netherite block as a reward."}]}
execute as @a[scores={hours=60, level=2}] run tag @s add peffect1
execute as @a[scores={hours=60, level=2}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 5, Level 3. §dYou have received access to the permanent speed effect as a reward."}]}
execute as @a[scores={hours=70, level=3}] run tag @s add peffect2
execute as @a[scores={hours=70, level=3}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 5, Level 4. §dYou have received access to the permanent haste effect as a reward."}]}
execute as @a[scores={hours=80, level=4}] run tag @s add peffect3
execute as @a[scores={hours=80, level=4}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 5, Level 5. §dYou have received access to the permanent leap effect as a reward.."}]}