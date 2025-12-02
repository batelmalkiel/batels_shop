export declare enum MetalType {
    GOLD = "gold",
    WHITE_GOLD = "white_gold",
    ROSE_GOLD = "rose_gold",
    SILVER = "silver",
    PLATINUM = "platinum",
    TITANIUM = "titanium"
}
export declare enum StoneType {
    DIAMOND = "diamond",
    RUBY = "ruby",
    SAPPHIRE = "sapphire",
    EMERALD = "emerald",
    PEARL = "pearl",
    TOPAZ = "topaz",
    AMETHYST = "amethyst",
    AQUAMARINE = "aquamarine",
    NONE = "none"
}
export declare class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    metalType: MetalType;
    metalWeight: number;
    stoneType: StoneType;
    stoneCarat: number;
    stoneClarity: string;
    stoneColor: string;
    imageUrl: string;
    stock: number;
    isActive: boolean;
    isCustomMade: boolean;
    collection: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
