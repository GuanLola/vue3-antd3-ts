<template>
  <div class="form">
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      @finish="onFinish"
      @validate="handleValidate"
      @finishFailed="onFinishFailed"
    >
      <a-form-item name="phone">
        <a-input
          v-model:value="form.phone"
          :autocomplete="'off'"
          :autofocus="true"
          placeholder="手机号"
          name="phone"
          autofocus
        >
          <template #prefix>
            <user-outlined type="user" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="code">
        <a-input
          v-model:value="form.code"
          :autocomplete="'off'"
          placeholder="动态码"
          name="code"
        >
          <template #prefix>
            <bell-outlined />
          </template>
          <template #suffix>
            <a>获取验证码</a>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" block> 登录 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/modules/user";
import { UserOutlined, BellOutlined } from "@ant-design/icons-vue";
import { reactive, ref } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import type { FormInstance } from "ant-design-vue";
import { Users } from "@/api/login";

const router = useRouter();

interface FormState {
  phone: string;
  code: string;
}

const formRef = ref<FormInstance>();

const form = reactive<FormState>({
  phone: "",
  code: ""
});

let validatePhone = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("请填写正确手机号");
  }
  if (!/^1[3456789]\d{9}$/.test(value)) {
    return Promise.reject("请填写正确手机号");
  }
  return Promise.resolve();
};

let validatePassword = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("请填写验证码");
  }
  return Promise.resolve();
};

const rules: Record<string, Rule[]> = {
  phone: [
    {
      required: true,
      validator: validatePhone,
      trigger: "change",
    },
  ],
  code: [
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
  // Users.register(values).then((res) => {
  //   console.log(res);
  // });
};

const handleValidate = (...args: any[]) => {
  console.log("Validate:", args);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>

<style lang="less" scoped>
.form {
  width: 100%;
  margin: 20px auto 0;
  .login-form-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0 10px;
  }
}
</style>
