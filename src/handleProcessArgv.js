'use strict';

const inquirer = require('inquirer');
const minimist = require('minimist')
const chalk = require('chalk')
const handleGenerator = require('./handleGenertor');
const {_} = minimist(process.argv.slice(2));

const handleProcessArgv = (env, generatorApis) => {
    const defaultMessage = chalk.blue('[HYB]');
    const generators = Object.keys(generatorApis.generators);

    if (_.length === 0) {
        inquirer.prompt([{
            type: 'list',
            name: 'generator',
            message: defaultMessage + ' Please choose a generator.',
            choices: generators.map((i) => i)
        }]).then(results => {
            return generatorApis.getGenerator(results.generator);
        }).then((generator) => {
            handleGenerator(generator);
        });
    } else {
        const [generatorName] = _;
        return generatorApis.getGenerator(generatorName);
    }
};

module.exports = handleProcessArgv;