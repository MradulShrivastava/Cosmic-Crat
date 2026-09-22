const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check / test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Mahika Backend Running 🚀",
    });
});


app.get("/api/products/:id", (req, res) => {
    const productId = Number(req.params.id);
    res.json({
        success: true,
        message: "Product fetched successfully",
        productId
    });
});



app.get("/api/products", (req, res) => {
    const { zodiac } = req.query;

    res.json({
        success: true,
        message: "Products fetched successfully",
        zodiac
    });
});

module.exports = app;