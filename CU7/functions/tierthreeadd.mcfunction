execute as @a[scores={hours=15, tier=2}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[scores={hours=18, level=1}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=21, level=2}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=24, level=3}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=27, level=4}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=15, tier=2}] run scoreboard players set @s tier 3
execute as @a[scores={hours=15, level=5}] run scoreboard players set @s level 1
execute as @a[scores={hours=18, level=1}] run scoreboard players set @s level 2
execute as @a[scores={hours=21, level=2}] run scoreboard players set @s level 3
execute as @a[scores={hours=24, level=3}] run scoreboard players set @s level 4
execute as @a[scores={hours=27, level=4}] run scoreboard players set @s level 5