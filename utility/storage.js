/* storage */
import { AsyncStorage } from 'react-native';

exports.setToken = async function (token) {

    try {
        await AsyncStorage.setItem(
            'token', token
        );

        console.log("token Saved");

    } catch (error) {
        // Error saving data
        console.log(error);

    }

}

exports.getToken = async function () {

    try {
        const token = await AsyncStorage.getItem('token');

        // console.log(token);

        return token

    } catch (error) {
        // Error saving data
        console.log(error);

    }

}
exports.removeToken = async function () {

    try {
        await AsyncStorage.removeItem('token');

        // console.log(token);


    } catch (error) {
        // Error saving data
        console.log(error);

    }

}