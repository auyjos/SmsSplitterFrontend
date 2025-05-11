import axios from 'axios';
import type { SmsRequest } from '../types/sms';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const splitMessage = async (request: SmsRequest): Promise<string[]> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/sms/split`, request);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Failed to split message');
        }
        throw new Error('Failed to communicate with the server');
    }
};