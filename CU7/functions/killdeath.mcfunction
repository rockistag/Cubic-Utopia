execute at @a[scores={alive=0, tier=1}, tag=pvp] run scoreboard players add @p[r=5, rm=0.1] points 200
scoreboard players add @a[scores={alive=0, tier=1}] points -100
execute at @a[scores={alive=0, tier=2}, tag=pvp] run scoreboard players add @p[r=5, rm=0.1] points 400
scoreboard players add @a[scores={alive=0, tier=2}] points -300
execute at @a[scores={alive=0, tier=3}, tag=pvp] run scoreboard players add @p[r=5, rm=0.1] points 700
scoreboard players add @a[scores={alive=0, tier=3}] points -500
execute at @a[scores={alive=0, tier=4}, tag=pvp] run scoreboard players add @p[r=5, rm=0.1] points 1000
scoreboard players add @a[scores={alive=0, tier=4}] points -750
execute at @a[scores={alive=0, tier=5}, tag=pvp] run scoreboard players add @p[r=5, rm=0.1] points 1400
scoreboard players add @a[scores={alive=0, tier=5}] points -1000
execute at @a[scores={alive=0, tier=6}, tag=pvp] run scoreboard players add @p[r=5, rm=0.1] points 2000
scoreboard players add @a[scores={alive=0, tier=6}] points -1500

