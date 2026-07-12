import api from "./api";

const TOKEN_KEY = "veritas_auth_token";
const USER_KEY = "veritas_auth_user";

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, ...user } = response.data;
      if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  async register(name, email, password, company) {
    try {
      const response = await api.post("/auth/register", { name, email, password, company });
      const { token, ...user } = response.data;
      if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  getCurrentUser() {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem(USER_KEY);
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  },

  isAuthenticated() {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem(TOKEN_KEY);
    }
    return false;
  }
};
