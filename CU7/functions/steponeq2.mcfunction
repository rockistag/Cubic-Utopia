execute as @a[hasitem={item=barrel}, scores={ach_bun=1}, tag=!barrel] run tellraw @a {"rawtext":[{"text":"[§dProgression§r]§d "},{"selector":"@s"},{"text":"§b has obtained a barrel!"}]}
execute as @a[hasitem={item=honeycomb}, scores={ach_bee=1}] run tellraw @a {"rawtext":[{"text":"§dQuests§r]§b Step 1 Complete. §eStep 2: Obtain the bees nest by using a tool with silk touch."}]}
execute as @a[hasitem={item=chiseled_stone_bricks}, scores={ach_cou=1}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 1 Complete. §eStep 2: Craft a lodestone using your chiseled stone bricks and iron."}]}
execute as @a[hasitem={item=blue_wool}, scores={ach_tag=1}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 1 Complete. §eStep 2: Find a name tag, good luck. Lol!"}]}
execute as @a[hasitem={item=milk_bucket}, scores={ach_buc=1}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 1 Complete. §eStep 2: Travel to the mountains and bucket some powder snow."}]}
execute as @a[hasitem={item=barrel}, scores={ach_bun=1}, tag=!barrel] run playsound note.bell @s
execute as @a[hasitem={item=honeycomb}, scores={ach_bee=1}] run playsound note.bell @s
execute as @a[hasitem={item=chiseled_stone_bricks}, scores={ach_cou=1}] run playsound note.bell @s
execute as @a[hasitem={item=blue_wool}, scores={ach_tag=1}] run playsound note.bell @s
execute as @a[hasitem={item=milk_bucket}, scores={ach_buc=1}] run playsound note.bell @s
execute as @a[hasitem={item=barrel}, scores={ach_bun=1}, tag=!barrel] run scoreboard players add @s points 10
execute as @a[hasitem={item=honeycomb}, scores={ach_bee=1}, tag=!honeycomb] run scoreboard players add @s points 10
execute as @a[hasitem={item=chiseled_stone_bricks}, scores={ach_cou=1}, tag=!chiseled_stone_bricks] run scoreboard players add @s points 10
execute as @a[hasitem={item=blue_wool}, scores={ach_tag=1}, tag=!blue_wool] run scoreboard players add @s points 10
execute as @a[hasitem={item=milk_bucket}, scores={ach_buc=1}, tag=!milk_bucket] run scoreboard players add @s points 10
execute as @a[hasitem={item=barrel}, scores={ach_bun=1}, tag=!barrel] run tag @s add barrel
execute as @a[hasitem={item=honeycomb}, scores={ach_bee=1}] run scoreboard players set @s ach_bee 2
execute as @a[hasitem={item=chiseled_stone_bricks}, scores={ach_cou=1}] run scoreboard players set @s ach_cou 2
execute as @a[hasitem={item=blue_wool}, scores={ach_tag=1}] run scoreboard players set @s ach_tag 2
execute as @a[hasitem={item=milk_bucket}, scores={ach_buc=1}] run scoreboard players set @s ach_buc 2
execute as @a[tag=shulker_box, tag=bundle, tag=barrel, scores={ach_bun=1}] run scoreboard players set @s ach_bun 4













