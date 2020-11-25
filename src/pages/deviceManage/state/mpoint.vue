<template>
    <div class="equ-mpoint">
        <!-- 相关测点 -->
		<div class="attach-btns" v-show="isEdit">
            <Button type="primary" shape="circle" class="c-btn-add" @click="modalShown = true">选择测点</Button>
        </div>
        <div class="">
            <Table size="small" :columns="columns" :data="tableDatas" stripe></Table>
            <Page :total="total" size="small" show-total />
        </div>
        <!-- <Modal v-model="modalShown" width="600" title="测点列表选择">
	        <mg-select-table :columns="modalColumns" :url="modalUrl" :manual="true" searchPlaceholder="测点编号/名称" @on-submit="modalSubmit" @on-cancel="modalCancel" ref="mpointsTable"></mg-select-table>
	        <div slot="footer"></div>
	    </Modal> -->
	</div>
    </div>
</template>

<script>
import { formatTime } from '@/libs/public'

export default {
    name: 'equMpoint',
    props: {
        isEdit: {
            type: Boolean
        },
        pointsData: Array,
    },
    watch: {
        pointsData(v) {
            this.tableDatas = v
        }
    },
    data() {
        var _self = this
        var _columns = [
            { title: '测点编号', key: 'mpointId', width: 120 },
            { title: '测点名称', key: 'mpointName'},
            { title: '数据分类', key: 'categoryName', width: 120 },
            { title: '当前值', key: 'value',width: 150 },
            { title: '单位', key: 'unit' , width: 100},
            { title: '业务时间', key: 'datadt', width: 130, 
                render(h, params) {
                    let text = formatTime(params.row.datadt, 'HH:mm:ss yyyy-MM-dd')
                    return h('span',text)
                } 
            },
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
            }
        ];
        if(this.isEdit) _columns.push(
            { title: '操作', render(h,data) {
                return util.tableBtnStyle(
                        h,
                        () => {
                            _self.delMpoint(data.row.id)
                        },
                        "删除"
                    )
                }
            }
        );
        return {
            columns: _columns,
			tableDatas: [],
            modalShown: false,
            total: 0
        }
    }
}
</script>

<style lang="less" scoped>

</style>