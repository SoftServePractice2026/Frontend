import { api } from "../Axios";

export const SessionService = {
    getById: async (sessionId: string)=> {
        const response = await api.get(`/sessions/${sessionId}`);
        return response.data;
    },

    update: async (sessionId: string, data: {status?: number; startTime?: string, endTime?: number}) => {
        const response = await api.patch(`/sessions/${sessionId}`, data);
        return response.data;
    },

    getByHallId: async (hallId: string) => {
        const response = await api.get(`/sessions?hallId=${hallId}`);
        return response.data;
    }
};