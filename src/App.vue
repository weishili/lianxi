
<template>
  <div id="app">

    <div>
       <div class="header">
        <!-- 1.0 导航栏头部 -->
        <div class="head-top">
            <div class="section">
                <div class="left-box">
                    <span>黑马买买买</span>
                    <a target="_blank" href="#"></a>
                    <a target="_blank" href="#"></a>
                </div>
                <div id="menu" class="right-box">

                    <!-- 没有登录显示 -->
                    <span v-show="$store.state.isLogin ==false">
                  <router-link to="/login" >登录</router-link>
                        <strong>|</strong>
                        <a href="#" >注册</a>
                        <strong>|</strong>
                    </span>
                    <!-- 已经登录 -->
                    <span  v-show="$store.state.isLogin ==true">
                        <a href="" class="">会员中心</a>
                        <strong>|</strong>
                        <a @click="logout">退出</a>
                        <strong>|</strong>
                    </span>
                    <router-link to="/cart">  
                        <i class="iconfont icon-cart"></i>购物车(
                        <span id="shoppingCartCount">
                            <span>{{$store.getters.goodsCount}}</span>
                        </span>)
                    </router-link>
                </div>
            </div>
        </div>

        <!-- 2.0 导航条 -->
        <div class="head-nav">
            <div class="section">
                <div id="menu2" class="nav-box menuhd">
                    <ul>
                        <li class="index">
                         
                         <router-link to="/index">  
                                  <span class="out" style="top: 0px;">首页</span>
                         </router-link>
                        </li>
                        <li class="news">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">每日精选</span>
                            </a>
                        </li>
                        <li class="photo">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">秒杀专区</span>
                            </a>
                        </li>
                        <li class="video">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">黑马超市</span>
                            </a>
                        </li>
                        <li class="down">
                            <a href="#" class="">
                                <span class="out" style="top: 0px;">会员权益</span>
                            </a>
                        </li>
                        <li class="goods">
                            <a href="" class="router-link-exact-active ">
                                <span class="out" style="top: 0px;">购物商城</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="search-box">
                    <div class="input-box">
                        <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                    </div>
                    <a href="javascript:;">
                        <i class="iconfont icon-search"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
        <router-view></router-view>
       <div class="footer">
                <div class="section">
                    <div class="foot-nav">
                        <a href="">关于我们</a>
                        <strong>|</strong>
                        <a href="">联系我们</a>
                        <strong>|</strong>
                        <a href="">联系客服</a>
                        <strong>|</strong>
                        <a href="">合作招商</a>
                        <strong>|</strong>
                        <a href="">商家帮助</a>
                        <strong>|</strong>
                        <a href="">营销中心</a>
                        <strong>|</strong>
                        <a href="">隐私政策</a>
                    </div>
                    <div class="foot-box">
                        <div class="copyright">
                            <p>版权所有 黑马买买买 </p>
                            <p>公司地址： 联系电话：</p>
                            <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                        </div>
                        <div class="service">
                            <p>周一至周日 9:00-24:00</p>
                            <a href="#">
                                <i class="iconfont icon-phone"></i>在线客服</a>
                        </div>
                    </div>
                </div>
            </div>
     </div>
    <Modal v-model="isShow" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>您要选择离开吗?</span>
        </p>
        <div style="text-align:center">
            <p>带不走的留不下,留不下的别牵挂~你是自由的`</p>
        </div>
        <div slot="footer" style='display:flex;justify-content: center'>
            <Button type="error" size="large"  @click="sureExit">确认</Button>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;                        
            <Button type="error" size="large"  @click="isShow=false">取消</Button>        
        </div>
    </Modal>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'container',
  data:function() {
      return {
          isShow: false
      }
  },
  //方法
  methods: {
      logout() {
          //根据模态框的提示 决定是否调用接口
          this.isShow = true;
      },
    //   取消登出的逻辑
    sureExit() {
        //关闭模态框
        this.isShow = false;
        //调用接口
        //调用登出借口
        //等处成功之后 修改Vuex的数据
        this.$axios.get('site/account/logout').then(response =>{
            //登出成功之后 修改 Vuex的状态为false
            if(response.data.status == 0) {
            //登出成功
            //修改状态
            this.$Message.error('退出成功')
            // console.log(response)
            this.$store.commit('changeLoginStatus', false);
        //  console.log(this.$router);
        //指全局路由对象 任何页面都可以调用 push()go()方法
        //   console.log( this.$route);
            this.$router.push('/login')
            }
  

        })
    }
  }
}


//jquery控制鼠标移入teb栏的切换
$(document).ready(function() {
	$("#menu2 li a").wrapInner( '<span class="out"></span>' );
	$("#menu2 li a").each(function() {
		$( '<span class="over">' +  $(this).text() + '</span>' ).appendTo( this );
	});

	$("#menu2 li a").hover(function() {
		$(".out",	this).stop().animate({'top':	'48px'},	300); // move down - hide
		$(".over",	this).stop().animate({'top':	'0px'},		300); // move down - show

	}, function() {
		$(".out",	this).stop().animate({'top':	'0px'},		300); // move up - show
		$(".over",	this).stop().animate({'top':	'-48px'},	300); // move up - hide
	});

});
</script>

<style>
@import  url('../项目中用到的静态页面资源/statics/site/css/style.css');
@import url('../项目中用到的静态页面资源/jquery插件/hoverNav20151228/css/style.css');
</style>
