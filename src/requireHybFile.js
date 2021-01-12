const chalk = require('chalk');
const generatorApis  = require('./callBackArg');

module.exports = function requireHybFile(env) {
    const {configPath: HybFilePath} = env;

    if (HybFilePath) {
        const HybFileExport = require(HybFilePath);
        const HybFileExportFunction = typeof HybFileExport === 'function' ? HybFileExport : HybFileExport.default;

        HybFileExportFunction(generatorApis);
    } else {
        console.error(chalk.red('No HybFile found'));
        process.exit(1);
    }

    generatorApis.getGenerator = function (name) {
        const generator = this.generators[name];

        if (!generator) {
            console.error(chalk.red(`[HYB] Generator "${name}" does not exist.`));
        }

        return generator;
    }

    return generatorApis;
};
