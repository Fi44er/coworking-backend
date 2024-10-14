"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = void 0;
const common_1 = require("@nestjs/common");
exports.Cookie = (0, common_1.createParamDecorator)((key, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return key && key in request.cookies
        ? request.cookies[key]
        : key
            ? null
            : request.cookies;
});
//# sourceMappingURL=cookies.decorator.js.map