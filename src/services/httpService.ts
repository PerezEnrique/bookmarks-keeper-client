declare const API_URL: string;
import axios from "axios";

axios.defaults.baseURL = API_URL;

function setToken(token: string | null) {
	if (!token || token === "null") return;
	axios.defaults.headers.common["authorization"] = token;
}

function handleError(err: unknown) {

	if(axios.isAxiosError(err)){
		const isExpectedError = err.response && err.response.status >= 400 && 
								err.response.status < 500;
	
		if (isExpectedError && err.response) {
			return err.response.data.error;
		}
	}

	return "Sorry, an unexpected error has ocurred. Please try again";
}

const http = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setToken,
	handleError
};

export default http;