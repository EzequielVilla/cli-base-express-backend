#!/usr/bin/env node
import { getDBSelector } from "./inputs/dbs.mjs";
import {
  addDotEnvToGitIgnore,
  changePackageJson,
  dbCommand,
  installDeps,
} from "./lib/commands.mjs";

async function main() {
  const args = process.argv.slice(2);

  // Check if the first argument is 'new'
  if (args[0] === "new") {
    // Get the project name from the second argument
    const projectName = args[1];
    if (projectName) {
      const dbSelected = await getDBSelector();
      dbCommand(dbSelected, projectName);
      changePackageJson(projectName);
      addDotEnvToGitIgnore(projectName);
      installDeps(projectName);
      console.log(
        `Go to the project folder: cd ${projectName} and start developing! `
      );
    } else {
      console.log("Error: Project name is required");
    }
  } else {
    console.log("Error: Unknown command");
  }
}
main();
