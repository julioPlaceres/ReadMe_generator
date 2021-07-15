// Required modules
const fs = require("fs");
const inquirer = require("inquirer");

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

getUserInput();