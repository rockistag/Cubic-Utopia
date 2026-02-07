execute as @a[scores={hours=50, tier=4}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[scores={hours=55, level=1}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=60, level=2}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=70, level=3}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=80, level=4}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=50, tier=4}] run scoreboard players set @s tier 5
execute as @a[scores={hours=50, level=5}] run scoreboard players set @s level 1
execute as @a[scores={hours=55, level=1}] run scoreboard players set @s level 2
execute as @a[scores={hours=60, level=2}] run scoreboard players set @s level 3
execute as @a[scores={hours=70, level=3}] run scoreboard players set @s level 4
execute as @a[scores={hours=80, level=4}] run scoreboard players set @s level 5