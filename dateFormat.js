/*!*
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
		var _factory = factory();
		root.dateFormat = _factory.dateFormat;
		root.setLang = _factory.lang;
	}
})(this, function () {

	var oLangDict = {
		years : ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
		months: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
		days  : ['十', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
		weeks : ['日', '一', '二', '三', '四', '五', '六'],
		units : ['秒', '分钟', '小时', '天', '个月', '年'],
		now   : '刚刚',
		ago   : '前'
	};

	function setLang(oLang) {
		oLangDict = oLang;
	}

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
		sPattern = sPattern.replace(/Y{2,4}/g, function (s) {
			var _year_array = oLangDict.years;
			var _year = dDate.getFullYear().toString();
			if (s.length === 3) {
				return s;
			}
			else {
				_year = _year.replace(/\d/g, function (s) {
					return _year_array[s];
				});
				return _year.substr(_year.length - s.length, s.length);
			}
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
		sPattern = sPattern.replace(/M{4}/g, function () {
			var _month = dDate.getMonth().toString();
			var _month_array = oLangDict.months;
			return _month_array[_month];
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
		sPattern = sPattern.replace(/D{4}/g, function () {
			var _day = dDate.getDate().toString();
			var _day_array = oLangDict.days;
			if (_day.length > 1) {
				var _day_split = _day.split('');
				var _cn_day = _day_array[0] + (_day_split[1] == '0' ? '' : _day_array[_day_split[1]]);
				if (_day_split[0] != '1') {
					_cn_day = _day_array[_day_split[0]] + _cn_day;
				}
				return _cn_day;
			}
			else {
				return _day_array[_day];
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
		sPattern = sPattern.replace(/w/gi, function () {
			var _week_array = oLangDict.weeks;
			var _week = dDate.getDay();
			return _week_array[_week];
		});

		// 之前
		sPattern = sPattern.replace(/L(\d)?(?:-([^L]*))?$/g, function (sStr, $1, $2) {
			// L(\d)?(?:-([^L]*))?
			var dNow = new Date().getTime();
			var dTime = dDate.getTime();
			var nTimeDiff = dNow - dTime;

			var aClock = [1000, 60, 60, 24, 30, 12, 2];
			// 单位比时间范围少一项，因为在最后一项的时候将会显示具体时间不需要加单位
			var aUnit = oLangDict.units;
			var aEqClock = aClock.slice(0, parseInt($1 || 5, 10) + 1);
			// console.log(aEqClock);
			var oTime = {
				time: mDateFormat(dDate, $2 || 'yyyy/mm/dd'),
				unit: ''
			};

			if (nTimeDiff >= 0 && nTimeDiff < 999) {
				return oLangDict.now;
			}
			else if (nTimeDiff > 999) {
				for (var i = 0; i < aEqClock.length; i++) {
					nTimeDiff = Math.floor(nTimeDiff / aEqClock[i]);
					// console.log('=> %s%s\n   下一级别单位【%s】换算值：%s', nTimeDiff, aUnit[i], aUnit[i + 1], aClock[i + 1]);
					if ((nTimeDiff < aEqClock[i + 1])) {
						oTime = {
							time: nTimeDiff,
							unit: aUnit[i]
						};
						break;
					}
				}
			}

			return oTime.time + (oTime.unit ? oTime.unit + oLangDict.ago : '');
		});

		return sPattern;
	}

	return {
		dateFormat: mDateFormat,
		lang      : setLang
	};
});