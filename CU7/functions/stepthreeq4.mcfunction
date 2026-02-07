execute as @a[hasitem={item=creaking_heart}, scores={ach_gar=3}] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has made the achievement §2[Gardener]"}]}
execute as @a[hasitem={item=sniffer_egg}, scores={ach_fri=3}] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has made the achievement §2[Friendly Frolics]"}]}
execute as @a[hasitem={item=ghast_tear}, scores={ach_pay=3}] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has made the achievement §2[Payback]"}]}
execute as @a[hasitem={item=sculk_shrieker}, scores={ach_cav=3}] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has made the achievement §2[Cave Diver]"}]}
execute as @a[hasitem={item=creaking_heart}, scores={ach_gar=3}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=sniffer_egg}, scores={ach_fri=3}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=ghast_tear}, scores={ach_pay=3}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=sculk_shrieker}, scores={ach_cav=3}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=creaking_heart}, scores={ach_gar=3}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b You have obtained a creaking heart and made the §2[Gardener]§b achievement."}]}
execute as @a[hasitem={item=sniffer_egg}, scores={ach_fri=3}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b You have obtained a sniffer egg and made the §2[Friendly Frolics]§b achievement."}]}
execute as @a[hasitem={item=ghast_tear}, scores={ach_pay=3}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b You have procured a ghasts tear and made the §2[Payback]§b achievement."}]}
execute as @a[hasitem={item=sculk_shrieker}, scores={ach_cav=3}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b You have crafted a netherite hoe and completed the §2[Cave Diver]§b achievement."}]}
execute as @a[hasitem={item=creaking_heart}, scores={ach_gar=3}, tag=!creaking_heart] run scoreboard players add @s points 1000
execute as @a[hasitem={item=sniffer_egg}, scores={ach_fri=3}, tag=!sniffer_egg] run scoreboard players add @s points 1000
execute as @a[hasitem={item=ghast_tear}, scores={ach_pay=3}, tag=!ghast_tear] run scoreboard players add @s points 1000
execute as @a[hasitem={item=sculk_shrieker}, scores={ach_cav=3}, tag=!sculk_shrieker] run scoreboard players add @s points 1000
execute as @a[hasitem={item=creaking_heart}, scores={ach_gar=3}] run scoreboard players add @s quests 1
execute as @a[hasitem={item=sniffer_egg}, scores={ach_fri=3}] run scoreboard players add @s quests 1
execute as @a[hasitem={item=ghast_tear}, scores={ach_pay=3}] run scoreboard players add @s quests 1
execute as @a[hasitem={item=sculk_shrieker}, scores={ach_cav=3}] run scoreboard players add @s quests 1
execute as @a[hasitem={item=creaking_heart}, scores={ach_gar=3}] run tag @s add ach_gar
execute as @a[hasitem={item=sniffer_egg}, scores={ach_fri=3}] run tag @s add ach_fri
execute as @a[hasitem={item=ghast_tear}, scores={ach_pay=3}] run tag @s add ach_pay
execute as @a[hasitem={item=sculk_shrieker}, scores={ach_cav=3}] run tag @s add ach_cav
execute as @a[hasitem={item=creaking_heart}, scores={ach_gar=3}] run scoreboard players set @s ach_gar 4
execute as @a[hasitem={item=sniffer_egg}, scores={ach_fri=3}] run scoreboard players set @s ach_fri 4
execute as @a[hasitem={item=ghast_tear}, scores={ach_pay=3}] run scoreboard players set @s ach_pay 4
execute as @a[hasitem={item=sculk_shrieker}, scores={ach_cav=3}] run scoreboard players set @s ach_cav 4

