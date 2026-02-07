execute as @a[hasitem={item=iron_ingot}, scores={ach_its=1}, tag=!iron_ingot] run tellraw @a {"rawtext":[{"text":"[§dProgression§r]§d "},{"selector":"@s"},{"text":"§b has obtained iron!"}]}
execute as @a[hasitem={item=obsidian}, scores={ach_int=1}, tag=!obsidian] run tellraw @a {"rawtext":[{"text":"[§dProgression§r]§d "},{"selector":"@s"},{"text":"§b has obtained obsidian!"}]}
execute as @a[hasitem={item=armadillo_scute}, scores={ach_sco=2}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 2 Complete! §eFinal Step: Craft wolf armor using your armadillo scutes!"}]}
execute as @a[hasitem={item=clock}, scores={ach_pas=2}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 2 Complete! §eFinal Step: Craft a daylight sensor using your quartz, wood slabs, and glass!"}]}
execute as @a[hasitem={item=mangrove_propagule}, scores={ach_han=2}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 2 Complete! §eFinal Step: Travel to the pale garden and harvest pale hanging moss using shears (or silk touch)!"}]}
execute as @a[hasitem={item=iron_ingot}, scores={ach_its=1}, tag=!iron_ingot] run playsound note.bell @s
execute as @a[hasitem={item=obsidian}, scores={ach_int=1}, tag=!obsidian] run playsound note.bell @s
execute as @a[hasitem={item=armadillo_scute}, scores={ach_sco=2}] run playsound note.bell @s
execute as @a[hasitem={item=clock}, scores={ach_pas=2}] run playsound note.bell @s
execute as @a[hasitem={item=mangrove_propagule}, scores={ach_han=2}] run playsound note.bell @s
execute as @a[hasitem={item=iron_ingot}, scores={ach_its=1}, tag=!iron_ingot] run scoreboard players add @s points 50
execute as @a[hasitem={item=obsidian}, scores={ach_int=1}, tag=!obsidian] run scoreboard players add @s points 50
execute as @a[hasitem={item=armadillo_scute}, scores={ach_sco=2}, tag=!armadillo_scute] run scoreboard players add @s points 50
execute as @a[hasitem={item=clock}, scores={ach_pas=2}, tag=!clock] run scoreboard players add @s points 50
execute as @a[hasitem={item=mangrove_propagule}, scores={ach_han=2}, tag=!mangrove_propagule] run scoreboard players add @s points 50
execute as @a[hasitem={item=iron_ingot}, scores={ach_its=1}, tag=!iron_ingot] run tag @s add iron_ingot
execute as @a[hasitem={item=obsidian}, scores={ach_int=1}, tag=!obsidian] run tag @s add obsidian
execute as @a[hasitem={item=armadillo_scute}, scores={ach_sco=2}] run scoreboard players set @s ach_sco 3
execute as @a[hasitem={item=clock}, scores={ach_pas=2}] run scoreboard players set @s ach_pas 3
execute as @a[hasitem={item=mangrove_propagule}, scores={ach_han=2}] run scoreboard players set @s ach_han 3
execute as @a[tag=diamond, tag=iron_ingot, tag=cobblestone, scores={ach_its=1}] run scoreboard players set @s ach_its 4
execute as @a[tag=diamond_pickaxe, tag=obsidian, tag=nether, scores={ach_int=1}] run scoreboard players set @s ach_int 4














