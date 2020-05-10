import * as axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api/v1/'
});

export async function getMeta() {
    try {
        let response = axiosInstance.get('meta');
        return response;  
    } catch (error) {
        throw error;
    }
}