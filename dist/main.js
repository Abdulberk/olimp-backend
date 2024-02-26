/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./libs/common/src/config/config.module.ts":
/*!*************************************************!*\
  !*** ./libs/common/src/config/config.module.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigModule = void 0;
var common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
var Joi = __webpack_require__(/*! joi */ "joi");
var config_2 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
var ConfigModule = /** @class */ (function () {
    function ConfigModule() {
    }
    ConfigModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    validationSchema: Joi.object({
                        DB_PORT: Joi.number().required(),
                        DB_HOST: Joi.string().required(),
                        DB_USERNAME: Joi.string().required(),
                        DB_PASSWORD: Joi.string().required(),
                        DB_DATABASE: Joi.string().required(),
                        DB_SYNC: Joi.boolean().required(),
                        PORT: Joi.number().required(),
                    }),
                }),
            ],
            providers: [config_2.ConfigService],
            exports: [config_2.ConfigService],
        })
    ], ConfigModule);
    return ConfigModule;
}());
exports.ConfigModule = ConfigModule;


/***/ }),

/***/ "./libs/common/src/config/index.ts":
/*!*****************************************!*\
  !*** ./libs/common/src/config/index.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./config.module */ "./libs/common/src/config/config.module.ts"), exports);


/***/ }),

/***/ "./libs/common/src/database/database.module.ts":
/*!*****************************************************!*\
  !*** ./libs/common/src/database/database.module.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
var common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
var config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
var config_2 = __webpack_require__(/*! ../config */ "./libs/common/src/config/index.ts");
var database_provider_1 = __webpack_require__(/*! ./database.provider */ "./libs/common/src/database/database.provider.ts");
var DatabaseModule = /** @class */ (function () {
    function DatabaseModule() {
    }
    DatabaseModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [config_2.ConfigModule],
                    useFactory: function (configService) {
                        return database_provider_1.databaseProvider.useFactory(configService);
                    },
                    inject: [config_1.ConfigService],
                }),
            ],
            exports: [typeorm_1.TypeOrmModule],
        })
    ], DatabaseModule);
    return DatabaseModule;
}());
exports.DatabaseModule = DatabaseModule;


/***/ }),

/***/ "./libs/common/src/database/database.provider.ts":
/*!*******************************************************!*\
  !*** ./libs/common/src/database/database.provider.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.databaseProvider = void 0;
exports.databaseProvider = {
    provide: 'DATABASE_CONNECTION',
    useFactory: function (configService) { return ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get('DB_SYNC'),
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        autoLoadEntities: true,
    }); },
};


/***/ }),

/***/ "./libs/common/src/database/index.ts":
/*!*******************************************!*\
  !*** ./libs/common/src/database/index.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./database.module */ "./libs/common/src/database/database.module.ts"), exports);


/***/ }),

/***/ "./libs/common/src/index.ts":
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./database */ "./libs/common/src/database/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./config */ "./libs/common/src/config/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./logger */ "./libs/common/src/logger/index.ts"), exports);


/***/ }),

/***/ "./libs/common/src/logger/index.ts":
/*!*****************************************!*\
  !*** ./libs/common/src/logger/index.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./logger.module */ "./libs/common/src/logger/logger.module.ts"), exports);


/***/ }),

/***/ "./libs/common/src/logger/logger.module.ts":
/*!*************************************************!*\
  !*** ./libs/common/src/logger/logger.module.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerModule = void 0;
var common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var nestjs_pino_1 = __webpack_require__(/*! nestjs-pino */ "nestjs-pino");
var LoggerModule = /** @class */ (function () {
    function LoggerModule() {
    }
    LoggerModule = __decorate([
        (0, common_1.Module)({
            imports: [
                nestjs_pino_1.LoggerModule.forRoot({
                    pinoHttp: {
                        transport: {
                            target: 'pino-pretty',
                            options: {
                                singleLine: true,
                            },
                        },
                    },
                }),
            ],
            exports: [nestjs_pino_1.LoggerModule],
        })
    ], LoggerModule);
    return LoggerModule;
}());
exports.LoggerModule = LoggerModule;


