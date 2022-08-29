const local = {}
/**
 *put把数据放到本地存储
 */
local.set = function (key, value) {
	window.localStorage.setItem(key, JSON.stringify(value));
};


/**
 *get获取本地存储数据
 */
local.get = function (key) {
	var obj = window.localStorage.getItem(key);
	if (obj && obj != 'undefined' && obj != 'null') {
		return JSON.parse(obj);
	}
	return '';
};


/**
 *remove清除本地数据
 */
local.remove = function (key) {
	if (key) {
		window.localStorage.removeItem(key);
	} else {
		for (var i in arguments) {
			window.localStorage.removeItem(arguments[i]);
		}
	}
};


/**
 *seek检查本地是否有值
 */
local.seek = function (name) {
	if (!name) return;
	// eslint-disable-next-line no-prototype-builtins
	return window.localStorage.hasOwnProperty(name)
}
export default local