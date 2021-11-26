import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
    baseURL: " http://b58c-184-146-69-194.ngrok.io"
})

instance.interceptors.request.use(
    async (config)=>{
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `bearer ${token}`
        }
        console.log('Token' + token );
        return config;
    },
    (err)=>{ 
        console.log('Failed '+ err);
        return Promise.reject(err)}
);

export default instance;