/***/ }),

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
var common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var src_1 = __webpack_require__(/*! ../libs/common/src */ "./libs/common/src/index.ts");
var transaction_module_1 = __webpack_require__(/*! ./transaction/transaction.module */ "./src/transaction/transaction.module.ts");
var person_module_1 = __webpack_require__(/*! ./person/person.module */ "./src/person/person.module.ts");
var bank_module_1 = __webpack_require__(/*! ./bank/bank.module */ "./src/bank/bank.module.ts");
var seed_module_1 = __webpack_require__(/*! ./seed/seed.module */ "./src/seed/seed.module.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                src_1.DatabaseModule,
                transaction_module_1.TransactionModule,
                person_module_1.PersonModule,
                bank_module_1.BankModule,
                seed_module_1.SeedModule,
            ],
            controllers: [],
            providers: [],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/bank/bank.controller.ts":
/*!*************************************!*\
  !*** ./src/bank/bank.controller.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankController = void 0;
var common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var bank_service_1 = __webpack_require__(/*! ./bank.service */ "./src/bank/bank.service.ts");
var create_bank_dto_1 = __webpack_require__(/*! ./dto/create-bank.dto */ "./src/bank/dto/create-bank.dto.ts");
var update_bank_dto_1 = __webpack_require__(/*! ./dto/update-bank.dto */ "./src/bank/dto/update-bank.dto.ts");
var BankController = /** @class */ (function () {
    function BankController(bankService) {
        this.bankService = bankService;
    }
    BankController.prototype.create = function (createBankDto) {
        return this.bankService.create(createBankDto);
    };
    BankController.prototype.findAll = function () {
        return this.bankService.findAll();
    };
    BankController.prototype.findOne = function (id) {
        return this.bankService.findOne(+id);
    };
    BankController.prototype.update = function (id, updateBankDto) {
        return this.bankService.update(+id, updateBankDto);
    };
    BankController.prototype.remove = function (id) {
        return this.bankService.remove(+id);
    };
    var _a, _b, _c;
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_b = typeof create_bank_dto_1.CreateBankDto !== "undefined" && create_bank_dto_1.CreateBankDto) === "function" ? _b : Object]),
        __metadata("design:returntype", void 0)
    ], BankController.prototype, "create", null);
    __decorate([
        (0, common_1.Get)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BankController.prototype, "findAll", null);
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], BankController.prototype, "findOne", null);
    __decorate([
        (0, common_1.Patch)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, typeof (_c = typeof update_bank_dto_1.UpdateBankDto !== "undefined" && update_bank_dto_1.UpdateBankDto) === "function" ? _c : Object]),
        __metadata("design:returntype", void 0)
    ], BankController.prototype, "update", null);
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], BankController.prototype, "remove", null);
    BankController = __decorate([
        (0, common_1.Controller)('bank'),
        __metadata("design:paramtypes", [typeof (_a = typeof bank_service_1.BankService !== "undefined" && bank_service_1.BankService) === "function" ? _a : Object])
    ], BankController);
    return BankController;
}());
exports.BankController = BankController;


/***/ }),

/***/ "./src/bank/bank.module.ts":
/*!*********************************!*\
  !*** ./src/bank/bank.module.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankModule = void 0;
var common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var bank_service_1 = __webpack_require__(/*! ./bank.service */ "./src/bank/bank.service.ts");
var bank_controller_1 = __webpack_require__(/*! ./bank.controller */ "./src/bank/bank.controller.ts");
var bank_entity_1 = __webpack_require__(/*! ./entities/bank.entity */ "./src/bank/entities/bank.entity.ts");
var typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
var BankModule = /** @class */ (function () {
    function BankModule() {
    }
    BankModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([bank_entity_1.Bank])],
            controllers: [bank_controller_1.BankController],
            providers: [bank_service_1.BankService],
        })
    ], BankModule);
    return BankModule;
}());
exports.BankModule = BankModule;


/***/ }),

/***/ "./src/bank/bank.service.ts":
/*!**********************************!*\
  !*** ./src/bank/bank.service.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankService = void 0;
var common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var BankService = /** @class */ (function () {
    function BankService() {
    }
    BankService.prototype.create = function (createBankDto) {
        return 'This action adds a new bank';
    };
    BankService.prototype.findAll = function () {
        return "This action returns all bank";
    };
    BankService.prototype.findOne = function (id) {
        return "This action returns a #".concat(id, " bank");
    };
    BankService.prototype.update = function (id, updateBankDto) {
        return "This action updates a #".concat(id, " bank");
    };
    BankService.prototype.remove = function (id) {
        return "This action removes a #".concat(id, " bank");
    };
    BankService = __decorate([
        (0, common_1.Injectable)()
    ], BankService);
    return BankService;
}());
exports.BankService = BankService;


