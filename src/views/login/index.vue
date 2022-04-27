<template>
  <div class="container">
    <div class="form">
      <h1>Login</h1>
      <a-form
        ref="formRef"
        :model="form"
        :rules="rules"
        @finish="onFinish"
        @validate="handleValidate"
        @finishFailed="onFinishFailed"
      >
        <a-form-item name="username">
          <a-input
            v-model:value="form.username"
            :autocomplete="'off'"
            :autofocus="true"
            :placeholder="'Username: admin or user'"
            name="username"
            autofocus
          >
            <template #prefix>
              <user-outlined type="user" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input-password
            v-model:value="form.password"
            :autocomplete="'off'"
            :placeholder="'Password'"
            type="password"
            name="password"
          >
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input-password>
        </a-form-item>

        <div class="login-form-wrap">
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="form.remember"
              >Remember me</a-checkbox
            >
          </a-form-item>
          <a class="login-form-forgot" href="">Forgot password</a>
        </div>

        <a-form-item>
          <a-button type="primary" html-type="submit" block> Login </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import type { FormInstance } from "ant-design-vue";

const router = useRouter();

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formRef = ref<FormInstance>();

const form = reactive<FormState>({
  username: "",
  password: "",
  remember: false
});

let validateUsername = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("Username is required");
  }
  return Promise.resolve();
};

let validatePassword = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("password is required");
  }
  return Promise.resolve();
};

const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      validator: validateUsername,
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      validator: validatePassword,
      trigger: "change",
    },
  ],
};

const handleLogin = () => {
  useUserStore()
    .login()
    .then(() => {
      console.log("login success");
      router.push({ path: "/" });
    });
};

const onFinish = (values: FormState) => {
  console.log("Success:", values);
  handleLogin();
};

const handleValidate = (...args: any[]) => {
  console.log("Validate:", args);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  background-image: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  .form {
    min-width: 328px;
    max-width: 500px;
    margin: 100px auto 0;
    h1 {
      text-align: center;
    }
    .login-form-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0 10px;
    }
  }
}
</style>
