import axios from "axios";
import HttpServiceInterface from "./http-service-interface";

export default class HttpService<T> implements HttpServiceInterface<T> {
    httpClient;

    constructor(apiUrl: string) {
        this.httpClient = axios.create({
            baseURL: apiUrl
        })        
    }

    delete = async <T>(url: string) => {
        return await this.httpClient.delete<T>(url);
    }

    get = async <T>(url: string) => {
        return await this.httpClient.get<T>(url);
    }

    handleError = (err: unknown) => {

        if(axios.isAxiosError(err)){
            const isExpectedError = err.response && err.response.status >= 400 && 
                                    err.response.status < 500;
        
            if (isExpectedError && err.response) {
                return err.response.data.error;
            }
        }
    
        return "Sorry, an unexpected error has ocurred. Please try again";
    }

    post = async <T>(url: string, data: any) => {
        return await this.httpClient.post<T>(url, data);
    }

    put = async <T>(url: string, data: any) => {
        return await this.httpClient.put<T>(url, data);
    }

    setToken = (token: string | null) => {
        if (!token || token === "null") return;
        this.httpClient.defaults.headers.common["authorization"] = token;
    }
}