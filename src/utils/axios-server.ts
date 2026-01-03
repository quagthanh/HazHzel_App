import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- REQUEST INTERCEPTOR ---
http.interceptors.request.use(
  async (config) => {
    // KHÔNG CÒN LOGIC LẤY TOKEN Ở ĐÂY NỮA
    // Token sẽ được nạp vào theo 2 cách:
    // 1. Client: Do AuthProvider tự động set vào defaults.
    // 2. Server: Do bạn truyền thủ công vào headers khi gọi hàm.

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- RESPONSE INTERCEPTOR ---
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi global (ví dụ log lỗi)
    console.error("Server API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default http;
