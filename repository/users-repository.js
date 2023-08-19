const data = require('../data/users')
const {randomUUID} = require("crypto");

const RGetAllUsers = () => {
    return data.users
}

const RCreateUser = (dataUser) => {
    const users = RGetAllUsers()
    const user = {
        id: randomUUID(),
        ...dataUser
    }

    users.push(user);
}

const RUpdateAnUser = (id, userBody, userIndex) => {
    const users = RGetAllUsers();
    users[userIndex] = {
        "id": id,
        ...userBody
    }
    return users[userIndex]
}

const RDeleteAnUser = (userIndex) => {
    const users = RGetAllUsers();
    users.splice(userIndex, 1)
}

module.exports = {
    RGetAllUsers,
    RCreateUser,
    RUpdateAnUser,
    RDeleteAnUser
}