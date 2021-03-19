var util = {
	R: function R() {
		return parseInt(Math.random() * 1000);
	},
	formatDateTime: function formatDateTime(d, pattern) {
		if (!d) return "";
		if (typeof d != "object") {
			if (/[TZ]/.test(d) == false && /[-]/.test(d)) {
				// 考虑到浏览器兼容性问题，将yyyy-MM-dd转换成yyyy/MM/dd的格式再进行new Date
				d = d.replace(/-/g, '/');
			}
			d = new Date(d);
		}
		pattern = pattern || 'yyyy/MM/dd';
		var y = d.getFullYear().toString(),
			o = {
				M: d.getMonth() + 1,
				d: d.getDate(),
				h: d.getHours(),
				m: d.getMinutes(),
				s: d.getSeconds()
			};
		pattern = pattern.replace(/(y+)/ig, function (a, b) {
			return y.substr(4 - Math.min(4, b.length));
		});
		for (var i in o) {
			pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function (a, b) {
				return (o[i] < 10 && b.length > 1) ? '0' + o[i] : o[i];
			});
		}
		return pattern;
	},
	F: function F(d, pattern) {
		return util.formatDateTime(d, pattern);
	},
	transDateFromLocale: function transDateFromLocale(localeDate) {
		if (!localeDate) return '';
		if (typeof localeDate == "string") {
			if (/[TZ]/.test(localeDate) == false) localeDate = localeDate.replace(/-/g, '/');
			localeDate = new Date(localeDate);
		}
		// toISOString() 方法可以使用ISO标准将 Date 对象转换为字符串。
		// 该标准称为 ISO-8601 ，格式为: YYYY-MM-DDTHH:mm:ss.sssZ
		return localeDate.toISOString();
	},
	getXYItem: function getXYItem(data) {
		var r = [];
		data.forEach(function (item) {
			// item.dataDate = item.dataDate.replace(/-/g, "/");
			r.push([new Date(item.dataDate).getTime(), Number(item.dataValue)]);
		});
		return r;
	},
	midnight(d) {
		return d ? util.F(d) + ' 00:00:00' : '';
	},
	str2Date(d) {
		if (!d) return;
		if (typeof d != 'object') return new Date(d);
		return d;
	},
	firstDayByWeek(d) {
		var _now = util.str2Date(d) || new Date;
		var _day = _now.getDay();
		var offsetDay = ((_day == 0 ? 7 : _day) - 1);
		return util.midnight(new Date(_now.getTime() - offsetDay * 24 * 60 * 60 * 1000));
	},
	firstDayByMonth(d) {
		var _now = util.str2Date(d) || new Date;
		return util.midnight(new Date(_now.getFullYear(), _now.getMonth(), 1));
	},
	firstDayByYear(d) {
		var _now = util.str2Date(d) || new Date;
		return util.midnight(new Date(_now.getFullYear(), 0, 1));
	},
	looseJsonParse(obj, data) {
		return Function('"use strict";return (' + obj + ')').call(data);
	}
};
// 封装jsonp
window.axios.jsonp = (url) => {
	if (!url) {
		console.error('Axios.JSONP 至少需要一个url参数!')
		return;
	}
	return new Promise((resolve, reject) => {
		window.jsonCallBack = (result) => {
			resolve(result)
		}
		var JSONP = document.createElement("script");
		JSONP.type = "text/javascript";
		JSONP.src = `${url}&callback=jsonCallBack`;
		document.getElementsByTagName("head")[0].appendChild(JSONP);
		setTimeout(() => {
			document.getElementsByTagName("head")[0].removeChild(JSONP)
		}, 500)
	})
}
var finishRequestNum = 0;
var zIndex = 100;
// 定时获取HT-sid的标识
var timerByGetSid = null;
// 获取URL参数
function getParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return null;
}
/**
 * 截流函数
 */
function throttle(fn, wait) {
	// 定义定时器
	var timer;
	return function () {
		// 如果定时器不存在，则执行定时，并保存定时器
		if (!timer) {
			// 执行定时，并保存定时器
			timer = setTimeout(function () {
				return timer = null;
			}, wait);
			// 返回函数执行结果

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return fn.apply(this, args);
		}
	};
}
/**
 * 是否为测试环境
 */
function isTesting() {
	var ipList = ['0.0.0.0', 'web.haocang.com', 'localhost'];
	return R.any(R.equals(htconfig.Default.host))(ipList);
}
/**
 * 获取环境API
 * @param {*} url api的地址
 */
function envApi(url) {
	return (isTesting() ? '/mango' : '') + url;
}
/**
 * 循环
 */
