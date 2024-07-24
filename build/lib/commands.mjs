import { execSync } from "child_process";
export const runCommand = (command) => {
    try {
        execSync(command, { stdio: "inherit" });
    }
    catch (error) {
        console.error(`Failed to execute ${command}`, error);
        return false;
    }
    return true;
};
export function dbCommand(dbBranch, projectName) {
    const clone = dbBranch != "other"
        ? `git clone --depth 1 -b ${dbBranch} https://github.com/EzequielVilla/base-express-backend ${projectName} `
        : `git clone --depth 1 -b main https://github.com/EzequielVilla/base-express-backend ${projectName}`;
    const installedDB = runCommand(clone);
    if (!installedDB)
        process.exit(-1);
    console.log(`Basic template with ${dbBranch} downloaded successfully`);
}
export function moveTerminalToRoot(projectName) {
    const rootCommand = `cd ${projectName}`;
    const checkedOut = runCommand(rootCommand);
    if (!checkedOut)
        process.exit(-1);
}
//# sourceMappingURL=commands.mjs.map