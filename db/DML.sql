-- Jewelry Shop DML

TRUNCATE TABLE order_items, orders, products, users RESTART IDENTITY CASCADE;

-- Insert Users

INSERT INTO users (email, password, first_name, last_name, phone, address) VALUES
('sarah.gold@example.com', '$2b$10$HashedPassword', 'Sarah', 'Gold', '050-1234567', 'Tel Aviv, Rothschild 45'),
('david.diamond@example.com', '$2b$10$HashedPassword', 'David', 'Diamond', '052-9876543', 'Jerusalem, King David 12'),
('rachel.ruby@example.com', '$2b$10$HashedPassword', 'Rachel', 'Ruby', '054-5555555', 'Ramat Gan, Bialik 88');

-- Insert Jewelry Products

-- טבעות אירוסין (Engagement Rings)
INSERT INTO products (name, description, price, category, metal_type, metal_weight, stone_type, stone_carat, stone_clarity, stone_color, image_url, stock, collection, tags) VALUES
(
    'טבעת אירוסין סוליטר קלאסית',
    'טבעת אירוסין יהלום סוליטר מדהימה בזהב לבן 14K. יהלום מרכזי איכותי בחיתוך עגול מושלם.',
    15999.00,
    'טבעות אירוסין',
    'white_gold',
    3.5,
    'diamond',
    0.50,
    'VS1',
    'F',
    'https://res.cloudinary.com/dimpce519/image/upload/v1764433765/%D7%98%D7%91%D7%A2%D7%AA-%D7%90%D7%99%D7%A8%D7%95%D7%A1%D7%99%D7%9F-%D7%A1%D7%95%D7%9C%D7%99%D7%98%D7%A8-ADR-00306-3-1-300x300_iiasmg.jpg',
    12,
    'קלאסיקה נצחית',
    ARRAY['אירוסין', 'יהלום', 'זהב לבן', 'סוליטר']
),
(
    'טבעת אירוסין הילה יוקרתית',
    'טבעת אירוסין מרהיבה עם יהלום מרכזי מוקף בהילה של יהלומים קטנים. זהב לבן 18K.',
    24999.00,
    'טבעות אירוסין',
    'white_gold',
    4.2,
    'diamond',
    1.00,
    'VVS2',
    'E',
    'https://res.cloudinary.com/dimpce519/image/upload/v1764433819/unique_rings_zb3taa.webp',
    8,
    'קולקציית יוקרה',
    ARRAY['אירוסין', 'יהלום', 'הילה', 'פרימיום']
),
(
    'טבעת אירוסין רוז גולד מודרנית',
    'טבעת אירוסין ייחודית בזהב ורוד 14K עם יהלום מרכזי ועיטורים עדינים.',
    18500.00,
    'טבעות אירוסין',
    'rose_gold',
    3.8,
    'diamond',
    0.70,
    'VS2',
    'G',
    'https://res.cloudinary.com/dimpce519/image/upload/v1764433836/DSC08394_645369be-4535-46ef-b4a7-d94c15c704ca_vgg9mx.webp',
    10,
    'מודרניות',
    ARRAY['אירוסין', 'רוז גולד', 'מודרני']
);

-- שרשראות ותליונים (Necklaces & Pendants)
INSERT INTO products (name, description, price, category, metal_type, metal_weight, stone_type, stone_carat, stone_clarity, image_url, stock, collection, tags) VALUES
(
    'שרשרת יהלום לב',
    'שרשרת זהב לבן עדינה עם תליון לב משובץ יהלומים. מתנה מושלמת.',
    4999.00,
    'שרשראות',
    'white_gold',
    2.5,
    'diamond',
    0.25,
    'VS1',
    'https://res.cloudinary.com/dimpce519/image/upload/v1764433881/64317_G_01_dofjoc.webp',
    25,
    'אהבה נצחית',
    ARRAY['שרשרת', 'יהלום', 'לב', 'מתנה']
),
(
    'תליון ספיר כחול',
    'תליון מרהיב עם ספיר כחול מרכזי מוקף יהלומים בזהב לבן 18K.',
    8999.00,
    'תליונים',
    'white_gold',
    3.0,
    'sapphire',
    1.50,
    NULL,
    'https://res.cloudinary.com/dimpce519/image/upload/v1764433916/images_kbsfs8.jpg',
    15,
    'אבנים יקרות',
    ARRAY['תליון', 'ספיר', 'יהלומים', 'כחול']
),
(
    'שרשרת זהב ונציה',
    'שרשרת זהב צהוב 14K בסגנון ונציה קלאסי. אלגנטי ונצחי.',
    2999.00,
    'שרשראות',
    'gold',
    5.0,
    'none',
    NULL,
    NULL,
    'https://res.cloudinary.com/dimpce519/image/upload/v1764433908/bow-necklace-gold-vermeil-necklace-30973680353353_nz2g2w.webp',
    40,
    'קלאסיקה',
    ARRAY['שרשרת', 'זהב', 'קלאסי']
);

