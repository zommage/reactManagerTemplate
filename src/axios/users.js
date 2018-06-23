// 用户登录
import * as config from "./config";
import axios from "axios/index";

export const userLogin = (params) => {
    let url = config.Platform_Site_Gateway_Url + "/platform/site/v1/login"

    return axios.post(url, params)
}