function loop(fn) {
	return function loopBy(interval) {
		var timer = setTimeout(function task() {
			if (timer) {
				timer = clearTimeout(timer);
			}
			fn();
			timer = setTimeout(task, interval);
		});
	};
}
// var host = "http://192.168.2.135:8000";
var stompClient = null;
var subscription = null;
var reconnectCount = 0;
var idArr = [], mpointCache = {};
var websocketAddress = "/websocket"
function createdMpointMap(hasCurves) {
	// 获取图纸中绑定的测点id
	dataModel.each(function (data) {
		// 获取测点id
		// if - 如果id存在，说明是拖拽上去的测点；
		// else - 如果不存在id，说明是绑定上去的值；
		var id = data.a('id');
		var dataBindings = data.getDataBindings();
		if (id) {
			if (dataBindings && dataBindings.s && dataBindings.s.text) {
				var currentMap = {};
				currentMap["s:text"] = data
				if (mpointCache[id]) {
					mpointCache[id].push(currentMap);
				} else {
					idArr.push(id)
					mpointCache[id] = [currentMap];
				}
			}
		} else {

			if (dataBindings) {
				for (var prop in dataBindings) {
					for (var name in dataBindings[prop]) {
						var bindAttr = dataBindings[prop][name];
						if (bindAttr && bindAttr.id) {
							var currentMap = {};
							currentMap[prop + ":" + name] = data
							if (mpointCache[bindAttr.id]) {
								mpointCache[bindAttr.id].push(currentMap);
							} else {
								idArr.push(bindAttr.id)
								mpointCache[bindAttr.id] = [currentMap];
							}
						}
					}
				}
			}
		}
	});
	// 如果没有绑定的测点，则不发送请求，反之发送post请求
	
	if (idArr.length == 0) {
		connect()
		return;
	} else {
		// 调用获取实时值接口
		getInitMpointData(hasCurves);
	}
}
function getInitMpointData(hasCurves) {
	var api = envApi('/loong/api/mpoints/value');
	var CancelToken = window.axios.CancelToken;
	var source = CancelToken.source();
	var request = window.axios.post(api, { ids: idArr.join(',') }, { headers: { 'Content-Type': 'application/json' }, cancelToken: source.token });
	request.then(function (res) {
		finishRequestNum++;
		// 所有测点集合
		var points = res.data;
		// 通过测点id提取对象组成hashMap
		res.data.forEach(function (ele) {
			setMpointValue(ele);
		})
		if (hasCurves) {
			if (finishRequestNum > 1) {
				connect(hasCurves)
			}
		} else {
			connect()
		}
	}).catch(function (err) {
		if (hasCurves) {
			if (finishRequestNum > 1) {
				connect(hasCurves)
			}
		} else {
			connect()
		}
		messageTip(err)
		if (window.axios.isCancel(err)) {
			console.log('请求强制取消', err.message);
			source.cancel();
		} else {
			console.log('其他错误', err.message);
		}
	});
}
// 超过千位加千分位，超过百万，换算单位“万”
function handleMpointValue(value) {
	if (!value) {
		return ""
	}
	if (isNaN(Number(value))) {
		return value;
	}
	var unit = "";
	var arr = value.toString().split(".");
	if (arr[0].length >= 7) {
		unit = "万"
		value = Math.round(value / 10000 * 100) / 100;
		arr = value.toString().split(".")
	}
	var integer = Number(arr[0]).toLocaleString();
	if (arr[1]) {
		return integer + "." + arr[1] + unit
	} else {
		return integer + unit
	}
}
function setMpointValue(point) {
	var databindingArr = mpointCache[point.id]
	if (databindingArr) {
		databindingArr.forEach(function (obj) {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					var currentData = obj[key];
					var attrArr = key.split(":")
					var func = null;
					var bindingsObj = currentData.getDataBindings()
					if (bindingsObj && bindingsObj[attrArr[0]] && bindingsObj[attrArr[0]][attrArr[1]]) {
						func = bindingsObj[attrArr[0]][attrArr[1]].func;
					}
					var text = point.value;
					var convertedValue = handleMpointValue(text);
					if (func) {
						convertedValue = func(convertedValue, text)
					}
					if (attrArr[0] == "p") {
						currentData[ht.Default.setter(attrArr[1])](convertedValue)
					} else {
						currentData[attrArr[0]](attrArr[1], convertedValue);
					}
					// 调用图纸中的动画函数
					if (typeof currentData.a("animate.func") == "function") {
						currentData.a("animate.func")(currentData);
					}
				}
			}
		})
	}
}
function reconnect(hasCurves) {
	console.log(new Date() + '：重连中...')
	var socket = new SockJS(websocketAddress);
	stompClient = Stomp.over(socket);
	stompClient.debug = function (str) { };

	// stompClient.heartbeat.outgoing = 1000;
	// stompClient.heartbeat.incoming = 1000;
	stompClient.connect({}, function (frame) {
		reconnectCount = 0;
		console.log('Connected:' + frame);
		setTimeout(function () {
			subscribe()
		}, 5000);
		if (hasCurves && curvesMpointIdArr.length) {
			setTimeout(function () {
				subscribeCurves(curvesMpointIdArr.join(","))
			}, 5000);
		}
		if (!dataModel._attrObject) {
			dataModel._attrObject = {}
		}
		var isReceivingAlarm = dataModel._attrObject.isReceivingAlarm
		if (!fromApp && isReceivingAlarm) {
			receiveAlarmFunc()
		}
	}, function (frame) {
		reconnectCount++
		if (reconnectCount == 10) {
			messageTip({
				response: { data: { title: "websocket连接失败" } }
			})
		} else {
			setTimeout(function () {
				reconnect(hasCurves);
			}, 5000)
		}
	});
}
function connect(hasCurves) {
	var socket = new SockJS(websocketAddress);
	stompClient = Stomp.over(socket);
	stompClient.debug = function (str) { };
	// stompClient.heartbeat.outgoing = 1000;
	// stompClient.heartbeat.incoming = 1000;
	stompClient.connect({}, function (frame) {
		reconnectCount = 0;
		console.log('Connected:' + frame);
		setTimeout(function () {
			subscribe()
		}, 5000);
		if (hasCurves && curvesMpointIdArr.length) {
			setTimeout(function () {
				subscribeCurves(curvesMpointIdArr.join(","))
			}, 5000);
		}
		if (!dataModel._attrObject) {
			dataModel._attrObject = {}
		}
		var isReceivingAlarm = dataModel._attrObject.isReceivingAlarm
		if (!fromApp && isReceivingAlarm) {
			receiveAlarmFunc()
		}
	}, function (frame) {
		setTimeout(function () {
			reconnect(hasCurves);
		}, 5000)
	});
}
function disconnect() {
	if (stompClient != null) {
		stompClient.disconnect();
	}
}
function subscribe() {
	if (idArr.length==0){
		return false
	}
	window.axios.get(envApi("/loong/api/mpoint-datas/subscription?ids=" + idArr.join(','))).then(function (result) {
		subscription = stompClient.subscribe(result.data.topic, function (response) {
			var point = JSON.parse(response.body);
			try {

			} catch (e) {
			}
			setMpointValue(point)
		})
	}).catch(function (err) {
		messageTip(err)
	});
}