/***/ }),

/***/ "./src/bank/dto/create-bank.dto.ts":
/*!*****************************************!*\
  !*** ./src/bank/dto/create-bank.dto.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBankDto = void 0;
var CreateBankDto = /** @class */ (function () {
    function CreateBankDto() {
    }
    return CreateBankDto;
}());
exports.CreateBankDto = CreateBankDto;


/***/ }),

/***/ "./src/bank/dto/update-bank.dto.ts":
/*!*****************************************!*\
  !*** ./src/bank/dto/update-bank.dto.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateBankDto = void 0;
var mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
var create_bank_dto_1 = __webpack_require__(/*! ./create-bank.dto */ "./src/bank/dto/create-bank.dto.ts");
var UpdateBankDto = /** @class */ (function (_super) {
    __extends(UpdateBankDto, _super);
    function UpdateBankDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateBankDto;
}((0, mapped_types_1.PartialType)(create_bank_dto_1.CreateBankDto)));
exports.UpdateBankDto = UpdateBankDto;


/***/ }),

/***/ "./src/bank/entities/bank.entity.ts":
/*!******************************************!*\
  !*** ./src/bank/entities/bank.entity.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Bank = exports.Currency = void 0;
var typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
var transaction_entity_1 = __webpack_require__(/*! src/transaction/entities/transaction.entity */ "./src/transaction/entities/transaction.entity.ts");
var Currency;
(function (Currency) {
    Currency["USD"] = "USD";
    Currency["EUR"] = "EUR";
    Currency["GBP"] = "GBP";
})(Currency || (exports.Currency = Currency = {}));
var Bank = /** @class */ (function () {
    function Bank(partial) {
        Object.assign(this, partial);
    }
    var _a, _b, _c;
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Bank.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'float',
            default: 0,
            nullable: false,
        }),
        __metadata("design:type", Number)
    ], Bank.prototype, "balance", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Bank.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: Currency,
            default: Currency.USD,
        }),
        __metadata("design:type", String)
    ], Bank.prototype, "currency", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return transaction_entity_1.Transaction; }, function (transaction) { return transaction.bank; }),
        __metadata("design:type", Array)
    ], Bank.prototype, "transactions", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
    ], Bank.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
    ], Bank.prototype, "updatedAt", void 0);
    Bank = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object])
    ], Bank);
    return Bank;
}());
exports.Bank = Bank;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
var app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
var config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
var seed_service_1 = __webpack_require__(/*! ./seed/seed.service */ "./src/seed/seed.service.ts");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var app, seedService, PORT;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule)];
                case 1:
                    app = _a.sent();
                    app.enableCors({
                        origin: '*',
                        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                        credentials: true,
                    });
                    seedService = app.get(seed_service_1.SeedService);
                    return [4 /*yield*/, seedService.seedAll()];
                case 2:
                    _a.sent();
                    PORT = app.get(config_1.ConfigService).get('PORT');
                    return [4 /*yield*/, app.listen(PORT)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap();


/***/ }),

/***/ "./src/person/entities/person.entity.ts":
/*!**********************************************!*\
  !*** ./src/person/entities/person.entity.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Person = void 0;
var typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
var transaction_entity_1 = __webpack_require__(/*! ../../transaction/entities/transaction.entity */ "./src/transaction/entities/transaction.entity.ts");
var bank_entity_1 = __webpack_require__(/*! src/bank/entities/bank.entity */ "./src/bank/entities/bank.entity.ts");
var Person = /** @class */ (function () {
    function Person(partial) {
        Object.assign(this, partial);
    }
    var _a, _b, _c, _d;
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", Number)
    ], Person.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Person.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return bank_entity_1.Bank; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", typeof (_b = typeof bank_entity_1.Bank !== "undefined" && bank_entity_1.Bank) === "function" ? _b : Object)
    ], Person.prototype, "bank", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return transaction_entity_1.Transaction; }, function (transaction) { return transaction.sender; }),
        __metadata("design:type", Array)
    ], Person.prototype, "sendings", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return transaction_entity_1.Transaction; }, function (transaction) { return transaction.receivers; }),
        __metadata("design:type", Array)
    ], Person.prototype, "receivings", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
    ], Person.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
    ], Person.prototype, "updatedAt", void 0);
    Person = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object])
    ], Person);
    return Person;
}());
exports.Person = Person;


