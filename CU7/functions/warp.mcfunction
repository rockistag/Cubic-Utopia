execute as @p run title @s title New Warp Discovered!
execute as @p run title @s subtitle Check your menu for new quick warps.
tellraw @p {"rawtext":[{"text":"You have discovered a warp! Go to your quick teleport menu to see what it is."}]}
execute as @p run playsound random.levelup
