execute as @a[hasitem={item=undyed_shulker_box}, scores={ach_bun=1}, tag=!shulker_box] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has made the achievement §2[Bundles of storage]"}]}
execute as @a[hasitem={item=honey_block}, scores={ach_bee=3}] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has made the achievement §2[Bee our guest]"}]}
execute as @a[hasitem={item=lodestone_compass}, scores={ach_cou=3}] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has made the achievement §2[Country Lode]"}]}
execute as @a[hasitem={item=crafter}, scores={ach_tag=3}] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has made the achievement §2[TAGCraft]"}]}
execute as @a[hasitem={item=tadpole_bucket}, scores={ach_buc=3}] run tellraw @a {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":"§r has made the achievement §2[Bucket Bukkit]"}]}
execute as @a[hasitem={item=undyed_shulker_box}, scores={ach_bun=1}, tag=!shulker_box] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=honey_block}, scores={ach_bee=3}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=lodestone_compass}, scores={ach_cou=3}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=crafter}, scores={ach_tag=3}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=tadpole_bucket}, scores={ach_buc=3}] run playsound random.levelup @a[scores={sound=0}]
execute as @a[hasitem={item=undyed_shulker_box}, scores={ach_bun=1}, tag=!shulker_box] run tellraw @s {"rawtext":[{"text":"[§dProgression§r]§b You have obtained a shulker box and completed the §2[Bundles of storage]§b achievement."}]}
execute as @a[hasitem={item=honey_block}, scores={ach_bee=3}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b You have crafted a honey block and completed the §2[Bee our guest]§b achievement."}]}
execute as @a[hasitem={item=lodestone_compass}, scores={ach_cou=3}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b You have obtained a lodestone compass and completed the §2[Country Lode]§b achievement!"}]}
execute as @a[hasitem={item=crafter}, scores={ach_tag=3}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b You have crafted a crafter and completed the §2[TAGCraft]§b achievement! You are now the ultimate TAGCrafter."}]}
execute as @a[hasitem={item=tadpole_bucket}, scores={ach_buc=3}] run tellraw @s {"rawtext":[{"text":"[§dQuests§r]§b You have bucket-ed a tadpole and completed the §2[Bucket Bukkit]§b achievement!"}]}
execute as @a[hasitem={item=undyed_shulker_box}, scores={ach_bun=1}, tag=!shulker_box] run scoreboard players add @s points 500
execute as @a[hasitem={item=honey_block}, scores={ach_bee=3}] run scoreboard players add @s points 500
execute as @a[hasitem={item=lodestone_compass}, scores={ach_cou=3}] run scoreboard players add @s points 500
execute as @a[hasitem={item=crafter}, scores={ach_tag=3}] run scoreboard players add @s points 500
execute as @a[hasitem={item=tadpole_bucket}, scores={ach_buc=3}] run scoreboard players add @s points 500
execute as @a[hasitem={item=undyed_shulker_box}, scores={ach_bun=1}, tag=!shulker_box] run scoreboard players add @s quests 1
execute as @a[hasitem={item=honey_block}, scores={ach_bee=3}] run scoreboard players add @s quests 1
execute as @a[hasitem={item=lodestone_compass}, scores={ach_cou=3}] run scoreboard players add @s quests 1
execute as @a[hasitem={item=crafter}, scores={ach_tag=3}] run scoreboard players add @s quests 1
execute as @a[hasitem={item=tadpole_bucket}, scores={ach_buc=3}] run scoreboard players add @s quests 1
execute as @a[hasitem={item=undyed_shulker_box}, scores={ach_bun=1}, tag=!shulker_box] run tag @s add shulker_box
execute as @a[hasitem={item=honey_block}, scores={ach_bee=3}] run tag @s add ach_bee
execute as @a[hasitem={item=lodestone_compass}, scores={ach_cou=3}] run tag @s add ach_cou
execute as @a[hasitem={item=crafter}, scores={ach_tag=3}] run tag @s add ach_tag
execute as @a[hasitem={item=tadpole_bucket}, scores={ach_buc=3}] run tag @s add ach_buc
execute as @a[tag=shulker_box, tag=bundle, tag=barrel, scores={ach_bun=1}] run scoreboard players set @s ach_bun 4
execute as @a[hasitem={item=honey_block}, scores={ach_bee=3}] run scoreboard players set @s ach_bee 4
execute as @a[hasitem={item=lodestone_compass}, scores={ach_cou=3}] run scoreboard players set @s ach_cou 4
execute as @a[hasitem={item=crafter}, scores={ach_tag=3}] run scoreboard players set @s ach_tag 4
execute as @a[hasitem={item=tadpole_bucket}, scores={ach_buc=3}] run scoreboard players set @s ach_buc 4
