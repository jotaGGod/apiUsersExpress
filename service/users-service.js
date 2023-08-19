const repository = require("../repository/users-repository");

const getAllUsers = () => {
    const users = JSON.stringify(
        {
            "status": 200,
            "data": repository.RGetAllUsers()
        }
    )
    return users
}

const createAnUser = (dataUser) => {
    const users = repository.RGetAllUsers();
    const usernameExists = users.find(user => user.username === dataUser.username);

    if (usernameExists) {
        return JSON.stringify({
            "status": 422,
            "message": "Username not available, chose another one"
        });

    }else {
        repository.RCreateUser(dataUser)

        return JSON.stringify(
            {
                "status": 201,
                "details": "User created successfully",
                "data": users[users.length - 1]
            }
        );
    }
}

const getAnUser = (id) => {
    const users = repository.RGetAllUsers()
    const user = users.find(user => id === user.id);
    //console.log(user)

    if (!user) {
        return JSON.stringify({
            "status": 404,
            "message": "User not found"
        })
    }else {
        return JSON.stringify({
            "status": 200,
            "data": user
        })
    }
}

const updateAnUser = (id, userBody) => {
    const users = repository.RGetAllUsers();
    const userIndex = users.findIndex(user => id === user.id);

    if (userIndex == -1) {
        return JSON.stringify({
            "status": 404,
            "message": "User not found"
        })
    }else{
        const userUpdated = repository.RUpdateAnUser(id, userBody, userIndex)
        return JSON.stringify({
            "status": 200,
            "details": "User updated successfully",
            "data": userUpdated
        })
    }
};

const deleteAnUser = (id) => {
    const users = repository.RGetAllUsers();
    const userIndex = users.findIndex(user => id === user.id)

    if (userIndex == -1) {
        return JSON.stringify({
            "status": 404,
            "message": "User not found"
        })
    }else{
        repository.RDeleteAnUser(userIndex);

        return JSON.stringify({
            "status": 200,
            "details": "User deleted successfully"
        })
    }
};

module.exports = {
    getAllUsers,
    createAnUser,
    getAnUser,
    updateAnUser,
    deleteAnUser
}