function unsubscribe() {
	subscription.unsubscribe();
}
// 订阅曲线
var subscription2 = null;
function subscribeCurves(mpointIds) {
	window.axios.get(envApi("/loong/api/mpoint-datas/subscription?ids=" + mpointIds)).then(function (result) {
		subscription2 = stompClient.subscribe(result.data.topic, function (response) {
			var data = JSON.parse(response.body);
			try {

			} catch (e) {
			}
			setCurvesData(data);
		})
	}).catch(function (err) {
		messageTip(err)
	});
}
// 获取HT服务的权限——sid
function getSid() {
	window.axios.get(envApi("/uaa/api/ht/sid")).then(function (res) {
		var sid = res.data;
		sessionStorage.setItem("htEditor.sid", sid);
	}).catch(function (err) {
		messageTip(err)
	});
}
/**
 *  字符串转对象，传入默认值
 */
function string2object(defaults) {
	return R.tryCatch(JSON.parse, R.always(defaults));
}
/**
 *  字符串转array
 */
function string2array(str) {
	return string2object([])(str);
}
/**
 *  按照每一项的id重组json对象 
 */
function indexById(list) {
	return R.indexBy(R.prop('id'))(list);
}
// 显示加载遮罩
function showLoading() {
	document.querySelector(".loading-mask").style.display = 'block';
}
// 隐藏加载遮罩
function hideLoading() {
	document.querySelector(".loading-mask").style.display = 'none';
}
function addScript(src,callback) {
	let script = document.createElement("script");
	script.type = "text/javascript";
	script.src = src;
	script.onload =function(){
		callback()
	}
	let head = document.getElementsByTagName("head");
	if (head.length) {
		head[0].appendChild(script);
	} else {
		document.documentElement.appendChild(script);
	}
	return script;
}
function addLink(linkUrl) {
	let style = document.createElement("link");
	style.rel = "stylesheet"
	style.href = linkUrl;
	let head = document.getElementsByTagName("head");
	if (head.length) {
		head[0].appendChild(style);
	}
}
var fromApp;
function load() {
	fromApp = getParam("fromApp") == "true" || location.hash == "#fromApp";
	// 请求websocket地址
	window.axios.get(envApi("/uaa/api/websocket/address")).then(function (res) {
		if (res.data) {
			websocketAddress = res.data + "/websocket"
		}
	}).catch(function (err) {
		messageTip(err)
	});
	var callback = function () {
		window.axios.get(envApi("/uaa/api/ht/sid")).then(function (res) {
			var sid = res.data;
			if (timerByGetSid) {
				clearInterval(timerByGetSid);
			}
			timerByGetSid = setInterval(function () {
				getSid();
			}, 5 * 60 * 1000);
			sessionStorage.setItem("htEditor.sid", sid);
			init();
		}).catch(function (err) {
			messageTip(err)
		});
	}
	if (fromApp) {
		// app
		addLink("custom/chimee/chimee-mobile-player.min.css")
		addScript("custom/chimee/chimee-mobile-player.min.js", callback);
	} else {
		addLink("custom/chimee/chimee-player.min.css")
		addScript("custom/chimee/chimee-player.min.js", callback)
	}
}
/**视频功能 **/
// 视频自适应
var layoutVideo = function (videoWrapper, player, tag) {
	// videoWrapper：视频容器的占位符
	// player 视频实例化对象
	// tag：视频容器的标识，在画面中是指标签属性值，在dom中指id属性值
	var div = document.getElementById(tag);
	var zoom = graphView.getZoom();
	var tx = graphView.tx(),
		ty = graphView.ty(),
		rect = videoWrapper.getRect(),
		x = void 0,
		y = void 0;
	rect.x *= zoom;
	rect.y *= zoom;
	rect.width *= zoom;
	rect.height *= zoom;
	x = rect.x + tx;
	y = rect.y + ty;
	div.style.position = "absolute";
	div.style.width = rect.width + 'px';
	div.style.height = rect.height + 'px';
	div.style.left = x + 'px';
	div.style.top = y + 'px';
	// player.$css("width",rect.width + 'px');
	// player.$css("height",rect.height + 'px');
};
// ChimeePlayer.install(chimeePluginMobileState);
// ChimeePlayer.install(chimeePluginContextmenu);
var playerObj = {
}
// 创建视频实例

