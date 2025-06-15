import api from "../apiConfig";

export const CalendarServices = {
  // get pdf data
  getAllEvents: async () => {
    try {
      const response = await api.get(`/api/calendar/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete PDF from a roadmap
  deleteEvent: async (uid) => {
    try {
      const response = await api.delete(`/api/calendar/${uid}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  //   create event
  createEvent: async (eventData) => {
    try {
      const response = await api.post(`/api/calendar/`, eventData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default CalendarServices;
