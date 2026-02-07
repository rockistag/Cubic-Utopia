execute as @a[tag=en, scores={ach_end=1}, tag=!end] run tellraw @a {"rawtext":[{"text":"[§dProgression§r]§d "},{"selector":"@s"},{"text":"§e has entered the end!"}]}
execute as @a[hasitem={item=soul_sand}, scores={ach_beg=1}, tag=!soul_sand] run tellraw @a {"rawtext":[{"text":"[§dProgression§r]§d "},{"selector":"@s"},{"text":"§e has obtained soul sand!"}]}
execute as @a[hasitem={item=nautilus_shell}, scores={ach_moc=1}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 1 Complete. §eStep 2: Obtain a heart of the sea by exploring the ocean near the aqua parkour."}]}
execute as @a[hasitem={item=ancient_debris}, scores={ach_ser=1}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 1 Complete. §eStep 2: Craft a netherite ingot using netherite scraps (smelted from ancient debris) and gold."}]}
execute as @a[hasitem={item=trial_key}, scores={ach_tri=1}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 1 Complete. §eStep 2: Obtain an ominous key by fighting trials with bad omen."}]}
execute as @a[tag=en, scores={ach_end=1}, tag=!end] run playsound note.bell @s
execute as @a[hasitem={item=soul_sand}, scores={ach_beg=1}, tag=!soul_sand] run playsound note.bell @s
execute as @a[hasitem={item=nautilus_shell}, scores={ach_moc=1}] run playsound note.bell @s
execute as @a[hasitem={item=ancient_debris}, scores={ach_ser=1}] run playsound note.bell @s
execute as @a[hasitem={item=trial_key}, scores={ach_tri=1}] run playsound note.bell @s
execute as @a[tag=en, scores={ach_end=1}, tag=!end] run scoreboard players add @s points 100
execute as @a[hasitem={item=soul_sand}, scores={ach_beg=1}, tag=!soul_sand] run scoreboard players add @s points 100
execute as @a[hasitem={item=nautilus_shell}, scores={ach_moc=1}, tag=!nautilus_shell] run scoreboard players add @s points 100
execute as @a[hasitem={item=ancient_debris}, scores={ach_ser=1}, tag=!ancient_debris] run scoreboard players add @s points 100
execute as @a[hasitem={item=trial_key}, scores={ach_tri=1}, tag=!trial_key] run scoreboard players add @s points 100
execute as @a[tag=en, scores={ach_end=1}, tag=!end] run tag @s add end
execute as @a[hasitem={item=soul_sand}, scores={ach_beg=1}, tag=!soul_sand] run tag @s add soul_sand
execute as @a[hasitem={item=nautilus_shell}, scores={ach_moc=1}] run scoreboard players set @s ach_moc 2
execute as @a[hasitem={item=ancient_debris}, scores={ach_ser=1}] run scoreboard players set @s ach_ser 2
execute as @a[hasitem={item=trial_key}, scores={ach_tri=1}] run scoreboard players set @s ach_tri 2
execute as @a[scores={ach_end=1}, tag=dragon, tag=dragon_breath, tag=end] run scoreboard players set @s ach_bun 4
execute as @a[scores={ach_beg=1}, tag=wither, tag=wither_skull, tag=soul_sand] run scoreboard players set @s ach_beg 4












