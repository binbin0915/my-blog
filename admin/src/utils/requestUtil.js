//axios请求封装页面

import axios from 'axios'
// import Qs from 'qs'
const $axios = axios.create({
        timeout: 20000,
        // responseType: 'json'
    }
);

// 添加请求拦截器
$axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
});

// // 添加响应拦截器
// $axios.interceptors.response.use(function (response) {
// 	// 对响应数据做点什么
// 	return response
// }, function (error) {
// 	// 对响应错误做点什么
// 	console.error('响应发生错误', error)
// 	return Promise.reject(error)
// })


export function get(url, params = {}, headers = {}) {
    return new Promise((resole, reject) => {
        $axios({
            url,
            params,
            method: 'GET',
            withCredentials: true,
            // paramsSerializer: function (params) {
            // 	return Qs.stringify(params)
            // },
            headers: {
                ...headers,
                'Content-Type': 'application/json;charset=UTF-8', // 指定消息格式
            }
        }).then((res) => {
            resole(res.data)
        })
            .catch((err) => {

                reject(err)
            })
    })
}

export function post(url, params = {}, headers = {}) {
    return new Promise((resole, reject) => {
        $axios({
            url,
            data: {...params},
            method: 'POST',
            withCredentials: true,
            // paramsSerializer: function (params) {
            // 	return Qs.stringify(params)
            // },
            headers: {
                ...headers,
                'Content-Type': 'application/json;charset=UTF-8', // 指定消息格式
            }
        }).then((res) => {
            resole(res.data)
        })
            .catch((err) => {
                reject(err)
            })
    })
}

//文件上传专用
export function postFile(url, params = {}, headers = {}) {
    const formData = new FormData();
    for (let [key, value] of Object.entries(params)) {
        formData.append(key, value)
    }
    return new Promise((resole, reject) => {
        $axios({
            url,
            data: formData,
            method: 'POST',
            withCredentials: true,
            // paramsSerializer: function (params) {
            // 	return Qs.stringify(params)
            // },
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data', // 指定消息格式
            }
        }).then((res) => {
            resole(res.data)
        })
            .catch((err) => {
                reject(err)
            })
    })
}
