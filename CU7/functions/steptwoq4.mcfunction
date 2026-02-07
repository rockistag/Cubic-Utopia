execute as @a[hasitem={item=cactus_flower}, scores={ach_gar=2}] run tellraw @a {"rawtext":[{"text":"§dQuests§r]§b Step 2 Complete! §eFinal Step: Obtain a creaking heart from the pale garden."}]}
execute as @a[hasitem={item=saddle}, scores={ach_fri=2}] run tellraw @a {"rawtext":[{"text":"§dQuests§r]§b Step 2 Complete! §eFinal Step: Head to the ocean near spawn and find yourself a sniffer egg."}]}
execute as @a[hasitem={item=phantom_membrane}, scores={ach_pay=2}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 2 Complete! §eFinal Step: Go to the nether and get a ghast tear from a ghast!"}]}
execute as @a[hasitem={item=spore_blossom}, scores={ach_cav=2}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 2 Complete! §eFinal Step: Travel to the deep dark and get a sculk shrieker using silk touch. Step carefully…"}]}
execute as @a[hasitem={item=cactus_flower}, scores={ach_gar=2}] run playsound note.bell @s
execute as @a[hasitem={item=saddle}, scores={ach_fri=2}] run playsound note.bell @s
execute as @a[hasitem={item=phantom_membrane}, scores={ach_pay=2}] run playsound note.bell @s
execute as @a[hasitem={item=spore_blossom}, scores={ach_cav=2}] run playsound note.bell @s
execute as @a[hasitem={item=cactus_flower}, scores={ach_gar=2}, tag=!cactus_flower] run scoreboard players add @s points 100
execute as @a[hasitem={item=saddle}, scores={ach_fri=2}, tag=!saddle] run scoreboard players add @s points 100
execute as @a[hasitem={item=phantom_membrane}, scores={ach_pay=2}, tag=!phantom_membrane] run scoreboard players add @s points 100
execute as @a[hasitem={item=spore_blossom}, scores={ach_cav=2}, tag=!spore_blossom] run scoreboard players add @s points 100
execute as @a[hasitem={item=cactus_flower}, scores={ach_gar=2}] run scoreboard players set @s ach_gar 3
execute as @a[hasitem={item=saddle}, scores={ach_fri=2}] run scoreboard players set @s ach_fri 3
execute as @a[hasitem={item=phantom_membrane}, scores={ach_pay=2}] run scoreboard players set @s ach_pay 3
execute as @a[hasitem={item=spore_blossom}, scores={ach_cav=2}] run scoreboard players set @s ach_cav 3















