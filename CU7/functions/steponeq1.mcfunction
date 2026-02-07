execute as @a[hasitem={item=cobblestone}, scores={ach_its=1}, tag=!cobblestone] run tellraw @a {"rawtext":[{"text":"[§dProgression§r]§d "},{"selector":"@s"},{"text":"§b has obtained cobblestone."}]}
execute as @a[hasitem={item=diamond_pickaxe}, scores={ach_int=1}, tag=!diamond_pickaxe] run tellraw @a {"rawtext":[{"text":"[§dProgression§r]§d "},{"selector":"@s"},{"text":"§b has obtained a diamond pickaxe."}]}
execute as @a[hasitem={item=brush}, scores={ach_sco=1}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 1 Complete. §eStep 2: Obtain armadillo scutes from armadillos in Savanna or Badlands."}]}
execute as @a[hasitem={item=quartz}, scores={ach_pas=1}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 1 Complete. §eStep 2: Craft a clock using gold and redstone."}]}
execute as @a[hasitem={item=cocoa_beans}, scores={ach_han=1}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 1 Complete. §eStep 2: Travel to the mangrove swamp and harvest a propagule."}]}
execute as @a[hasitem={item=cobblestone}, scores={ach_its=1}, tag=!cobblestone] run playsound note.bell @s
execute as @a[hasitem={item=diamond_pickaxe}, scores={ach_int=1}, tag=!diamond_pickaxe] run playsound note.bell @s
execute as @a[hasitem={item=brush}, scores={ach_sco=1}] run playsound note.bell @s
execute as @a[hasitem={item=quartz}, scores={ach_pas=1}] run playsound note.bell @s
execute as @a[hasitem={item=cocoa_beans}, scores={ach_han=1}] run playsound note.bell @s
execute as @a[hasitem={item=cobblestone}, scores={ach_its=1}, tag=!cobblestone] run scoreboard players add @s points 10
execute as @a[hasitem={item=diamond_pickaxe}, scores={ach_int=1}, tag=!diamond_pickaxe] run scoreboard players add @s points 10
execute as @a[hasitem={item=brush}, scores={ach_sco=1}, tag=!brush] run scoreboard players add @s points 10
execute as @a[hasitem={item=quartz}, scores={ach_pas=1}, tag=!quartz] run scoreboard players add @s points 10
execute as @a[hasitem={item=cocoa_beans}, scores={ach_han=1}, tag=!cocoa_beans] run scoreboard players add @s points 10
execute as @a[hasitem={item=cobblestone}, scores={ach_its=1}, tag=!cobblestone] run tag @s add cobblestone
execute as @a[hasitem={item=diamond_pickaxe}, scores={ach_int=1}, tag=!diamond_pickaxe] run tag @s add diamond_pickaxe
execute as @a[hasitem={item=brush}, scores={ach_sco=1}] run scoreboard players set @s ach_sco 2
execute as @a[hasitem={item=quartz}, scores={ach_pas=1}] run scoreboard players set @s ach_pas 2
execute as @a[hasitem={item=cocoa_beans}, scores={ach_han=1}] run scoreboard players set @s ach_han 2
execute as @a[tag=diamond, tag=iron_ingot, tag=cobblestone, scores={ach_its=1}] run scoreboard players set @s ach_its 4
execute as @a[tag=diamond_pickaxe, tag=obsidian, tag=nether, scores={ach_int=1}] run scoreboard players set @s ach_int 4