"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const admin_module_1 = require("./services/admin/admin.module");
const auth_module_1 = require("./services/auth/auth.module");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("./services/auth/guards/jwt-auth.guard");
const config_1 = require("@nestjs/config");
const room_module_1 = require("./services/room/room.module");
const order_module_1 = require("./services/order/order.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const mailer_module_1 = require("./services/mailer/mailer.module");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../../uploads/'),
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            schedule_1.ScheduleModule.forRoot(),
            prisma_module_1.PrismaModule,
            admin_module_1.AdminModule,
            auth_module_1.AuthModule,
            room_module_1.RoomModule,
            order_module_1.OrderModule,
            mailer_module_1.EmailsModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map