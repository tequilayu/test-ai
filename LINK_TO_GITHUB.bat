@echo off
echo Linking local repository to GitHub...
echo.

set /p github_username="Enter your GitHub username: "
set /p repo_name="Enter your GitHub repository name (e.g., 1108demo): "

echo.
echo Adding remote origin...
git remote add origin https://github.com/%github_username%/%repo_name%.git

echo.
echo Setting main branch...
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo Repository linked successfully!
echo Remote URL: https://github.com/%github_username%/%repo_name%.git
pause