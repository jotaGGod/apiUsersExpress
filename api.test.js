const axios = require("axios");

test('should return an users list', async () => {
    const response = await axios.get('http://localhost:3000/users');
    const output = response.data;

    const MUsers = [
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
    ]
    const args = {
        "status": 200,
        "data": MUsers
    }
    expect(output).toEqual(args);
});

test('should return an user by id', async () => {
    const response = await axios.get('http://localhost:3000/users/d9a996ea-6886-4027-8ec9-bf0ff3112746');
    const output = response.data;

    const MUsers = {
        id: 'd9a996ea-6886-4027-8ec9-bf0ff3112746',
        name: "Donald Trump Junior",
        username: "DTrump"
    }

    const args = {
        "status": 200,
        "data": MUsers
    }
    expect(output.status).toEqual(args.status);
    expect(output.data.id).toEqual(MUsers.id);
    expect(output.data.name).toEqual(MUsers.name);
    expect(output.data.username).toEqual(MUsers.username);

});

test('should return an user created', async () => {
    const input = {
        "name": "Matheus",
        "username": "Mr.TNS"
    }

    const response = await axios.post('http://localhost:3000/users', input);
    const output = response.data

    const args = {
        "status": 201,
        "details": "User created successfully",
        "data": input
    }

    expect(output.status).toEqual(args.status);
    expect(output.details).toEqual(args.details);
    expect(output.data).toHaveProperty('id');
    expect(output.data.name).toEqual(input.name);
    expect(output.data.username).toEqual(input.username);
});

test('should return an user updated', async () => {
    const input = {
        "name": "Matheus",
        "username": "Mr.TNS"
    }

    const response = await axios.put('http://localhost:3000/users/d9a996ea-6886-4027-8ec9-bf0ff31100000', input);
    const output = response.data;

    const MUsers = {
        id: 'd9a996ea-6886-4027-8ec9-bf0ff31100000',
        "name": "Matheus",
        "username": "Mr.TNS"
    }

    const args = {
        "status": 200,
        "details": "User updated successfully",
        "data": MUsers
    }
    expect(output.status).toEqual(args.status);
    expect(output.data.id).toEqual(MUsers.id);
    expect(output.data.name).toEqual(MUsers.name);
    expect(output.data.username).toEqual(MUsers.username);

});

test('should delete an user by id', async () => {
    const response = await axios.delete('http://localhost:3000/users/d9a996ea-6886-4027-8ec9-bf0ff3112746');
    const output = response.data;

    const args = {
        "status": 200,
        "details": "User deleted successfully"
    }

    expect(output.status).toEqual(args.status);
    expect(output.details).toEqual(args.details);
});

// verification tests

test('Shouldnt create an user with already exists username', async () => {
    const input = {
        name: "Donald Trump Junior",
        username: "DTrump"
    }

    const response = await axios.post('http://localhost:3000/users', input);
    const output = response.data;

    expect(output).toEqual("Username not available, chose another one");
});

test('Shouldnt return an user with an invalid id', async () => {
    const response = await axios.get('http://localhost:3000/users/123');
    const output = response.data;

    const args = {
        "status": 404,
        "message": "User not found"
    }

    expect(output.status).toEqual(args.status);
    expect(output.message).toEqual(args.message);
});

test('Shouldnt update an user with an invalid id', async () => {
    const response = await axios.put('http://localhost:3000/users/123');
    const output = response.data;

    const args = {
        "status": 404,
        "message": "User not found"
    }

    expect(output.status).toEqual(args.status);
    expect(output.message).toEqual(args.message);
});

test('Shouldnt delete an user with an invalid id', async () => {
    const response = await axios.delete('http://localhost:3000/users/123');
    const output = response.data;

    const args = {
        "status": 404,
        "message": "User not found"
    }

    expect(output.status).toEqual(args.status);
    expect(output.message).toEqual(args.message);
});

test('Shouldnt update an user name with an invalid id', async () => {
    const response = await axios.put('http://localhost:3000/users/123');
    const output = response.data;

    const args = {
        "status": 404,
        "message": "User not found"
    }

    expect(output.status).toEqual(args.status);
    expect(output.message).toEqual(args.message);
});