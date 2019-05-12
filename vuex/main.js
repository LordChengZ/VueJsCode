/*import './style.css';
document.getElementById('app').innerHTML = 'Hello webpack';*/

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

const Routers = [
	{
		path : '/index',
		meta : {
			title : '首页'
		},
		component : (resolve) => require(['./views/index.vue'], resolve)
	},
	{
		path : '/about',
		meta : {
			title : '关于'
		},
		component : (resolve) => require(['./views/about.vue'], resolve)
	},
	{
		path : '/user/:id',
		meta : {
			title : '个人主页'
		},
		component : (resolve) => require(['./views/user.vue'], resolve)
	},
	{
		path : '*',
		redirect : '/index'
	}
]

const RouterConfig = {
	mode : 'history',
	routes : Routers
}

const router = new VueRouter(RouterConfig);

// 比较理想的一个思路就是，在页面发生路由改变时，统一设置 vue-router 提供了导航钩子
// beforeEach 和 afterEach，它们会在路由即将改变前和改变后触发
// next() 没用的话，页面的不渲染
router.beforeEach((to, from, next) => {
	window.document.title = to.meta.title;
	next();
});

router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
});

const store = new Vuex.Store({
	state : {
		count : 0,
		list : [1, 5, 8, 10, 30, 50]
	},
	getters : {
		filteredList : state => {
			return state.list.filter(item => item <10);
		},
		listCount : (state, getters) => {
			return getters.filteredList.length;
		}
	},
	mutations : {
		increment (state, n = 1) {
			state.count += n;
		},
		decrease (state) {
			state.count--;
		}
	},
	actions : {
		increment (context) {
			context.commit('increment');
		},
		asyncIncrement (context) {
			return new Promise(resolve => {
				setTimeout(() => {
					context.commit('increment');
					resolve();
				}, 1000)
			});
		}
	}
});

new Vue({
	el : '#app',
	router : router,
	store : store,
	render : h => h(App)
});