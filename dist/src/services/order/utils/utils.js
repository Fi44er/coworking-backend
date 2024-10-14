"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortingOrdersByTime = sortingOrdersByTime;
exports.checkingFreeTime = checkingFreeTime;
const common_1 = require("@nestjs/common");
function sortingOrdersByTime(time, orders) {
    switch (time) {
        case 'INCREASING':
            orders.sort((a, b) => a.timeStart.getTime() - b.timeStart.getTime());
            break;
        case 'DECREASING':
            orders.sort((a, b) => b.timeStart.getTime() - a.timeStart.getTime());
            break;
    }
}
function checkingFreeTime(timeStart, timeEnd, room, existOrdersTime) {
    const roomTimeStart = new Date(timeStart.getFullYear(), timeStart.getMonth(), timeStart.getDate(), room.timeStart.getHours() - 5, room.timeStart.getMinutes());
    const roomTimeEnd = new Date(timeStart.getFullYear(), timeStart.getMonth(), timeStart.getDate() + 1, room.timeEnd.getHours() - 5, room.timeEnd.getMinutes());
    const bookingDay = DAYS_OF_WEEK[timeStart.getDay()];
    const dayStatus = room.weekDays.includes(bookingDay);
    if (!dayStatus)
        throw new common_1.BadRequestException('На этот день нельзя забронировать помещение');
    const existingTime = timeStart >= roomTimeStart && timeEnd <= roomTimeEnd;
    if (!existingTime)
        throw new common_1.BadRequestException('На это время нельзя забронировать помещение');
    let existingStatus = false;
    existOrdersTime.forEach((order) => {
        const existingTime = timeStart < order.timeEnd && timeEnd > order.timeStart;
        if (existingTime) {
            existingStatus = existingTime;
            return existingStatus;
        }
    });
    if (existingStatus)
        throw new common_1.BadRequestException('Данное время уже занято');
}
//# sourceMappingURL=utils.js.map