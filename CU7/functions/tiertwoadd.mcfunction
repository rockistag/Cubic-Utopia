execute as @a[scores={hours=4, tier=1}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[scores={hours=6, level=1}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=8, level=2}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=10, level=3}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=12, level=4}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=4, tier=1}] run scoreboard players set @s tier 2
execute as @a[scores={hours=4, level=5}] run scoreboard players set @s level 1
execute as @a[scores={hours=6, level=1}] run scoreboard players set @s level 2
execute as @a[scores={hours=8, level=2}] run scoreboard players set @s level 3
execute as @a[scores={hours=10, level=3}] run scoreboard players set @s level 4
execute as @a[scores={hours=12, level=4}] run scoreboard players set @s level 5









