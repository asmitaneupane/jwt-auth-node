const express = require('express');
const jwt = require('jsonwebtoken')

const app = express();
const secret = "secret";

app.get('/', (req, res) => {
    res.json({
        message: "This is API"
    })
})

app.post("/login", (req, res) => {
    const user = {
        id: 1,
        username: "asmita",
        email: "asmita@gmail.com"
    }
    jwt.sign({ user }, secret, {
        expiresIn: "2h"
    },
        (err, token) => {
            res.json({
                token
            })
        })
})

app.post("/profile", verifyToken, (req, res) => {
    jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
            res.send({
                result: "Invalid Token!"
            })
        } else {
            res.json({
                message: "Your Profile",
                authData
            })
        }
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.send({
            result: "Token is not Valid."
        })
    }
}

app.listen(5000, () => {
    console.log("App is running on port 5000.");
})