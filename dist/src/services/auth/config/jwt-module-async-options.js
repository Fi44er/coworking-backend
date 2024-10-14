"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
const config_1 = require("@nestjs/config");
const jwtModuleOptions = (config) => ({
    secret: config.get('JWT_SECRET'),
    signOptions: {
        expiresIn: config.get('JWT_EXP', '5m'),
    },
});
const options = () => ({
    inject: [config_1.ConfigService],
    useFactory: (config) => jwtModuleOptions(config),
});
exports.options = options;
//# sourceMappingURL=jwt-module-async-options.js.map