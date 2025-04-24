import { AxiosRequestConfig } from "axios";

export function getAxiosHeaders(): AxiosRequestConfig {
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
}
