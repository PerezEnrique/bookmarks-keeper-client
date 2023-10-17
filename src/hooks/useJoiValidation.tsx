import Joi, { Schema } from "joi"; 
import { errorsObject } from "../utils/types";

//users schema
export const logUserInSchema = Joi.object({
	username: Joi.string().max(30).required().label("Username"),
	password: Joi.string().min(5).max(1024).required().label("Password"),
});

export const createUserSchema = Joi.object({
	username: Joi.string().max(30).required().label("Username"),
	password: Joi.string().min(5).max(1024).required().label("Password"),
	passwordConfirm: Joi.string()
		.valid(Joi.ref("password"))
		.required()
		.empty("")
		.label("Password confirm")
		.messages({"any.only": "Password and Password confirmation must match"}),
});

//password schema
export const updateUserSchema = Joi.object({
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

export const addBookmarkSchema = Joi.object({
	name: Joi.string().max(50).required(),
	url: Joi.string().uri({ allowQuerySquareBrackets: true }).required(),
	tags: Joi.array().items(Joi.string().max(50)),
});

export const editBookmarkSchema = Joi.object({
	name: Joi.string().max(50).empty(""),
	url: Joi.string().uri({ allowQuerySquareBrackets: true }).empty(""),
	tags: Joi.array().items(Joi.string().max(50).empty("")),
});

export default function useJoiValidation<T>(schema: Schema, data: T) {
	const { error } = schema.validate(data, { abortEarly: false });

	if (error) {
		const errors: errorsObject = {};
	
		for (let item of error.details) { //error.details is the array of errors
			if (errors[item.path[0]]) { //path is an ordered array where each element is the accessor to the value where the error happened. In our simple case we have only one accessor
				continue; //We don't want following messages from the same path to overwrite the first message
			}
			errors[item.path[0]] = item.message.replace(/"/g, "");
		}
	
		return errors;
	}
	
	return null;
}
