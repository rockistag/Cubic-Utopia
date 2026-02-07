execute as @a[hasitem={item=bundle}, scores={ach_bun=1}, tag=!bundle] run tellraw @a {"rawtext":[{"text":"[§dProgression§r]§d "},{"selector":"@s"},{"text":"§e has obtained a bundle!"}]}
execute as @a[hasitem={item=bee_nest}, scores={ach_bee=2}] run tellraw @a {"rawtext":[{"text":"§dQuests§r]§b Step 2 Complete! §eFinal Step: Craft a honey block using bottles of honey from your bee nest."}]}
execute as @a[hasitem={item=lodestone}, scores={ach_cou=2}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 2 Complete! §eFinal Step: Use a compass on the lodestone to make a lodestone compass."}]}
execute as @a[hasitem={item=name_tag}, scores={ach_tag=2}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 2 Complete! §eFinal Step: Craft a crafter. Then, youll be the TAGCrafter (Insert Vine Boom Here)."}]}
execute as @a[hasitem={item=powder_snow_bucket}, scores={ach_buc=2}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 2 Complete! §eFinal Step: Travel to a swamp and bucket some tadpoles."}]}
execute as @a[hasitem={item=bundle}, scores={ach_bun=1}, tag=!bundle] run playsound note.bell @s
execute as @a[hasitem={item=bee_nest}, scores={ach_bee=2}] run playsound note.bell @s
execute as @a[hasitem={item=lodestone}, scores={ach_cou=2}] run playsound note.bell @s
execute as @a[hasitem={item=name_tag}, scores={ach_tag=2}] run playsound note.bell @s
execute as @a[hasitem={item=powder_snow_bucket}, scores={ach_buc=2}] run playsound note.bell @s
execute as @a[hasitem={item=bundle}, scores={ach_bun=1}, tag=!bundle] run scoreboard players add @s points 100
execute as @a[hasitem={item=bee_nest}, scores={ach_bee=2}, tag=!bee_nest] run scoreboard players add @s points 100
execute as @a[hasitem={item=lodestone}, scores={ach_cou=2}, tag=!lodestone] run scoreboard players add @s points 100
execute as @a[hasitem={item=name_tag}, scores={ach_tag=2}, tag=!name_tag] run scoreboard players add @s points 100
execute as @a[hasitem={item=powder_snow_bucket}, scores={ach_buc=2}, tag=!powder_snow_bucket] run scoreboard players add @s points 100
execute as @a[hasitem={item=bundle}, scores={ach_bun=1}] run tag @s add bundle
execute as @a[hasitem={item=bee_nest}, scores={ach_bee=2}] run scoreboard players set @s ach_bee 3
execute as @a[hasitem={item=lodestone}, scores={ach_cou=2}] run scoreboard players set @s ach_cou 3
execute as @a[hasitem={item=name_tag}, scores={ach_tag=2}] run scoreboard players set @s ach_tag 3
execute as @a[hasitem={item=powder_snow_bucket}, scores={ach_buc=2}] run scoreboard players set @s ach_buc 3
execute as @a[tag=shulker_box, tag=bundle, tag=barrel, scores={ach_bun=1}] run scoreboard players set @s ach_bun 4















