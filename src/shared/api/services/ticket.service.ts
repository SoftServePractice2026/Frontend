import {api} from "@/shared/api/Axios";

export const TicketService = {
    getBySeat: async (sessionId: string, seatId: string) => {
        const response = await api.get(`/ticket/session/${sessionId}/seat/${seatId}`);
        return response.data;
    },

    updateStatus: async (ticketId: string, status: string) => {
        const response = await api.patch(`/ticket/${ticketId}`, { status });
        return response.data;
    }
}