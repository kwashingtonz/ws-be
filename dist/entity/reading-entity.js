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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingEntity = void 0;
const typeorm_1 = require("typeorm");
const weather_station_entity_1 = require("./weather-station-entity");
let ReadingEntity = class ReadingEntity {
};
exports.ReadingEntity = ReadingEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReadingEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ReadingEntity.prototype, "dateTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReadingEntity.prototype, "temperature", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReadingEntity.prototype, "humidity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReadingEntity.prototype, "airPressure", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => weather_station_entity_1.WeatherStationEntity),
    __metadata("design:type", weather_station_entity_1.WeatherStationEntity)
], ReadingEntity.prototype, "weatherStation", void 0);
exports.ReadingEntity = ReadingEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "readings" })
], ReadingEntity);
