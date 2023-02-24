@echo off
set /p "message=Enter Message: "
C:\Users\ohnrz\OneDrive\Desktop\Parallax
git add .
git commit -m "%message%"
git push
pause
@echo on