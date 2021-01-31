<template>
  <div class="login">
    <div class="left">
      <img :src="logo" alt="" />
    </div>
    <div class="right">
      <div class="logo">
        <img :src="logo" alt="" />
      </div>
      <div class="form">
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
        >
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [{ required: true, message: '请输入你的用户名!' }]
                }
              ]"
              placeholder="用户名"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: '请输入你的密码!' }]
                }
              ]"
              type="password"
              placeholder="密码"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox
              v-decorator="[
                'remember',
                {
                  valuePropName: 'checked',
                  initialValue: true
                }
              ]"
            >
              记住密码
            </a-checkbox>
            <a class="login-form-forgot" href="">
              忘记密码
            </a>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              登录
            </a-button>
            <a @click="handleReg">
              账号注册
            </a>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
import logo from "../../assets/logo.png";
import { request } from "../../api/request";
import { notification } from "ant-design-vue";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {
      logo
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          request("http://localhost:8080/login").then(res => {
            res.list.forEach(element => {
              console.log(element.name);
              if (element.name === values.userName) {
                this.$router.push({
                  path: "/"
                });
                localStorage["userName"] = values.userName;
                localStorage["token"] = element.token;
              }
            });
          });
        } else {
          notification.error({
            message: "请检查用户名/密码是否正确"
          });
        }
      });
    },
    handleReg() {
      this.$router.push({
        path: "register"
      });
    }
  }
};
</script>
<style lang="less">
.login {
  display: flex;
  .left {
    width: 50%;
    height: 100vh;
    // background-color: chocolate;
    position: relative;
    img {
      width: 500px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .right {
    width: 50%;
    background-color: #eee;
    position: relative;
    img {
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .form {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
