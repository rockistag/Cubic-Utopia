execute as @a[scores={hours=30, tier=3}] run tag @s add rank:beast
execute as @a[scores={hours=30, tier=3}] run tag @s add beast
execute as @a[scores={hours=30, tier=3}] run tag @s remove rank:pro
execute as @a[scores={hours=30, tier=3}] run give @s snout_armor_trim_smithing_template
execute as @a[scores={hours=30, tier=3}] run tellraw @a {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b has reached Tier Four, §dBeast!"}]}
execute as @a[scores={hours=30, tier=3}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier Four, §dBeast. §dYou have received a snout armor trim as a reward. §bThe next tier is reached at 50 hours of playtime."}]}
execute as @a[scores={hours=34, level=1}] run give @s music_disc_relic
execute as @a[scores={hours=34, level=1}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 4, Level 2. §dYou have received the relic music disc as a reward."}]}
execute as @a[scores={hours=38, level=2}] run give @s cubic:super_mob_key
execute as @a[scores={hours=38, level=2}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 4, Level 3. §dYou have received a super mob key as a reward."}]}
execute as @a[scores={hours=42, level=3}] run give @s heavy_core
execute as @a[scores={hours=42, level=3}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 4, Level 4. §dYou have received a heavy core as a reward."}]}
execute as @a[scores={hours=46, level=4}] run give @s beacon
execute as @a[scores={hours=46, level=4}] run tellraw @s {"rawtext":[{"text":"[§vTiers§r]§d "},{"selector":"@s"},{"text":"§b, you are now at Tier 4, Level 5. §dYou have received a beacon as a reward."}]}