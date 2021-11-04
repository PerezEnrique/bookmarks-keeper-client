import axios from "axios";

axios.defaults.baseURL = API_URL;

function setToken(token) {
	if (!token || token === "null") return;
	axios.defaults.headers.common["authorization"] = token;
}

const http = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setToken,
};

export default http;
