#!/usr/bin/env node

import inquirer from "inquirer";
import { execSync } from "child_process";

const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
};

const questions: any = [
  {
    type: "list",
    name: "dbSelector",
    message: "What is your DB preferred for the project?",
    choices: [
      {
        name: "MongoDB",
        value: "mongodb",
      },
      {
        name: "PostgreSQL-sequelize",
        value: "postgresql-sequelize",
      },
    ],
  },
];
const args = process.argv.slice(2);

// Check if the first argument is 'new'
if (args[0] === "new") {
  // Get the project name from the second argument
  const projectName = args[1];

  if (projectName) {
    const gitCloneCommand = `git clone --depth 1 https://github.com/EzequielVilla/base-express-backend ${projectName}`;
    const installCommand = `cd ${projectName} && npm install`;
    console.log("Cloning repository...");
    const checkedOut = runCommand(gitCloneCommand);
    if (!checkedOut) process.exit(-1);
    const installedDeps = runCommand(installCommand);
    if (!installedDeps) process.exit(-1);
    console.log(
      "Project created successfully with the following configuration:"
    );
  } else {
    console.log("Error: Project name is required");
  }
} else {
  console.log("Error: Unknown command");
}
const projectName = process.argv[2];

inquirer
  .prompt(questions)
  .then((answers) => {
    const { dbSelector } = answers;
    console.log(`DB selector: ${dbSelector}`);
  })
  .catch((error) => {
    console.error("Error creating project:", error);
  });
