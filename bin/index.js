#! /usr/bin/env node
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

if (process.argv.length < 3) {
  console.log("you must named your app.");
  console.log("for example:");
  console.log("    npx start-react-kit my-app");
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/andrewpatasik/start-react-kit.git";

try {
  fs.mkdirSync(projectName);
} catch (error) {
  if (error.code == "EEXIST") {
    console.log(
      `project with name ${projectName} is already existed, try again.`
    );
  } else {
    console.log(error);
  }

  process.exit(1);
}

const main = async function () {
  try {
    console.log("gathering resources, please wait...");
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

    process.chdir(projectPath);

    console.log("Installing dependencies...");
    execSync("npm install");

    console.log("Removing unused files");
    execSync("npx rimraf ./.git");
    fs.rm(path.join(projectPath, "bin"), { recursive: true });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main().then(() => {
  console.log(`${projectName} is created!`);
  process.exit(0);
});
