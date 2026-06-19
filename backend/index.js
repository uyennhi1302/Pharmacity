const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 25000,
    description: "Giảm đau, hạ sốt",
    image: "https://via.placeholder.com/200"
  },
  {
    id: 2,
    name: "Amoxicillin 500mg",
    price: 45000,
    description: "Kháng sinh",
    image: "https://via.placeholder.com/200"
  },
  {
    id: 3,
    name: "Vitamin C 1000mg",
    price: 120000,
    description: "Bổ sung vitamin",
    image: "https://via.placeholder.com/200"
  }
];

app.get("/products", (req, res) => {
  res.json(products);
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});