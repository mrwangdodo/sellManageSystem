/**
 * 商品请求 - 接口
 */

import req from "@/utils/request";

// 添加商品 - post
export const postOfGoodsAdd = params => req.post("/goods/goodsadd", params);

// 商品列表 - get
export const getOfGoodsList = params => req.get("/goods/goodslist", params);

// 删除商品 - get
export const getOfGoodsDel = params => req.get("/goods/goodsdel", params);

// 修改商品 - post
export const postOfGoodsEdit = params => req.post("/goods/goodsedit", params);
