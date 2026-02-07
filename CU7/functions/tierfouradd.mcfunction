execute as @a[scores={hours=30, tier=3}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[scores={hours=34, level=1}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=38, level=2}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=42, level=3}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=46, level=4}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=30, tier=3}] run scoreboard players set @s tier 4
execute as @a[scores={hours=30, level=5}] run scoreboard players set @s level 1
execute as @a[scores={hours=34, level=1}] run scoreboard players set @s level 2
execute as @a[scores={hours=38, level=2}] run scoreboard players set @s level 3
execute as @a[scores={hours=42, level=3}] run scoreboard players set @s level 4
execute as @a[scores={hours=46, level=4}] run scoreboard players set @s level 5