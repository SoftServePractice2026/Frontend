export enum TicketStatus {
    Active = 0,
    Archive = 1,
}

export type TicketListItemVm = {
    id: string;
    sessionId: string;
    price: number;
    ticketStatus: TicketStatus;
    movieTitle?: string;
    posterUrl?: string;
    sessionDate?: string;
    seats?: string[];
};