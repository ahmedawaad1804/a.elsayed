import axiosInstance from './axiosInstance';

export default adressService = {
    addAdress: (address) => {
        return axiosInstance
            .post('/client/addAddress',{address});
    },
    



}
