
CREATE DATABASE IF NOT EXISTS shopdb;
USE shopdb;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
 id INT AUTO_INCREMENT PRIMARY KEY,
 first_name VARCHAR(100),
 last_name VARCHAR(100),
 email VARCHAR(255) UNIQUE,
 password VARCHAR(255),
 phone VARCHAR(20),
 address TEXT,
 role VARCHAR(20) DEFAULT 'customer'
);

CREATE TABLE products(
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(255),
 price DECIMAL(10,2),
 description TEXT,
 image VARCHAR(500)
);

-- Thêm admin account
INSERT INTO users (first_name, last_name, email, password, phone, address, role) 
VALUES ('Admin', 'System', 'admin@pharmacy.com', 'admin123', '0123456789', '123 Admin St', 'admin');

-- Thêm sản phẩm mặc định với ảnh
INSERT INTO products (name, price, description, image) VALUES 
('Paracetamol 500mg', 25000, 'Giảm đau, hạ sốt hiệu quả', 'https://via.placeholder.com/200?text=Paracetamol'),
('Amoxicillin 500mg', 45000, 'Kháng sinh phổ biến', 'https://via.placeholder.com/200?text=Amoxicillin'),
('Vitamin C 1000mg', 120000, 'Bổ sung vitamin', 'https://via.placeholder.com/200?text=VitaminC'),
('Ibuprofen 400mg', 35000, 'Giảm viêm, hạ sốt', 'https://via.placeholder.com/200?text=Ibuprofen'),
('Aspirin 500mg', 28000, 'Giảm đau nhức', 'https://via.placeholder.com/200?text=Aspirin');
