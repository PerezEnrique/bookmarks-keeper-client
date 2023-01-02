import Joi from "joi";

export const logUserIn = Joi.object({
	username: Joi.string().max(30).required().label("Username"),
	password: Joi.string().min(5).max(1024).required().label("Password"),
});

export const createUser = Joi.object({
	username: Joi.string().max(30).required().label("Username"),
	password: Joi.string().min(5).max(1024).required().label("Password"),
	passwordConfirm: Joi.string()
		.valid(Joi.ref("password"))
		.required()
		.empty("")
		.label("Password confirm")
		.messages({"any.only": "Password and Password confirmation must match"}),
});

export const updateUser = Joi.object({
	username: Joi.string().max(30).empty("").label("Username"),
	password: Joi.string().min(5).max(1024).empty("").label("Password"),
	passwordConfirm: Joi.string()
		.valid(Joi.ref("password"))
		.empty("")
		.label("Password confirm")
		.when("password", {
			is: Joi.exist(),
			then: Joi.required(),
		})
		.messages({"any.only": "Password and Password confirmation must match"}),
}).or("username", "password");
//or because in this case at least one of the keys (username or password) is require