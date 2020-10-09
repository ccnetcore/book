 <template>
  <div class="header">
    <a href="/" style="padding-left:30px">
      <img class="logo" src="@/assets/bg.jpg" />
      <span class="title">啥也不是系统</span>
    </a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        用户：{{this.user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">修改密码</el-dropdown-item>
        <el-dropdown-item command="b">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="400px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        style="width:300px;margin-top:-30px;margin-bottom:-20px;"
        size="mini"
      >
        <el-form-item label="旧密码" prop="oldpass">
          <el-input
            type="password"
            v-model="ruleForm.oldpass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpass">
          <el-input
            type="password"
            v-model="ruleForm.newpass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpass">
          <el-input type="password" v-model="ruleForm.checkpass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
 <style scoped>
.logo {
  width: 25px;
  vertical-align: middle;
  border-radius: 5px;
}
.title {
  position: absolute;
  color: #fff;
  padding-left: 5px;
  font-size: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown {
  float: right;
  margin-right: 30px;
}
</style>
<script>
import { logout } from "@/api/login.js";
import passwordApi from "@/api/password.js";
export default {
  data() {
    const validateOldPass = (rule, value, callback) => {
      console.log(rule);
      console.log(value);
      passwordApi.checkPwd(this.user.id, value).then(response => {
        const resp = response.data;
        if (resp.flag) {
          callback();
        } else {
          callback(new Error(resp.message));
        }
      });
    };
    const validatecheckPass = (rule, value, callback) => {
      if (value !== this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback(); 
      }
    };
    return {
      user: JSON.parse(localStorage.getItem("cc-user")),
      dialogFormVisible: false,
      ruleForm: {
        oldpass: "",
        newpass: "",
        checkpass: ""
      },
      rules: {
        oldpass: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
          { validator: validateOldPass, trigger: "blur" }
        ],
        newpass: [
          { required: true, message: "新密码不能为空", trigger: "blur" }
        ],
        checkpass: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validatecheckPass, trigger: ["blur", "change"] }
        ]
      }
    };
  },
  methods: {
     resetForm(formName) {
      this.$refs[formName].resetFields();
    },
        updatePwd() {
      this.dialogFormVisible = true;
      this.$nextTick(()=>{
          this.$refs['ruleForm'].resetFields();
      })
    },
     LogoutSystem(){
         const token = localStorage.getItem("xdz-manager-token");
          logout(token).then(response => {
            const resp = response.data;
            if (resp.flag) {
              localStorage.removeItem("xdz-manager-token");
              localStorage.removeItem("xdz-manager-user");
              this.$router.push("/login");
            } else {
              this.$message({
                message: resp.message,
                type: "warning",
                duration: 1000
              });
            }
          });
    },
     submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          passwordApi.updatePwd(this.user.id,this.ruleForm.newpass).then(response=>{
            const resp=response.data
            this.$message({
              message:resp.message,
              type:resp.flag?"success":"warning"
            })
            if(resp.flag)
            {
              this.LogoutSystem()
              this.dialogFormVisible=false
            }
            else
            {

            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCommand(command) {
      switch (command) {
        case "a":
           this.updatePwd();
          break;
        case "b":
          this.LogoutSystem()
          break;
      }
    }
  }
};
</script>