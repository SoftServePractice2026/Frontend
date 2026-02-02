export type AppError = 
    | {
        kind: "validation";
        status: 400;
        errors: Record<string, string[]>;
    }
    | {
        kind: "business";
        status: number;
        code: string;
        message: string;
        invalidField?: string;
    }
    | {
        kind: "unknown";
        status?: number;
        message: string;
    }