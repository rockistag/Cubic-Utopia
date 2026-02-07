execute as @a[tag=dragonKilled, scores={ach_end=1}, tag=!dragon] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has completed the challenge §5[The End]"}]}
execute as @a[tag=witherKilled, scores={ach_beg=1}, tag=!wither] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has completed the challenge §5[The Beginning]"}]}
execute as @a[hasitem={item=conduit}, scores={ach_moc=3}] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has completed the challenge §5[Mock Straw Man]"}]}
execute as @a[hasitem={item=netherite_hoe}, scores={ach_ser=3}] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has completed the challenge §5[Serious Dedication]"}]}
execute as @a[hasitem={item=mace}, scores={ach_tri=3}] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has completed the challenge §5[Tricky Trials]"}]}
execute as @a[tag=dragonKilled, scores={ach_end=1}, tag=!dragon] run playsound random.levelup @a[scores={sound=0}]
execute as @a[tag=witherKilled, scores={ach_beg=1}, tag=!wither] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=conduit}, scores={ach_moc=3}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=netherite_hoe}, scores={ach_ser=3}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=mace}, scores={ach_tri=3}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[tag=dragonKilled, scores={ach_end=1}, tag=!dragon] run tellraw @s {"rawtext":[{"text":"[§dProgression§r]§b You have defeated the ender dragon and completed the challenge §5[Bundles of storage]§b."}]}
execute as @a[tag=witherKilled, scores={ach_beg=1}, tag=!wither] run tellraw @s {"rawtext":[{"text":"[§dProgression§r]§b You have defeated the wither and completed the challenge §5[The Beginning]§b."}]}
execute as @a[hasitem={item=conduit}, scores={ach_moc=3}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b You have crafted a conduit and completed the §5[Mock Straw Man]§b challenge."}]}
execute as @a[hasitem={item=netherite_hoe}, scores={ach_ser=3}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b You have crafted a netherite hoe and completed the §5[Serious Dedication]§b challenge."}]}
execute as @a[hasitem={item=mace}, scores={ach_tri=3}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b You have crafted a mace and completed the §5[Tricky Trials]§b challenge."}]}
execute as @a[tag=dragonKilled, scores={ach_end=1}, tag=!dragon] run scoreboard players add @s points 5000
execute as @a[tag=witherKilled, scores={ach_beg=1}, tag=!wither] run scoreboard players add @s points 5000
execute as @a[hasitem={item=conduit}, scores={ach_moc=3}] run scoreboard players add @s points 5000
execute as @a[hasitem={item=netherite_hoe}, scores={ach_ser=3}] run scoreboard players add @s points 5000
execute as @a[hasitem={item=mace}, scores={ach_tri=3}] run scoreboard players add @s points 5000
execute as @a[tag=dragonKilled, scores={ach_end=1}, tag=!dragon] run scoreboard players add @s quests 1
execute as @a[tag=witherKilled, scores={ach_beg=1}, tag=!wither] run scoreboard players add @s quests 1
execute as @a[hasitem={item=conduit}, scores={ach_moc=3}] run scoreboard players add @s quests 1
execute as @a[hasitem={item=netherite_hoe}, scores={ach_ser=3}] run scoreboard players add @s quests 1
execute as @a[hasitem={item=mace}, scores={ach_tri=3}] run scoreboard players add @s quests 1
execute as @a[tag=dragonKilled, scores={ach_end=1}, tag=!dragon] run tag @s add dragon
execute as @a[tag=witherKilled, scores={ach_beg=1}, tag=!wither] run tag @s add wither
execute as @a[hasitem={item=conduit}, scores={ach_moc=3}] run tag @s add ach_moc
execute as @a[hasitem={item=netherite_hoe}, scores={ach_ser=3}] run tag @s add ach_ser
execute as @a[hasitem={item=mace}, scores={ach_tri=3}] run tag @s add ach_tri
execute as @a[scores={ach_end=1}, tag=dragon, tag=dragon_breath, tag=end] run scoreboard players set @s ach_bun 4
execute as @a[scores={ach_beg=1}, tag=wither, tag=wither_skull, tag=soul_sand] run scoreboard players set @s ach_beg 4
execute as @a[hasitem={item=conduit}, scores={ach_moc=3}] run scoreboard players set @s ach_moc 4
execute as @a[hasitem={item=netherite_hoe}, scores={ach_ser=3}] run scoreboard players set @s ach_ser 4
execute as @a[hasitem={item=mace}, scores={ach_tri=3}] run scoreboard players set @s ach_tri 4

