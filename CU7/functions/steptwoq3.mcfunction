execute as @a[hasitem={item=dragon_breath}, scores={ach_end=1}, tag=!dragon_breath] run tellraw @a {"rawtext":[{"text":"[§dProgression§r]§d "},{"selector":"@s"},{"text":"§v has obtained dragons breath!"}]}
execute as @a[hasitem={item=wither_skeleton_skull}, scores={ach_beg=1}, tag=!wither_skull] run tellraw @a {"rawtext":[{"text":"[§dProgression§r]§d "},{"selector":"@s"},{"text":"§v has obtained a wither skull!"}]}
execute as @a[hasitem={item=heart_of_the_sea}, scores={ach_moc=2}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 2 Complete! §eFinal Step: Craft a conduit using nautilus shells and your heart… of the sea."}]}
execute as @a[hasitem={item=netherite_ingot}, scores={ach_ser=2}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 2 Complete! §eFinal Step: Upgrade a diamond hoe into a netherite hoe using a netherite upgrade smithing template and your ingot."}]}
execute as @a[hasitem={item=ominous_trial_key}, scores={ach_tri=2}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b Step 2 Complete! §eFinal Step: Craft a mace using heavy cores found in ominous vaults."}]}
execute as @a[hasitem={item=dragon_breath}, scores={ach_end=1}, tag=!dragon_breath] run playsound random.levelup @s
execute as @a[hasitem={item=wither_skeleton_skull}, scores={ach_beg=1}, tag=!wither_skull] run playsound random.levelup @s
execute as @a[hasitem={item=heart_of_the_sea}, scores={ach_moc=2}] run playsound random.levelup @s
execute as @a[hasitem={item=netherite_ingot}, scores={ach_ser=2}] run playsound random.levelup @s
execute as @a[hasitem={item=ominous_trial_key}, scores={ach_tri=2}] run playsound random.levelup @s
execute as @a[hasitem={item=dragon_breath}, scores={ach_end=1}, tag=!dragon_breath] run scoreboard players add @s points 1000
execute as @a[hasitem={item=wither_skeleton_skull}, scores={ach_beg=1}, tag=!wither_skull] run scoreboard players add @s points 1000
execute as @a[hasitem={item=heart_of_the_sea}, scores={ach_moc=2}, tag=!heart_of_the_sea] run scoreboard players add @s points 1000
execute as @a[hasitem={item=netherite_ingot}, scores={ach_ser=2}, tag=!netherite_ingot] run scoreboard players add @s points 1000
execute as @a[hasitem={item=ominous_trial_key}, scores={ach_tri=2}, tag=!trial_key] run scoreboard players add @s points 1000
execute as @a[hasitem={item=dragon_breath}, scores={ach_end=1}, tag=!dragon_breath] run tag @s add dragon_breath
execute as @a[hasitem={item=wither_skeleton_skull}, scores={ach_beg=1}, tag=!wither_skull] run tag @s add wither_skull
execute as @a[hasitem={item=heart_of_the_sea}, scores={ach_moc=2}] run scoreboard players set @s ach_moc 3
execute as @a[hasitem={item=netherite_ingot}, scores={ach_ser=2}] run scoreboard players set @s ach_ser 3
execute as @a[hasitem={item=ominous_trial_key}, scores={ach_tri=2}] run scoreboard players set @s ach_tri 3
execute as @a[scores={ach_end=1}, tag=dragon, tag=dragon_breath, tag=end] run scoreboard players set @s ach_bun 4
execute as @a[scores={ach_beg=1}, tag=wither, tag=wither_skull, tag=soul_sand] run scoreboard players set @s ach_beg 4
















