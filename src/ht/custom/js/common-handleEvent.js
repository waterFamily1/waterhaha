/**
 * 转换器，根据id，pid children生成规约函数
 * @param {*} id 
 * @param {*} pid 
 * @param {*} children 
 */
function transformer(id, pid, children) {
	return function (obj, item) {
		// 获取当前节点的子节点的拷贝，子节点默认从原有内存获取或重新初始化
		item[children] = obj.childrenOf[item[id]] = obj.childrenOf[item[id]] || [];
		// 如果存在父节点
		if (item[pid] != 0) {
			// 设置父节点的子节点为过去的引用或重新初始化
			obj.childrenOf[item[pid]] = obj.childrenOf[item[pid]] || [];
			// 更新父节点，添加新项，此时父节点引用发生同步变化，即obj.childrenOf[item[pid]];
			obj.childrenOf[item[pid]].push(item);
		} else {
			// 反之直接添加当前节点到树的根节点上
			obj.tree.push(item);
		}
		return obj;
	};
}
/**
 * 线性列表转树结构
 * @param {*} param
 */
function list2tree(_ref) {
	var id = _ref.id,
		pid = _ref.pid,
		children = _ref.children;
	// 获取`tree`属性
	var getTree = R.prop('tree');
	// 根据对象的属性名生成规约函数
	var reducer = transformer(R.defaultTo('id')(id), R.defaultTo('pid')(pid), R.defaultTo('children')(children));
	// 定义放入初始数据后转换器
	var init = { tree: [], childrenOf: {} };
	var transducer = R.reduce(reducer, init);
	return R.compose(getTree, transducer);
};
/**
 * 迭代器的构造器
 * @param {*} children 
 */
function itBy() {
	var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'children';

	return function (fn) {
		// 递归调用项，将结果放入result中
		return R.reduce(function (result, item) {
			return R.unnest([
				// 拼接上一次的结果
				result,
				// 拼接转换器函数运算结果
				R.call(fn, item),
				// 拼接子集结果
				itBy(children)(fn)(item[children])]);
		}, []);
	};
};
/**
 * 树转成某种特定对象
 * @param {*} tree 
 * @param {*} children 
 */
function tree2object(tree, parentListObj) {
	var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
	var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'id';
	var obj = {};
	tree.forEach(function (node) {
		if (node[children] && node[children].length) {
			obj[node[name]] = tree2object(node[children], parentListObj, 'children', 'id');
			parentListObj[node[name]] = {
				needToLoad: true,
				id: node.id
			};
		} else {
			obj[node[name]] = {
				fileType: 'dir',
				attrs: {
					needToLoad: true,
					id: node.id
				}
			};
		}
	});
	return obj;
}
/**
 * 将字符串转换为对象
 * @param {*} def 
 */
function string2object(defaults) {
	return R.tryCatch(JSON.parse, R.always(defaults));
}
/**
 * 字符串转JSON
 * @param {*} str 
 */
function string2json(str) {
	return string2object({})(str);
}
/**
 * 字符串转数组
 * @param {*} str 
 */
