execute as @a[scores={hours=90, tier=5}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[scores={hours=105, level=1}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=120, level=2}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=135, level=3}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=150, level=4}] run playsound note.bell @s[scores={sound=0}]
execute as @a[scores={hours=90, tier=5}] run scoreboard players set @s tier 6
execute as @a[scores={hours=90, level=5}] run scoreboard players set @s level 1
execute as @a[scores={hours=105, level=1}] run scoreboard players set @s level 2
execute as @a[scores={hours=120, level=2}] run scoreboard players set @s level 3
execute as @a[scores={hours=135, level=3}] run scoreboard players set @s level 4
execute as @a[scores={hours=150, level=4}] run scoreboard players set @s level 5