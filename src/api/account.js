/**
 * 账号管理 - 接口
 */

import req from "../utils/request";

// 添加账号 - post请求
export const PostOfAddAcount = params => req.post("/account/accountadd", params);

// 获取列表和分页 - get请求
export const getOfAccountList = params => req.get("/account/accountlist", params);

// 单行删除 - get
export const getOfAccountdel = params => req.get("/account/accountdel", params);

// 批量删除 - get
export const getOfAccountdelbatch = params => req.get("/account/accountdelbatch", params);

// 编辑 - post
export const postOfAccountedit = params => req.post("/account/accountedit", params);

// 登录验证 - post
export const postOfLogincheck = params => req.post("/account/logincheck", params);

// 验证旧密码 - get
export const getOfCheckoldpwd = params => req.get("/account/checkoldpwd", params);

// 修改密码 - post
export const postOfPasswordedit = params => req.post("/account/passwordedit", params);

// 获取个人中心信息 - get
export const getOfPersonalInfo = () => req.get("/account/accountinfo");

// 保存用户头像 - get
export const getOfUpdateHeader = params => req.get("/account/avataredit", params);
