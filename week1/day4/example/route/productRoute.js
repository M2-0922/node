import express from "express";

const router = express.Router();

let productArr = [
    {
        id: 1,
        name: "Macbook Air",
        price: 199
    },
    {
        id: 2,
        name: "Macbook Pro 14",
        price: 299
    },
    {
        id: 3,
        name: "Macbook Pro 16",
        price: 399
    }
]

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "successfull",
        products: productArr
    })
})

router.post("/", (req, res, next) => {
    try {
        productArr.push(req.body);
        res.status(201).json({
            message: "successfully added!",
            products: productArr
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
});

router.delete("/", (req, res, next) => {
    try {
        const { id } = req.query;

        if(id){
            productArr = productArr.filter((product) => {
                console.log(product);
                return product.id !== parseInt(id);
            });
        }

        res.status(200).json({
            message: "successfully deleted!"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

router.put("/", (req, res) => {
    try {
        const { id } = req.query;
        const { name, price } = req.body;
    
        productArr = productArr.map((product) => {
            if(product.id == id){
                return { ...product, name, price }
            }
            return product;
        }) 

        res.status(200).json({
            message: "successfully updated!"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

export default router;