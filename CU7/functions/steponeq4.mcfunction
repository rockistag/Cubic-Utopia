execute as @a[hasitem={item=flower_pot}, scores={ach_gar=1}] run tellraw @a {"rawtext":[{"text":"§dQuests§r]§b Step 1 Complete. §eStep 2: Obtain a cactus flower from the desert."}]}
execute as @a[hasitem={item=bone}, scores={ach_fri=1}] run tellraw @a {"rawtext":[{"text":"§dQuests§r]§b Step 1 Complete. §eStep 2: Obtain a saddle by either crafting it with leather or finding it elsewhere."}]}
execute as @a[hasitem={item=gunpowder}, scores={ach_pay=1}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 1 Complete. §eStep 2: Kill a phantom and get a phantom membrane!"}]}
execute as @a[hasitem={item=pointed_dripstone}, scores={ach_cav=1}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 1 Complete. §eStep 2: Travel to the lush caves and obtain a spore blossom."}]}
execute as @a[hasitem={item=flower_pot}, scores={ach_gar=1}] run playsound note.bell @s
execute as @a[hasitem={item=bone}, scores={ach_fri=1}] run playsound note.bell @s
execute as @a[hasitem={item=gunpowder}, scores={ach_pay=1}] run playsound note.bell @s
execute as @a[hasitem={item=pointed_dripstone}, scores={ach_cav=1}] run playsound note.bell @s
execute as @a[hasitem={item=flower_pot}, scores={ach_gar=1}, tag=!flower_pot] run scoreboard players add @s points 10
execute as @a[hasitem={item=bone}, scores={ach_fri=1}, tag=!bone] run scoreboard players add @s points 10
execute as @a[hasitem={item=gunpowder}, scores={ach_pay=1}, tag=!gunpowder] run scoreboard players add @s points 10
execute as @a[hasitem={item=pointed_dripstone}, scores={ach_cav=1}, tag=!pointed_dripstone] run scoreboard players add @s points 10
execute as @a[hasitem={item=flower_pot}, scores={ach_gar=1}] run scoreboard players set @s ach_gar 2
execute as @a[hasitem={item=bone}, scores={ach_fri=1}] run scoreboard players set @s ach_fri 2
execute as @a[hasitem={item=gunpowder}, scores={ach_pay=1}] run scoreboard players set @s ach_pay 2
execute as @a[hasitem={item=pointed_dripstone}, scores={ach_cav=1}] run scoreboard players set @s ach_cav 2