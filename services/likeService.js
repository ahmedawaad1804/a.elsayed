import axiosInstance from './axiosInstance';

export default likeService = {
    setLike: (productId) => {

        return axiosInstance
            .post('/like/addTolike',{productId});
    },
    setDislike: (productId) => {

        return axiosInstance
            .post('/like/removeLike',{productId});
    },
    getLikes: () => {

        return axiosInstance
            .get('/like/getLikes');
    },



}
