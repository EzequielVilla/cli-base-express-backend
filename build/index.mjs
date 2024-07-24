#!/usr/bin/env node
import { getDBSelector } from "./inputs/dbs.mjs";
import { dbCommand, runCommand } from "./lib/commands.mjs";
async function main() {
    const args = process.argv.slice(2);
    // Check if the first argument is 'new'
    if (args[0] === "new") {
        // Get the project name from the second argument
        const projectName = args[1];
        if (projectName) {
            const dbSelected = await getDBSelector();
            dbCommand(dbSelected, projectName);
            //
            // OTHER COMMANDS
            changeProjectNameInPackageJson(projectName);
            addDotEnvToGitIgnore();
            // installDeps(projectName);
            console.log("EXIT");
        }
        else {
            console.log("Error: Project name is required");
        }
    }
    else {
        console.log("Error: Unknown command");
    }
}
main();
function installDeps(projectName) {
    // const gitCloneCommand = `git clone --depth 1 https://github.com/EzequielVilla/base-express-backend ${projectName}`;
    const installCommand = `cd ${projectName} && npm install`;
    console.log("Cloning repository...");
    // const checkedOut = runCommand(gitCloneCommand);
    // if (!checkedOut) process.exit(-1);
    const installedDeps = runCommand(installCommand);
    if (!installedDeps)
        process.exit(-1);
    console.log("Project created successfully with the following configuration:");
}
function changeProjectNameInPackageJson(projectName) {
    //
}
function addDotEnvToGitIgnore() {
    //
}
//# sourceMappingURL=index.mjs.map