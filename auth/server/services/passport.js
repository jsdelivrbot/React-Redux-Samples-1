const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// create local Strategy (signing in)
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
	// verify this email/password
	User.findOne({ email: email }, function (err, user) { 
		if (err) { return done(err); }
		if (!user) { return done(null, false); }

		//compare passwords. is 'password' equal to user.password?
		user.comparePassword(password, function(err, isMatch) {
			if (err) { return done(err); }
			if (!isMatch) { return done(null, false); }

			return done(null, user);
		});
	})
	// call done if this is correct email/pass 
	// otherwise, call done with false 
});

// setup options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// create JWT Strategy (signing up)
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// see if the user ID in the payload exist in our DB
	User.findById(payload.sub, function(err, user) {
		if (err) { return done(err, false); }
		// if it does call done with that user
		if (user) {
			done(null, user);
		}
		// otherwise, call done without user object
		else {
			done(null, false);
		}
	});
});
// tell passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);