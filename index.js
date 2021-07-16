// Constants variables needed for the application
const fs = require("fs");
const inquirer = require("inquirer");
const utility = require("util");

// function to write to file
const writeToFile = utility.promisify(fs.writeFile)

// Main logic, will get the data if sucessful and generate a readme file, otherwise will log error
getUserInput()
    .then(function (dataBack) {
        const outputFile = generateFille(dataBack);
        return writeToFile("./utility/generateREADME.md", outputFile);
    })

    .then(function () {
        console.log("Sucess");
    })

    .catch(function (err) {
        console.log(err)
    })

    // Prompts for the user inputs
function getUserInput() {
    return inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is this project title?"
        },
        {
            name: "description",
            type: "input",
            message: "Provide a short description for your project"
        },
        {
            name: "userName",
            type: "input",
            message: "What is your github user user name?"
        },
        {
            name: "email",
            type: "input",
            message: "To which email should people contact you?"
        },
        {
            name: "installation",
            type: "input",
            message: "What command should I run to install the dependencies?"
        },
        {
            name: "usage",
            type: "input",
            message: "What does the user need to know about using this repo?"
        },
        {
            name: "license",
            type: "list",
            choices: ["none", "MIT", "GPL 3.0", "APACHE"]
        },
        {
            name: "contribution",
            type: "input",
            message: "What does the user need to know about contributing to the repo?"
        },
        {
            name: "test",
            type: "input",
            message: "What command should I use to run tests?"
        },
    ])
}

// Will generate the markdown file as well as getting the badge type
function generateFille(dataBack) {
    let badge = "";
    switch (dataBack.license) {

        default:
        badge = "";
        break;

        case "MIT":
            badge = "![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)"
            break;

            case "GPL 3.0":
                badge = "![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)"
                break;

        case "APACHE":
            badge = "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)"
            break;
    }

    return `# ${dataBack.title}  ${badge}
${dataBack.description}
## Table of Contents:
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
### Installation:
To install dependencies, run the following:
\`\`\`${dataBack.installation}\`\`\`
### Usage:
${dataBack.usage}
### License:
This project is licensed under:
${dataBack.license}
### Contributing:
${dataBack.contribution}
### Tests:
To run the test enter the following:
\`\`\`${dataBack.test}\`\`\`
### Questions:
If you have any questions contact me at [GitHub](https://github.com/${dataBack.userName}) or contact me at ${dataBack.email}
    
 `
}