/***/ }),

/***/ "./src/person/person.controller.ts":
/*!*****************************************!*\
  !*** ./src/person/person.controller.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonController = void 0;
var common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var person_service_1 = __webpack_require__(/*! ./person.service */ "./src/person/person.service.ts");
var PersonController = /** @class */ (function () {
    function PersonController(personService) {
        this.personService = personService;
    }
    PersonController.prototype.findAll = function () {
        return this.personService.findAll();
    };
    PersonController.prototype.getBankOfPerson = function (id) {
        return this.personService.getBankOfPerson(+id);
    };
    PersonController.prototype.getAllPersonsWithBank = function () {
        return this.personService.getAllPersons();
    };
    var _a;
    __decorate([
        (0, common_1.Get)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PersonController.prototype, "findAll", null);
    __decorate([
        (0, common_1.Get)('bank-account/:id'),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], PersonController.prototype, "getBankOfPerson", null);
    __decorate([
        (0, common_1.Get)('all-persons'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], PersonController.prototype, "getAllPersonsWithBank", null);
    PersonController = __decorate([
        (0, common_1.Controller)('person'),
        __metadata("design:paramtypes", [typeof (_a = typeof person_service_1.PersonService !== "undefined" && person_service_1.PersonService) === "function" ? _a : Object])
    ], PersonController);
    return PersonController;
}());
exports.PersonController = PersonController;


/***/ }),

/***/ "./src/person/person.module.ts":
/*!*************************************!*\
  !*** ./src/person/person.module.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonModule = void 0;
var common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var person_service_1 = __webpack_require__(/*! ./person.service */ "./src/person/person.service.ts");
var person_controller_1 = __webpack_require__(/*! ./person.controller */ "./src/person/person.controller.ts");
var person_entity_1 = __webpack_require__(/*! ./entities/person.entity */ "./src/person/entities/person.entity.ts");
var typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
var PersonModule = /** @class */ (function () {
    function PersonModule() {
    }
    PersonModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([person_entity_1.Person])],
            controllers: [person_controller_1.PersonController],
            providers: [person_service_1.PersonService],
        })
    ], PersonModule);
    return PersonModule;
}());
exports.PersonModule = PersonModule;


/***/ }),

/***/ "./src/person/person.service.ts":
/*!**************************************!*\
  !*** ./src/person/person.service.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonService = void 0;
var common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
var typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
var person_entity_1 = __webpack_require__(/*! ./entities/person.entity */ "./src/person/entities/person.entity.ts");
var common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var PersonService = /** @class */ (function () {
    function PersonService(personRepository) {
        this.personRepository = personRepository;
    }
    PersonService.prototype.findAll = function () {
        return "This action returns all person";
    };
    PersonService.prototype.findOne = function (id) {
        return "This action returns a #".concat(id, " person");
    };
    PersonService.prototype.getBankOfPerson = function (personId) {
        return __awaiter(this, void 0, Promise, function () {
            var getBank;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.personRepository.findOne({
                            where: { id: personId },
                            relations: ['bank'],
                        })];
                    case 1:
                        getBank = _a.sent();
                        if (!getBank) {
                            throw new common_2.NotFoundException('Person not found');
                        }
                        return [2 /*return*/, getBank.bank];
                }
            });
        });
    };
    PersonService.prototype.getAllPersons = function () {
        return __awaiter(this, void 0, void 0, function () {
            var getPersons;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.personRepository.find({
                            select: ['id', 'name'],
                        })];
                    case 1:
                        getPersons = _a.sent();
                        return [2 /*return*/, getPersons];
                }
            });
        });
    };
    var _a;
    PersonService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_2.InjectRepository)(person_entity_1.Person)),
        __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object])
    ], PersonService);
    return PersonService;
}());
exports.PersonService = PersonService;


/***/ }),

