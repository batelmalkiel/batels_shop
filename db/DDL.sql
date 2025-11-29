-- Create schema
CREATE SCHEMA IF NOT EXISTS shop;

-- Drop existing tables in schema
DROP TABLE IF EXISTS shop.order_items CASCADE;
DROP TABLE IF EXISTS shop.orders CASCADE;
DROP TABLE IF EXISTS shop.products CASCADE;
DROP TABLE IF EXISTS shop.users CASCADE;

-- Drop types
DROP TYPE IF EXISTS shop.order_status_enum CASCADE;
DROP TYPE IF EXISTS shop.metal_type_enum CASCADE;
DROP TYPE IF EXISTS shop.stone_type_enum CASCADE;

-- ENUM Types

CREATE TYPE shop.order_status_enum AS ENUM (
    'pending', 'processing', 'shipped', 'delivered', 'cancelled'
);

CREATE TYPE shop.metal_type_enum AS ENUM (
    'gold', 'white_gold', 'rose_gold', 'silver', 'platinum', 'titanium'
);

CREATE TYPE shop.stone_type_enum AS ENUM (
    'diamond', 'ruby', 'sapphire', 'emerald', 'pearl', 'topaz',
    'amethyst', 'aquamarine', 'none'
);

-- Users Table

CREATE TABLE shop.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT email_format CHECK (
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    )
);

CREATE INDEX idx_users_email ON shop.users(email);

-- Products Table

CREATE TABLE shop.products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    metal_type shop.metal_type_enum NOT NULL,
    metal_weight DECIMAL(6, 2),
    stone_type shop.stone_type_enum DEFAULT 'none',
    stone_carat DECIMAL(6, 2),
    stone_clarity VARCHAR(50),
    stone_color VARCHAR(50),
    image_url TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_custom_made BOOLEAN DEFAULT false,
    collection VARCHAR(100),
    tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT price_positive CHECK (price > 0),
    CONSTRAINT stock_non_negative CHECK (stock >= 0),
    CONSTRAINT metal_weight_positive CHECK (metal_weight IS NULL OR metal_weight > 0),
    CONSTRAINT stone_carat_positive CHECK (stone_carat IS NULL OR stone_carat > 0)
);

CREATE INDEX idx_products_category ON shop.products(category);
CREATE INDEX idx_products_metal_type ON shop.products(metal_type);
CREATE INDEX idx_products_stone_type ON shop.products(stone_type);
CREATE INDEX idx_products_collection ON shop.products(collection);
CREATE INDEX idx_products_is_active ON shop.products(is_active);
CREATE INDEX idx_products_price ON shop.products(price);
CREATE INDEX idx_products_name ON shop.products USING gin(to_tsvector('english', name));

-- Orders Table

CREATE TABLE shop.orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status shop.order_status_enum NOT NULL DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    notes TEXT,
    gift_wrap BOOLEAN DEFAULT false,
    gift_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_orders_user FOREIGN KEY (user_id)
        REFERENCES shop.users(id) ON DELETE CASCADE,
    CONSTRAINT total_amount_positive CHECK (total_amount > 0)
);

CREATE INDEX idx_orders_user_id ON shop.orders(user_id);
CREATE INDEX idx_orders_status ON shop.orders(status);
CREATE INDEX idx_orders_created_at ON shop.orders(created_at DESC);

-- Order Items Table

CREATE TABLE shop.order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    engraving_text VARCHAR(100),
    ring_size VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id)
        REFERENCES shop.orders(id) ON DELETE CASCADE,

    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id)
        REFERENCES shop.products(id) ON DELETE RESTRICT,

    CONSTRAINT quantity_positive CHECK (quantity > 0),
    CONSTRAINT price_at_purchase_positive CHECK (price_at_purchase > 0)
);

CREATE INDEX idx_order_items_order_id ON shop.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON shop.order_items(product_id);

-- Trigger to update updated_at

CREATE OR REPLACE FUNCTION shop.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON shop.users
    FOR EACH ROW
    EXECUTE FUNCTION shop.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON shop.products
    FOR EACH ROW
    EXECUTE FUNCTION shop.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON shop.orders
    FOR EACH ROW
    EXECUTE FUNCTION shop.update_updated_at_column();
