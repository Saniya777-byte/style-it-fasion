import api from "./api";

export const reportService = {
  async getReports() {
    try {
      const response = await api.get("/reports");
      return response.data.reports;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch reports");
    }
  },

  async getReportById(id) {
    try {
      const response = await api.get(`/reports/${id}`);
      return response.data.report;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch report");
    }
  }
};
