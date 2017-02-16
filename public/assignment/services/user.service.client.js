(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    function UserService() {
        var users = [
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

        var api = {
            "users": users,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "findUserByUsername": findUserByUsername
        };
        return api;


        function createUser(user) {
            var newuser =
                {
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    _id: (new Date()).getTime().toString()
                }
            users.push(newuser);
            return newuser;
        }

        function findUserById(uid) {
            for (var u in users) {
                var user = users[u];
                if (user._id == uid) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var u in users) {
                var user = users[u];
                if (user.username == username) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in users) {
                var user = users[u];
                if (user.username == username &&
                    user.password == password) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for (var u in users) {
                var olduser = users[u];
                if (olduser._id == userId) {
                    users[u].firstName = user.firstName;
                    users[u].lastName = user.lastName;
                    users[u].email = user.email;
                    return users[u];
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for (var u in users) {
                var user = users[u];
                if (user._id === userId) {
                    users.splice(u, 1);
                }
            }
        }

    }

})();