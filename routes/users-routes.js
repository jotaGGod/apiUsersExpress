const controller = require('../controller/users-controller');
const express = require('express')
const router = express.Router();


router.get("/users", controller.getAll);
router.post("/users", controller.createUser);
router.get("/users/:id", controller.getUser);
router.put("/users/:id", controller.updateUser);
router.delete("/users/:id", controller.deleteUser);

module.exports = router;