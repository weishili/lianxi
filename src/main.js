import Vue from 'vue'
//导入路由
import VueRouter from 'vue-router'
// 引入主组件
import App from './App.vue'

import axios from 'axios';
//配置全局基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';
//让axios携带cookie
//跨域请求时 是否携带 凭证(cookie)
axios.defaults.withCredentials = true;
//增加到vue的原型中
Vue.prototype.$axios = axios;
//引入首页组件
import Index from './components/index.vue';
//引入商品详情组件
import Detail from './components/02productDetail.vue';
//引入购物车组件
import shoppingCart from './components/03shoppingCart.vue';
//引入登录组件
import Login from './components/04login.vue';
//引入订单页面组件
import FillOrder from './components/05fillOrder.vue';
//引入订单详情页面组件
import PayOrder from './components/06payOrder.vue';
//引入vue-lazyload懒加载插件
import VueLazyload from 'vue-lazyload';
//将懒加载插件挂载到Vue.use上
Vue.use(VueLazyload, {
  preLoad: 1.3,
  //当需要渲染的图片出错时懒加载展示的图片
  error: require('./assets/img/me.jpg'),
  //加载时图片的路径
  // loading: 'dist/loading.gif',
  //懒加载时图片需要当作模块导入
  loading:require('./assets/img/me.jpg'),
  attempt: 1
})

//注册全局过滤器
import moment from 'moment';
//注册
Vue.filter('filterDate',function(val){
  return moment(val).format('YYYY年MM月DD日');
})

// 导入放大镜
import ProductZoomer from 'vue-product-zoomer';
Vue.use(ProductZoomer);


//引入iview组件
import iView from 'iview';
import 'iview/dist/styles/iview.css';
//iView挂载
Vue.use(iView)


Vue.use(VueRouter);

// 引入element-ui组件
import ElementUI from 'element-ui';
// 引入element-ui组件样式
import 'element-ui/lib/theme-chalk/index.css';
//ElementUI挂载
Vue.use(ElementUI);

//整个 Vuex 统一进行数据管理
import Vuex from 'vuex';
Vue.use(Vuex);
//实例化一个仓库 用来保存数据
//实例化Vue的时候 也需要传入 仓库对象
const store = new Vuex.Store({
  //这里就是我们的数据
  state: {
    // cartDate:{}
       cartDate: JSON.parse(window.localStorage.getItem('goodKey')) || {},
       //是否已经登录的判断
       isLogin:false,
       //保存来时的地址
       fromPath:''

  },
  //这是暴露的修改方法
  mutations: {
    
    //增加购物车数据获取到 id以及数量
    //传入的数据是一个对象 格式}{goodId:商品id,goodNum:数量}
    addGoods(state,goodInfo) {      
      // console.log(goodInfo)//goodInfo存了点击购物车时传过来的id和数量
      //保存数据[]只有中括号对象取值才可以传入变量 用.语法是固定的属性名
        //  console.log(state.cartDate[goodInfo.goodId])
      if(state.cartDate[goodInfo.goodId] == undefined) {
        //传过来的id 不存在新增这个id作为属性 
        //直接增加这个属性即可
        //为了要让Vue检测到数据的改变同步修改页面显示 需要调用Vue.set方法
        Vue.set(state.cartDate,goodInfo.goodId,goodInfo.goodNum);
      }else {
        //传过来的id 已经存在 累加
        state.cartDate[goodInfo.goodId] += goodInfo.goodNum;
        // console.log(state.cartDate[goodInfo.goodId] += goodInfo.goodNum)
      }
    },
    //额外的增加一个修改的方法
    //逻辑是 直接把传入的 数量 替换掉 默认的数量
    //格式约定 格式(goodId 商品id,goodNum:数量)
    updateGoodsNum(state,goodInfo) {
      //直接替换即可
      state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
    },
    //额外增加一个删除的方法
    //goodId就是 商品的id
    deleteGoods(state,goodId) {
      //如何删除对象中的属性
      //delete 删除对象中的属性 
      //delete state.cartDate[goodId]
      //delete 删除的属性不会触发试图更新
      //需要手动调用Vue.delete方法才可以
      Vue.delete(state.cartDate,goodId)
    },
    // 改变头部登录的状态
    changeLoginStatus(state,isLogin) {
      state.isLogin = isLogin
    },
    saveFromPath(state,fromPath) {
      state.fromPath = fromPath;
    }
  },
  //getters vuex 计算属性
  getters: {
    goodsCount: state => {
      //临时num
      let num = 0;
      //循环数据对象
      for(const key in state.cartDate) {
        num += state.cartDate[key]
      }
      //累加总数
      //返回总数
      return num;
    }
  }
})

// 浏览器页面关闭(刷新时)保存到localStorage中
window.onbeforeunload = function(){
  window.localStorage.setItem('goodKey',JSON.stringify(store.state.cartDate))
  // window.localStorage.setItem('goodKey',JSON.stringify(cartDate))
}


//定义路由规则
let routes = [
  {
    //配置根路径
    path:'/',
    //redirect是重定向到index页面
    redirect:'/index'
  },
  { 
    path: '/index',
    //这个component组件是首页组件,
    component: Index
  },
  {
    //详情页面的路由组件  
    path:'/detail/:id',
    component: Detail

  },
 // 购物车页面的路由组件
  {
      path:'/cart',
     component:shoppingCart
  },
  //登录页面的路由组件
  {
    path:'/login',
    component:Login
  },
  //配置订单页面的路由组件
  {
    path:'/order/:ids',
    component:FillOrder,
    // 路由元信息 可以随意加
    meta: {
      checkLogin:true
    }
  },
  //配置订单详情页面的路由组件
  {
     path:'/payOrder/:orderid',
     component:PayOrder,
     //路由元信息,相当于一个标识符在路由守卫中可以直接判断当前路由是否携带路由元信息判单是否
    //  执行路由间的跳转
    meta:{
      checkLogin: true
    }
  }
 

]

//实例化路由对象
let router = new VueRouter({
  routes
})

//增加 导航守卫 (路由守卫)
router.beforeEach((to,from,next) =>{
    //如果访问的是 order页面 判断登录
    //每次过来都保存一下来时的地址
    //提交载荷保存数据
    store.commit('saveFromPath',from.path)
  // 因为判断登录状态不只是订单页面需要做判断,很多页面页需要做判断,所以这里不能写死
  //使用路由元信息作为标识符,携带元信息的页面都做登录判断
  if(to.meta.checkLogin == true) {
    axios
    .get('/site/account/islogin').then(response => {

        if(response.data.code != 'nologin') {
            next()        
        }else{ 
          // 没有登录打回登陆页面
          next('/login')
        }
    })
}else{
    next()
}

})


  


// 挂在到 Vue示例上面

Vue.config.productionTip = false

new Vue({
  el:"#app",
  render: h => h(App),
  router,
  store,
  //因为我的登录状态默认是false,直到是登录只够才会变成true但是页面重新刷新时并不会触发登录判断
  //所以所以这里手动发起判断是否登录的请求,
  beforeCreate() {
    axios.get('/site/account/islogin')
    .then(response => {
      if(response.data.code == 'logined') {
        //登录成功
        store.state.isLogin = true;
      }//否则没有登录默认就是false
    })
  }
})
