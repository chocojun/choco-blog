@echo off
powershell -NoProfile -ExecutionPolicy Bypass -Command "$desktop=[Environment]::GetFolderPath('Desktop'); $shortcutPath=Join-Path $desktop 'Floscas Music Uploader.lnk'; $shell=New-Object -ComObject WScript.Shell; $shortcut=$shell.CreateShortcut($shortcutPath); $shortcut.TargetPath='C:\Users\26902\myblog\scripts\start-music-uploader.cmd'; $shortcut.WorkingDirectory='C:\Users\26902\myblog'; $shortcut.Description='Start the local Floscas music uploader'; $shortcut.IconLocation='C:\Windows\System32\shell32.dll,138'; $shortcut.Save(); Write-Host 'Created:' $shortcutPath"
pause
