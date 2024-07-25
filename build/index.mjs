#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { getDBSelector } from "./inputs/dbs.mjs";
import { join } from "path";
import { dbCommand, moveTerminalToRoot, runCommand } from "./lib/commands.mjs";
async function main() {
    const args = process.argv.slice(2);
    // Check if the first argument is 'new'
    if (args[0] === "new") {
        // Get the project name from the second argument
        const projectName = args[1];
        if (projectName) {
            const dbSelected = await getDBSelector();
            dbCommand(dbSelected, projectName);
            moveTerminalToRoot(projectName);
            //
            // OTHER COMMANDS
            changeProjectNameInPackageJson(projectName);
            addDotEnvToGitIgnore(projectName);
            installDeps();
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
function installDeps() {
    const installCommand = `npm install`;
    console.log("Installing dependencies...");
    const installedDeps = runCommand(installCommand);
    if (!installedDeps)
        process.exit(-1);
    console.log("Project created successfully");
}
function changeProjectNameInPackageJson(projectName) {
    const currentDir = process.cwd();
    const filePath = join(currentDir, `${projectName}/package.json`);
    console.log({ filePath });
    let newPackageJson;
    try {
        const packageJson = readFileSync(filePath, "utf-8");
        const packageJsonObj = JSON.parse(packageJson);
        packageJsonObj.name = projectName;
        newPackageJson = JSON.stringify(packageJsonObj, null, 2); // set view format of file to JSON
    }
    catch (error) {
        console.error("Error reading the file:", error);
        process.exit(1);
    }
    try {
        writeFileSync(filePath, newPackageJson);
    }
    catch (error) {
        console.error("Error writing the file:", error);
        process.exit(1);
    }
}
function addDotEnvToGitIgnore(projectName) {
    const currentDir = process.cwd();
    const filePath = join(currentDir, `${projectName}/.gitignore`);
    let fileContent;
    try {
        fileContent = readFileSync(filePath, "utf-8");
    }
    catch (error) {
        console.error("Error reading the file:", error);
        process.exit(1);
    }
    const addDotEnv = `\n.env`;
    fileContent += addDotEnv;
    try {
        writeFileSync(filePath, fileContent);
    }
    catch (error) {
        console.error("Error writing the file:", error);
        process.exit(1);
    }
    //
}
//# sourceMappingURL=index.mjs.map