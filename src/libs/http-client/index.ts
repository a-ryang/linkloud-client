import axios from "axios";
import * as qs from "qs";

import { API } from "@/constants/config";
import { getAccessToken } from "@/features/auth/utils";

import { ApiError, BaseError, ServerError } from "../error";
import API_ERROR_MESSAGE from "../error/api-error-message";

import { refreshHelper } from "./helper";

export const instance = axios.create({
  baseURL: API,
  timeout: 3 * 1000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

instance.interceptors.response.use(
  (response) => {
    const status = response.status;
    if (status >= 200 && status < 300) {
      return response.data;
    }

    return Promise.reject(response.data);
  },
  (e) => {
    if (e.response?.data?.["message"]) {
      const request = e.config;
      const message = e.response?.data?.["message"] as string;

      if (message === API_ERROR_MESSAGE.AT_EXPIRED) {
        refreshHelper.handleExpiredAccessToken(e, request);
        return Promise.reject(new ApiError(API_ERROR_MESSAGE.AT_EXPIRED, e.response.status));
      }

      return Promise.reject(new ApiError(e.response.data?.["message"], e.response.status));
    }

    if (e.message.startsWith("timeout")) {
      return Promise.reject(new BaseError("Timeout Error", "Network timeout"));
    }

    return Promise.reject(new ServerError(e.message));
  },
);

export function get<T>(...args: Parameters<typeof instance.get>) {
  return instance.get<T, T>(...args);
}

export function post<T>(...args: Parameters<typeof instance.post>) {
  return instance.post<T, T>(...args);
}

export function put<T>(...args: Parameters<typeof instance.put>) {
  return instance.put<T, T>(...args);
}

export function patch<T>(...args: Parameters<typeof instance.patch>) {
  return instance.patch<T, T>(...args);
}

export function del<T>(...args: Parameters<typeof instance.delete>) {
  return instance.delete<T, T>(...args);
}
