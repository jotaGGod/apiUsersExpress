const service = require('../service/users-service');

const getAll = (req, res) => {
    const users = service.getAllUsers()

    res.end(users);
}

const createUser = (req, res) => {
    const dataUser = req.body;
    const userCreated = service.createAnUser(dataUser);

    res.end(userCreated);
};

const getUser = (req, res) => {
    const { id } = req.params;
    const user = service.getAnUser(id);

    res.end(user);
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const userBody = req.body;
    const user = service.updateAnUser(id, userBody);

    res.end(user);
};

const deleteUser = (req, res) => {
    const { id } = req.params
    const user = service.deleteAnUser(id);

    res.end(user);
}

module.exports = {
    getAll,
    createUser,
    getUser,
    updateUser,
    deleteUser
}