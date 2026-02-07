execute as @a[scores={hours=90, tier=5}] run tag @s add rank:god
execute as @a[scores={hours=90, tier=5}] run tag @s add god
execute as @a[scores={hours=90, tier=5}] run tag @s remove rank:ultra
execute as @a[scores={hours=90, tier=5}] run give @s ward_armor_trim_smithing_template
execute as @a[scores={hours=90, tier=5}] run tellraw @a {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b has reached Tier Six, §4God!"}]}
execute as @a[scores={hours=90, tier=5}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier Six, §4God. §dYou have received access to the §5Utopia Kit §das a reward. §5This is the max tier, and you will reach the max level at 150 hours of playtime."}]}
execute as @a[scores={hours=105, level=1}] run tag @s add peffect4
execute as @a[scores={hours=105, level=1}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 6, Level 2. §dYou have received access to the permanent night vision effect as a reward."}]}
execute as @a[scores={hours=120, level=2}] run tag @s add peffect5
execute as @a[scores={hours=120, level=2}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 6, Level 3. §dYou have received access to the permanent water breathing effect as a reward."}]}
execute as @a[scores={hours=135, level=3}] run tag @s add peffect6
execute as @a[scores={hours=135, level=3}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 6, Level 4. §dYou have received access to the permanent fire resistance effect as a reward."}]}
execute as @a[scores={hours=150, level=4}] run give @s silence_armor_trim_smithing_template
execute as @a[scores={hours=150, level=4}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at the max level of the max tier. §dYou have received the §1silence armor trim §das a reward. §bThanks for playing Cubic Utopia, and we hope you enjoy the rest of your journeys!"}]}