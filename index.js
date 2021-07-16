// Required modules
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const path = require("path");

// Get user inputs using inquirer
const getUserInput = () => {
    return inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the project title?"
        },
        {
            name: "description",
            type: "input",
            message: "Provide a short description for your project"
        },
        {
            name: "installation",
            type: "input",
            message: "What command should I run to install this?"
        },
        {
            name: "usage",
            type: "input",
            message: "What does the user need to know about using this repo?"
        },
        {
            name: "license",
            type: "list",
            // Add more licenses as i do more research
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

function createMdFile(response) {
    // Switch Statement to get the badges from page source
    let badge;
    switch (response.license) {
        case "none":
            badge = ""
            break;

        case "MIT":
            badge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]"
            break;

        case "GPL 3.0":
            badge = "![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)"
            break;

        case "APACHE":
            badge = "![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)"
            break;
    }

    return `
    # ${response.title}

    ## Add badge later

    ${response.description}

    ### Table of contents:
    * [How to Install](#installation)
    * [How to use it](#usage)




    `

}

getUserInput()

.then(function(response){
    let outputFile = createMdFile(response);
    return writetoFile(path.join(process.cwd(), "readMe"), outputFile);
})

.then(function () {
    console.log("Sucess...");
})

.catch(function (error){
    console.log(error);
})

const writetoFile = util.promisify(fs.writeFile);