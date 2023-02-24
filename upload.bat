@echo off
set /p "message=Commit-Message: "
C:\Users\ohnrz\OneDrive\Desktop\Parallax
git add .
git commit -m "%message%"
git push
pause
@echo on