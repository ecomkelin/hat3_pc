<template>
  <div class="body-login" :class="ui.active">
    <div class="container">
      <div class="blueBg">
        <div class="box signin">
          <h2>Already Have an Account ?</h2>
          <button class="signinBtn" @click="signinBtnHandle">Sign in</button>
        </div>
        <div class="box signup">
          <h2>Don't Have an Account ?</h2>
          <button class="signupBtn" @click="signupBtnHandle">Sign up</button>
        </div>
      </div>
      <div class="formBx" :class="ui.active">
        <div class="form signinForm">
          <form>
            <h3>Sign In</h3>
            <input
              type="text"
              ref="loginCode"
              placeholder="Username"
              v-model="data.code"
            />
            <input type="password" placeholder="Password" v-model="data.pwd" />
            <div style="color: red">{{ errData.loginFail }}</div>
            <input type="submit" value="Login" @click.prevent="signinSubmit" />
            <!-- <a href="#" class="forgot">Forgot Password</a> -->
          </form>
        </div>
        <div class="form signupForm">
          <form>
            <h3>Sign Up</h3>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <input type="submit" value="Register" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

import { reactive } from "@vue/reactivity";

export default {
  name: "LoginUser",
  setup() {
    const store = useStore();

    const data = reactive({
      code: "admin",
      pwd: "111111",
    });
    const errData = reactive({
      loginFail: "",
    });

    /** 点击login按钮 告诉 store 账号密码 让store action 访问 服务器登录 */
    const signinSubmit = async () => {
      try {
        if (!data.code || !data.pwd) throw "请输入账号和密码";
        await store.dispatch("Auth/login", { code: data.code, pwd: data.pwd });
      } catch (e) {
        return (errData.loginFail = e);
      }
    };

    /** 控制 ui 的数据 */
    const ui = reactive({
      active: "",
    });
    /** 点击 signup 按钮 显示注册 ui*/
    const signupBtnHandle = () => {
      ui.active = "active";
    };
    /** 点击 signin按钮 显示登录 ui */
    const signinBtnHandle = () => {
      ui.active = "";
    };

    return {
      data,
      errData,
      ui,

      signinSubmit,

      signinBtnHandle,
      signupBtnHandle,
    };
  },
};
</script>

<style src="./LoginUser.css" scoped>
</style>