var timer = {};
window.creatVideo = function (graphView, url, tag, chimeeOption) {
	var box = "hls"
	var className = "vedio-wrap pc";
	if (fromApp) {
		box = "native";
		className = "vedio-wrap";
	}
	if (!chimeeOption){
		chimeeOption={}
	}
	if (playerObj[tag]) {
		document.body.removeChild(document.getElementById(tag));
		playerObj[tag].stopLoad();
		delete playerObj[tag];
	}
	var videoWrapper = graphView.dm().getDataByTag(tag);
	if (!videoWrapper) return false;
	var div = document.createElement('div');
	div.style.position = 'absolute';
	div.style.boxSizing = 'border-box';
	if (fromApp) {
		div.style.zIndex = zIndex;
		div.setAttribute("zIndex", zIndex++);
	}
	div.style.overflow = 'hidden';
	div.setAttribute("id", tag);
	div.setAttribute("class", className);
	var closeChild = document.createElement("i");
	closeChild.setAttribute("class", "ivu-icon ivu-icon-android-close");
	closeChild.setAttribute("data-tag", tag);
	div.appendChild(closeChild);

	if (fromApp) {
		var fullScreenChild = document.createElement("i");
		fullScreenChild.setAttribute("class", "ivu-icon custom-chimee-screen-icon full");
		fullScreenChild.setAttribute("data-tag", tag);
		fullScreenChild.setAttribute("data-isFullScreen", false);
		// div.appendChild(fullScreenChild);
	}
	document.body.appendChild(div);

	if (fromApp) {
		// ChimeeMobilePlayer.config.useStyleFullscreen = true;
		var player = new ChimeeMobilePlayer(Object.assign({
			wrapper: "#" + tag,
			src: url,
			box: box,
			isLive: true,
			autoplay: true,
			controls: true,
			playsInline: true,
			x5VideoPlayerType: "h5",
			x5VideoPlayerFullscreen: true,
			preload: 'auto',
			x5VideoPlayerFullscreen: true,
			x5VideoOrientation: 'landscape',
			xWebkitAirplay: true,
			muted: true,
			disableUA: ['Mozilla/5.0 (Linux; Android 4.4.2; HM NOTE 1TD Build/KOT49H; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/62.0.3202.97 Mobile Safari/537.36'],
			noDefaultContextMenu: true,
			// removeInnerPlugins: ['chimeeState']
		}, chimeeOption));
		player.$container.getElementsByTagName("chimee-control-wrap")[0].appendChild(fullScreenChild)
	} else {
		ChimeePlayer.config.useStyleFullscreen = true;
		var player = new ChimeePlayer(Object.assign({
			wrapper: "#" + tag,
			src: url,
			box: box,
			isLive: true,
			autoplay: true,
			controls: true,
			playsInline: true,
			preload: 'auto',
			muted: true,
			noDefaultContextMenu: true,
			// removeInnerPlugins: ['chimeeState']
		}, chimeeOption));
	}
	layoutVideo(videoWrapper, player, tag);
	player.play()
	playerObj[tag] = player;
	document.getElementById(tag).querySelector('.ivu-icon-android-close').addEventListener("click", function () {
		var tag = this.getAttribute("data-tag");
		playerObj[tag].stopLoad();
		delete playerObj[tag];
		if (timer[tag]) {
			delete timer[tag]
		}
		document.body.removeChild(document.getElementById(tag));
	});
	if (fromApp) {
		document.getElementById(tag).getElementsByTagName("chimee-screen")[0].style.display = "none"
		document.getElementById(tag).addEventListener("touchstart", function () {
			if (timer[tag]) {
				clearTimeout(timer[tag])
			}
			this.getElementsByClassName("ivu-icon-android-close")[0].style.opacity = 1
		});
		document.getElementById(tag).addEventListener("touchend", function () {
			var that = this;
			timer[tag] = setTimeout(function () {
				that.getElementsByClassName("ivu-icon-android-close")[0].style.opacity = 0
			}, 2000)
		});
		document.getElementById(tag).querySelector('.custom-chimee-screen-icon').addEventListener("click", function () {
			// 全屏
			var tag = this.getAttribute("data-tag");
			var isFullScreen = this.getAttribute("data-isFullScreen");
			var currenWrapper = document.getElementById(tag);
			if (isFullScreen == "true") {
				// 关闭全屏
				var videoWrapper = graphView.dm().getDataByTag(tag);
				layoutVideo(videoWrapper, playerObj[tag], tag);
				this.setAttribute("data-isFullScreen", 'false');
				this.setAttribute("class", "ivu-icon custom-chimee-screen-icon full");
				this.style.zIndex = document.getElementById(tag).getAttribute("zIndex");
				document.getElementById(tag).querySelector('.ivu-icon-android-close').style.display = "block";
			} else {
				// 打开全屏
				currenWrapper.style.width = "auto";
				currenWrapper.style.height = "auto";
				currenWrapper.style.position = "fixed";
				currenWrapper.style.zIndex = ++zIndex;
				currenWrapper.style.left = "0";
				currenWrapper.style.top = "0";
				currenWrapper.style.bottom = "0";
				currenWrapper.style.right = "0";
				this.setAttribute("data-isFullScreen", 'true');
				this.setAttribute("class", "ivu-icon custom-chimee-screen-icon small");
				document.getElementById(tag).querySelector('.ivu-icon-android-close').style.display = "none";
			}
		});
	} else {
		document.getElementById(tag).getElementsByTagName("chimee-screen")[0].style.display = "block"
	}
}

// 接口异常提示框
function messageTip(error) {
	var title = '';
	if (error.response.data.status == 500) {
		title = "服务器错误"
	} else {
		title = errMsg[error.response.data.errorKey] || error.response.data.title;
	}
	if (title) {
		var messageHtml = "<div class='ivu-message' style='top: 24px;'>" +
			"<div class='ivu-message-notice'>" +
			"<div class='ivu-message-notice-content'>" +
			"<div class='ivu-message-notice-content-text'>" +
			"<div class='ivu-message-custom-content ivu-message-error'>" +
			"<i class='ivu-icon ivu-icon-close-circled'></i>" +
			"<span>" + title + "</span>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>"
		var messageDom = document.getElementById("messageWrap")
		if (messageDom) {
			document.body.removeChild(messageDom);
		}
		var div = document.createElement("div")
		div.setAttribute("id", "messageWrap");
		div.innerHTML = messageHtml
		document.body.appendChild(div);
		setTimeout(function () {
			var messageDom = document.getElementById("messageWrap")
			if (messageDom) {
				document.body.removeChild(messageDom);
			}
		}, 3000)
	}
}