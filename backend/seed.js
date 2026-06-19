const db = require("./db");

db.run(`
INSERT INTO products (name, price, description, image)
VALUES
('Paracetamol 500mg',25000,'Giảm đau hạ sốt',''),
('Vitamin C 1000mg',120000,'Bổ sung vitamin',''),
('Amoxicillin 500mg',45000,'Kháng sinh','')
`);

console.log("Seed success");