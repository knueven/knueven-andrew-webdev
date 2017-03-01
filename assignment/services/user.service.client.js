'use strict';

module.exports = app => {
  app.post( `/api/user`, createUser ),
  app.get( `/api/user?username=username`, findUserByUsername ),
  app.get( `/api/user?username=username&password=password`, findUserByCredentials ),
  app.get( `/api/user/:userId`, findUserById ),
  app.put( `/api/user/:userId`, updateUser)
  app.delete( `/api/user/:userId`, deleteUser)
};

let users = [
            {
                _id: "123",
                username: "alice",
                password: "alice",
                firstName: "Alice",
                lastName: "Wonder",
                email: "alice@gmail.com"
            },
            {
                _id: "234",
                username: "bob",
                password: "bob",
                firstName: "Bob",
                lastName: "Marley",
                email: "bob@gmail.com"
            },
            {
                _id: "345",
                username: "charly",
                password: "charly",
                firstName: "Charly",
                lastName: "Garcia",
                email: "charly@gmail.com"
            },
            {
                _id: "456",
                username: "jannunzi",
                password: "jannunzi",
                firstName: "Jose",
                lastName: "Annunzi",
                email: "jose@gmail.com"
            }
];


function createUser(req, res) {
    var user = req.body.user;
    user._id = Math.random();
    users.push(user);
    res.json(user);
};

function findUserByUsername(username) {
    var user = users.find(function (u) {
        return u.username == req.query.username;
    });
    if(user)
        res.json(user);
    else
        res.sendStatus(404);
};

function findUserByCredentials(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    var user = users.find(function (u) {
        return u.username == username && u.password == password;
    });
    if (user === undefined) {
        res.sendStatus(404);
    }
    res.json(user);
};
            
    

function findUserById(uid) {
    var userId = req.query.userId;
    var user = users.find(function (u) {
        return u._id == userId;
    });
    if (user === undefined) {
        res.sendStatus(404);
    }
    res.json(user);
};



function updateUser(req, res) {
    var userId = req.params.userId;
    var newUser = req.body;
    for(var u in users) {
        if(users[u]._id == userId) {
            users[u].firstName = newUser.firstName;
            users[u].lastName = newUser.lastName;
            res.json(users[u]);
            return;
        }
    }
};

function deleteUser(req, res) {
    var userId = req.params.userId;
    for(var u in users) {
        if(users[u]._id == userId) {
            users.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
    return;
};