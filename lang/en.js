/**
 * @Author Angus <angusyoung@mrxcool.com>
 * @Description Date of English words
 * @Since 2017/1/30
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	}
	else if (typeof module != 'undefined') {
		module.exports = factory();
	}
	else {
		root.enLang = factory();
	}
})(this, function () {
	return {
		years : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		days  : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		weeks : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		units : ['s', 'm', 'h', 'd', 'month', 'year'],
		now   : 'just now',
		ago   : 'ago'
	}
});