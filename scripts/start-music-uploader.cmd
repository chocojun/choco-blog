@echo off
cd /d C:\Users\26902\myblog
if exist "C:\Users\26902\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" (
  "C:\Users\26902\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" scripts\music-uploader.mjs
) else (
  node scripts\music-uploader.mjs
)
pause
