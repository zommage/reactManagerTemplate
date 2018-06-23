// 开奖
import * as config from './config';
import {ComGetUrlParams, getTokenInsstance} from "./index";
import {getSignature} from "./index";

// 开奖期号调整
export const AdjustDrawIssueNoFunc = (params) => {
    return new Promise((resolve, reject) => {
        let instance = getTokenInsstance()
        let url = "/platform/site/v1/exception/betnotify"

        // 获得签名
        let sigParams = getSignature('POST', config.Secret, params)
        url += '?'
        for(let key in sigParams) {
            url += key + '=' + sigParams[key] + '&'
        }

        url = url.slice(0, url.length - 1)
        console.log("url=================", url)

        //请求处理
        instance.post(url, params)
            .then(({data}) => {
                resolve({data})
                return false
            })
            .catch((error) => {
                // code: 777 表示用户token 已经过期, token有效时间为 1个小时
                if(error.response.data.code === 777){
                    localStorage.removeItem('user');
                    window.location.href = '/login'
                }else {
                    reject({error})
                }
            })
    })
}

// 封盘时间调整
export const RotaryHeaderFunc = (params) => {
    return new Promise((resolve, reject) => {
        let instance = getTokenInsstance()
        let url = "/platform/site/v1/exception/preventbetnotify"

        // 获得签名
        let sigParams = getSignature('POST', config.Secret, params)
        url += '?'
        for(let key in sigParams) {
            url += key + '=' + sigParams[key] + '&'
        }

        url = url.slice(0, url.length - 1)

        //请求处理
        instance.post(url, params)
            .then(({data}) => {
                resolve({data})
                return false
            })
            .catch((error) => {
                // code: 777 表示用户token 已经过期, token有效时间为 1个小时
                if(error.response.data.code === 777){
                    localStorage.removeItem('user');
                    window.location.href = '/login'
                }else {
                    reject({error})
                }
            })
    })
}

// 开奖异常列表
export const DrawExcepList = (params) => {
    return new Promise((resolve, reject) => {
        let instance = getTokenInsstance()
        let url = config.Platform_Site_Gateway_Url + "/platform/site/v1/excep/list"
        url = url + ComGetUrlParams(params)

        //请求处理
        instance.get(url, params)
            .then(({data}) => {
                resolve({data})
                return false
            })
            .catch((error) => {
                // code: 777 表示用户token 已经过期, token有效时间为 1个小时
                if(error.response.data.code === 777){
                    localStorage.removeItem('user');
                    window.location.href = '/login'
                }else {
                    reject({error})
                }
            })
    })
}

// 编辑开奖异常
export function DrawExcepEditFunc(params) {
    return new Promise((resolve, reject) => {
        let instance = getTokenInsstance()
        let url = config.Platform_Site_Gateway_Url + '/platform/site/v1/excep/update'
        let formdata = new FormData();

        for(let key in params) {
            formdata.append(key, params[key]);
        }

        //请求处理
        instance.post(url, formdata)
            .then(({data}) => {
                resolve({data})
                console.log("data: ", data)
                return false
            })
            .catch((error) => {
                // code: 777 表示用户token 已经过期, token有效时间为 1个小时
                if(error.response.data.code === 777){
                    localStorage.removeItem('user');
                    window.location.href = '/login'
                }else {
                    reject({error})
                }
            })
    })
}

// 新增开奖异常
export function DrawExcepAddFunc(params) {
    return new Promise((resolve, reject) => {
        let instance = getTokenInsstance()
        let url = config.Platform_Site_Gateway_Url + '/platform/site/v1/excep/add'
        let formdata = new FormData();

        for(let key in params) {
            formdata.append(key, params[key]);
        }

        //请求处理
        instance.post(url, formdata)
            .then(({data}) => {
                resolve({data})
                console.log("data: ", data)
                return false
            })
            .catch((error) => {
                // code: 777 表示用户token 已经过期, token有效时间为 1个小时
                if(error.response.data.code === 777){
                    localStorage.removeItem('user');
                    window.location.href = '/login'
                }else {
                    reject({error})
                }
            })
    })
}

// 修改开奖计算的基准值
export const ModifyBaseValueFunc = (params) => {
    return new Promise((resolve, reject) => {
        let instance = getTokenInsstance()
        let url = "/platform/site/v1/excep/addbase"

        //请求处理
        instance.post(url, params)
            .then(({data}) => {
                resolve({data})
                return false
            })
            .catch((error) => {
                // code: 777 表示用户token 已经过期, token有效时间为 1个小时
                if(error.response.data.code === 777){
                    localStorage.removeItem('user');
                    window.location.href = '/login'
                }else {
                    reject({error})
                }
            })
    })
}