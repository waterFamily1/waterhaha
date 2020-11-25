const util = { 
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
    transDateFromServer (serverDate, pattern) {
		if(!serverDate) return '';
		if(typeof localeDate == "string" && /[TZ]/.test(localeDate) == false) {
			serverDate = serverDate.replace(/-/,'/');
		} 
		return util.F(serverDate, pattern || "yyyy-MM-dd hh:mm");
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
	tableDatetime(h, dateTimeString) {
		return h('div', { style: {'fontSize': '12px'}}, [
			h('div', util.F(dateTimeString, 'hh:mm:ss')),
			h('div', util.F(dateTimeString, 'yyyy-MM-dd'))
		])
	}, 
	download : function(url, params) {
		let query = ''
		if(params) 
		{
			query = '?' + Object.keys(params).map(function(key) {
                        return encodeURIComponent(key) + '=' +
						(params[key]||params[key]===0?encodeURIComponent(params[key]):'')
					}).join('&');
		}
		let iframe = document.getElementById('downloadIframe')
		if(!iframe) {
			iframe = document.createElement('iframe')
			iframe.id = 'downloadIframe'
			iframe.style.display = 'none'
			document.body.appendChild(iframe)
		}
		iframe.src = url+query
	},
}

export default util;