const User = require('../User-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    // hash the password
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        // handle any errors
        if (err) {
            res.json({
                error: err
            });
        }

        // create new User document using UserSchema model and information contained in request
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })

        // save the new user to mongoDB
        user.save()
            .then(user => {
                res.json({
                    message: 'User Added Successfully!'
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error occured!'
                })
            })
    })
}

module.exports = {
    register
}