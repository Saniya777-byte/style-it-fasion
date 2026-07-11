import axios from "axios";
import { mockReports } from "../data/mockReports";
import { mockMeetings } from "../data/mockMeetings";
import { mockUsers } from "../data/mockUsers";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Configure Axios Mock Interceptor for simulation
api.interceptors.request.use(async (config) => {
  // Simulate network latency (200ms - 600ms)
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 400 + 200));
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Intercept outgoing fake routes and return mock data
    const { url, method, data } = error.config;
    
    // Auth endpoints
    if (url.startsWith("/auth/login") && method === "post") {
      const parsedData = JSON.parse(data || "{}");
      const user = mockUsers.find(u => u.email === parsedData.email) || mockUsers[0];
      return Promise.resolve({
        data: { token: "fake-jwt-token-12345", user },
        status: 200
      });
    }

    if (url.startsWith("/auth/register") && method === "post") {
      const parsedData = JSON.parse(data || "{}");
      const newUser = {
        id: `usr-${Date.now()}`,
        name: parsedData.name || "New User",
        email: parsedData.email || "user@example.com",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
        role: "Compliance Associate",
        company: parsedData.company || "Aether Corp"
      };
      return Promise.resolve({
        data: { token: "fake-jwt-token-12345", user: newUser },
        status: 201
      });
    }

    if (url.startsWith("/auth/me") && method === "get") {
      return Promise.resolve({
        data: { user: mockUsers[0] },
        status: 200
      });
    }

    // Reports endpoints
    if (url === "/reports" && method === "get") {
      return Promise.resolve({
        data: { reports: mockReports },
        status: 200
      });
    }

    if (url.startsWith("/reports/") && method === "get") {
      const id = url.split("/").pop();
      const report = mockReports.find(r => r.id === id);
      if (report) {
        return Promise.resolve({
          data: { report },
          status: 200
        });
      }
      return Promise.reject({
        response: { status: 404, data: { message: "Report not found" } }
      });
    }

    // Upload & meetings endpoints
    if (url === "/meetings" && method === "get") {
      return Promise.resolve({
        data: { meetings: mockMeetings },
        status: 200
      });
    }

    if (url === "/meetings" && method === "post") {
      // Simulate creating a meeting/report
      const parsedData = data instanceof FormData ? Object.fromEntries(data.entries()) : JSON.parse(data || "{}");
      
      const newMeetingId = `meet-${Date.now()}`;
      const newReportId = `rep-${Date.now()}`;
      
      const newMeeting = {
        id: newMeetingId,
        title: parsedData.title || "Untitled Meeting",
        fileName: parsedData.file?.name || "recording.mp4",
        fileSize: "124 MB",
        duration: "30m 00s",
        uploadDate: new Date().toISOString(),
        status: "Processing",
        company: parsedData.company || "Aether Technologies",
        country: parsedData.country || "United States",
        language: parsedData.language || "en-US",
        complianceFramework: parsedData.complianceFramework || "GDPR"
      };

      const newReport = {
        id: newReportId,
        meetingId: newMeetingId,
        title: parsedData.title || "Untitled Meeting",
        date: new Date().toISOString(),
        duration: "30m 00s",
        status: "Processing",
        complianceScore: null,
        company: parsedData.company || "Aether Technologies",
        country: parsedData.country || "United States",
        language: parsedData.language || "en-US",
        confidentiality: "Confidential",
        meetingType: "Strategy Sync",
        summary: "AI is currently transcribing and compiling the summary for this session...",
        keyDecisions: [],
        actionItems: [],
        speakers: [],
        complianceDetails: null,
        transcript: []
      };

      // Push to in-memory mocks
      mockMeetings.unshift(newMeeting);
      mockReports.unshift(newReport);

      return Promise.resolve({
        data: { meeting: newMeeting, report: newReport },
        status: 201
      });
    }

    return Promise.reject(error);
  }
);

export default api;
