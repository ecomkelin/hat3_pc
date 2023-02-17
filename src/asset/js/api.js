import axios from "axios";
import localforage from "localforage";
import loginLocal from "./loginLocal";
import logoutLocal from "./logoutLocal";


const methods = ['post', 'get', 'put', 'delete'];

const reqDate = async(options) => {
    try {
        let { method = "post", url, data, accessToken = "" } = options;
        if (!url) throw "请传递url的值";
        method = method.toLowerCase();
        if (!methods.includes(method)) throw "method 错误 只能是 ['post', 'get', 'put', 'delete'] 中的一种";

        const res = await axios({
            method,
            url,
            data,
            headers: {
                "content-type": "application/json",
                'Authorization': 'Bearer ' + accessToken,
                'Trust-Token': accessToken
            },
        });

        return res.data;
    } catch (e) {
        if (e.response) {
            const {data={}} = e.response;
            throw data.fail;  // 如果是 服务器错误
        }
        throw "api reqDate Error: " + e;
    }
}

const reqRefresh = async() => {
    try {
        const Auth = await localforage.getItem("Auth");
        const refreshToken = Auth ? Auth.refreshToken : null;
        if(!refreshToken) throw "系统找不到 refreshToken"
        const res = await axios({
            method: "get",
            url: "/h3/api/login/refreshToken",
            headers: {
                "content-type": "application/json",
                'Authorization': 'Bearer ' + refreshToken,
                'Trust-Token': refreshToken
            },
        });
        return res.data;
    } catch (e) {
        if (e.response) {
            const {data={}} = e.response;
            throw data.fail;  // 如果是 服务器错误
        }
        throw "api reqRefresh Error: " + e;
    }
}

export default async (options = {}) => {
    try {

        let { method = "post", url } = options;

        if (!url) throw "请传递url的值";
        method = method.toLowerCase();
        if (!methods.includes(method)) throw "method 错误 只能是 ['post', 'get', 'put', 'delete'] 中的一种";
        options.method = method;

        const Auth = await localforage.getItem("Auth");
        options.accessToken = Auth ? Auth.accessToken : "";

        let resDate = await reqDate(options);
        // console.info(" @@ 1 @@", resDate);
        if(resDate.status === 401) {
            // console.info(" @@ 2 @@ accessToken 过期， 开始调用 refreshToken")
            const refDate = await reqRefresh();
            // console.info(" @@ 3 @@", refDate);
            if(refDate.status === 401) {
                // console.info(" @@ 4 @@ refreshToken也过期了 需要重新登录")
                await logoutLocal()
                alert( "您的账号过期 请重新登录");
                location.reload();
            }
            const {success: {refreshToken, accessToken, payload}} = refDate;
            await loginLocal({refreshToken, accessToken, payload});

            options.accessToken = accessToken;
            resDate = await reqDate(options);
        }
        const {success} = resDate;
        return success;
    } catch (e) {
        if (e.response) {
            const {data={}} = e.response;
            throw data.fail;  // 如果是 服务器错误
        }
        throw "api Error: " + e;
    }
};