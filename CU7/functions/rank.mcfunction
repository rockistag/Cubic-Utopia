execute at @p[scores={rank1=1}, tag=!rank1done] run tellraw @a {"rawtext":[{"text":"[§cRanks§r]§d "},{"selector":"@p"},{"text":" §bis now a §sCatalyst§b!"}]}
execute at @p[scores={rank1=1}, tag=!rank1done] run playsound random.levelup @a[scores={sound=!2}]
execute at @p[scores={rank2=1}, tag=!rank2done] run tellraw @a {"rawtext":[{"text":"[§cRanks§r]§d "},{"selector":"@p"},{"text":" §bis now a §3Shrieker§b!"}]}

