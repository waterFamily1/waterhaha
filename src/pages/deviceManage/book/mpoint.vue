<template>
    <div class="equ-mpoint">
        <!-- 相关测点 -->
        <div class="attach-btns" v-show="isEdit">
            <Button @click="modalShown = true">选择测点</Button>
        </div>
        <div>
            <Table size="small" :columns="columns" :data="tableDatas" stripe></Table>
        </div>

        <Modal
            v-model="modalShown"
            title="测点列表选择"
            width="600">
            <div class="mg-select-table-header">
                <div>
                    <Input v-model="modalName" placeholder="测点编号/名称" style="width: 200px">
                        <Button slot="append" icon="ios-search" @click="getSite()"></Button>
                    </Input>
                </div>
                <div class="mg-select-table-tip">
                    已选择<strong>{{selectedData.length}}</strong>个
                    <a href="javascript:;" @click="handleClearSelect(false)">[清空]</a>
                </div>
            </div>
            <div class="model-table">
                <Table size="small" ref="selection" :columns="modelColumns" :data="modelData"
                    @on-select="handleSelect"
                    @on-select-cancel="handleSelectCancel"
                    @on-select-all="handleSelectAll"
                    @on-select-all-cancel="handleSelectAllCancel">
                </Table>
                <Page :total="modalTotal" size="small" show-total show-elevator class="modalPage" @on-change="changeSize" />
            </div>
            <div slot="footer">
                <Button @click="siteCancle">取消</Button>
                <Button type="primary" @click="siteSure">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import util from '@/libs/public_js'
import { siteIdMethod } from '@/api/deviceManage/equEdit'

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
        },
        siteId: {
            handler(val) {
                console.log(val)
                this.getSite()
            },
            deep: true
        }
    },
    data() {
        var _self = this;
        var _columns = [
            { title: '测点编号', key: 'mpointId', width: 90, ellipsis: true },
            { title: '区域位置', key: 'siteName', ellipsis: true},
            { title: '测点名称', key: 'mpointName', ellipsis: true },
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
            { 
                title: '操作', 
                render: (h,data)=> {
                    return h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            marginRight: '2px',
                            fontSize: '12px',
                            zIndex: '999'
                        },
                        on: {
                            click: () => { this.delMpoint(data.row.id) }
                        }
                    }, '删除')
                }
            }
        );
        return {
            columns: _columns,
            tableDatas: [],
            siteid: '',
            modalShown: false,
            modalName: '',
            selectedData: [],
            modelColumns: [
                {
                    type: "selection",
                    width: 60
                },
                { title: "测点编号", key: "mpointId" },
                { title: "区域位置", key: "siteName" },
                { title: "测点名称", key: "mpointName" },
            ],
            modelData: [],
            modalTotal: 0,
            page: 1,
            // modalUrl: pointsApi.notrelPointsByEqu,
        }
    },
    methods: {
        getSite() {
            let siteId = this.siteId
            let queryName = this.modalName
            let currentPage = this.page
            siteIdMethod({
                queryName,
                siteId,
                currentPage
            }).then(res=> {
                // console.log(res.data.total)
                let arr = res.data.items
                arr.map(item=> {
                    if(item.disabled == true) {
                        item._disabled = true
                    }
                })
                this.modelData = arr
                this.modalTotal = res.data.total
            }).catch(err=> {

            })
        },
        changeSize(size){
            this.page = size
            this.getSite()
        },
        siteCancle() {
            this.modalShown = false
            this.getSite()
            this.selectedData = []
        },
        siteSure() {
            console.log(this.selectedData)
            if(!this.selectedData.length) {
                this.$Notice.warning({title: '请选择测点'})
	            return
            }
            this.tableDatas = this.tableDatas.concat(this.selectedData)
            this.$emit('mpointsDataChange', this.tableDatas)
            this.modalShown = false
            this.selectedData = []
            this.getSite()
        },
        delMpoint(id) {
            var tableDatas = this.tableDatas
            tableDatas.forEach((item, i)=>{
                if(item.id == id) tableDatas.splice(i, 1)
            })
            this.$emit('mpointsDataChange', tableDatas)
        },
        // 清空所有已选项
        handleClearSelect (status) {
            this.selectedData = [];
            this.$refs.selection.selectAll(status);
        },
        // 选中一项，将数据添加至已选项中
        handleSelect (selection, row) {
            this.selectedData.push(row);
        },
        // 取消选中一项，将取消的数据从已选项中删除
        handleSelectCancel (selection, row) {
            const index = this.selectedData.findIndex(item => item.alarmName === row.alarmName);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            selection.forEach(item => {
                if (this.selectedData.findIndex(i => i.alarmName === item.alarmName) < 0) {
                    this.selectedData.push(item);
                }
            });
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            const selection = this.modelData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.alarmName === item.alarmName);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        }
    }
}
</script>

<style lang="less" scoped>
.equ-mpoint {
    .attach-btns {
        margin-bottom: 15px;
        .ivu-btn {
            height: auto;
            color: #fff;
            background-color: #576374;
            border: none;
            padding: 4px 12px;
            font-size: 12px;
            margin-right: 5px;
        }
    }
}
.mg-select-table-tip {
    text-align: right;
    margin: 5px;
    font-size: 13px;
    a {
        display: inline-block;
        margin-left: 10px;
    }
}
.modalPage {
    text-align: right;
    margin: 10px 0 0;
}
</style>