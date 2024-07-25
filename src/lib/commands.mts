import { execSync } from "child_process";
import { DbBranches } from "../inputs/dbs.mjs";
import { join } from "path";
import { readFileSync, writeFileSync } from "fs";

export const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
};

export function dbCommand(dbBranch: DbBranches, projectName: string) {
  const clone =
    dbBranch != "other"
      ? `git clone --depth 1 -b ${dbBranch} https://github.com/EzequielVilla/base-express-backend ${projectName} `
      : `git clone --depth 1 -b main https://github.com/EzequielVilla/base-express-backend ${projectName}`;
  const installedDB = runCommand(clone);
  if (!installedDB) process.exit(-1);
  console.log(`Basic template with ${dbBranch} downloaded successfully`);
}

export function moveTerminalToRoot(projectName: string) {
  const rootCommand = `cd ${projectName}`;
  const checkedOut = runCommand(rootCommand);
  if (!checkedOut) process.exit(-1);
}
export function installDeps() {
  const installCommand = `npm install`;
  console.log("Installing dependencies...");
  const installedDeps = runCommand(installCommand);
  if (!installedDeps) process.exit(-1);
  console.log("Project created successfully");
}
export function changeProjectNameInPackageJson(projectName: string) {
  const currentDir = process.cwd();
  const filePath = join(currentDir, `${projectName}/package.json`);
  let newPackageJson: string;
  try {
    const packageJson = readFileSync(filePath, "utf-8");
    const packageJsonObj = JSON.parse(packageJson);
    packageJsonObj.name = projectName;
    newPackageJson = JSON.stringify(packageJsonObj, null, 2); // set view format of file to JSON
  } catch (error) {
    console.error("Error reading the file:", error);
    process.exit(1);
  }
  try {
    writeFileSync(filePath, newPackageJson);
  } catch (error) {
    console.error("Error writing the file:", error);
    process.exit(1);
  }
}
export function addDotEnvToGitIgnore(projectName: string) {
  const currentDir = process.cwd();
  const filePath = join(currentDir, `${projectName}/.gitignore`);
  let fileContent: string;
  try {
    fileContent = readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error("Error reading the file:", error);
    process.exit(1);
  }
  const addDotEnv = `\n.env`;
  fileContent += addDotEnv;
  try {
    writeFileSync(filePath, fileContent);
  } catch (error) {
    console.error("Error writing the file:", error);
    process.exit(1);
  }

  //
}
