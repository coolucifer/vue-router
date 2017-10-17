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
new Vue({
  el: '#basic',
  router: router,
});