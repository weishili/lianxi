<template>
    <!-- 基础结构 从静态资源目录下 02.商品列表下 拷贝 -->
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>  
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!-- 左侧列表区域 -->
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <!-- 循环生成  左侧列表区域-->
                                <li  v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="itemSon in item.subcates" :key="itemSon.id">
                                                {{itemSon.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="itemSon in item.subcates" :key="itemSon.id" href="/goods/43.html">{{itemSon.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片  轮播图区域-->

                    <div class="left-705">
                        <el-carousel :interval="5000" arrow="always">
                            <el-carousel-item v-for="item in sliderlist" :key="item.id">
                            <h3>
                                <a href="#">
                                    <img :src='item.img_url' alt="">
                                </a>            
                            </h3>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!--/幻灯片 右侧列表-->
                    <div class="left-220">
                        <ul class="side-img-list">  
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | filterDate}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 商品列表头部 -->
        <div class="section" v-for="item in message" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="item1 in item.level2catelist" :key="item1.subcateid" >{{item1.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <!-- 商品列表 -->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="item2 in item.datas" :key="item2.artID">
                            <router-link :to="'/detail/'+item2.artID">
                                <div class="img-box">
                                    <!-- <img :src="item2.img_url"> -->
                                        <img v-lazy='item2.img_url'>
                                </div>
                                <div class="info">
                                    <h3>{{item2.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{item2.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{item2.stock_quantiry}}</strong>
                                        <span>市场价：
                                            <s>{{item2.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 返回顶部 -->
        <BackTop></BackTop>
    </div>
         
</template>
<script>


export default {
  // 设置名字
  name: "index",
  data: function() {
    return {
      catelist: [], // 分类数据
      sliderlist: [], // 轮播图数据
      toplist: [], // 热卖排行

      //手机数码部分
      message: [] //最外层的个数
    };
  },
  // 生命周期函数
  // 创建之前
  beforeCreate() {
    // console.log("beforeCreate");
    // console.log(this.info);
  },
  // 创建完毕
  created() {
    // 网络数据获取
    this.$axios
      .get("site/goods/gettopdata/goods")
      .then(response => {
        // 把获取到的数据 设置给 当前这个组件的 data属性
        this.catelist = response.data.message.catelist;
        this.sliderlist = response.data.message.sliderlist;
        this.toplist = response.data.message.toplist;
        // 打印数据
        // console.log(response)
        // console.log(this.catelist); 
      });
    this.$axios
      .get("site/goods/getgoodsgroup")
      .then(response => {
        // 把获取到的数据 设置给 当前这个组件的 data属性
        this.message = response.data.message;
        // console.log(this.message.level2catelist)
        // 打印数据
      });
  },
};
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 341px;
  margin: 0;
}
.el-carousel__item img {
  width: 705px;
  height: 341px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__container {
  height: 341px !important;
}
</style>



