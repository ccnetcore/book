<template>
  <div id="login-container">
    <el-form
      :ref="form"
      :rules="rule"
      :model="form"
      label-width="60px"
      class="login-form"
    >
      <h2 class="login-title">啥也不是管理系统</h2>
      <el-form-item label="帐号" prop="username">
        <el-input v-model="form.username" placeholder="请输入帐号"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(form)">立即创建</el-button>
        <el-button type="primary" @click="submitForm(form)">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login, getUserInfo } from "@/api/login.js";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rule: {
        username: [{ required: true, message: "请输入帐号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const p = login(this.form.username, this.form.password);
          p.then(res => {
            console.log(res.data);
            const resp = res.data;
            if (resp.flag) {
              getUserInfo(resp.data.token).then(res1 => {
                console.log(res1.data);
                const respUser = res1.data;
                if (respUser.flag) {
                  localStorage.setItem(
                    "cc-user",
                    JSON.stringify(respUser.data)
                  );
                  localStorage.setItem("cc-token", resp.data.token);
                  this.$router.push("/home");
                } else {
                  this.$message({
                    message: respUser.message,
                    type: "warning"
                  });
                }
              });
            }
            else {
                  this.$message({
                    message: resp.message,
                    type: "warning"
                  });
                }
          });
        } else {
         this.$message({
                    message: "效验失败",
                    type: "warning"
                  });
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
#login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/bg.jpg");
  background-size: cover;
}
.login-title {
  text-align: center;
  color: violet;
}
.login-form {
  background-color: white;
  padding: 15px;
  border-radius: 20px;
  width: 350px;
  height: 250px;
  left: 50%;
  top: 40%;
  margin-left: -175px;
  margin-right: -125px;
  position: absolute;
}
</style>