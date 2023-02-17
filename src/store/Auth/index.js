import loginLocal from "@/asset/js/loginLocal";
import logoutLocal from "@/asset/js/logoutLocal";
import api from "@/asset/js/api";
const initState = {
    accessToken: "",
    refreshToken: "",
    payload: {}
}
export default {
    namespaced: true,
    actions: {
        async login(context, data = {}) {
            try {
                const {code, pwd} = data
                if((typeof code) !== 'string') throw "登录 code 为字符串";
                if((typeof pwd) !== 'string') throw "登录 pwd 为字符串";

                const success = await api({
                    url: "/h3/api/login/user",
                    data,
                });

                const { accessToken, refreshToken, payload={} } = success;
                if (!accessToken || !refreshToken || !payload._id) throw "没有从服务器中接收到有效信息";
                const Auth = { accessToken, refreshToken, payload };

                await loginLocal(Auth);
    
                context.commit('MT_login', Auth);
            } catch(e) {
                console.log(e);
                throw e;
            }
        },
        async logout(context) {
            await logoutLocal();
            context.commit('MT_logout');
        }
    },

    mutations: {
        MT_login(state, data) {
            for(let key in data) {
                if(state[key]) state[key] = data[key]
            }
            state.isLogin = true;
        },
        MT_logout(state) {
            for(let key in initState) {
                state[key] = initState[key]
            }
            state.isLogin = false;
        }
    },

    state: initState
}