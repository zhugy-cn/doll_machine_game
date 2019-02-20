import { formatDate } from './filters'

var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay(); //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
var nowYear = now.getYear(); //当前年
var dawnDay = now.setHours(0, 0, 0, 0); // 当天凌晨的时间
nowYear += (nowYear < 2000) ? 1900 : 0; //
var lastMonthDate = new Date(); //上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();

//获得某月的天数
export function getMonthDays(myMonth) {
  var monthStartDate = new Date(nowYear, myMonth, 1);
  var monthEndDate = new Date(nowYear, myMonth + 1, 1);
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}

//获得本季度的开端月份
export function getQuarterStartMonth() {
  var quarterStartMonth = 0;
  if (nowMonth < 3) {
    quarterStartMonth = 0;
  }
  if (2 < nowMonth && nowMonth < 6) {
    quarterStartMonth = 3;
  }
  if (5 < nowMonth && nowMonth < 9) {
    quarterStartMonth = 6;
  }
  if (nowMonth > 8) {
    quarterStartMonth = 9;
  }
  return quarterStartMonth;
}

function sliceStr(str) {
  return str.slice(0, -3);
}

// 获取今天开始
export function getTodayStartDate() {
  return sliceStr(formatDate(dawnDay))
}

// 获取今天结束
export function getTodayEndDate() {
  return sliceStr(formatDate(new Date().getTime()))
}


// 获取昨天开始
export function getYesterdayStartDate() {
  return sliceStr(formatDate(dawnDay - 3600 * 1000 * 24))
}

// 获取昨天结束
export function getYesterdayEndDate() {
  return sliceStr(formatDate(dawnDay))
}


//获得本周的开端日期
export function getWeekStartDate() {
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
  return formatDate(weekStartDate);
}

//获得本周的停止日期
export function getWeekEndDate() {
  var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
  return formatDate(weekEndDate);
}

//获得本月的开端日期
export function getMonthStartDate() {
  var monthStartDate = new Date(nowYear, nowMonth, 1);
  return sliceStr(formatDate(monthStartDate));
}

//获得本月的停止日期
export function getMonthEndDate() {
  var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
  return sliceStr(formatDate(monthEndDate));
}

//获得上月开端时候
export function getLastMonthStartDate() {
  var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
  return sliceStr(formatDate(lastMonthStartDate));
}

//获得上月停止时候
export function getLastMonthEndDate() {
  var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
  return sliceStr(formatDate(lastMonthEndDate));
}

//获得本季度的开端日期
export function getQuarterStartDate() {
  var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
  return formatDate(quarterStartDate);
}

//或的本季度的停止日期
export function getQuarterEndDate() {
  var quarterEndMonth = getQuarterStartMonth() + 2;
  var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
  return formatDate(quarterStartDate);
}
