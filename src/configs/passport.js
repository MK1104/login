const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");


export const initializePassport = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: "username"}, async (username, password, done) => { 
            try {
                // Finding an user by username 
                const results = await Promise.all([
                    User.findOne({ username }).exec(),

                ]);
                const user = results.find(result => result !== null);
            
                // Returning an error if a username is not found
                if (!user) {
                    return done(null, false, { message: 'That username is not registered' });
                }
                
                // After an username is found, compare the password with the password in the database (compare function automatically decrypts the hashed password to compare)
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                    throw err;
                    }
            
                    if (isMatch) {
                    return done(null, user);
                    } else {
                    return done(null, false, { message: 'Username or password is incorrect' });
                    }
                });
                } catch (err) {
                console.log(err);
                }
        })
    )

    // Saves the user id in session 
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    // Retrieves the user object from database and stores the full user object
    passport.deserializeUser(function(id, done) {
        Promise.all([
            User.findById(id).exec(),
          ])
            .then((results) => {
              const user = results.find((result) => result !== null);
              done(null, user);
            })
            .catch((err) => done(err));
    });
} 