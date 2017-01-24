/**
 * @Author Angus <angusyoung@mrxcool.com>
 * @Description JavaScript Date Format
 * @Since 2017/1/24
 */

'use strict';

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	}
	else if (typeof module != 'undefined') {
		module.exports = factory();
	}
	else {
		root.dateFormat = factory();
	}
})(this, function () {
	/**
	 * @param dDate 日期数据
	 * @param sPattern 格式字符串
	 */
	function mDateFormat(dDate, sPattern) {
		// 年
		sPattern = sPattern.replace(/y+/g, function (s) {
			var _year = dDate.getFullYear().toString();
			return _year.substr(_year.length - s.length, s.length);
		});
		sPattern = sPattern.replace(/Y+/g, function (s) {
			var _cyear = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
			var _year = dDate.getFullYear().toString();
			_year = _year.replace(/\d/g, function (s) {
				return _cyear[s];
			});
			return _year.substr(_year.length - s.length, s.length);
		});

		// 月
		sPattern = sPattern.replace(/m+/g, function (s) {
			var _month = (dDate.getMonth() + 1).toString();
			if (s.length > 1) {
				return _month.length === 1 ? '0' + _month : _month;
			}
			else {
				return _month;
			}
		});

		// 日
		sPattern = sPattern.replace(/d+/g, function (s) {
			var _day = dDate.getDate().toString();
			if (s.length > 1) {
				return _day.length === 1 ? '0' + _day : _day;
			}
			else {
				return _day;
			}
		});

		// 时
		sPattern = sPattern.replace(/H+/g, function (s) {
			var _hour = dDate.getHours().toString();
			if (s.length > 1) {
				return _hour.length === 1 ? '0' + _hour : _hour;
			}
			else {
				return _hour;
			}
		});
		sPattern = sPattern.replace(/h+/g, function (s) {
			var _hour = dDate.getHours();
			_hour = (_hour > 12 ? _hour - 12 : _hour).toString();
			if (s.length > 1) {
				return _hour.length === 1 ? ('0' + _hour) : _hour;
			}
			else {
				return _hour;
			}
		});

		// 分
		sPattern = sPattern.replace(/M+/g, function (s) {
			var _minute = dDate.getMinutes().toString();
			if (s.length > 1) {
				return _minute.length === 1 ? '0' + _minute : _minute;
			}
			else {
				return _minute;
			}
		});

		// 秒
		sPattern = sPattern.replace(/s+/g, function (s) {
			var _second = dDate.getSeconds().toString();
			if (s.length > 1) {
				return _second.length === 1 ? '0' + _second : _second;
			}
			else {
				return _second;
			}
		});

		// 周
		sPattern = sPattern.replace(/w/g, function () {
			var _cweek = ['日', '一', '二', '三', '四', '五', '六'];
			var _week = dDate.getDay();
			return _cweek[_week];
		});

		// 之前
		sPattern = sPattern.replace(/L(\d)?(?:-([^L]*))?$/g, function (sStr, $1, $2) {
			// L(\d)?(?:-([^L]*))?
			var dNow = new Date().getTime();
			var dTime = dDate.getTime();
			var nTimeDiff = dNow - dTime;

			var aUnit = ['秒', '分钟', '小时', '天', '月', '年'];
			var aClock = [1000, 60, 60, 24, 30, 12].slice(0, parseInt($1 || 5, 10) + 1);
			// console.log(aClock)
			var oTime = {
				time: mDateFormat(dDate, $2 || 'yyyy/mm/dd'),
				unit: ''
			};

			for (var i = 0; i < aClock.length; i++) {
				nTimeDiff = Math.floor(nTimeDiff / aClock[i]);
				// console.log('==', nTimeDiff, aUnit[i]);
				// console.log(aClock[i + 1]);
				if (nTimeDiff < (aClock[i + 1] || 999999)) {
					oTime = {
						time: nTimeDiff,
						unit: aUnit[i]
					};
					break;
				}
			}

			return oTime.time + (oTime.unit ? oTime.unit + '前' : '');
		});
		return sPattern;
	}

	return mDateFormat;
});