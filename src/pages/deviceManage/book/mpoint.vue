<template>
    <div class="equ-mpoint">
        <!-- 相关测点 -->
        <div>
            <Table size="small" :columns="columns" :data="tableDatas" stripe></Table>
        </div>
    </div>
</template>

<script>
import util from '@/libs/public_js'

export default {
    name: 'equMpoint',
    props: {
        pointsData: Array,
        siteId: null,
        isEdit: {
            type: Boolean
        }
    },
    watch: {
        pointsData(v) {
            this.tableDatas = v
            console.log(this.tableDatas)
        },
        siteId(v) {
            this.$refs.mpointsTable.getData({siteId: v})
        }
    },
    data() {
        var _self = this;
        var _columns = [
            { title: '测点编号', key: 'mpointId', width: 90 },
            { title: '区域位置', key: 'siteName'},
            { title: '测点名称', key: 'mpointName' },
            { title: '当前值', key: 'value',width: 100, ellipsis: true},
            { title: '单位', key: 'unit' , width: 100},
            { title: '业务时间', key: 'datadt', width: 130, render(h, data) {
                return util.tableDatetime(h, data.row.datadt);
            } },
            { title: '信号类型', key: 'datype', width: 120,
                render: (h, params) => {
                    let text= params.row.datype =='Digtal'?'A':'D'
                    let color = params.row.datype =='Digtal'?'#7ED321':'#4A90E2'
                    return h('div',{
                        style:{
                            background:color,
                            width:'20px',
                            height:'20px',
                            lineHeight:'20px',
                            color:'#fff',
                            fontSize:'12px',
                            borderRadius:'50%',
                            textAlign:'center'
                        }
                    },text);
                }
            },
            { title: '数据来源', key: 'datasource', width: 100,
                render: (h, params) => {
                    let text
                    if(params.row.datasource == 'AUTO') {
                        text = '自动采集'
                    } else if(params.row.datasource == 'INPUT') {
                        text = '人工录入'
                    } else if(params.row.datasource == 'CALC') {
                        text = '数据计算'
                    } else if(params.row.datasource == 'ANALYSIS') {
                        text = '数据分析'
                    }
                    return h('span', text)
                }
            },
            { title: '数据分类', key: 'categoryName', width: 100 }
        ];
        if(this.isEdit) _columns.push(
            { title: '操作', render(h,data) {
                // return util.tableBtnStyle(h, () => {
                //         _self.delMpoint(data.row.id)
                //     }, "删除")
                }
            }
        );
        return {
            columns: _columns,
            tableDatas: [],
            // modalShown: false,
            // modalColumns: [
            //     {
            //         type: "selection",
            //         width: 60
            //     },
            //     { title: "测点编号", key: "mpointId" },
            //     { title: "区域位置", key: "siteName" },
            //     { title: "测点名称", key: "mpointName" },
            // ],
            // modalUrl: pointsApi.notrelPointsByEqu,
        }
    },
}
</script>

<style lang="less" scoped>
.equ-mpoint {

}
</style>