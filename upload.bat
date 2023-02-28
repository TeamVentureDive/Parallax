@echo off
set /p "message=Commit-Message: "
set /p "branche=BranchName: "
C:\Users\ohnrz\OneDrive\Desktop\Parallax
git add .
git commit -m "%message%"
%branche%
pause
@echo on