execute at @p[tag=rank1, tag=!rank1done] run tellraw @a {"rawtext":[{"text":"[§sRanks§r]§d "},{"selector":"@p"},{"text":" §bis now a §l§8Slater§b!"}]}
execute at @p[tag=rank1, tag=!rank1done] run playsound random.levelup @a[scores={sound=!2}]
execute at @p[tag=rank2, tag=!rank2done] run playsound random.levelup @a[scores={sound=!2}]
execute at @p[tag=rank2, tag=!rank2done] run tellraw @a {"rawtext":[{"text":"[§sRanks§r]§d "},{"selector":"@p"},{"text":" §bis now a §l§3Pulser§b!"}]}
execute at @p[tag=rank1, tag=!rank1done] run tag @p add rank:§8Slater
tag @p[tag=rank1, tag=!rank1done] add rank1done
execute at @p[tag=rank2, tag=!rank2done] run tag @p add rank:§l§3Pulser
execute at @p[tag=rank2, tag=!rank2done] run tag @p remove rank:§8Slater
execute at @p[tag=rank2, tag=!rank2done] run tag @p add rank1done
execute at @p[tag=rank2, tag=!rank2done] run tag @p add rank1
tag @p[tag=rank2, tag=!rank2done] add rank2done
