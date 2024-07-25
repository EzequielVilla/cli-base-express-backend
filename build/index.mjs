#!/usr/bin/env node
import { getDBSelector } from "./inputs/dbs.mjs";
import { addDotEnvToGitIgnore, changeProjectNameInPackageJson, dbCommand, installDeps, } from "./lib/commands.mjs";
async function main() {
    const args = process.argv.slice(2);
    // Check if the first argument is 'new'
    if (args[0] === "new") {
        // Get the project name from the second argument
        const projectName = args[1];
        if (projectName) {
            const dbSelected = await getDBSelector();
            dbCommand(dbSelected, projectName);
            // moveTerminalToRoot(projectName);
            //
            // OTHER COMMANDS
            changeProjectNameInPackageJson(projectName);
            addDotEnvToGitIgnore(projectName);
            installDeps(projectName);
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
//# sourceMappingURL=index.mjs.map