<template>
   <!-- 商品详情页面 -->
       <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>  
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <!-- 头部商品详情展示 -->
                        <div class="goods-box clearfix">
                                 <div class="pic-box">                                
                                      <!-- 放大镜插件 -->
                                <!-- <ProductZoomer  /> 怪不得 55个赞
                                    设置使用 images 而这个变量 默认内部是没有数据的
                                    有图片的时候 才生成 才创建
                                 -->
                                <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions" ></ProductZoomer>                 
                                </div>
                            
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                 <div class="el-input el-input--small">
                                                      <el-input-number v-model="buyCount" size="small" :min="1" :max="goodsinfo.stock_quantity" label="描述文字"></el-input-number>
                                                 </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <!-- 商品介绍 评论区域 --> 
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <affix>
                             <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click='showDiscuss=false' :class="{selected: !showDiscuss}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click='showDiscuss=true' :class="{selected: showDiscuss}">商品评论</a>
                                    </li>
                                </ul>
                             </div>
                            </affix>
                           
                            <div class="tab-content entry" v-show="!showDiscuss" v-html="goodsinfo.content">
                            </div>
                            <div class="tab-content" v-show="showDiscuss">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1500" nullmsg="请填写评论内容！" v-model.trim="commentInfo"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <!-- 评论提交按钮 -->
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="commit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comments.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in comments" :key="item.pageIndex">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | filterDate}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>

                                </div>
                                   <!--分页部分  -->
                                    <el-pagination                       
                                       @current-change="handleCurrentChange"
                                       :page-size="pageSize"
                                       layout="total, prev, pager, next, jumper"
                                       :total="totalcount">
                                  </el-pagination>
                            </div>
                        </div>
                    </div>
                    <!-- 右侧推荐商品展示部分 -->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for='item in hotgoodslist' :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/detail/'+item.id">
                                                 <img :src="item.img_url">
                                            </router-link>
                                                
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | filterDate}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                <!-- 返回顶部 -->
        <BackTop></BackTop>
         </div>
</template>

<script>



export default {
    name:'detail',
    data:function() {
        return {
            productId: undefined,//id
            goodsinfo:{},//商品信息
            hotgoodslist:[],//热卖列表
            imglist:[], //图片列表
            buyCount:0,//购买数量
            showDiscuss:false,//默认隐藏
            comments:[],//用户评论信息
            commentInfo:'',//用户输入框内输入的值

            currentPage4: 1,//总页码数
            pageIndex:1,//显示第几页
            pageSize:10,//一页显示几条数据
            totalcount:2,//总数据
                  // 放大镜设置
            zoomerOptions: {
              'zoomFactor': 2,// 放大倍数
              'pane': 'container-round',// container-round 小放大镜
              'hoverDelay': 300,
              'namespace': 'zoomer',
              'move_by_click':true,// true 点击切换
              'scroll_items': 7,
              'choosed_thumb_border_color': "yellowgreen" // 框的颜色
            },
            // 轮播图用的图片 默认的数据格式 不支持
            // 这里的数据 需要在接口调用完毕之后 才能够获取
            images:{
                normal_size:[     
                ]
            }

        }
    },
    methods:{
        // 当点击提交评论时,调用该函数
        commit() {
            // 评论接口
            if(this.commentInfo ==''){
                   // 直接弹框这是iview的全局弹窗
             this.$Message.error('哥们,写点啥呗, 前端程序员不想理你 并且跑出了一个异常!!');
            return;
            }
            this.$axios
            .post(`site/validate/comment/post/goods/${this.productId}`,{
                commenttxt:this.commentInfo
            })
            .then(response => {
               if(response.status==200) {
                   //提示发表成功
                   this.$Message.success(response.data.message)
                    this.getComments();
                    this.getProductDetail()
                    
                    this.commentInfo='';
               }
          
        })
          
    },

    // 抽取方法渲染数据
    getProductDetail() {
                //保存ID
        this.productId = this.$route.params.id;//这个方法可以拿到路由传递过来的id
        //ajax获取数据
        //将数据渲染到页面上
        this.$axios
        .get(`site/goods/getgoodsinfo/${this.productId}`)
        .then(response => {
        this.goodsinfo = response.data.message.goodsinfo;
        this.hotgoodslist = response.data.message.hotgoodslist;
        this.imglist = response.data.message.imglist;

        //处理 放大镜数据
        let temArr = [];
        //循环处理数据
        this.imglist.forEach((v) => {
            temArr.push({
                id:v.id,
                url:v.original_path
            })
        })
        //临时数组
        this.images.normal_size = temArr
        });
    },
    //请求用户评论接口
    getComments() {
        this.$axios
         .get(`site/comment/getbypage/goods/${this.productId}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
        .then(response => {
            // console.log(response)
            this.comments = response.data.message;
            this.totalcount = response.data.totalcount;
            this.currentPage4 = Math.floor(this.totalcount/this.pageSize)

        });
    },
    // 当当前页发生变化时触发当前函数
          handleCurrentChange(val) {
                this.$axios
         .get(`site/comment/getbypage/goods/${this.productId}?pageIndex=${val}&pageSize=${this.pageSize}`)
        .then(response => {
            // console.log(response)
            this.comments = response.data.message;
            this.totalcount = response.data.totalcount
        });
      },

      //加入购物车的逻辑
      cartAdd() {
          //为0提示
          if(this.buyCount == 0) {
              this.$Message.error('请输入您要购买的数量');
              return;
          }
        //直接修改购物车商品数据
          this.$store.commit('addGoods', {   
              goodId: this.productId,
              goodNum: this.buyCount
          });
      }
    }, 
    watch:{
         // 监控路由的变化,当右侧推荐列表被点击时会触发当前方法
        $route() {
             // 抽取方法渲染数据

             //让数组变为空数组,if判断为false.这时再调用函数重新渲染,重新生成图片
             this.images.normal_size = [];
            this.getProductDetail();
            this.getComments()
        }
    },
    created() {
        // 渲染数据
        this.getProductDetail();
        // 请求用户评论接口
        this.getComments();
        
    },

};


</script>

<style lang='less'>
/* // 评论区的样式 */
   .tab-content p{
       margin-top: 5px;
       color: skyblue;
       font-weight: 500;
       line-height: 30px;
       padding: 0 35px;
       font-size: 18px;
    }
    .tab-content p:nth-child(1){
        margin-top: 50px;
        text-align: center
    }
   .tab-content img{
        display: block;
        width: 100%;
    }

    /* 放大镜相关样式  */
   /* 放大镜相关样式  */
.pic-box {
  width: 395px;
  .control-box .thumb-list{
      display: flex;
      justify-content: center;
      img{
          width: 80px;
          height: 80px; 
          margin: 2px;
      }
  }
  .control{
    //   text-align:center;
    display: flex;
    // 主轴
    justify-content: center;
    // 纵轴 副轴 侧轴
    align-items:center;
  }
}
    .drift-zoom-pane.drift-inline{
        width: 300px !important;
        height: 300px !important;
        border-radius: 50% !important;
    }
</style>