/***/ "./src/seed/seed.module.ts":
/*!*********************************!*\
  !*** ./src/seed/seed.module.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeedModule = void 0;
var common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var seed_service_1 = __webpack_require__(/*! ./seed.service */ "./src/seed/seed.service.ts");
var typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
var bank_entity_1 = __webpack_require__(/*! src/bank/entities/bank.entity */ "./src/bank/entities/bank.entity.ts");
var person_entity_1 = __webpack_require__(/*! src/person/entities/person.entity */ "./src/person/entities/person.entity.ts");
var transaction_entity_1 = __webpack_require__(/*! src/transaction/entities/transaction.entity */ "./src/transaction/entities/transaction.entity.ts");
var SeedModule = /** @class */ (function () {
    function SeedModule() {
    }
    SeedModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([bank_entity_1.Bank, person_entity_1.Person, transaction_entity_1.Transaction])],
            providers: [seed_service_1.SeedService],
            exports: [seed_service_1.SeedService],
        })
    ], SeedModule);
    return SeedModule;
}());
exports.SeedModule = SeedModule;


/***/ }),

/***/ "./src/seed/seed.service.ts":
/*!**********************************!*\
  !*** ./src/seed/seed.service.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeedService = void 0;
var common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var bank_entity_1 = __webpack_require__(/*! src/bank/entities/bank.entity */ "./src/bank/entities/bank.entity.ts");
var person_entity_1 = __webpack_require__(/*! src/person/entities/person.entity */ "./src/person/entities/person.entity.ts");
var typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
var typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
var transaction_entity_1 = __webpack_require__(/*! src/transaction/entities/transaction.entity */ "./src/transaction/entities/transaction.entity.ts");
var SeedService = /** @class */ (function () {
    function SeedService(bankRepository, personRepository, transactionRepository) {
        this.bankRepository = bankRepository;
        this.personRepository = personRepository;
        this.transactionRepository = transactionRepository;
    }
    SeedService.prototype.seedAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clearAll().then(function () {
                            console.log('Cleared all data');
                            _this.seedBanks().then(function () {
                                console.log('Seeded banks');
                                _this.seedPerson().then(function () {
                                    console.log('Seeded persons');
                                });
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SeedService.prototype.seedBanks = function () {
        return __awaiter(this, void 0, Promise, function () {
            var banks, _i, banks_1, bank, bankEntity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        banks = [
                            { name: 'Bank of America', balance: 10000.0 },
                            { name: 'Chase', balance: 2000.0 },
                            { name: 'Wells Fargo', balance: 3000.0 },
                            { name: 'Citi', balance: 4000.0 },
                        ];
                        _i = 0, banks_1 = banks;
                        _a.label = 1;
                    case 1:
                        if (!(_i < banks_1.length)) return [3 /*break*/, 4];
                        bank = banks_1[_i];
                        bankEntity = this.bankRepository.create(bank);
                        return [4 /*yield*/, this.bankRepository.save(bankEntity)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SeedService.prototype.seedPerson = function () {
        return __awaiter(this, void 0, Promise, function () {
            var banks, persons, i, person, bank, personEntity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bankRepository.find()];
                    case 1:
                        banks = _a.sent();
                        persons = [
                            { id: 10, name: 'John' },
                            { id: 11, name: 'Doe' },
                            { id: 12, name: 'Jane' },
                            { id: 13, name: 'Doe' },
                        ];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < persons.length)) return [3 /*break*/, 5];
                        person = persons[i];
                        bank = banks[i % banks.length];
                        personEntity = this.personRepository.create({
                            id: person.id,
                            name: person.name,
                            bank: bank,
                        });
                        return [4 /*yield*/, this.personRepository.save(personEntity)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SeedService.prototype.clearAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.transactionRepository.delete({})];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.personRepository.delete({})];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.bankRepository.delete({})];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    var _a, _b, _c;
    SeedService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(bank_entity_1.Bank)),
        __param(1, (0, typeorm_1.InjectRepository)(person_entity_1.Person)),
        __param(2, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
        __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
    ], SeedService);
    return SeedService;
}());
exports.SeedService = SeedService;


/***/ }),

/***/ "./src/transaction/dto/create-transaction.dto.ts":
/*!*******************************************************!*\
  !*** ./src/transaction/dto/create-transaction.dto.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTransactionDto = void 0;
var class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var CreateTransactionDto = /** @class */ (function () {
    function CreateTransactionDto() {
    }
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], CreateTransactionDto.prototype, "senderId", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)({}, { each: true }),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Array)
    ], CreateTransactionDto.prototype, "receiverIds", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", Number)
    ], CreateTransactionDto.prototype, "amount", void 0);
    return CreateTransactionDto;
}());
exports.CreateTransactionDto = CreateTransactionDto;


