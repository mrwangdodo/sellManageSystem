/**
 * 订单请求 - 接口
 */

import req from "@/utils/request";

// 订单列表 - get
export const getOfOrderlist = params => req.get("/order/orderlist", params);

// 修改订单 - post
export const getOfOrderedit = params => req.post("/order/orderedit", params);

// 获取订单报表统计 - get
export const getOfOrderTotal = params => req.get("/order/ordertotal", params);

// 获取报表接口 - get
export const getOfIndexcharts = params => req.get("/order/indexcharts", params);