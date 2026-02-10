import type {TicketStatus} from "@/features/user/types/TicketVm.ts";
import { api } from "@/shared/api/Axios";

export async function getMyTickets(status: TicketStatus, userId: string) {
    const response = await api.get(`v1/tickets?TicketStatus=${status}&UserId=${userId}`);
    response.data;
}