export default function useErrorHandler(err) {
	console.log("err", err);
	console.log("err.response", err.response);

	const isExpectedError = function (err) {
		return err.response && err.response.status >= 400 && err.response.status < 500;
	};

	console.log("isExprected", !isExpectedError(err));
	if (!isExpectedError(err)) {
		return "Sorry, an unexpected error has ocurred. Please try again";
	}

	console.log("err.response.data.error", err.response.data.error);
	return err.response.data.error;
}
