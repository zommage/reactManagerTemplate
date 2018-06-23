// 开奖
import * as config from './config';
import {getTokenInsstance} from "./index";
import {getSignature} from "./index";


// 获取短信开关的状态
export const SmsSwitchStatusFunc = (params) => {
    return new Promise((resolve, reject) => {
        let instance = getTokenInsstance()
        let url = "/platform/site/v1/smsseting/switchstatus"

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

// 更改短信开关
export const ModifySmsSwitchFunc = (params) => {
    return new Promise((resolve, reject) => {
        let instance = getTokenInsstance()
        let url = "/platform/site/v1/smsseting/"

        url += params["smsenable"]

        // 获得签名
        let sigParams = getSignature('PUT', config.Secret, params)
        url += '?'
        for(let key in sigParams) {
            if(key === 'smsenable') {
                continue
            }
            url += key + '=' + sigParams[key] + '&'
        }

        url = url.slice(0, url.length - 1)

        //请求处理
        instance.put(url)
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