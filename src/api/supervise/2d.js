import request from '@/plugins/request'

export function getSid() {
	return request({
		url: '/uaa/api/ht/sid',
		method: 'get'
	})
}

export function treeMethod() {
	return request({
		url: '/loong/api/monitors/tree',
		method: 'get'
	})
}