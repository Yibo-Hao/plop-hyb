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

module.exports = new Generator();
