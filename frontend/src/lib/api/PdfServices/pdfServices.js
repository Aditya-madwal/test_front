import api from '../apiConfig';

export const PdfServices = {
    // get pdf data 
    getPDFData: async (roadmapUid, pdfUid) => {
        try {
            const response = await api.get(`/api/view_pdf/${roadmapUid}/${pdfUid}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete PDF from a roadmap
    deletePDF: async (roadmapUid, pdfUid) => {
        try {
            const response = await api.delete(`/api/delete_pdf/${roadmapUid}/${pdfUid}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default PdfServices;