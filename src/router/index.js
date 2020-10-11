import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Game from "../views/Game.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: "Home",
    // component: Home
    name: "Game",
    component: Game
  },
  {
    path: "/:room",
    name: "Lobby",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Lobby.vue")
  },
  // {
  //   path: "/:room/game",
  //   name: "Game",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ "../views/Game.vue")
  // },
  {
    path: "*",
    component: Home
    // Probably also want to set showCreate and showJoin to false
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
