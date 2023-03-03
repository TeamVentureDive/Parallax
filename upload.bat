@echo off
set /p "message=Commit-Message: "
set /p "branch=Commit-Branch: "
git add .
git commit -m "%message%"
git push --set-upstream origin %branch%
pause
@echo on