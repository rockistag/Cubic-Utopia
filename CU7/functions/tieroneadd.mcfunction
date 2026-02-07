execute as @a[scores={minutes=10, tier=1}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=0, minutes=30, level=1}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=1, level=2}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=2, level=3}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=3, level=4}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={minutes=10, tier=1}] run tag @s add rank:beginner
execute as @a[scores={minutes=10, tier=1}] run scoreboard players set @s tier 1
execute as @a[scores={minutes=10, level=0}] run scoreboard players set @s level 1
execute as @a[scores={hours=0, minutes=30, level=1}] run scoreboard players set @s level 2
execute as @a[scores={hours=1, level=2}] run scoreboard players set @s level 3
execute as @a[scores={hours=2, level=3}] run scoreboard players set @s level 4
execute as @a[scores={hours=3, level=4}] run scoreboard players set @s level 5