function string2array(str) {
	return string2object([])(str);
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
function isAdmin(userInfo) {
	return R.pipe(
		// 查找属性
		R.prop('webOpers'),
		// 过滤属性
		R.defaultTo([]),
		// 判断是否包含
		R.contains('ROLE_ADMIN'))(userInfo);
}
// 不做人任何事的函数
function nothing() { }

/**
 * 增加测点Tab
 * @param {Object} editor HT编辑器
 * @return {Object[]} list 工艺位置集合
 */
function addPoints(editor, currentList, mpointsObject, callback) {
	var pointsTab = new ht.Tab();
	pointsTab.setName('测点');
	hteditor.strings['editor.pointsroot'] = '测点根目录';

	editor.leftTopTabView.getTabModel().add(pointsTab);

	var fileIcon = 'symbols/basic/point.json';
	var points = new hteditor.Explorer(editor, '测点根目录', false);
	editor.points = points;
	pointsTab.setView(points);
	callback && callback(points);
	// points.list.isDroppableToDisplayView = true;
	points.list.handleDropToEditView = function (view, fileNode, point, event) {
		if (fileNode.getIcon() && fileNode.getIcon().comps[0].type == 'text') {
			var text = new ht.Text();
			text.s({
				// 'text': fileNode.a('name') + ':' + (fileNode.a('value') ? fileNode.a('value') : ''),
				text: fileNode.a('name'),
				'text.align': 'center'
			});
			text.setDataBindings({
				s: {
					text: {
						id: fileNode.getAttrObject().id,
						mpointName: fileNode.getAttrObject().name
					}
				}
			});
			text.setDisplayName(fileNode.getName());
			text.a(fileNode.getAttrObject());
			text.p(point);
			view.addData(text);
		} else {
			var node = new ht.Node();
			node.setImage(fileIcon);
			node.a(fileNode.getAttrObject());
			node.p(point);
			node.setDisplayName(fileNode.getName());
			view.addData(node);
		}
	};
	// 环境监测
	var mpointsApi = envApi('/loong/api/mpoints/monitor');
	var tree = list2tree({ pid: 'parentId' })(currentList);
	var parentListObj = {};
	var treeObject = tree2object(tree, parentListObj, 'children', 'id');
	points.parse(treeObject);
	var items = points.tree.menu.getItems();
	items.push("separator", {
		id: "expandAll",
		label: "展开全部",
		action: function action() {
			points.tree.expandAll();
		}
	}, {
		id: "collapseAll",
		label: "折叠全部",
		action: function action() {
			points.tree.collapseAll();
		}
	});
	points.tree.getLabel = function (data) {
		// 如果是根节点，返回根节点原始名称
		if (data.fileType == 'root') {
			return '测点根目录';
		} else {
			// 如果是其他文件，则做文件映射
			var node = mpointsObject[data.url]
			return node.name;
		}
	};
	points.list.isVisible = function (data) {
		var ld = points.tree.sm().ld();
		if (data.fileType === 'point' && data.path == ld.url) {
			return true;
		} else {
			return false;
		}
	};
	points.tree.setSortFunc(function (a, b) {
		var itemA = mpointsObject[a.url],
			itemB = mpointsObject[b.url];
		return itemA.indexNum - itemB.indexNum;
	});
	// 设置选中最末工艺位置后的事件
	points.tree.sm().ms(function (event) {
		var data = points.tree.sm().ld();
		var params = {};
		if (data) {
			var itFn = function itFn(node) {
				var value = {
					fileType: 'point',
					fileIcon: {
						"width": 32,
						"height": 16,
						"comps": [{
							"type": "text",
							"text": node.id,
							"align": "center",
							"rect": [0, 0, 32, 16]
						}]
					},
					attrs: {
						id: node.id,
						name: node.mpointName,
						unit: node.unit
					},
					styles: {
						'image.stretch': 'uniform'
					}
				};
				points.parseChild(data, node.mpointName, value);
			};

			if (data.a('needToLoad') && data.a('id')) {
				data.a('needToLoad', false);
				params.siteId = data.a('id');
			}
			if (parentListObj[data._name] && parentListObj[data._name].needToLoad) {
				parentListObj[data._name].needToLoad = false;
				params.siteId = parentListObj[data._name].id;
			}
			if (!params.siteId) return;
			var request = window.axios.get(mpointsApi, {
				params: params
			});

			request.then(function (res) {
				if (res.data) {
					res.data.forEach(function(ele){
						itFn({
							id: ele.id,
							mpointName: ele.mpointName,
							unit: ''
						})
					})
				}
			}).catch(function (err) {
				messageTip(err);
			});
		}
	});
	// return list;
}
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
		var currentDocumentEle = window.top.document;
		var messageDom = currentDocumentEle.getElementById("messageWrap")
		if (messageDom) {
			currentDocumentEle.body.removeChild(messageDom);
		}
		var div = currentDocumentEle.createElement("div")
		div.setAttribute("id", "messageWrap");
		div.innerHTML = messageHtml
		currentDocumentEle.body.appendChild(div);
		setTimeout(function () {
			var messageDom = currentDocumentEle.getElementById("messageWrap")
			if (messageDom) {
				currentDocumentEle.body.removeChild(messageDom);
			}
		}, 3000)
	}
}