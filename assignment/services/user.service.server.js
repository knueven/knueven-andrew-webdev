module.exports = function(app, model) {
    var passport      = require('passport');
    var auth = authorized;
    app.post  ('/api/login', passport.authenticate('local'), login);
    app.post  ('/api/logout',         logout);
    app.post  ('/api/register',       register);
    app.post(`/api/user`, auth, createUser);
    app.get(`/api/user`, auth, findUserByAuthType);
    app.get(`/api/user/:userId`, auth, findUserById);
    app.put(`/api/user/:userId`, auth, updateUser);
    app.delete(`/api/user/:userId`, auth, deleteUser);

    var userModel = model.userModel; 

    function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
        } else {
        next();
        }
    }

    function createUser(req, res) {
        userModel
            .createUser(req.body.user)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserByAuthType(req, res) {
      var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
         var username = req.query['username'];
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }  

    function findUserById(req, res) {
        var userId = req.query['userId'];

        userModel
            .findUserById(userId)
            .then(function (user) {
                res.send(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];

        userModel
            .updateUser(userId, req.body)
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteUser(req, res) {
        userModel
            .deleteUser(req.params['userId'])
            .then(function (status) {
                res.send(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};