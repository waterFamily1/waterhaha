// import contextpath from '@src/config/contextpath';

const api = {
	cancel: '/uaa/api/excel/cancel',
	import: '/uaa/api/excel/import',
	template: '/uaa/api/excel/template',
	validate: '/uaa/api/excel/validate'
}

function render(h, data) {
	const errorPrefix = 'Error:';
	var row = data.row[data.column.key].toString(),
		arr = row.split(errorPrefix);

	if(arr.length > 1) {
		return h('span', {
			style: {
				color: '#e03d3e'
			},
			attrs: { title: arr[1]}
		}, arr[1])
	}else {
		return h('span', {attrs: { title: arr[0] }}, arr[0])
	}
}
export default {
	'user': {
		name: '用户导入',
		type: 'user',
		importUrl: '/uaa/api/excel/validate',
		downloadUrl: api.template + '?type=user',
		saveUrl: api.import,
		cancelUrl: api.cancel,
		accept: '.xls,.xlsx',
		format: ['xls', 'xlsx'],
		max: 500,
		columns: [
			{title: '行号', key: 'index', render: render},
			{title: '用户姓名', key: 'name', render: render},
			{title: '所属组织 ', key: 'orgName', render: render},
			{title: '手机号', key: 'tel', render: render},
			{title: '邮箱', key: 'email', render: render},
			{title: '其他错误', key: 'otherError', render: render}
		]
	},
	'process': {
		name: '区域位置导入',
		type: 'process',
		importUrl: api.validate,
		downloadUrl: api.template + '?type=process',
		saveUrl: api.import,
		cancelUrl: api.cancel,
		accept: '.xls,.xlsx',
		format: ['xls', 'xlsx'],
		max: 500,
		columns: [
			{title: '行号', key: 'index', render: render},
			{title: '区域位置名称', key: 'name', render: render},
			{title: '位置类型 ', key: 'type', render: render},
			{title: '备注', key: 'remarks', render: render},
			{title: '经度', key: 'longitude', render: render},
			{title: '纬度', key: 'latitude', render: render},
			{title: '上级区域位置路径', key: 'parentNamePath', render: render},
			{title: '其他错误', key: 'otherError', render: render}
		]
	}
}