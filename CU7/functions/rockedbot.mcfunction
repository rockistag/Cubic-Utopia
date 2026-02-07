execute at @a[name=Rocked4129, tag=Valid, tag=!bot] run scoreboard players add "Rocked isabotrn" points 0
execute at @a[name=Rocked4129, tag=!Valid, tag=bot] run scoreboard players reset "Rocked isabotrn" points
tag @a[name=Rocked4129, tag=!Valid, tag=bot] remove bot
tag @a[name=Rocked4129, tag=Valid] add bot
tag @a[name=Rocked4129, tag=Valid, tag=bot] remove Valid
tag @a[name=Rocked4129, tag=!Valid, tag=!bot] add Valid
scoreboard players reset @a[name=Rocked4129, tag=!Valid, tag=bot] displaypoints
