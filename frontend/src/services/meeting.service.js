import api from "./api";

export const meetingService = {
  async getMeetings() {
    try {
      const response = await api.get("/meetings").catch(err => err);
      return response.data.meetings;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch meetings");
    }
  },

  async uploadMeeting(formData) {
    try {
      const response = await api.post("/meetings", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).catch(err => err);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to upload meeting");
    }
  }
};
