import api from "./api";

const TOKEN_KEY = "veritas_auth_token";

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password }).catch(err => err);
      const { token, user } = response.data;
      if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, token);
      }
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  async register(name, email, password, company) {
    try {
      const response = await api.post("/auth/register", { name, email, password, company }).catch(err => err);
      const { token, user } = response.data;
      if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, token);
      }
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  getCurrentUser() {
    if (typeof window !== "undefined" && !localStorage.getItem(TOKEN_KEY)) {
      return null;
    }
    // Return mock user if token exists (or for testing dashboard)
    return {
      id: "usr-1",
      name: "Alex Rivera",
      email: "alex@enterprise.ai",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      role: "Compliance Officer",
      company: "Aether Technologies"
    };
  },

  isAuthenticated() {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem(TOKEN_KEY);
    }
    return false;
  }
};
