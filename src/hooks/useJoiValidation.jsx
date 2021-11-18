export default function useJoiValidation(schema, data) {
	const { error } = schema.validate(data, { abortEarly: false });
	if (error) {
		const errors = {};

		for (let item of error.details) {
			if (errors[item.path[0]]) {
				continue; //We don't want following messages from the same path to overwrite the first message
			}
			errors[item.path[0]] = item.message.replace(/"/g, "");
		}

		return errors;
	}

	return null;
}
