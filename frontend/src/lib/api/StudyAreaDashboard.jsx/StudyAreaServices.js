import api from '../apiConfig';

export const StudyAreaService = {
    // Get recent PDFs
    get_all_pdfs_for_roadmap: async (roadmapUid) => {
        try {
            const response = await api.get(`/api/get_all_pdfs_for_roadmap/${roadmapUid}`);
            return response.data;
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

    // increment milestone 
    incrementMilestone: async (roadmapUid) => {
        try {
            const response = await api.put(`/api/roadmap/${roadmapUid}/update/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Upload PDF to a roadmap
    uploadPDF: async (roadmapUid, pdfData) => {
        try {
            const formData = new FormData();
            formData.append('file', pdfData.file);

            const response = await api.post(`/api/upload_pdf/${roadmapUid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
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

    // Get flashcards for a roadmap
    getRoadmapFlashcards: async (roadmapUid) => {
        try {
            const response = await api.get(`/api/roadmap/${roadmapUid}/flashcards/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create flashcard for a roadmap
    createFlashcard: async (roadmapUid, flashcardData) => {
        try {
            const response = await api.post(`/api/generate_flashcards/${roadmapUid}/`, flashcardData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete flashcard
    deleteFlashcard: async (roadmapUid, flashcardId) => {
        try {
            const response = await api.delete(`/api/roadmap/${roadmapUid}/flashcards/${flashcardId}/`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default StudyAreaService;