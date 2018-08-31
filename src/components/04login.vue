<template>
    <div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        
                           <el-input v-model.trim="userName"  type='text' placeholder="请输入用户名"></el-input>
                            <br>     
                            <br>                                   
                           <el-input v-model="passWord"  type='password' placeholder="请输入密码"></el-input>
                              <br>     
                              <br> 
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" @click="login" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>
<script>
export default {
  data: function() {
    return {
      userName: "",
      passWord: "" 
    };
  },
  methods: {
    login() {
      //设置进度条的颜色尺寸
      this.$Loading.config({
        color: "#5cb85c",
        failedColor: "#f0ad4e",
        height: 6
      });
    //   开启进度条
      this.$Loading.start();
      this.$axios
        .post("/site/account/login", {
          user_name: this.userName,
          password: this.passWord
        })
        .then(response => {

            if(response.data.status == 0) {
                //当登录成功修改Vuex中登录的状态,在页面让页面顶部显示退出和个人中心样式
                this.$store.commit('changeLoginStatus', true);
                //跳转会你来时的页面//这个逻辑是通过路由守卫的from可以获取每次跳转过来的路由信息
                //再通过Vuex讲每次跳转的过来的信息存储起来,这里当登录成功后,用路由的编程式导航跳转到
                this.$router.push(this.$store.state.fromPath)
            }
            // 关闭进度条
          this.$Loading.finish();
        //   console.log(response);
        })
        .catch(() => {
          this.$Loading.error();
        });
    }
  }
};
</script>
<style>
</style>


