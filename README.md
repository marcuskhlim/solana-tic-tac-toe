# Solana Docker VSCode dev container

### **Welcome 👋**
To get started with this repo, follow these steps:

1. Fork this repo, then clone the fork
2. Navigate to the location where you cloned repo
3. Run `code .` to start VS Code
4. Inside .devcontainer there is a file devcontainer.json, open it
5. Note there is a DISABLE_AVX2 arg that is defaulted to false. You must set it to true if your CPU does not support AVX2
6. To find out if your CPU supports AVX2 or not, you can run the following:

    grep avx2 /proc/cpuinfo

    If there is no output, then your CPU does <strong>not</strong> support AVX2 so you need to set DISABLE_AVX2 to true. Otherwise you do not need to do anything.
7. In VSCode, Got to View -> Command Palette -> Rebuild and Reopen in container

### **Check your solana dev container** ###
Within the dev container, in a new terminal, issue the following command:

    solana-test-validator

Make sure you do <strong>not</strong> see `illegal instruction`. If you do, it means your Solana build is not working as intended. You should still be able to proceed to create your Solana project as below, but you will not be able to test your Solana smart contract locally.

### **Create your Solana project**
To kick start your Solana project, within the dev container, in a new terminal, issue the following command:

    anchor init mysolanaproject

where mysolanaproject is the name of your new solana project folder.

I prefer to have everything under the root folder. To accomplish this, in the directory above mysolanaproject, simply run

    mv mysolanaproject/* .
    rm -rf mysolanaproject

Viola! Your solana project files are now under the root location of your repo. You can now commit and push back to remote git if you wish:

    git add .
    git commit -m "First commit"
    git push