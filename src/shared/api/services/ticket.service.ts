import {api} from "@/shared/api/Axios";

export const TicketService = {
    getBySeat: async (sessionId: string, seatId: string) => {
        const response = await api.get(`/v1/ticket/session/${sessionId}/seat/${seatId}`);
        return response.data;
    },

    updateStatus: async (ticketId: string, status: string) => {
        const response = await api.patch(`/v1/ticket/${ticketId}`, { status });
        return response.data;
    }
}