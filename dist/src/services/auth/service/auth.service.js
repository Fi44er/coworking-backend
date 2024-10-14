"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("../../admin/service/admin.service");
const bcrypt_1 = require("bcrypt");
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const convertToMiliseconds_util_1 = require("../../../../lib/utils/convertToMiliseconds.util");
const auth_repository_1 = require("../repository/auth.repository");
let AuthService = AuthService_1 = class AuthService {
    constructor(jwtService, adminService, configService, authRepository) {
        this.jwtService = jwtService;
        this.adminService = adminService;
        this.configService = configService;
        this.authRepository = authRepository;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async login(dto) {
        const admin = await this.adminService
            .findOneAdmin(dto.login)
            .catch((err) => {
            this.logger.error(err);
            return null;
        });
        if (!admin || !(0, bcrypt_1.compareSync)(dto.password, admin.password))
            throw new common_1.UnauthorizedException('Не верный логин или пароль');
        const tokens = this.generateTokens(admin);
        if (!tokens)
            throw new common_1.BadRequestException('Unable to log in with the provided data');
        return tokens;
    }
    async refreshTokens(refreshToken) {
        const token = await this.authRepository.deleteRefresh(refreshToken);
        if (!token || new Date(token.exp) < new Date())
            throw new common_1.UnauthorizedException();
        const user = await this.adminService.findOneAdmin(String(token.adminId));
        return this.generateTokens(user);
    }
    async generateTokens(user) {
        const accessToken = 'Bearer ' +
            this.jwtService.sign({
                id: user.id,
                login: user.login,
            });
        const exp = this.configService.get('JWT_EXP') ?? '1d';
        const accessExp = (0, convertToMiliseconds_util_1.convertToMilisecondsUtil)(exp);
        await this.getRefreshToken(user.id);
        return { token: accessToken, exp: accessExp };
    }
    async getRefreshToken(adminId) {
        const _token = await this.authRepository.findRefreshByAdminID(adminId);
        const token = _token?.token ?? '';
        return await this.authRepository.updateOrCreateRefresh(token, (0, uuid_1.v4)(), adminId, (0, date_fns_1.add)(new Date(), { months: 1 }));
    }
    async deleteRefreshToken(token) {
        return await this.authRepository.deleteRefresh(token);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        admin_service_1.AdminService,
        config_1.ConfigService,
        auth_repository_1.AuthRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map