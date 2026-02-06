import axios from "axios";

interface EmailData {
    name: string;
    email: string;
    message: string;
}

export const sendEmails = async (data: EmailData) => {
    try {
        const response = await axios.post("https://localhost:7087/api/v1/emails", data);
        return response.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
