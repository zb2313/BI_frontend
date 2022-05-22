<template>
  <div
      class="login-wrap"
      :style="{
      backgroundImage: 'url(' + coverImgUrl + ')',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
    }"
  >
    <iframe
        id="geoPage"
        width="0"
        height="0"
        frameborder="0"
        style="display: none"
        scrolling="no"
        src="https://apis.map.qq.com/tools/geolocation?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
    >
    </iframe>

    <div class="main">
      <div class="ms-login">
        <div class="ms-title">
          <div style="height: 40px; line-height: 40px">AMAZON Movie Search</div>
        </div>
        <el-form
            :model="param"
            :rules="rules"
            ref="login"
            label-width="0px"
            class="ms-content"
        >
          <el-form-item prop="username">
            <el-input v-model="param.userid" placeholder="username">
              <template #prepend>
                <el-button icon="el-icon-user"></el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                type="password"
                placeholder="password"
                v-model="param.password"
                show-password
            >
              <template #prepend>
                <el-button icon="el-icon-lock"></el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm()" style="width: 140px"
            >登录</el-button
            >
            <el-button type="primary" style="width:140px">注册</el-button
            >

          </el-form-item>
        </el-form>
      </div>
    </div>



  </div>
</template>

<script>

export default {
  data() {
    return {

      coverImgUrl: require("../assets/bg.jpg"),
      param: {
        password: "000001",
        userid: "0000000001",
        checkPassword: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入注册邮箱/手机号",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {

    submitForm() {
      this.$router.push('/Home')
    },

  },
};
</script>

<style scoped>
.login-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
}
.ms-title {
  width: 100%;
  margin-top: 15px;
  text-align: center;
  font-size: 24px;
  color: #2d8cf0;
  border-bottom: 1px solid #ddd;
}
.main {
  height: 100%;
  width: 350px;
  display: flex;
  align-items: center;
}
.ms-login {
  width: 350px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.5);
  overflow: hidden;
}
.ms-content {
  padding: 20px 30px 30px 30px;
}
.login-btn {
  width: 100px;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #1f2d3d;
}
</style>
