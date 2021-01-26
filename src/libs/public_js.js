const util = {
	R: function() {
		return parseInt(Math.random()*1000)
	},
	formatDateTime : function(d, pattern) {
		if(!d) return "";
		if(typeof d != "object") d = new Date(d);
	    pattern = pattern || 'yyyy-MM-dd';
	    var y = d.getFullYear().toString(),
	        o = {
	            M: d.getMonth() + 1, 
	            d: d.getDate(), 
	            h: d.getHours(), 
	            m: d.getMinutes(), 
	            s: d.getSeconds() 
	        };
	    pattern = pattern.replace(/(y+)/ig, function(a, b) {
	        return y.substr(4 - Math.min(4, b.length));
	    });
	    for (var i in o) {
	        pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function(a, b) {
	            return (o[i] < 10 && b.length > 1) ? '0' + o[i] : o[i];
	        });
	    }
	    return pattern;
	},
	F: function(d, pattern) {
		return util.formatDateTime(d,pattern);
	},
	CompareDate(start, end) {
		var start = new Date(start),
			end = new Date(end);
		var poor = end - start;
		// 分
		if(poor / 1000 / 60 < 60){
			return Math.round(poor / 1000 / 60) + '分';
		}
		//小时
		if (poor / 1000 / 60 / 60 < 24) {
			return Math.floor(poor / 1000 / 60 / 60) + '时' + Math.round(poor / 1000 / 60 % 60) + '分';
		}

		//天
		if (poor / 1000 / 60 / 60 / 24) {
			return Math.floor(poor / 1000 / 60 / 60 / 24) + '天' + Math.floor(poor / 1000 / 60 / 60 % 24) + '时' + Math.round(poor / 1000 / 60 % 60) + '分';
		}
	},
	getTimeClass({type = 'd', data = [], key = 'showTime'}){
		let getD = (d) => {
			return (d ? new Date(d) : new Date()).getDate();
		}
		let getW = (d) => {
			return Math.ceil((d ? new Date(d) : new Date()).getDate() / 7);
		}
		let getM = (d) => {
			return (d ? new Date(d) : new Date()).getMonth() + 1;
		}

		let getTitle = (d) => {
			return (new Date(d).getFullYear() + '年') + ({
				d: getM(d) + '月' + getD(d) + '日',
				w: getM(d) + '月第' + getW(d) + '周',
				m: getM(d) + '月'
			})[type]
		}

		let isSame = (start, end) => {
			let _map = {
				d: getD,
				w: getW,
				m: getM
			}
			return _map[type](start) === _map[type](end);
		}
		
		let sliceIndex = 0,
			result = [];
		data.forEach((element, index, arr) => {
			let nextIndex = index == arr.length - 1 ? index : index + 1;
			let start = element[key],
				end = arr[nextIndex][key],
				_list = [];

			if (!isSame(start, end) || index == arr.length - 1) {
				_list = arr.slice(sliceIndex, index + 1);
				sliceIndex = index + 1;
				result.push({
					title: getTitle(start),
					list: _list
				})
			}
		});
		return result;
	},
	getDateClass({data = [], key = 'showTime' }){
		let getY = (d) => {
			return (d ? new Date(d) : new Date()).getFullYear();
		}
		var days = [31, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		let curW = [], perW = [], perM = [], threeM=[];
		let isSame = (start, item) => {
			if (getY(start) === getY() && util.getTheWeek().day - util.getTheWeek(start).day < 8) {
				curW.push(item)
			}else if (getY(start) === getY() && util.getTheWeek().day - util.getTheWeek(start).day > 7  && util.getTheWeek().day - util.getTheWeek(start).day < 31){
				perW.push(item)
			}else if (getY(start) === getY() && util.getTheWeek().day - util.getTheWeek(start).day > 30 && util.getTheWeek().day - util.getTheWeek(start).day < 90) {
				perM.push(item)
			}else{
				threeM.push(item)
			}
		}

		data.forEach((element, index, arr) => {
			isSame(element[key], element);
		});

		var result = [];

		if(curW.length){
			result.push({
				title:'',
				list:curW
			})
		}
		if (perW.length) {
			result.push({
				title: '一周前',
				list: perW
			})
		}
		if (perM.length) {
			result.push({
				title: '一个月前',
				list: perM
			})
		}
		if (threeM.length) {
			result.push({
				title: '三个月前',
				list: threeM
			})
		}
		return result;
	},
	getTheWeek(time) {
		var totalDays = 0,
		now = time ? new Date(time) : new Date(),
		years = now.getYear();
		if (years < 1000){
			years += 1900
		}
		var days = [31,31,30,31,30,31,31,30,31,30,31];

		//判断是否为闰年，针对2月的天数进行计算
		if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
			days[1] = 29
		} else {
			days[1] = 28
		}

		// 第几周
		// if (now.getMonth() == 0) {
		// 	totalDays = totalDays + now.getDate();
		// } else {
		// 	var curMonth = now.getMonth();
		// 	for (var count = 1; count <= curMonth; count++) {
		// 		totalDays = totalDays + days[count - 1];
		// 	}
		// 	totalDays = totalDays + now.getDate();
		// }
		// var week = Math.ceil(totalDays / 7);
		
		// 第几天
		var day = 0;
		for (var i = 0; i < now.getMonth(); i++) {
			day += days[i];
		}
		day += now.getDate();  

		return {
			day:day,
			// week:week
		};
	},
	transDateFromServer (serverDate, pattern) {
		if(!serverDate) return '';
		if(typeof localeDate == "string" && /[TZ]/.test(localeDate) == false) {
			serverDate = serverDate.replace(/-/,'/');
		} 
		return util.F(serverDate, pattern || "yyyy-MM-dd hh:mm");
	},
	transDateFromLocale (localeDate) {
		if(!localeDate) return '';
		if(typeof localeDate == "string") {
			if(/[TZ]/.test(localeDate) == false) localeDate = localeDate.replace(/-/,'/');
			localeDate = new Date(localeDate);
		}
		return localeDate.toISOString();
	},
	guid :  function() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	        return v.toString(16);
	    });
	},
	gusid (len, radix) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	    var uuid = [], i;
	    radix = radix || chars.length;
	 
	    if (len) {
	      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	    } else {
	      var r;
	      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	      uuid[14] = '4';
	      for (i = 0; i < 36; i++) {
	        if (!uuid[i]) {
	          r = 0 | Math.random()*16;
	          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	        }
	      }
	    }
	 
	    return uuid.join('');
	},
	
	// transDataToTree : function transDataToTree(data, parentId, selectedId) {
	// 	parentId = parentId ? parentId : 0;
	//     var result = [], children = [];
	//     for(var i=0,len=data.length;i<len;i++) {
	//     	data[i]["title"] = data[i]["name"];
	//     	if(selectedId && selectedId == data[i]["id"]) {
	//     		data[i].selected = true;
	//     	}
	//     	if(data[i].parentId == parentId ){
	//             result.push(data[i]); 
	//             children = transDataToTree(data, data[i].id);   
	//             if(children.length>0){         
	//                 data[i].children = children; 
	//             }           
	//         }       
	//     }
	//     return result;
	// },
	transDataToTree : function transDataToTree(list, parentId='parentId',title='name') {
		var map = {}, node, roots = [], i;
		for (i = 0; i < list.length; i += 1) {
			map[list[i].id] = i; // initialize the map
			list[i].children = []; // initialize the children
		}
		for (i = 0; i < list.length; i += 1) {
			node = list[i];
			node.title = node[title];
			node.isRole = node.checked;
			var pid = parentId ? node[parentId] : node.pid;
			if (list[map[pid]]) {
				// if you have dangling branches check that map[node.parentId] exists
				list[map[pid]].children.push(node);
			} else {
				roots.push(node);
			}
		}
		return roots;
	},
	tableBtnStyle : function(render, onClick, text, roleKey) {
		if (roleKey){
			let roles = JSON.parse(sessionStorage.getItem('__MANGO_U_') || '{}').webOpers;

			if (!roles) {
				return false;
			}

			if (roles.indexOf(role[roleKey]) === -1 && roles.indexOf(role.all) == -1) {
				return false;
			}

		}
	    return render (
	        "a",
	        {
	           
	            attrs: { href: "javascript:;" },
	            style: { 
	                color: "#346C93",
	                margin: "0 10px 0 0"
	            },
	            on: {
	                click: onClick
	            }
	            
	        },
	        text
	    )
	},
	treeBtnAddStyle : function(){
		return;
	},
	treeBtnEditStyle : function(){
		return;
	},
	treeBtnDelStyle : function(render, onOk, onCancel, onBefore, title){
		var _title = title ? title : "你确定要删除吗？";
		return render (
	        "Poptip",
	        {
				props: { confirm: true, title: _title, width: 200, placement: "top-end", transfer: true },
	            on: {
	                'on-ok': onOk,
	                'on-cancel': onCancel || function(){}
	            }
	        },
	        [
	        	render("a",
		        	{
		        		attrs: { href: "javascript:;" },
		        		style: { margin: "0 5px" },
		        		class: {"c-tree-btn-del": true},
		            	on: {
		            		click: () => {
		            			onBefore && onBefore();
		            		}
		            	}
		        	},
	        	"删除")
	        ]
	    )
	},
	addTreeRoot: function(tree) {
		return [
			{
				parentId: null,
				id: 0,
				name: "全部",
				isRoot: true,
				children: tree,
				expand: true
			}
		]
	},
	getTreeAllParentId(data, id) {
		var ids = [];

		var _getTreeAllParentId = function(treeData, id) {
			var len = treeData.length;
			var item;
			for(var i=0;i<len;i++) {
				item = treeData[i];
				if (item.id == id) {
					ids.push(id);
					if(item.parentId) _getTreeAllParentId(data, item.parentId)
				} 
			}
		}

		_getTreeAllParentId(data, id);
		return ids;
	},
	setTreeExpand : function setTreeExpand(treeData, id) { // 非标准树结构，从子往父遍历
		var len = treeData.length;
		var item;
		for(var i=0;i<len;i++) {
			item = treeData[i];
			if (item.id == id) {
				item.expand = true;
				setTreeExpand(treeData, item.parentId);
			} 
		}
	},
	setTreeRootExpand(treeData) {
		var len = treeData.length;
		var item;
		for(var i=0;i<len;i++) {
			item = treeData[i];
			if (item.parentId == 0) {
				item.expand = true;
			} 
		}
	},
	setTreeParentsExpand(treeData, pids) { 
		var len = treeData.length;
		var item;
		for(var i=0;i<len;i++) {
			item = treeData[i];
			if (pids.indexOf(item.id) > -1) {
				item.expand = true;
			} 
		}
	},
	//导出，下载：contextpath+'/patrol/api/patrol-statistics/export'
	download : function(url, params) {
		let query = '';
		if(params) 
		{
			query = '?' + Object.keys(params).map(function(key) {
                        return encodeURIComponent(key) + '=' +
						(params[key]||params[key]===0?encodeURIComponent(params[key]):'');
					}).join('&');
		}
		let iframe = document.getElementById('downloadIframe');
		if(!iframe)
		{
			iframe = document.createElement('iframe');
			iframe.id = 'downloadIframe';
			iframe.style.display = 'none';
			document.body.appendChild(iframe);
		}
		iframe.src = url+query;
        // const blob = new Blob([res]);
        // if ('download' in document.createElement('a')) { 
		// 	const elink = document.createElement('a')
		// 	elink.download = fileName;
		// 	elink.style.display = 'none';
		// 	elink.href = URL.createObjectURL(blob);
		// 	document.body.appendChild(elink);
		// 	elink.click();
		// 	URL.revokeObjectURL(elink.href);
		// 	document.body.removeChild(elink);
        // } else { 
		// 	navigator.msSaveBlob(blob, fileName);
        // }
	},
	
	authorityAdmin (currentAuth) {
		if((currentAuth.indexOf('ROLE_TENANT_ADMIN') != -1) || (currentAuth.indexOf('UAA_ROLE_EDIT') != -1))
			return true;
	},
	authorityEquAdmin (currentAuth) {
		if((currentAuth.indexOf('ROLE_TENANT_ADMIN') != -1) || (currentAuth.indexOf('EQU_EQUTYPE_EDIT') != -1))
			return true;
	},
	authorityProcAdmin (currentAuth){
		if (currentAuth.indexOf('UAA_PROC_EDIT') != -1)
			return true;
	},
	author0 (currentAuth) {
		if(currentAuth.indexOf('ROLE_TENANT_ADMIN') != -1) 
			return true;
	},
	authority (roleKey) {
		let roles = JSON.parse(sessionStorage.getItem('__MANGO_U_') || '{}').webOpers;
		if (!roles)  return false; 
		if (roles.indexOf(role[roleKey]) === -1 && roles.indexOf(role.all) == -1) {
			return false;
		}
		return true;
	},
	author2(currentAuth) {
		if (currentAuth.indexOf('UAA_ORG_EDIT') != -1)
			return true;
	},
	joinIds (items, key, filterKey) {
		if(!items || !items.length) return '';
    	var ids = [];
    	var _key = key || 'id';
    	items.forEach((item)=>{
    		if(!filterKey){
    			ids.push(item[_key])
    		}
    		else {
    			if(!!item[filterKey])
    				ids.push(item[_key])
    		}

    	})
    	return ids.join();
    },
    countDept(items) {
		items.forEach((item)=>{
			item.orgChain.forEach(child => {
                if(child.type === 4){
                  item.dept = child.name;
                }else if(child.type === 3){
                  item.dept = child.name;
                }else if(child.type === 2){
                  item.orgName = child.name;
                }else if(child.type === 1){
                  item.orgName = child.name;
                }
          	});
		});
	},
	throttle(func, wait, options) {
		var context, args, result;
		var timeout = null;
		var previous = 0;
		if (!options) options = {};
		var later = function () {
			previous = options.leading === false ? 0 : new Date().getTime();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};
		return function () {
			var now = new Date().getTime();
			if (!previous && options.leading === false) previous = now;
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	},
	debounce(func, wait, immediate) {
		var timeout, args, context, timestamp, result;
		var later = function () {
			var last = new Date().getTime() - timestamp;
			if (last < wait && last >= 0) {
				timeout = setTimeout(later, wait - last);
			} else {
				timeout = null;
				if (!immediate) {
					result = func.apply(context, args);
					if (!timeout)
						context = args = null;
				}
			}
		};
		return function () {
			context = this;
			args = arguments;
			timestamp = new Date().getTime();
			var callNow = immediate && !timeout;
			if (!timeout)
				timeout = setTimeout(later, wait);

			if (callNow) {
				result = func.apply(context, args);
				context = args = null;
			}

			return result;
		};
	},
	// 添加表格title
	initTableColumnTitle(columns) {
		for (let i = 0; i < columns.length; i++) {
			if (!columns[i].render) {
				columns[i].ellipsis = true;
				columns[i].render = (h, params) => {
					return h('span', { attrs: { title: params.row[params.column.key] } }, params.row[params.column.key]);
				};
			}
		}
	},
	// 数组去重
	mergeArray(arr1, arr2) {
		for (var i = 0 ; i < arr1.length ; i ++ ) {
			for(var j = 0 ; j < arr2.length ; j ++ ) {
				if (arr1[i].value == arr2[j].value) {
					arr1[i].isRepeat = true;
				}
			}
		}
		let newArray = arr2.concat(arr1).filter(v =>v.isRepeat != true);
		return newArray;
	},
	copyArray(arr, deep) {
		var dupl = [];
		arr.forEach((item)=>{
			if(deep) item = JSON.parse(JSON.stringify(item));
			dupl.push(item)
		})
		return dupl;
	},

	tableDatetime(h, dateTimeString) {
		return h('div', { style: {'fontSize': '12px'}}, [
			h('div', util.F(dateTimeString, 'hh:mm:ss')),
			h('div', util.F(dateTimeString, 'yyyy-MM-dd'))
		])
	}
}


export default util;