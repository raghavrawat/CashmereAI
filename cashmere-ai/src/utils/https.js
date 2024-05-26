import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.cashmereai.com/test',
    headers: {
        Authorization: 'Bearer d123445'
    }
})

export const getLeads = async (pageNumber) => {
    try {
        const res = await instance.get(`/leads?page=${pageNumber}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

export const deleteLeads = async (id) => {
    try {
        const response = await instance.delete('/leads/' + id);
        console.log('User deleted successfully:', response.data);
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

export const getThumbsUp = async () => {
    try {
        const res = await instance.get('/leads/feedback');
        return res.data;
    } catch (error) {
        console.error('Error fetching thumbs up:', error);
    }
}

export const giveThumbsUp = async (id, sentiment) => {
    try {
        const res = await instance.put(`/leads/feedback?lead_id=${id}&sentiment=${sentiment}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching thumbs up:', error);
    }
}

export const deleteThumbsUp = async (id) => {
    try {
        const response = await instance.delete('/leads/feedback/' + id);
        console.log('User deleted successfully:', response.data);
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

export const reset = async () => {
    try {
        const response = await instance.post('/leads/reset');
        console.log('User deleted successfully:', response.data);
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}