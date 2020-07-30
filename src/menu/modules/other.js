const pre = '/other/'

export default {
    path: '/other',
    title: '导入',
    header: 'home',
    auth: ['hidden'],
    children: [
        {
            path: `${pre}areaUpload`
        }
    ]
}