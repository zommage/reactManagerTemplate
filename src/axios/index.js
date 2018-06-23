import axios from 'axios';
import { get } from './tools';
import * as config from './config';
import NodeRSA from "node-rsa";
import crypto from "crypto";

const GIT_OAUTH = 'https://github.com/login/oauth';
export const gitOauthLogin = () => axios.get(`${GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`);
export const gitOauthToken = code => axios.post('https://cors-anywhere.herokuapp.com/' + GIT_OAUTH + '/access_token', {...{client_id: '792cdcd244e98dcd2dee',
    client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059', redirect_uri: 'http://localhost:3006/', state: 'reactAdmin'}, code: code}, {headers: {Accept: 'application/json'}})
    .then(res => res.data).catch(err => console.log(err));
export const gitOauthInfo = access_token => axios({
    method: 'get',
    url: 'https://api.github.com/user?access_token=' + access_token,
}).then(res => res.data).catch(err => console.log(err));

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({url: config.MOCK_AUTH_ADMIN});

// 访问权限获取
export const guest = () => get({url: config.MOCK_AUTH_VISITOR});


// 组合 get 请求的参数
export function ComGetUrlParams(params) {
    let flag = true
    let urlParams = ''

    for(let key in params){
        if(params[key] === "" || params[key] === null || typeof(params[key]) === "undefined") {
            continue
        }

        // 判断是否为空数组
        if(Array.prototype.isPrototypeOf(params[key]) && params[key].length === 0){
            continue
        }
        // 判断是否为空对象
        if(Object.prototype.isPrototypeOf(params[key]) && Object.keys(params[key]).length === 0){
            continue
        }

        if(flag === true) {
            urlParams = '?' + key + '=' + params[key]
            flag = false
        }else {
            urlParams = urlParams + '&'+ key + '=' + params[key]
        }
    }
    return urlParams
}

// 创建用户 token
export function createToken(params) {
    let key = new NodeRSA(config.pubKey)
    key.setOptions({encryptionScheme: 'pkcs1'})

    return key.encrypt(params, 'base64')
}

// 判断用户是否登录
export function getTokenInsstance() {
    const user = JSON.parse(localStorage.getItem('user'));
    // 判断用户是否登录
    if(!user) {
        console.log("user not login====================")
        window.location.href = '/login'

        if(!user.token) {
            console.log("user token is not exist")
            window.location.href = '/login'
        }
        return
    }

    // Token 要大写, 有些浏览器会将小写的 token,自动变为 Token
    return axios.create({
            baseURL: config.Platform_Site_Gateway_Url,
            timeout: 30000,
            headers: {'Token': user.token}
        });
}

// 获取用户签名
export function getSignature(method, secret, params = {}) {
    // 随机字符串
    let SignatureNonce = randomWord(16)

    let TimeStamp = new Date().toJSON('second').slice(0, 19) + 'Z'

    params['SignatureNonce'] = SignatureNonce
    params['TimeStamp'] = TimeStamp


    let sigUrl = method + "&" + encodeURIComponent('/') + "&"
    let keys = []
    for(let key in params) {
        keys.push(key)
    }
    // 数组进行顺序排列
    keys.sort()

    let urlEncode = ""
    let isFirst = true
    for(let i in keys) {
        if(!isFirst){
            urlEncode = urlEncode + '&'
        }
        isFirst = false

        // 将空格转替换, url编码每个语言对空格的处理不一样, golang会将空格变成 + 号
        let value = String(params[keys[i]])
        value = value.replace(" ", '')

        let key = encodeURIComponent(keys[i])
        value = encodeURIComponent(value)
        urlEncode = urlEncode + key + "=" + value
    }

    // 对整个 url 进行编码
    sigUrl = sigUrl + encodeURIComponent(urlEncode)

    // 用 hmac sha 获得签名
    let sigStr = signFunc(sigUrl, secret+'&')


    return {'SignatureNonce': SignatureNonce,
        'TimeStamp': TimeStamp,
        'Signature': sigStr,
    }
}

// hac sha签名算法
export function signFunc(sigUrl, secret) {
    let encodeSig = crypto.createHmac('sha1', secret).update(sigUrl).digest().toString('base64')
    return escape(encodeSig)
}

/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
*/
export function randomWord(size){
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charsLen = chars.length


    // 随机产生
    let res = ''

    for (let i = 0; i < size; i++) {
        res += chars.charAt(Math.floor(Math.random() * charsLen));
    }
    return res;
}

