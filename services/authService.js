import axiosInstance from './axiosInstance';

export default authService = {

    login: (phoneNumber, password) => {

        return axiosInstance
            .post('/auth/login/client', { phoneNumber, password });
    },
    register: async (phoneNumber, password, username, email) => {
        return axiosInstance
            .post('/auth/signUp/client', { phoneNumber, password, username, email });
    },
    sendOTP: async (phoneNumber) => {
        return axiosInstance
            .post('/auth/sendOtp', { phoneNumber });
    },
    verifyOTP: async (phoneNumber, OTP) => {

        return axiosInstance
            .post('/auth/verfiyOtp', { phoneNumber, OTP });
    },
    resetPassword: async (phoneNumber, OTP, password) => {
        return axiosInstance
            .post('/auth/rest/password', { phoneNumber, OTP, password });
    },
    checkFaceBookUser: async (faceBookId) => {
        return axiosInstance
            .post('/auth/check/facebook', { faceBookId });
    },
    signUpFaceBookUser: async (phoneNumber, obj) => {

        return axiosInstance
            .post('/auth/signUp/facebook', { phoneNumber, faceBookId: obj.userData.id, username: obj.userData.name, faceBookToken: obj.token, imageName: obj.fbImage });
    },
    getUserData: ( ) => {
        
        return axiosInstance
            .get('/auth/getAllInfo');
    },
    checkToken: ( ) => {
        
        return axiosInstance
            .get('/auth/checkToken');
    },
    

}




