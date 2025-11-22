@echo off
echo Connecting local repository to GitHub...
echo.

cd /d c:\HKPS\AI\Lesson1\1108demo

echo Adding remote origin...
git remote add origin https://github.com/tequilayu/test-ai.git

echo.
echo Setting main branch...
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo Repository connected successfully!
echo Remote URL: https://github.com/tequilayu/test-ai.git
pause