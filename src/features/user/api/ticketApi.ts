import type {TicketStatus} from "@/features/user/types/TicketVm.ts";

export async function getMyTickets(status: TicketStatus, userId: string) {
    const res = await fetch(`/api/v1/tickets?TicketStatus=${status}&UserId=${userId}`);
    if (!res.ok) throw new Error("Failed to load");
    return res.json();
}