-- עגילים (Earrings)
INSERT INTO products (name, description, price, category, metal_type, metal_weight, stone_type, stone_carat, stone_clarity, image_url, stock, collection, tags) VALUES
(
    'עגילי יהלום סטאד',
    'עגילי יהלום סטאד קלאסיים בזהב לבן 14K. אלגנטיים ועדינים.',
    6999.00,
    'עגילים',
    'white_gold',
    1.5,
    'diamond',
    0.50,
    'VS1',
    'https://res.cloudinary.com/dimpce519/image/upload/v1764433955/download_hl1zjo.jpg',
    20,
    'קלאסיקה',
    ARRAY['עגילים', 'יהלום', 'סטאד']
),
(
    'עגילי פנינה תלויים',
    'עגילים מרהיבים עם פנינים לבנות תלויות בזהב לבן.',
    3999.00,
    'עגילים',
    'white_gold',
    2.0,
    'pearl',
    NULL,
    NULL,
    'https://res.cloudinary.com/dimpce519/image/upload/v1764433959/download_mhicu2.jpg',
    30,
    'אלגנטיות',
    ARRAY['עגילים', 'פנינה', 'תלויים']
),
(
    'עגילי חישוק זהב',
    'עגילי חישוק מודרניים בזהב צהוב 14K.',
    1999.00,
    'עגילים',
    'gold',
    3.0,
    'none',
    NULL,
    NULL,
    'https://res.cloudinary.com/dimpce519/image/upload/v1764433970/download_ozioop.jpg',
    35,
    'מודרניות',
    ARRAY['עגילים', 'חישוק', 'זהב']
);

-- צמידים (Bracelets)
INSERT INTO products (name, description, price, category, metal_type, metal_weight, stone_type, image_url, stock, collection, tags) VALUES
(
    'צמיד טניס יהלומים',
    'צמיד טניס קלאסי משובץ יהלומים בזהב לבן 14K.',
    12999.00,
    'צמידים',
    'white_gold',
    8.0,
    'diamond',
    'https://res.cloudinary.com/dimpce519/image/upload/v1764433990/download_uopgyj.jpg',
    10,
    'קלאסיקה יוקרתית',
    ARRAY['צמיד', 'טניס', 'יהלומים']
),
(
    'צמיד זהב חוליות',
    'צמיד זהב צהוב 14K עם חוליות מעוצבות.',
    4999.00,
    'צמידים',
    'gold',
    12.0,
    'none',
    'https://res.cloudinary.com/dimpce519/image/upload/v1764434010/download_xdgrq9.jpg',
    25,
    'קלאסיקה',
    ARRAY['צמיד', 'זהב', 'חוליות']
);

-- טבעות (Rings)
INSERT INTO products (name, description, price, category, metal_type, metal_weight, stone_type, image_url, stock, collection, tags) VALUES
(
    'טבעת נישואין זהב לבן',
    'טבעת נישואין קלאסית בזהב לבן 14K עם גימור מבריק.',
    1999.00,
    'טבעות נישואין',
    'white_gold',
    4.0,
    'none',
    'https://res.cloudinary.com/dimpce519/image/upload/v1764434078/download_q1lmxf.jpg',
    50,
    'נישואין קלאסי',
    ARRAY['נישואין', 'זהב לבן', 'קלאסי']
),
(
    'טבעת אמרלד מלכותית',
    'טבעת יוקרתית עם אמרלד ירוק מרכזי ויהלומים בזהב לבן 18K.',
    19999.00,
    'טבעות אבן',
    'white_gold',
    5.5,
    'emerald',
    'https://res.cloudinary.com/dimpce519/image/upload/v1764434055/download_roxulw.jpg',
    6,
    'אבנים יקרות',
    ARRAY['טבעת', 'אמרלד', 'יהלומים', 'יוקרה']
),
(
    'טבעת פלטינה מינימליסטית',
    'טבעת פלטינה עדינה ומודרנית. עיצוב מינימליסטי ואלגנטי.',
    5999.00,
    'טבעות',
    'platinum',
    6.0,
    'none',
    'https://res.cloudinary.com/dimpce519/image/upload/v1764434075/images_zvi51p.jpg',
    18,
    'מינימליזם',
    ARRAY['טבעת', 'פלטינה', 'מינימליסטי']
);

-- Insert Sample Orders

-- Order 1: Sarah bought engagement ring
INSERT INTO orders (user_id, total_amount, status, shipping_address, gift_wrap, gift_message) VALUES
(1, 15999.00, 'delivered', 'Tel Aviv, Rothschild 45, Apt 12', true, 'To my beloved ❤️');

INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, ring_size) VALUES
(1, 1, 1, 15999.00, '6.5');

UPDATE products SET stock = stock - 1 WHERE id = 1;

-- Order 2: David bought necklace and earrings
INSERT INTO orders (user_id, total_amount, status, shipping_address, gift_wrap) VALUES
(2, 11998.00, 'shipped', 'Jerusalem, King David 12', true);

INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
(2, 4, 1, 4999.00),  -- Heart necklace
(2, 8, 1, 6999.00);  -- Diamond studs

UPDATE products SET stock = stock - 1 WHERE id IN (4, 8);

-- Order 3: Rachel - pending order
INSERT INTO orders (user_id, total_amount, status, shipping_address, notes) VALUES
(3, 24999.00, 'pending', 'Ramat Gan, Bialik 88', 'Please call before delivery');

INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase, ring_size, engraving_text) VALUES
(3, 2, 1, 24999.00, '7', 'Forever & Always');

UPDATE products SET stock = stock - 1 WHERE id = 2;
