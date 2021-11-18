export default function useErrorHandler(err) {
	const isExpectedError = function (err) {
		return err.response && err.response.status >= 400 && err.response.status < 500;
	};

	if (!isExpectedError(err)) {
		return "Sorry, an unexpected error has ocurred. Please try again";
	}

	return err.response.data.error;
}
