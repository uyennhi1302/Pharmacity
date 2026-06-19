const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🏥 Lấy tất cả sản phẩm
app.get("/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi lấy sản phẩm" });
        }
        res.json(results);
    });
});

// 📝 Đăng ký
app.post("/register", (req, res) => {
    const { first_name, last_name, email, password, phone, address, role } = req.body;

    // Kiểm tra thông tin
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
    }

    // Kiểm tra email đã tồn tại
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi server" });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: "Email đã được đăng ký!" });
        }

        // Thêm user mới
        const userRole = role === "admin" ? "admin" : "customer";
        db.query(
            "INSERT INTO users (first_name, last_name, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [first_name, last_name, email, password, phone || "", address || "", userRole],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Lỗi đăng ký" });
                }
                res.json({ message: "Đăng ký thành công!", userId: result.insertId, role: userRole });
            }
        );
    });
});

// 🔐 Đăng nhập
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu!" });
    }

    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Lỗi server" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Email hoặc mật khẩu không đúng!" });
        }

        res.json({ message: "Đăng nhập thành công!", user: results[0] });
    });
});

// ➕ Thêm sản phẩm mới (chỉ admin)
app.post("/add-product", (req, res) => {
    const { name, price, description, image, userId } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: "Vui lòng nhập tên và giá!" });
    }

    // Kiểm tra role admin
    db.query("SELECT role FROM users WHERE id = ?", [userId], (err, results) => {
        if (err || !results || results.length === 0) {
            return res.status(401).json({ message: "Không tìm thấy user!" });
        }

        if (results[0].role !== "admin") {
            return res.status(403).json({ message: "Chỉ admin mới có thể thêm sản phẩm!" });
        }

        db.query(
            "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)",
            [name, price, description || "", image || ""],
            (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Lỗi thêm sản phẩm" });
                }
                res.json({ message: "Thêm sản phẩm thành công!", productId: result.insertId });
            }
        );
    });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});