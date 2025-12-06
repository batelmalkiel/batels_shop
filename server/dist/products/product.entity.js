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
exports.Product = exports.StoneType = exports.MetalType = void 0;
const typeorm_1 = require("typeorm");
var MetalType;
(function (MetalType) {
    MetalType["GOLD"] = "gold";
    MetalType["WHITE_GOLD"] = "white_gold";
    MetalType["ROSE_GOLD"] = "rose_gold";
    MetalType["SILVER"] = "silver";
    MetalType["PLATINUM"] = "platinum";
    MetalType["TITANIUM"] = "titanium";
})(MetalType || (exports.MetalType = MetalType = {}));
var StoneType;
(function (StoneType) {
    StoneType["DIAMOND"] = "diamond";
    StoneType["RUBY"] = "ruby";
    StoneType["SAPPHIRE"] = "sapphire";
    StoneType["EMERALD"] = "emerald";
    StoneType["PEARL"] = "pearl";
    StoneType["TOPAZ"] = "topaz";
    StoneType["AMETHYST"] = "amethyst";
    StoneType["AQUAMARINE"] = "aquamarine";
    StoneType["NONE"] = "none";
})(StoneType || (exports.StoneType = StoneType = {}));
let Product = class Product {
    id;
    name;
    description;
    price;
    category;
    metalType;
    metalWeight;
    stoneType;
    stoneCarat;
    stoneClarity;
    stoneColor;
    imageUrl;
    stock;
    isActive;
    isCustomMade;
    collection;
    tags;
    createdAt;
    updatedAt;
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'metal_type',
        type: 'enum',
        enum: MetalType,
    }),
    __metadata("design:type", String)
], Product.prototype, "metalType", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', {
        name: 'metal_weight',
        precision: 6,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Product.prototype, "metalWeight", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'stone_type',
        type: 'enum',
        enum: StoneType,
        default: StoneType.NONE,
    }),
    __metadata("design:type", String)
], Product.prototype, "stoneType", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', {
        name: 'stone_carat',
        precision: 6,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Product.prototype, "stoneCarat", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stone_clarity', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "stoneClarity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stone_color', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "stoneColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url' }),
    __metadata("design:type", String)
], Product.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'stock', default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_custom_made', default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "isCustomMade", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "collection", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('products')
], Product);
//# sourceMappingURL=product.entity.js.map