# GitHub Repository Setup Instructions

## Step 1: Create a New Repository on GitHub

1. Go to https://github.com/new
2. Give your repository a name (e.g., "1108demo")
3. Choose if it should be Public or Private
4. **Important:** Do NOT initialize the repository with a README, .gitignore, or license
5. Click "Create repository"

## Step 2: Link Your Local Repository to GitHub

After creating the repository on GitHub, you'll see a page with setup instructions. 
You need to run these commands in your terminal:

```bash
git remote add origin https://github.com/tequilayu/test-ai.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username and `YOUR_REPOSITORY_NAME` with the name you gave your repository.

## Alternative: If You Already Have a Repository

If you already have a repository on GitHub you want to link to:

```bash
git remote add origin https://github.com/tequilayu/test-ai.git
git push -u origin main
```

## Verification

To verify that your repository is properly linked:

```bash
git remote -v
```

This should show the URL of your GitHub repository.