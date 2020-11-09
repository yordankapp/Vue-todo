import Vue from "vue";
import App from "./App.vue";
import LogIn from "./LogIn.vue";
import SignUp from "./SignUp.vue";
import ToDo from "./ToDo.vue";

import firebase from "firebase/app";
import VueRouter from "vue-router";
import "firebase/firestore";
import "firebase/auth";
import "@/assets/css/tailwind.css";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const config = {
	apiKey: "AIzaSyAUtb4ada9swIXGoTTO8TU_74-PlCI7cTM",
	authDomain: "todo-3a84a.firebaseapp.com",
	databaseURL: "https://todo-3a84a.firebaseio.com",
	projectId: "todo-3a84a",
	storageBucket: "todo-3a84a.appspot.com",
	messagingSenderId: "691597197559",
	appId: "1:691597197559:web:6768b96ff1d952dc39d3f2",
	measurementId: "G-6H1FGGD13T",
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const db = firebase.firestore();

const routes = [
	{ path: "/login", component: LogIn },
	{ path: "/signup", component: SignUp },
	{ path: "/todo", component: ToDo },
	{ path: "*", redirect: "/login" },
];

const router = new VueRouter({
	routes,
});

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
