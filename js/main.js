var routes = [{
    path: '/',
    component: {
      template: `
    <div>
      <h1>Home</h1>
    </div>
    `
    },
  },
  {
    path: '/login',
    component: {
      template: `
    <div>
      <h1>Login</h1>
    </div>
    `
    },
  },
  {
    path: '/user',
    components: {
      sidebar: {
        template: `
        <div>
        <ul>
        <li>用户列表</li>
        <li>权限管理</li>
        </ul>
        </div>
        `
      },
      content: {
        template: `
          <div>
          loremmsiouroawjhoaigyiuarwerfsdklfjeowiur
          </div>
        `
      }
    }
  },
  {
    path: '/post',
    meta:{
      //需要登录
      login_required:true,
    },
    components: {
      more: {
        template: `
        <div>
        <router-link :to="'/post/rain'">rain</router-link>
        <router-view></router-view>
        </div>
        `,
      },
      sidebar: {
        template: `
        <div>
        <ul>
        <li>帖子列表</li>
        <li>标签管理</li>
        </ul>
        </div>
        `
      },
      content: {
        template: `
          <div>
          loremmsiouroawjhoaigyiuarwerfsdklfjeowiur
          </div>
        `
      }
    },
    children: [{
      path: 'rain',
      component: {
        template: `
          <div>
          <h2>下雨啦收衣服啦!</h2>
          </div>
          `
      }
    }]
  },
  {
    path: '/about',
    component: {
      template: `
    <div>
      <h1>About</h1>
    </div>
    `
    },
  },
  {
    //第一种more的方法是在地址后面直接append一个'/more',点击多次添加多个more
    //第二种是跳转到'/more'页面
    path: '/user/:name',
    name: 'user',
    component: {
      template: `
    <div>
      <h1>我叫:{{$route.params.name}}</h1>
      <h1>我今年:{{$route.query.age}}岁</h1>
      <router-link to="more" append>More</router-link>
      <router-view></router-view>
      <router-link :to="'/user/'+$route.params.name+'/more'">More</router-link>
      <router-view></router-view>
    </div>
    `
    },
    children: [{
      path: 'more',
      component: {
        template: `
        <div>
          用户:{{$route.params.name}}的详细信息
          loremfjaieoruejfsoifu
        </div>
        `
      }
    }]
  },
];

var router = new VueRouter({
  routes: routes,
});

router.beforeEach(function (to, from, next) {
  var logged_in = true;
  // if (!logged_in && to.path == '/post') {
  if (!logged_in && to.matched.some(function (item) {
      return item.meta.login_required;
    })) {
    next('/login');
  } else {
    next();
  }
});

router.afterEach(function (to, from) {});

new Vue({
  el: '#basic',
  router: router,
  methods: {
    surf: function () {
      setTimeout(function () {
        this.router.push('/about');
        setTimeout(function () {
          //name:user 表示路由的名称叫user
          this.router.push({
            name: 'user',
            params: {
              name: '王花花',
            }
          });
        }, 2000);
      }, 2000)
    }
  }
});