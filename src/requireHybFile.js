const chalk = require('chalk');

class Generator {
    constructor() {
        const self = this;

        Object.assign(self, {
            generators: {},

            setGenerator(name = '', config = {}) {
                name = name || `generator-${Object.keys(self.generators).length + 1}`;

                self.generators[name] = Object.assign(config, {
                    name: name
                });

                return self.generators[name];
            }
        });
    }
}

module.exports = function requireHybFile(env) {
    const {configPath: HybFilePath} = env;
    let generatorApis = new Generator();

    if (HybFilePath) {
        const HybFileExport = require(HybFilePath);
        const HybFileExportFunction = typeof HybFileExport === 'function' ? HybFileExport : HybFileExport.default;

        HybFileExportFunction(generatorApis);
    } else {
        console.error(chalk.red('No HybFile found'));
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
