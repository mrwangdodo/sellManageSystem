/**
 * 通用axios请求
 * 2019-10-23 01:23 by dodo
 */

// 引入模块
import axios from "axios";
import Qs from "qs";
// 引入本地存储工具函数
import local from "@/utils/local";
// 按需引入
import {
	Message
} from "element-ui";

// 设置默认接口地址
axios.defaults.baseURL = "http://127.0.0.1:5050"; // 后面的地址自动拼接
/* axios.create({
	baseURL: 'http://127.0.0.1:5050'
}) */

// 请求拦截器
axios.interceptors.request.use(
	config => {
		// 拦截发送的请求并操作
		let token = local.get("token");
		config.headers.Authorization = "Bearer " + token;
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

// 响应拦截器
axios.interceptors.response.use(
	response => {
		// 拦截响应的数据并操作
		// console.log(this, Message)
		let {
			code,
			msg
		} = response.data;

		switch (code) {
			case 0:
				Message({
					type: "success",
					message: msg,
					duration: 800
				});
				break;
			case 1:
				Message.error(msg);
				break;
		}

		return response;
	},
	error => {
		Promise.reject(error);
		/* token过期响应-------------------------- */
		error.response.data === "无效的token..." ? (window.location.href = "http://127.0.0.1:8080/home#/login") : error;
	}
);

// 导出的方法 get post
export default {
	get(url, params = {}) {
		return new Promise((resolve, reject) => {
			axios
				.get(url, {
					params
				})
				.then(res => resolve(res.data))
				.catch(err => reject(err));
		});
	},
	post(url, params = {}) {
		return new Promise((resolve, reject) => {
			axios
				.post(url, Qs.stringify(params))
				.then(res => resolve(res.data))
				.catch(err => reject(err));
		});
	}
};
