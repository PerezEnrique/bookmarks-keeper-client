export default function useErrorHandler(err) {
	console.log("err.response", err.response);
	console.log("err.response.data.error", err.response.data.error);

	const isExpectedError = function (err) {
		return err.response && err.response.status >= 400 && err.response.status < 500;
	};

	if (!isExpectedError(err)) {
		return "Sorry, an unexpected error has ocurred. Please try again";
	}

	return err.response.data.error;
}
