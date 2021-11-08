import Joi from "joi-browser";

export const logUserIn = Joi.object({
	username: Joi.string().max(30).required().label("Username"),
	password: Joi.string().min(5).max(1024).required().label("Password"),
});

export const createUser = Joi.object({
	username: Joi.string().max(30).required().label("Username"),
	password: Joi.string().min(5).max(1024).required().label("Password"),
	passwordConfirm: Joi.any()
		.valid(Joi.ref("password"))
		.required()
		.empty("")
		.label("Password confirm")
		.options({ language: { any: { allowOnly: "must match password" } } }),
});

export const updateUser = Joi.object({
	username: Joi.string().max(30).empty("").label("Username"),
	password: Joi.string().min(5).max(1024).empty("").label("Password"),
	passwordConfirm: Joi.any()
		.valid(Joi.ref("password"))
		.required()
		.empty("")
		.label("Password confirm")
		.options({ language: { any: { allowOnly: "must match password" } } }),
}).or("username", "password");
