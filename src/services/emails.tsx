// services/emails.ts
import axios from "axios";

// 1. Описуємо, як виглядають дані (Інтерфейс)
interface EmailData {
    name: string;
    email: string;
    message: string;
}

// 2. Вказуємо тип аргументу 'data'
export const sendEmails = async (data: EmailData) => {
    try {
        const response = await axios.post("https://localhost:7087/api/v1/emails", data);
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
