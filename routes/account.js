var express = require('express');
var router = express.Router();
const User = require('../models/user');
const UserSession = require('../models/UserSession');

router.route('/signin')

/*
 * Signin
 */
	.post((req, res, next) => {
	    const { body } = req;
	    const { password } = body;
	    let { email } = body;

	    console.log(password)
	    console.log(email)

	    User.find({},{_id:0, email:1, password:2},function(err,users){
	    	if (err)
	           console.log('error occured in the database');

			const user = users[0];

	    	if (user.validPassword(password)) {
	        	return res.send({
	        		success: true,
	        		message: 'Valid sign in'
	        	});
	       	} else {
	        	return res.send({
	           		success: false,
	           		message: 'Wrong Password'
	         	});
	    	}
	    	// Otherwise correct user
	    	const userSession = new UserSession();
	    	userSession.userId = user._id;
	    	userSession.save((err, doc) => {
		        if (err) {
		          console.log(err);
		          return res.send({
		            success: false,
		            message: 'Error: server error'
		          });
		        }
		        return res.send({
		          	success: true,
		          	message: 'Valid sign in',
		          	token: doc._id
		        });
      		});
    	});
	});

router.route('/signup')
/*
 * Sign up
 */
 	.post((req, res, next) => {
		const { body } = req;
		const { firstname } = body;
		const { lastname } = body;
		const { password } = body;
		let { email } = body;

		email = email.toLowerCase();
		email = email.trim();

		User.find({ email: email }, (err, previousUsers) => {
			if (err) {
			  return res.send({
			    success: false,
			    message: 'Error: Server error'
			  });
			} else if (previousUsers.length > 0) {
				return res.send({
			    	success: false,
					message: 'Error: Account already exist.'
				});
			}
		});

		// Save the new user
		const newUser = new User();
		newUser.firstname = firstname;
		newUser.lastname = lastname;
		newUser.email = email;
		newUser.password = newUser.generateHash(password);
		newUser.save();
	}); // end of sign up endpoint



module.exports = router