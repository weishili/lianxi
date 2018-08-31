<template>
<div>
  <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <el-form :model="orderForm" :rules="rules" ref="orderForm" label-width="100px" class="demo-ruleForm">
                                    <!-- 表单验证 -->
                                    <el-form-item label="活动名称" prop="accept_name">
                                       <el-input v-model="orderForm.accept_name" style="width:600px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区" prop="">
                                       <v-distpicker 
                                       @selected="selected"
                                       :province="orderForm.area.province.value" 
                                       :city="orderForm.area.city.value" 
                                       :area="orderForm.area.area.value"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address">
                                       <el-input v-model="orderForm.address" style="width:600px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile">
                                       <el-input v-model="orderForm.mobile" style="width:600px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮件" prop="email">
                                       <el-input v-model="orderForm.email" style="width:600px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" prop="post_code">
                                       <el-input v-model="orderForm.post_code" style="width:150px"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio v-model="orderForm.payment_id" label="6">在线支付</el-radio>
                                        <span style="color:#666">手续费:0.00元</span>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <el-radio @change="expressChange(20)" v-model="orderForm.express_id" label="1">顺丰快递(20元)</el-radio>
                                    <el-radio @change="expressChange(10)" v-model="orderForm.express_id" label="2">顺丰快递(10元)</el-radio>
                                    <el-radio @change="expressChange(8)" v-model="orderForm.express_id" label="3">顺丰快递(8元)</el-radio>
                             
                                    
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <!-- 商品清单 -->
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in commodityList" :key="item.id">
                                        <td width="78">
                                            <router-link :to="/detail/+item.id"> 
                                                <img width="68"  :src="item.img_url" style="margin-left:15px">
                                            </router-link>                                     
                                        </td>
                                        <td>
                                            <router-link :to="/detail/+item.id">{{item.title}}</router-link>

                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.totalamount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea name="message" v-model="orderForm.message" class="input" style="height:140px; width:400px; resize:none" ></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{orderForm.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{goodsAmount}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" href="/cart.html">返回购物车</a>
                                        <a id="btnSubmit" @click="sureOrder" class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
</div>
</template>
<script> 
//省市联动
import VDistpicker from 'v-distpicker'
export default { 
    //省市联动
     components: { VDistpicker },
    name:'order',
 

    data:function() {
        // 手机验证
    var checkMobile = (rule, value, callback) => {
        setTimeout(() => {
           let exec =  /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
          if (exec.test(value)==true) {
                callback();  
          } else {    
           callback(new Error('您的手机号不正确'));
          }
        }, 300);
    };        // 邮箱验证
    var checkEmail = (rule, value, callback) => {
        //如果value 不为空 格式验证
        if( value.trim().length != 0) {
            let exec = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
            if(exec.test(value.trim()) == true) {
                callback()
            }else{
                callback(new Error('邮箱格式错误'))
            }
        }else{
                callback()
            
        }
      };       // 邮编验证
      
    var checkpostCode = (rule, value, callback) => {
        //如果value 不为空 格式验证
        if( value.trim().length != 0) {
            let exec = /^[1-9]\d{5}(?!\d)$/
            if(exec.test(value.trim()) == true) {
                callback()
            }else{
                callback(new Error('邮编格式错误'))
            }
        }else{
                callback()
            
        }
      };
        return {
            productId:undefined,//商品id

            commodityList:[],//购买商品清单信息
            commoditytotal:'',
            // 绑定element-ui表单中需要验证的匹配项
            orderForm: {
            accept_name:'魏斯理',//收货人
            address:'最接近天堂的地方',//收获地址
            mobile:'15986587323',//手机号码
            email:'389964145@qq.com',//邮箱
            post_code:'441424',//收货人邮编
            payment_id:'6',//支付方式
            express_id:"1",//快递方式
            expressMoment:20,//快递费用
            goodsids:'',//购买商品的id
            cargoodsobj: {}, // 购买的商品 id 跟件数的关系
            goodsAmount:0,//总金额
            message:'关关难过关关过!',
            // 当前选择的省市
             area: {
                 province: { code: "440000", value: "广东省" },
                 city: { code: "440300", value: "深圳市" },
                 area: { code: "440306", value: "宝安区" }
             },
            },
            rules: {
                // 匹配项中的收货人的匹配规则
                 accept_name: [
                     { required: true, message: '请输入收件人姓名', trigger: 'blur' },
                     { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'change' }
                      ],
                    //   手机号码
                mobile:[
                     { validator: checkMobile, trigger: 'blur' }
                ],
                // 邮箱
                 email:[
                     { validator: checkEmail, trigger: 'blur' }              
                ],
                // 邮编
                post_code:[
                     { validator: checkpostCode, trigger: 'blur' }              
                ],
            } 
        }
    },

    methods: {
        // 选择的支付方式
     paymentAmountTotal() {

     },
    //  选择的快递
     freightAmountTotal() {

     },
    //   element-ui表单验证插件
     resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    //   绑定省市联动方法
    selected(value) {
        this.orderForm.area= value
    },
    // 绑定选择快递方法
    expressChange(price) {
        this.orderForm.expressMoment= price;
    },
// 点击提交按钮
    sureOrder() {
            console.log(this.orderForm)
            this.$axios
            .post('site/validate/order/setorder',this.orderForm)
            .then(response => {
                // 去到查看订单页面
                let orderid = response.data.message.orderid;
                console.log(response)
                this.$router.push('/payOrder/'+orderid)
                // 新开页面跳转
                //  let routeData = this.$router.resolve({path:'/payOrder/'+orderid});
                // window.open(routeData.href, '_blank');
            })
    }
    },
       created() {
           //保存goodsids
           this.orderForm.goodsids = this.$route.params.ids;
               // 因为后台没有传购买数量,所以从Vuex中取
           let cartDate = this.$store.state.cartDate;

              this.$axios                            //通过this.$route.params.ids获取到路由传递过来的id
              .get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
              .then(response => {
                //   将后台返回的数据赋值给商品清单列表
                  this.commodityList = response.data.message
                    // 把从Vuex中获取的单品总数赋值给商品清单中的buycont中
                    // 准备 商品id 对象
                    let cargoodsobj = {};
               this.commodityList.forEach(v => {
                   //服务器返回的buycount默认为1,要从vuex中获取到duycount的数量
                    v.buycount = cartDate[v.id]
                    // 因为服务器返回的单品总价和单价一样所以重新赋值单品总价;
                    v.totalamount = v.totalamount*cartDate[v.id]
                    cargoodsobj[v.id] = v.buycount
                    //设置$set保证视图同步;
                 this.$set(v, "buycount", v.buycount);             
                });
                //添加到 orderForm 中
                this.orderForm.cargoodsobj = cargoodsobj;
                   })


       },
    //    计算属性
       computed: {
           //商品总价格
           totalPrice() {
               let totalPrice = 0;
               this.commodityList.forEach(v => {
                  totalPrice = totalPrice+=v.totalamount
               })
                return totalPrice
           },
        //    总数量
        totalCount() { 
            let totalCount = 0;
            this.commodityList.forEach(v => {
             totalCount = totalCount+=v.buycount
            })
            return totalCount
        },
        //加上运费的商品总价格
        goodsAmount() {
               let totalPrice = 0;
               this.commodityList.forEach(v => {
                  totalPrice = totalPrice+v.totalamount
               })
               this.orderForm.goodsAmount = totalPrice+this.orderForm.expressMoment
               return totalPrice+this.orderForm.expressMoment
        }
       }
}
</script>
<style>

</style>


