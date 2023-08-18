const express = require('express');
const {json} = require("express");
const { randomUUID } = require('crypto');
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});

const users = [
    {
        id: 'd9a996ea-6886-4027-8ec9-bf0ff3112746',
        name: "Donald Trump Junior",
        username: "DTrump"
    },
    {
        id: 'd9a996ea-6886-4027-8ec9-bf0ff31112345',
        name: "Jackson",
        username: "jackson"
    },
    {
        id: 'd9a996ea-6886-4027-8ec9-bf0ff31100000',
        name: "Luiz",
        username: "luiz"
    }
];

// controllers and handlers

app.get("/users", (req, res) => {
    res.end(JSON.stringify(
        {
            "status": 200,
            "data": users
        }
    ));
});

app.post("/users", (req, res) => {
    const dataUser = req.body
    //console.log(data)

    const usernameExists = users.find(user => user.username === dataUser.username);

    if (usernameExists) {
        res.end(JSON.stringify({
            "status": 422,
            "message": "Username not available, chose another one"
        }));
    }else {
        const user = {
            id: randomUUID(),
            ...dataUser
        }

        users.push(user)

        res.end(JSON.stringify(
            {
                "status": 201,
                "details": "User created successfully",
                "data": users[users.length - 1]
            }
        ))
    }



});

app.get("/users/:id", (req, res) => {
    const { id } = req.params

    const user = users.find(user => id === user.id);
    //console.log(user)

    if (!user) {
        res.end(JSON.stringify({
            "status": 404,
            "message": "User not found"
        }))
    }else {
        res.end(JSON.stringify({
            "status": 200,
            "data": user
        }))
    }

});

app.put("/users/:id", (req, res) => {
    const { id } = req.params
    const userBody = req.body

    const userIndex = users.findIndex(user => id === user.id);

    if (userIndex == -1) {
        res.end(JSON.stringify({
            "status": 404,
            "message": "User not found"
        }))
    }else{
        users[userIndex] = {
            "id": id,
            ...userBody
        }
        res.end(JSON.stringify({
            "status": 200,
            "details": "User updated successfully",
            "data": users[userIndex]
        }))
    }

});

app.delete("/users/:id", (req, res) => {
    const { id } = req.params

    const userIndex = users.findIndex(user => id === user.id)

    if (userIndex == -1) {
        res.end(JSON.stringify({
            "status": 404,
            "message": "User not found"
        }))
    }else{
        users.splice(userIndex, 1)

        res.end(JSON.stringify({
            "status": 200,
            "details": "User deleted successfully"
        }))
    }
});