/***/ }),

/***/ "./src/transaction/entities/transaction.entity.ts":
/*!********************************************************!*\
  !*** ./src/transaction/entities/transaction.entity.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Transaction = exports.TransactionStatus = void 0;
var typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
var person_entity_1 = __webpack_require__(/*! ../../person/entities/person.entity */ "./src/person/entities/person.entity.ts");
var bank_entity_1 = __webpack_require__(/*! ../../bank/entities/bank.entity */ "./src/bank/entities/bank.entity.ts");
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["SUCCESS"] = "success";
    TransactionStatus["IDLE"] = "idle";
    TransactionStatus["FAILED"] = "failed";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
var Transaction = /** @class */ (function () {
    function Transaction(partial) {
        Object.assign(this, partial);
    }
    var _a, _b, _c, _d, _e;
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Transaction.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return bank_entity_1.Bank; }, function (bank) { return bank.transactions; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", typeof (_b = typeof bank_entity_1.Bank !== "undefined" && bank_entity_1.Bank) === "function" ? _b : Object)
    ], Transaction.prototype, "bank", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return person_entity_1.Person; }, function (person) { return person.sendings; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", typeof (_c = typeof person_entity_1.Person !== "undefined" && person_entity_1.Person) === "function" ? _c : Object)
    ], Transaction.prototype, "sender", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return person_entity_1.Person; }, function (person) { return person.receivings; }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Array)
    ], Transaction.prototype, "receivers", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
        __metadata("design:type", Number)
    ], Transaction.prototype, "amount", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: 'enum',
            enum: TransactionStatus,
            default: TransactionStatus.IDLE,
        }),
        __metadata("design:type", String)
    ], Transaction.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
    ], Transaction.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
    ], Transaction.prototype, "updatedAt", void 0);
    Transaction = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [typeof (_a = typeof Partial !== "undefined" && Partial) === "function" ? _a : Object])
    ], Transaction);
    return Transaction;
}());
exports.Transaction = Transaction;


/***/ }),

/***/ "./src/transaction/enums/exchange-status.enum.ts":
/*!*******************************************************!*\
  !*** ./src/transaction/enums/exchange-status.enum.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExchangeStatus = void 0;
var ExchangeStatus;
(function (ExchangeStatus) {
    ExchangeStatus["SUCCESS"] = "success";
    ExchangeStatus["ERROR"] = "error";
})(ExchangeStatus || (exports.ExchangeStatus = ExchangeStatus = {}));


/***/ }),

/***/ "./src/transaction/transaction.controller.ts":
/*!***************************************************!*\
  !*** ./src/transaction/transaction.controller.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionController = void 0;
var common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var transaction_service_1 = __webpack_require__(/*! ./transaction.service */ "./src/transaction/transaction.service.ts");
var create_transaction_dto_1 = __webpack_require__(/*! ./dto/create-transaction.dto */ "./src/transaction/dto/create-transaction.dto.ts");
var TransactionController = /** @class */ (function () {
    function TransactionController(transactionService) {
        this.transactionService = transactionService;
    }
    TransactionController.prototype.createNewTransaction = function (createTransactionDto) {
        return this.transactionService.processTransactions(createTransactionDto);
    };
    TransactionController.prototype.findAll = function () {
        return this.transactionService.findAll();
    };
    TransactionController.prototype.findOne = function (id) {
        return this.transactionService.findOne(+id);
    };
    var _a, _b;
    __decorate([
        (0, common_1.Post)('/batch-process'),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [typeof (_b = typeof create_transaction_dto_1.CreateTransactionDto !== "undefined" && create_transaction_dto_1.CreateTransactionDto) === "function" ? _b : Object]),
        __metadata("design:returntype", void 0)
    ], TransactionController.prototype, "createNewTransaction", null);
    __decorate([
        (0, common_1.Get)(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TransactionController.prototype, "findAll", null);
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TransactionController.prototype, "findOne", null);
    TransactionController = __decorate([
        (0, common_1.Controller)('transaction'),
        __metadata("design:paramtypes", [typeof (_a = typeof transaction_service_1.TransactionService !== "undefined" && transaction_service_1.TransactionService) === "function" ? _a : Object])
    ], TransactionController);
    return TransactionController;
}());
exports.TransactionController = TransactionController;


/***/ }),

