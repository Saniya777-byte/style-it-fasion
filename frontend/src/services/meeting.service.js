import api from "./api";

export const meetingService = {
  async getMeetings() {
    try {
      const response = await api.get("/meetings");
      return response.data.meetings;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch meetings");
    }
  },

  async uploadMeeting(formData) {
    try {
      const response = await api.post("/meetings/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to upload meeting");
    }
  }
};
