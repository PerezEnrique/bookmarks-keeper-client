import { httpResponse } from "../utils/types";

export default interface HttpServiceInterface<T> {
    delete<T>(url: string): Promise<httpResponse<T, any>>;
  
    get<T>(url: string): Promise<httpResponse<T, any>>;
  
    handleError(err: unknown): string;

    post<T>(url: string, data: any): Promise<httpResponse<T, any>>;
  
    put<T>(url: string, data: any): Promise<httpResponse<T, any>>;
  
    setToken(token: string | null): void;
  }