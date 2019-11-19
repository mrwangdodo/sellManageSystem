/**
 * 店铺请求 - 接口
 */

import req from "@/utils/request";

// 获取店铺数据 - get
export const getOfShopInfo = () => req.get("/shop/shopinfo");

// 保存修改 - post
export const postOfShopEdit = params => req.post("/shop/shopedit", params);
