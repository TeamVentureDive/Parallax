@echo off
set p message=Commit-Message 
set p branch=Commit-Branch 
git checkout %branch%
git add .
git commit -m %message%
git push --set-upstream origin %branch%
pause
@echo on