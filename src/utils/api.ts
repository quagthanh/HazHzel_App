import { auth } from "@/auth";
import axios from "axios";
export const api = axios.create({
  baseURL: "process.env.NEXT_PUBLIC_BACKEND_URL",
});
api.interceptors.request.use(
  async function (config) {
    const session = await auth();
    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = `Bearer ${session?.user?.access_token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.status == 401) {
      return Promise.reject(new Error("Unauthorization - CODE 401"));
    }
    return Promise.reject(error);
  }
);

// export const sendRequest = async <T>(props: IRequest) => {
//   //type
//   let {
//     url,
//     method,
//     body,
//     queryParams = {},
//     useCredentials = false,
//     headers = {},
//     nextOption = {},
//   } = props;
//   const options = {
//     method: method,
//     headers: new Headers({
//       "content-type": "application/json",
//       ...headers,
//     }),
//     body: body ? JSON.stringify(body) : null,
//     ...nextOption,
//   };
//   if (useCredentials) options.credentials = "include";

//   if (queryParams) {
//     url = `${url}?${queryString.stringify(queryParams)}`;
//   }
//   return fetch(url, options).then((res) => {
//     if (res.ok) {
//       return res.json() as T; //generic
//     } else {
//       return res.json().then(function (json) {
//         // to be able to access error status when you catch the error
//         return {
//           statusCode: res.status,
//           message: json?.message ?? "",
//           error: json?.error ?? "",
//         } as T;
//       });
//     }
//   });
//   };
