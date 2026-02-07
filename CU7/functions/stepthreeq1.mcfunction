execute as @a[tag=lore1, scores={ach_inf=3}, tag=!ach_inf] run tellraw @s {"rawtext":[{"text":"§bYou have completed §dQuest 1 of Chapter 1. §eThe cabin holds many secrets."}]}
execute as @a[tag=lore2, scores={ach_anc=3}, tag=!ach_anc] run tellraw @s {"rawtext":[{"text":"§bYou have completed §dQuest 2 of Chapter 1. §eThat shard may come in handy later."}]}
execute as @a[tag=lore3, scores={ach_aba=3}, tag=!ach_aba] run tellraw @s {"rawtext":[{"text":"§bYou have completed §dChapter 1! §sYou hold an agent of the infection in your hands. Dont use it yet - it will be crucial for future adventures..."}]}
execute as @a[hasitem={item=diamond}, scores={ach_its=1}, tag=!diamond] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has made the achievement §2[Its a start]"}]}
execute as @a[tag=net, scores={ach_int=1}, tag=!nether] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has made the achievement §2[Into the depths]"}]}
execute as @a[hasitem={item=wolf_armor}, scores={ach_sco=3}] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has made the achievement §2[Scoot Scute]"}]}
execute as @a[hasitem={item=daylight_detector}, scores={ach_pas=3}] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has made the achievement §2[Passing the time]"}]}
execute as @a[hasitem={item=pale_hanging_moss}, scores={ach_han=3}] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has made the achievement §2[Hang in there]"}]}
execute as @a[tag=lore1, scores={ach_inf=3}, tag=!ach_inf] run playsound random.levelup @s[scores={sound=0}]
execute as @a[tag=lore2, scores={ach_anc=3}, tag=!ach_anc] run playsound random.levelup @s[scores={sound=0}]
execute as @a[tag=lore3, scores={ach_anc=3}, tag=!ach_aba] run playsound random.levelup @s[scores={sound=0}]
execute as @a[hasitem={item=diamond}, scores={ach_its=1}, tag=!diamond] run playsound random.levelup @a[scores={sound=0}]
execute as @a[tag=net, scores={ach_int=1}, tag=!nether] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=wolf_armor}, scores={ach_sco=3}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=daylight_detector}, scores={ach_pas=3}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=pale_hanging_moss}, scores={ach_han=3}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=diamond}, scores={ach_its=1}, tag=!diamond] run tellraw @s {"rawtext":[{"text":"[§dProgression§r]§b You have obtained diamonds and completed the §2[Its a start]§b achievement."}]}
execute in nether as @a[tag=net, scores={ach_int=1}, tag=!nether] run tellraw @s {"rawtext":[{"text":"[§dProgression§r]§b You have entered the nether and completed the §2[Into the depths]§b achievement."}]}
execute as @a[hasitem={item=wolf_armor}, scores={ach_sco=3}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b You have crafted wolf armor and completed the §2[Scoot Scute]§b achievement!"}]}
execute as @a[hasitem={item=daylight_detector}, scores={ach_pas=3}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b You have crafted a daylight sensor and completed the §2[Passing the time]§b achievement!"}]}
execute as @a[hasitem={item=pale_hanging_moss}, scores={ach_han=3}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b You have obtained pale hanging moss and completed the §2[Hang in there]§b achievement!"}]}
execute as @a[tag=lore1, scores={ach_inf=3}, tag=!ach_inf] run scoreboard players add @s points 250
execute as @a[tag=lore2, scores={ach_anc=3}, tag=!ach_anc] run scoreboard players add @s points 250
execute as @a[tag=lore3, scores={ach_aba=3}, tag=!ach_aba] run scoreboard players add @s points 250
execute as @a[hasitem={item=diamond}, scores={ach_its=1}, tag=!diamond] run scoreboard players add @s points 100
execute in nether as @a[tag=net, scores={ach_int=1}, tag=!nether] run scoreboard players add @s points 100
execute as @a[hasitem={item=wolf_armor}, scores={ach_sco=3}, tag=!wolf_armor] run scoreboard players add @s points 100
execute as @a[hasitem={item=daylight_detector}, scores={ach_pas=3}, tag=!daylight_detector] run scoreboard players add @s points 100
execute as @a[hasitem={item=pale_hanging_moss}, scores={ach_han=3}, tag=!pale_hanging_moss] run scoreboard players add @s points 100
execute as @a[tag=lore1, scores={ach_inf=3}, tag=!ach_inf] run scoreboard players add @s quests 1
execute as @a[tag=lore2, scores={ach_anc=3}, tag=!ach_anc] run scoreboard players add @s quests 1
execute as @a[tag=lore3, scores={ach_aba=3}, tag=!ach_aba] run scoreboard players add @s quests 1
execute as @a[hasitem={item=diamond}, scores={ach_its=1}, tag=!diamond] run scoreboard players add @s quests 1
execute in nether as @a[tag=net, scores={ach_int=1}, tag=!nether] run scoreboard players add @s quests 1
execute as @a[hasitem={item=wolf_armor}, scores={ach_sco=3}] run scoreboard players add @s quests 1
execute as @a[hasitem={item=daylight_detector}, scores={ach_pas=3}] run scoreboard players add @s quests 1
execute as @a[hasitem={item=pale_hanging_moss}, scores={ach_han=3}] run scoreboard players add @s quests 1
execute as @a[tag=lore1, scores={ach_inf=3}, tag=!ach_inf] run scoreboard players set @s ach_inf 4
execute as @a[tag=lore2, scores={ach_anc=3}, tag=!ach_anc] run scoreboard players set @s ach_anc 4
execute as @a[tag=lore3, scores={ach_aba=3}, tag=!ach_aba] run scoreboard players set @s ach_aba 4\
execute as @a[hasitem={item=diamond}, scores={ach_its=1}, tag=!diamond] run tag @s add diamond
execute in nether as @a[tag=net, scores={ach_int=1}, tag=!nether] run tag @s add nether
execute as @a[hasitem={item=wolf_armor}, scores={ach_sco=3}] run tag @s add ach_sco
execute as @a[hasitem={item=daylight_detector}, scores={ach_pas=3}] run tag @s add ach_pas
execute as @a[hasitem={item=pale_hanging_moss}, scores={ach_han=3}] run tag @s add ach_han
execute as @a[tag=diamond, tag=iron_ingot, tag=cobblestone, scores={ach_its=1}] run scoreboard players set @s ach_its 4
execute as @a[tag=diamond_pickaxe, tag=obsidian, tag=nether, scores={ach_int=1}] run scoreboard players set @s ach_int 4
execute as @a[hasitem={item=wolf_armor}, scores={ach_sco=3}] run scoreboard players set @s ach_sco 4
execute as @a[hasitem={item=daylight_detector}, scores={ach_pas=3}] run scoreboard players set @s ach_pas 4
execute as @a[hasitem={item=pale_hanging_moss}, scores={ach_han=3}] run scoreboard players set @s ach_han 4
execute as @a[tag=lore1, tag=!ach_inf] run tag @s add ach_inf
execute as @a[tag=lore2, tag=!ach_anc] run tag @s add ach_anc
execute as @a[tag=lore3, tag=!ach_aba] run tag @s add ach_aba