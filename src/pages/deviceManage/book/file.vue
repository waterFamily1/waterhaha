<template>
    <div class="related-data">
        <!-- 相关资料 -->
        <div class="common-table-c">
            <Table size="small" :columns="columns" :data="fileData" @on-selection-change="changeSelection" stripe></Table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'equFile',
    props: {
        fileData: {
            type: Array
        },
        isEdit: {
            type: Boolean
        },
        isView:{
            type: Boolean,
            default: false            
        }
    },
    data() {
        let columns =  [
            { 
                type: 'selection', width: 30, align: 'center' 
            }, { 
                title: '文件名称', key: 'name', width: 200,
                render: (h,data)=>{
                    return h('div', [
                        h('span', data.row.name),
                        h('a', {
                            class: 'c-btn-text',
                            on:{
                                click:()=>{
                                    // util.download(commonApi.download,{fileUrl:data.row.url})
                                }
                            }
                        }, '[下载]')
                    ])
                }
            }, { 
                title: '文件编号', key: 'code', align: 'center'
            }, { 
                title: '文件类型', key: 'type' , width: 120
            }, {
                title: '文件大小',
                key: 'size',
                width: 120,
                render: (h, data) => {
                    return h('span', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            on: {
                                click: () => {}
                            }
                        },
                        (data.row.size/1000/1024).toFixed(2) + 'M'
                    );
                }
            }
        ];
        return {
            selectedIds: [],
            columns: this.isView ? columns.slice(1) : columns
        }
    },
    methods: {
        changeSelection(data) {
            this.selectedIds = data
        }
    }
}
</script>

<style lang="less" scoped>
.related-data {

}
</style>