import axios from "axios";
import Endpoints from "./endpoints";

import type { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Create axios instance
 */
const instance = axios.create({
  baseURL: `https://03bc-103-43-214-139.ngrok-free.app`,
  headers: {
    "Content-Type": "multipart/form-data,application/www-form-urlencoded",
    "ngrok-skip-browser-warning": "69420"
  }
});

/**
 * Make a request to the server.
 * @param method The HTTP method to use.
 * @param endpoint The endpoint to request.
 * @param data The data to send. 
 * @param callback The callback to call when the request is done. 
 */
function makeRequest(method: HttpMethod, endpoint: any, data: any, callback: (response: any, fullResponse?: AxiosResponse) => void) {
  // URL
  let url: string = endpoint;
  const originalUrl = url;

  // If endpoint has param
  if (endpoint.includes(":")) {
    // Get param
    const params = endpoint.split("/").filter((param: any) => param.startsWith(":")).map((param: any) => param.replace(":", ""));
    
    // For every params
    for (const param of params) {
      // Replace param with data
      url = url.replace(`:${param}`, (data as any)[param] || "");
    }
  }

  // Create config 
  const config: AxiosRequestConfig = {
    method, url,
  };

  // If method is GET
  if (method === "GET") {
    // For every data
    for (const key in data) {
      // Remove query if it's already in the URL param
      if (originalUrl.includes(`:${key}`)) {
        delete data[key];
        continue;
      }
      
      // If data is object, convert to string
      if (typeof data[key] === "object") {
        (data as any)[key] = JSON.stringify(data[key]);
      }
    }

    config.params = data;
  }
  
  // If method is not GET
  if (method !== "GET") {
    // Create form data
    const formData = new FormData();

    // For every data
    for (const key in data) {
      formData.append(key, typeof data === "object" ? JSON.stringify(data) : data as any);
    }

    // Add data to config
    config.data = data;
  }

  

  // Make request
  instance(config).then((response) => {
    // Call the callback function
    callback(response.data, response);
  })

  // If something went wrong
  .catch((error) => {

    // If has custom message
    if (error.response && ((error.response?.data) as any).message) {
      error.message = ((error.response?.data) as any).message;
    }

    // TODO: Handle unauthorized error

    // Call the callback function
    callback(error.response?.data || { success: false, message: error.message });
  });
}


export {
  makeRequest,
  Endpoints
}