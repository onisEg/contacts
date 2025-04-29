import axios from "axios";

const baseURL = `https://dummyapi.io/data/v1`;

const appId = '64fc4a747b1786417e354f31';

// Axios Instance
export const axiosInstance = axios.create({
    baseURL,
    headers: {
        'app-id': appId
    }
});

// User CRUD APIs
export const USER_API = {
    listUsers: `/user`,
    // listUsers: (limit = 10, page = 0) => `/user?limit=${limit}&page=${page}`, // Pagination
    addUser: `/user/create`,
    updateUser: (id) => `/user/${id}`,
    deleteUser: (id) => `/user/${id}`,
    getUserDetails: (id) => `/user/${id}`,
};

const fetchUsers = async () => {
    try {
        const response = await axiosInstance.get(USER_API.listUsers);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};
