import api from "../apiConfig";

export const UserServices = {
  // Get recent PDFs
  get_all_pdfs_for_roadmap: async (roadmapUid) => {
    try {
      const response = await api.get(
        `/api/get_all_pdfs_for_roadmap/${roadmapUid}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllPDFs: async () => {
    try {
      const response = await api.get(`/api/get_recent_pdfs/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserInfo: async () => {
    try {
      const response = await api.get(`/users/isauthenticated`);
      return response.data.user;
    } catch (error) {
      throw error;
    }
  },

  // Get roadmap details
  getRoadmapDetails: async (roadmapUid) => {
    try {
      const response = await api.get(`/api/roadmap/${roadmapUid}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRoadmapProgress: async (roadmapUid) => {
    try {
      const response = await api.get(`/api/roadmap/progress/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllRoadmaps: async () => {
    try {
      const response = await api.get(`/api/get_all_roadmaps/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload PDF to a roadmap
  uploadPDF: async (roadmapUid, pdfData) => {
    try {
      const formData = new FormData();
      formData.append("file", pdfData.file);

      const response = await api.post(
        `/api/upload_pdf/${roadmapUid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default UserServices;
