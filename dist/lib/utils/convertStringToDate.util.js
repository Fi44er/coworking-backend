"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStringToTime = void 0;
const common_1 = require("@nestjs/common");
const convertStringToTime = (time) => {
    try {
        const dateTime = new Date(time);
        if (isNaN(dateTime.getTime()) || dateTime < new Date(Date.now())) {
            throw new common_1.BadRequestException();
        }
        return dateTime;
    }
    catch (error) {
        if (error) {
            throw new common_1.BadRequestException('Не корректно указана дата');
        }
    }
};
exports.convertStringToTime = convertStringToTime;
//# sourceMappingURL=convertStringToDate.util.js.map