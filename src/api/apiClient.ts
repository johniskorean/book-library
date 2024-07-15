import axios from "axios";

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

// console.log("API Base URL: ", apiClient.defaults.baseURL);

export default apiClient;
