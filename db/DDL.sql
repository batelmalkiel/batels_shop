-- Jewelry Shop Database DDL

-- Drop existing tables if they exist
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop existing types if they exist
DROP TYPE IF EXISTS order_status_enum CASCADE;
DROP TYPE IF EXISTS metal_type_enum CASCADE;
DROP TYPE IF EXISTS stone_type_enum CASCADE;

-- ENUM Types

CREATE TYPE order_status_enum AS ENUM (
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
);

CREATE TYPE metal_type_enum AS ENUM (
    'gold',
    'white_gold',
    'rose_gold',
    'silver',
    'platinum',
    'titanium'
);

CREATE TYPE stone_type_enum AS ENUM (
    'diamond',
    'ruby',
    'sapphire',
    'emerald',
    'pearl',
    'topaz',
    'amethyst',
    'aquamarine',
    'none'
);

-- Users Table

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    --provider VARCHAR(20) NOT NULL DEFAULT 'local',
    --google_id VARCHAR(255) UNIQUE,
    --profile_picture TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    --CONSTRAINT provider_check CHECK (provider IN ('local', 'google'))
);

CREATE INDEX idx_users_email ON users(email);
--CREATE INDEX idx_users_google_id ON users(google_id) WHERE google_id IS NOT NULL;

-- Products Table

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL, -- טבעת, שרשרת, עגילים, צמיד, תליון
    metal_type metal_type_enum NOT NULL,
    metal_weight DECIMAL(6, 2), -- משקל המתכת בגרמים
    stone_type stone_type_enum DEFAULT 'none',
    stone_carat DECIMAL(6, 2), -- קראט של האבן
    stone_clarity VARCHAR(50), -- וי.וי.אס, וי.אס וכו'
    stone_color VARCHAR(50),
    image_url TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_custom_made BOOLEAN DEFAULT false, -- האם מיוצר לפי הזמנה
    collection VARCHAR(100), -- קולקציה/סדרה
    tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT price_positive CHECK (price > 0),
    CONSTRAINT stock_non_negative CHECK (stock >= 0),
    CONSTRAINT metal_weight_positive CHECK (metal_weight IS NULL OR metal_weight > 0),
    CONSTRAINT stone_carat_positive CHECK (stone_carat IS NULL OR stone_carat > 0)
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_metal_type ON products(metal_type);
CREATE INDEX idx_products_stone_type ON products(stone_type);
CREATE INDEX idx_products_collection ON products(collection);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_name ON products USING gin(to_tsvector('english', name));

-- Orders Table

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status order_status_enum NOT NULL DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    notes TEXT,
    gift_wrap BOOLEAN DEFAULT false,
    gift_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT total_amount_positive CHECK (total_amount > 0)
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Order Items Table

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    engraving_text VARCHAR(100), -- טקסט לחריטה
    ring_size VARCHAR(10), -- מידת טבעת
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) 
        REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) 
        REFERENCES products(id) ON DELETE RESTRICT,
    CONSTRAINT quantity_positive CHECK (quantity > 0),
    CONSTRAINT price_at_purchase_positive CHECK (price_at_purchase > 0)
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Triggers for updated_at

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Views

CREATE OR REPLACE VIEW order_details_view AS
SELECT 
    o.id as order_id,
    o.created_at as order_date,
    o.status,
    o.total_amount,
    o.shipping_address,
    o.gift_wrap,
    u.id as user_id,
    u.email,
    u.first_name,
    u.last_name,
    u.phone,
    COUNT(oi.id) as total_items,
    SUM(oi.quantity) as total_quantity
FROM orders o
JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, u.id;

CREATE OR REPLACE VIEW product_stats_view AS
SELECT 
    p.id,
    p.name,
    p.category,
    p.metal_type,
    p.stone_type,
    p.price,
    p.stock,
    COALESCE(SUM(oi.quantity), 0) as total_sold,
    COUNT(DISTINCT oi.order_id) as times_ordered,
    COALESCE(SUM(oi.quantity * oi.price_at_purchase), 0) as total_revenue
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id;

-- ============================================
-- Comments
-- ============================================

COMMENT ON TABLE products IS 'Jewelry products catalog with detailed specifications';
COMMENT ON COLUMN products.metal_weight IS 'Weight of metal in grams';
COMMENT ON COLUMN products.stone_carat IS 'Carat weight of the main stone';
COMMENT ON COLUMN products.stone_clarity IS 'Diamond clarity grade (VVS, VS, SI, etc.)';
COMMENT ON COLUMN products.is_custom_made IS 'Whether this item is made-to-order';
COMMENT ON COLUMN order_items.engraving_text IS 'Custom engraving text for jewelry';
COMMENT ON COLUMN order_items.ring_size IS 'Ring size for ring orders';

DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE '💍 Jewelry Shop Database Created!';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Tables: users, products, orders, order_items';
    RAISE NOTICE 'Views: order_details_view, product_stats_view';
    RAISE NOTICE 'Metal Types: gold, white_gold, rose_gold, silver, platinum, titanium';
    RAISE NOTICE 'Stone Types: diamond, ruby, sapphire, emerald, pearl, topaz, amethyst, aquamarine';
    RAISE NOTICE '========================================';
END $$;