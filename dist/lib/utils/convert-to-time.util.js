"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countingTimeEnd = void 0;
const convertStringToDate_util_1 = require("./convertStringToDate.util");
const countingTimeEnd = (timeStartStr, duration) => {
    const dateTime = (0, convertStringToDate_util_1.convertStringToTime)(timeStartStr);
    const startHour = dateTime.getHours();
    const hour = startHour + duration;
    return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate(), hour, dateTime.getMinutes());
};
exports.countingTimeEnd = countingTimeEnd;
//# sourceMappingURL=convert-to-time.util.js.map