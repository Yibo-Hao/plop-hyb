const handleProcessArgv = require('./handleProcessArgv');
const requireHybFile = require('./requireHybFile');
const handleGenerator = require('./handleGenertor');

module.exports = (env) => {
    const generatorApis = requireHybFile(env);

    const generator = handleProcessArgv(env, generatorApis);

    handleGenerator(generator);
};