/***/ "./src/transaction/transaction.module.ts":
/*!***********************************************!*\
  !*** ./src/transaction/transaction.module.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionModule = void 0;
var common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var transaction_service_1 = __webpack_require__(/*! ./transaction.service */ "./src/transaction/transaction.service.ts");
var transaction_controller_1 = __webpack_require__(/*! ./transaction.controller */ "./src/transaction/transaction.controller.ts");
var transaction_entity_1 = __webpack_require__(/*! ./entities/transaction.entity */ "./src/transaction/entities/transaction.entity.ts");
var typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
var person_entity_1 = __webpack_require__(/*! src/person/entities/person.entity */ "./src/person/entities/person.entity.ts");
var src_1 = __webpack_require__(/*! libs/common/src */ "./libs/common/src/index.ts");
var TransactionModule = /** @class */ (function () {
    function TransactionModule() {
    }
    TransactionModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([transaction_entity_1.Transaction, person_entity_1.Person]), src_1.ConfigModule],
            controllers: [transaction_controller_1.TransactionController],
            providers: [transaction_service_1.TransactionService],
        })
    ], TransactionModule);
    return TransactionModule;
}());
exports.TransactionModule = TransactionModule;


/***/ }),

/***/ "./src/transaction/transaction.service.ts":
/*!************************************************!*\
  !*** ./src/transaction/transaction.service.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionService = void 0;
var common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
var typeorm_2 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
var transaction_entity_1 = __webpack_require__(/*! ./entities/transaction.entity */ "./src/transaction/entities/transaction.entity.ts");
var person_entity_1 = __webpack_require__(/*! src/person/entities/person.entity */ "./src/person/entities/person.entity.ts");
var common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
var axios_1 = __webpack_require__(/*! axios */ "axios");
var exchange_status_enum_1 = __webpack_require__(/*! ./enums/exchange-status.enum */ "./src/transaction/enums/exchange-status.enum.ts");
var config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
var TransactionService = /** @class */ (function () {
    function TransactionService(transactionRepository, personRepository, configService) {
        this.transactionRepository = transactionRepository;
        this.personRepository = personRepository;
        this.configService = configService;
    }
    TransactionService.prototype.processTransactions = function (createTransactionDto) {
        return __awaiter(this, void 0, Promise, function () {
            var senderId, receiverIds, amount;
            var _this = this;
            return __generator(this, function (_a) {
                senderId = createTransactionDto.senderId, receiverIds = createTransactionDto.receiverIds, amount = createTransactionDto.amount;
                return [2 /*return*/, this.transactionRepository.manager.transaction(function (transactionManager) { return __awaiter(_this, void 0, void 0, function () {
                        var startTime, sender, receivers, transaction, endTime, timeTaken;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    startTime = Date.now();
                                    return [4 /*yield*/, this.getPersonWithBank(senderId)];
                                case 1:
                                    sender = _a.sent();
                                    return [4 /*yield*/, this.getReceiversWithBank(receiverIds, transactionManager)];
                                case 2:
                                    receivers = _a.sent();
                                    this.validateSenderBalance(sender, amount, receivers.length);
                                    transaction = this.createTransaction(amount, sender, receivers);
                                    return [4 /*yield*/, transactionManager.save(transaction)];
                                case 3:
                                    _a.sent();
                                    this.updateSenderBalance(sender, amount, transactionManager, receivers.length);
                                    return [4 /*yield*/, this.updateReceiversBalance(sender, receivers, amount, transactionManager)];
                                case 4:
                                    _a.sent();
                                    endTime = Date.now();
                                    timeTaken = endTime - startTime;
                                    console.log("Time taken to process transaction: ".concat(timeTaken, "ms"));
                                    return [2 /*return*/, __assign({ processedIn: "".concat(timeTaken, "ms") }, transaction)];
                            }
                        });
                    }); })];
            });
        });
    };
    TransactionService.prototype.getPersonWithBank = function (personId) {
        return __awaiter(this, void 0, Promise, function () {
            var person;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.personRepository.findOne({
                            where: { id: personId },
                            relations: ['bank'],
                        })];
                    case 1:
                        person = _a.sent();
                        if (!person) {
                            throw new common_2.NotFoundException('Sender not found');
                        }
                        return [2 /*return*/, person];
                }
            });
        });
    };
    TransactionService.prototype.getReceiversWithBank = function (receiverIds, transactionManager) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, transactionManager.find(person_entity_1.Person, {
                        where: { id: (0, typeorm_1.In)(receiverIds) },
                        relations: ['bank'],
                    })];
            });
        });
    };
    TransactionService.prototype.validateSenderBalance = function (sender, amount, receiverCount) {
        var totalAmount = amount * receiverCount;
        if (sender.bank.balance < totalAmount) {
            throw new common_2.BadRequestException('Insufficient balance in sender account');
        }
    };
    TransactionService.prototype.createTransaction = function (amount, sender, receivers) {
        var transaction = new transaction_entity_1.Transaction();
        transaction.amount = amount;
        transaction.sender = sender;
        transaction.receivers = receivers;
        transaction.status = transaction_entity_1.TransactionStatus.SUCCESS;
        transaction.bank = sender.bank;
        return transaction;
    };
    TransactionService.prototype.updateSenderBalance = function (sender, amount, transactionManager, receiverCount) {
        sender.bank.balance -= amount * receiverCount;
        sender.bank.balance = parseFloat(sender.bank.balance.toFixed(2));
        transactionManager.save(sender.bank);
    };
    TransactionService.prototype.updateReceiversBalance = function (sender, receivers, amount, transactionManager) {
        return __awaiter(this, void 0, Promise, function () {
            var _i, receivers_1, receiver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, receivers_1 = receivers;
                        _a.label = 1;
                    case 1:
                        if (!(_i < receivers_1.length)) return [3 /*break*/, 5];
                        receiver = receivers_1[_i];
                        if (!(receiver.bank.currency !== sender.bank.currency)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.handleCurrencyConversion(receiver, sender.bank.currency, amount, transactionManager)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.updateSameCurrencyReceiverBalance(receiver, amount, transactionManager);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TransactionService.prototype.handleCurrencyConversion = function (receiver, fromCurrency, amount, transactionManager) {
        return __awaiter(this, void 0, Promise, function () {
            var _a, result, conversion_result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getExchangeRate(fromCurrency, receiver.bank.currency, amount)];
                    case 1:
                        _a = _b.sent(), result = _a.result, conversion_result = _a.conversion_result;
                        if (!(result === exchange_status_enum_1.ExchangeStatus.SUCCESS)) return [3 /*break*/, 3];
                        receiver.bank.balance += conversion_result;
                        receiver.bank.balance = parseFloat(receiver.bank.balance.toFixed(2));
                        return [4 /*yield*/, transactionManager.save(receiver.bank)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3: throw new common_2.BadRequestException('Invalid currency code or unable to fetch exchange rate');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TransactionService.prototype.updateSameCurrencyReceiverBalance = function (receiver, amount, transactionManager) {
        receiver.bank.balance += amount;
        receiver.bank.balance = parseFloat(receiver.bank.balance.toFixed(2));
        transactionManager.save(receiver.bank);
    };
    TransactionService.prototype.getExchangeRate = function (from, to, amount) {
        return __awaiter(this, void 0, Promise, function () {
            var baseUrl, response, resultDto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseUrl = this.configService.get('EXCHANGE_API_BASE_URL');
                        return [4 /*yield*/, axios_1.default.get("".concat(baseUrl, "/").concat(from, "/").concat(to, "/").concat(amount))];
                    case 1:
                        response = _a.sent();
                        resultDto = response.data;
                        if (resultDto.result !== exchange_status_enum_1.ExchangeStatus.SUCCESS) {
                            throw new common_2.BadRequestException('Invalid currency code or unable to fetch exchange rate');
                        }
                        return [2 /*return*/, resultDto];
                }
            });
        });
    };
    TransactionService.prototype.findAll = function () {
        return "This action returns all transaction";
    };
    TransactionService.prototype.findOne = function (id) {
        return "This action returns a #".concat(id, " transaction");
    };
    var _a, _b, _c;
    TransactionService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_2.InjectRepository)(transaction_entity_1.Transaction)),
        __param(1, (0, typeorm_2.InjectRepository)(person_entity_1.Person)),
        __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
    ], TransactionService);
    return TransactionService;
}());
exports.TransactionService = TransactionService;


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/mapped-types":
/*!***************************************!*\
  !*** external "@nestjs/mapped-types" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ "nestjs-pino":
/*!******************************!*\
  !*** external "nestjs-pino" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("nestjs-pino");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;