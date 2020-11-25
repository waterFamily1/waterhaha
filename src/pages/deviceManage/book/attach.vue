<template>
    <div class="original-attach">
        <!-- 原厂附件 -->
        <div class="original-attach-content common-table-c clearfix">
            <Table size="small" :columns="columns" :data="attachData" @on-selection-change="changeSelection" stripe></Table>
       </div>
    </div>
</template>

<script>
import util from '@/libs/public_js'
import _default_img from '../../../assets/images/default.png'

const _typMap = {
    '1': '备件',
    '2': '耗材',
    '3': '工具'
}

export default {
    name: 'originalAttach',
    props: {
        attachData: {
            type: Array
        },
        isEdit: {
            type: Boolean
        },
        isView: {
            type: Boolean,
            default: false
        }
    },
    data() {
        let columns = [
            {
                type: 'selection',
                width: 60,
                align: 'center'
            }, {
                title: '备件图片',
                key: 'img',
                width: 100,
                render: (h, data) => {
                    return h('img', {
                        attrs: {
                            src: data.row.imageUrl?data.row.imageUrl:_default_img,
                            width: 80,
                            height: 80
                        }
                    });
                }
            }, {
                title: '备件编号',
                key: 'code',
                width: 150
            }, {
                title: '备件名称',
                key: 'name'
            }, {
                title: '类型',
                key: 'typ',
                width: 80,
                render: (h, data) => {
                    return h('span', [_typMap[data.row.type]])
                }
            }, {
                title: '型号',
                key: 'model'
            }, {
                title: '规格',
                key: 'specification'
            }, {
                title: '出厂数量',
                key: 'quantity',
                width: 100
            }, {
                title: '单位',
                key: 'unit',
                width: 60
            }, {
                title: '备注',
                key: 'remarks'
            }
        ];

        if(this.isEdit){
            // columns.push({
            //     title: '操作',
            //     key: 'action',
            //     render:(h,data)=>{
            //         // return util.tableBtnStyle(
            //         //     h,
            //         //     () => {
            //         //         this.edit(data);
            //         //     },
            //         //     "编辑"
            //         // )
            //     }
            // })
        }
        return {
            columns: this.isView ? columns.slice(1) : columns
        }
    },
    created() {
        util.initTableColumnTitle(this.columns)
    },
    methods: {
        changeSelection() {

        }
    }
}
</script>

<style lang="less" scoped>
.original-attach {
    .original-attach-content {
        /deep/.ivu-table-row {
            img {
                display: block;
                margin: 5px 0;
            }
        }
    }
}
</style>