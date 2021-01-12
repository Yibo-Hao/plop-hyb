const chalk = require('chalk')
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const defaultMessage = chalk.blue('[HYB]');

module.exports = (generator) => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'componentName',
            message: defaultMessage + ' Please input component name.',
            validate: function (value) {
                if ((/.+/).test(value)) { return true; }
                return 'name is required';
            }
        },
        {
            type: 'input',
            name: 'componentPath',
            message: defaultMessage + ' Please input component absolute path.',
            validate: function (value) {
                if ((/.+/).test(value)) { return true; }
                return 'name is required';
            }
        }
    ]).then(results => {
        const {componentName, componentPath} = results;
        const basePath = process.cwd();
        const templateDirPath = path.resolve(basePath, generator.templateDir)
        const newDirPath = path.resolve(componentPath, componentName);
        const templateDir = fs.readdirSync(templateDirPath);

        fs.mkdirSync(newDirPath);

        templateDir.forEach((file) => {
            const filePath = path.resolve(templateDirPath, file);
            const newFilePath = path.resolve(newDirPath, file);
            const writeStream = fs.createWriteStream(newFilePath);
            const readStream = fs.createReadStream(filePath);
            readStream.pipe(writeStream);
        })
    });
};
