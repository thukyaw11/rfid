import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter); 


const routes = [

  {
    path: "/team",
    name: "team",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Update.vue")
  },
  
];

const router = new VueRouter({
  routes
});

export default router;