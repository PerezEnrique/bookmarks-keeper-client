import type { Schema } from "joi"; 
import { errorsObject } from "../utils/types/errors.type";

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
