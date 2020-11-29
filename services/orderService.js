import axiosInstance from './axiosInstance';

export default orderService = {
    checkOrder: (products) => {

        return axiosInstance
            .post('/order/checkOrder', { products });
    },
    calculateOrder: (order) => {

        return axiosInstance
            .post('/order/calculateOrder', order);
    },
    placeOrder: (order) => {

        return axiosInstance
            .post('/order/newOrder', order);
    },
    getOrders: () => {

        return axiosInstance
            .get('/order/allOrders');
    },
    getClientOrders: () => {

        return axiosInstance
            .post('/order/clientOrders');
    },
    cancelOrders: (body) => {

        return axiosInstance
            .post('/order/cancelOrder',body);
    },






}
