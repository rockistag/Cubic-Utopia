tag @p[r=1] add rtp
spreadplayers 0 0 0 10000 @p[tag=rtp] ~
execute as @a[tag=rtp] run tp @s ~ 320 ~
execute as @a[tag=rtp] run effect @s slow_falling 60 1 true
tag @a remove rtp
