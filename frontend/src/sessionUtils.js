import axios from "axios";

export const checkSession = async() => {
    try {
        const response = await axios.get("http://localhost:5000/api/session", {
            withCredentials: true,
        });
        return response.data.user;
    } catch {
        return null;
    }
};