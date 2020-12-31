<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>库存调整信息</h3> 
            <div class="c-btns-right">
                <Button type="primary" :loading="submitLoading" @click="saveHandle()">保存</Button>
                <Button type="primary" class="c-btn-back" @click="cancel()">取消</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Row>
                    <Col span="12">
                        <FormItem label="组织信息：" prop="orgId">
                            <TreeSelect 
                                v-model="formValidate.orgId" 
                                :data="tissueData" 
                                v-width="300" 
                                @on-change="tissueChange"
                            />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="创建人员：" prop="userId">
                            <Select v-model="formValidate.userId" placeholder='请选择' style="width:300px">
                                <Option v-for="item in personList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="调整仓库：" prop="warehouseId">
                            <Select 
                                v-model="formValidate.warehouseId" 
                                placeholder="请选择" 
                                @on-change="warehouseChange"
                                style="width:300px"
                            >
                                <Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.warehouseName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="备注：" prop="remark">
                            <Input v-model="formValidate.remark"  type="textarea" style="width:300px"></Input>
                        </FormItem>
                    </Col>
                </Row>
             </Form>
        </div>
        <div class="c-top-border-gray table-wrapper">
            <div class="table-title">
                <h3>库存调整明细</h3>
                <Button @click="addHandle()">新增</Button>
            </div>
            <Table stripe :columns="tableList" :data="tableData"></Table>
            <Page :total="100" show-elevator class="page" />
        </div>
        <Modal
            v-model="modalShown"
            width="600" 
            title="选择物料">
            <div class="mg-select-table">
                <div class="mg-select-table-header">
                    <div>
                        <Input 
                            v-model="modalName" 
                            search
                            placeholder="物料编号或物料名称" 
                            style="width: 200px" 
                            @on-search="nameSearch"
                        >
                            <Button slot="append" icon="ios-search"></Button>
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
            </div>
            <div slot="footer">
                <Button @click="cancleModal()">取消</Button>
                <Button type="primary" @click="sureModal()">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { orgMethod, personMethod, wareMethod2, addMethod, addMethod1, saveAddMethod } from '@/api/store/adjust'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'

export default {
    data (){
        var that = this
        return {
            height:'',
            formValidate:{
               orgId: '',
               orgName: '',
               userId:'',
               warehouseId:'',
               remark:'',
               details: []
            },
            ruleValidate:{
                orgId: [
                    { required: true, message: '请选择组织', trigger: 'change' }
                ],
                userId: [
                    { required: true, message: '请选择人员', trigger: 'change', type: 'number' }
                ],
                warehouseId: [
                    { required: true, message: '请选择仓库', trigger: 'change', type: 'number' }
                ]
            },
            tissueData: [],
            personList: [],
            warehouseList: [],
            tableList: [
                {
                    title: '物料编号',
                    key: 'materielNumber',
                    ellipsis: true
                }, {
                    title: '物料名称',
                    key: 'materielName',
                    ellipsis: true
                }, {
                    title: '型号',
                    key: 'model',
                    ellipsis: true
                }, {
                    title: '规格',
                    key: 'standard',
                    ellipsis: true
                }, {
                    title: '库位',
                    key: 'warehousePositionName',
                    ellipsis: true
                }, {
                    title: '调前数量',
                    key: 'beforeAmount'
                }, {
                    title: '调整数量',
                    key: 'adjustNumber',
                    render(h, data) {
                        var offset = Number(data.row.afterAmount) - Number(data.row.beforeAmount),
                            color = '#333'
                        if(offset > 0) color = '#b32f2f'
                        else if(offset < 0) color = '#2f7b34'
                        return h('span', {style: {color: color}}, offset)
                    }
                }, {
                    title: '调后数量',
                    key: 'afterAmount',
                    render(h, data) {
                        return h('input', {
                            style: {width: '50px'},
                            attrs: {
                                type: 'text',
                                maxlength: '5',
                                id: 'storage_invertory_item_'+data.row.id
                            },
                            domProps: {
                                value: data.row.afterAmount || 0
                            },
                            on: {
                                input(event) {
                                    console.log(that.tableData)
                                    var v = event.target.value
                                    if(isNaN(v)) v = event.target.value = 0
                                    // data.row.afterAmount = v
                                    that.tableData[data.index].afterAmount = v
                                }
                            }
                        })
                    }
                }, {
                    title: '计量单位',
                    key: 'measurementUnit'
                }
            ],
            tableData: [],
            modalShown: false,
            modelColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '物料编号',
                    key: 'materielNumber',
                    ellipsis: true
                }, {
                    title: '物料名称',
                    key: 'materielName',
                    ellipsis: true
                }, {
                    title: '型号',
                    key: 'model',
                    ellipsis: true
                }, {
                    title: '规格',
                    key: 'standard',
                    ellipsis: true
                }, {
                    title: '计量单位',
                    key: 'measurementUnit'
                }
            ],
            modelData: [],
            selectedData: [],
            modalTotal:0,
            page: 1,
            modalName: '',
            submitLoading: false,
            trees: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getOrg()
    },
    methods: {
        getOrg() {
            orgMethod().then(res=> {
                let treeItem = []
                let trees = res.data
                this.trees =res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id.toString()
                    treeItem.push(trees[i])
                }
                this.tissueData = createTree(treeItem, 0)
            }).catch(err=> {

            })
        },
        tissueChange(id) {
            //创建人员
            this.trees.some(item=> {
                if(item.id == id) {
                    this.formValidate.orgName = item.name
                }
            })
            personMethod(id).then(res=> {
                this.personList = res.data.items
            }).catch(err=> {    

            })
            //调整仓库
            wareMethod2(id).then(res=> {
                this.warehouseList = res.data
            }).catch(err=> {    

            })
        },
        addHandle() {
            if(this.formValidate.warehouseId == '') {
                this.$Notice.warning({
                    title: '请先选择调整仓库'
                });
            } else {
                this.modalShown = true
                this.getAddList()
            }
        },
        warehouseChange(id) {
            if(this.modelData.length) {
                this.$Modal.confirm({
                    title: '仓库改变',
                    content: '<p>改变仓库后您的库存调整明细会被清空<br />您确定要改变仓库吗？</p>',
                    onOk: () => {
                        this.tableData = []
                    },
                    onCancel: () => {
                        // console.log(1)
                    }
                })
            }
        },
        getAddList() {
            let warehouseId = this.formValidate.warehouseId
            let queryName = this.modalName
            let currentPage = this.page
            addMethod({
                queryName,
                warehouseId,
                currentPage
            }).then(res=> {
                // console.log(res)
                this.modelData = res.data.items
                this.modalTotal = res.data.total
            }).catch(err=> {

            })
        },
        changeSize(num) {
            this.page = num
            this.getAddList()
        },
        nameSearch(val) {
            this.modalName = val
            this.getAddList()
        },
        cancleModal() {
            this.modalShown = false
        },
        sureModal() {
            let id = []
            this.selectedData.map(item=> {
                id.push(item.id)
            })
            let warehouseId = this.formValidate.warehouseId
            let materielIds = id
            addMethod1({
                materielIds,
                warehouseId
            }).then(res=> {
                // console.log(res)
                if(res.status == 200) {
                    this.modalShown = false
                    this.tableData = res.data
                }
            }).catch(err=> {

            })
        },
        // 清空所有已选项
        handleClearSelect (status) {
            this.selectedData = [];
            this.$refs.selection.selectAll(status)
        },
        // 选中一项，将数据添加至已选项中
        handleSelect (selection, row) {
            this.selectedData.push(row)
        },
        // 取消选中一项，将取消的数据从已选项中删除
        handleSelectCancel (selection, row) {
            const index = this.selectedData.findIndex(item => item.id === row.id)
            this.selectedData.splice(index, 1)
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            selection.forEach(item => {
                if (this.selectedData.findIndex(i => i.id === item.id) < 0) {
                    this.selectedData.push(item)
                }
            });
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            const selection = this.modelData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.id === item.id);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        },
        checkAmount() {
            var datas = this.tableData
            console.log(this.tableData)
            var valid = true
            datas.forEach((item)=>{
                console.log(item)
                if(item.afterAmount === "") valid = false
            })
            return valid
        },  
        saveHandle() {
            var datas = this.tableData
            this.formValidate.details = datas
            this.$refs['formValidate'].validate((valid) => {
                if(!datas.length) {
                    this.$Notice.warning({title: '请新增库存调整明细'})
                    return
                }
                if(!this.checkAmount()) {
                    this.$Notice.warning({title: '您有库存数量为空'})
                    return
                }
                if(valid) {
                    this.submitLoading = true
                    saveAddMethod(this.formValidate).then(res=> {
                        this.$Notice.success({title: '添加成功！'})
                        this.submitLoading = false
                        this.$router.push({
                            path: '/childPage/adjustDetail', 
                            query: {
                                id: res.data.id
                            }
                        })
                    }).catch(err=> {
                        this.submitLoading = false
                    })
                }
            })
        },
        cancel() {
            this.$router.back()
        }
    }
}
</script>
<style lang="less" scoped>
.index-box{
    margin: 5px;
    background: #fff;
    .c-left-border-blue {
        border-radius: 3px;
        padding: 5px;
        h3 {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
            font-size: 15px;
        }
        .c-btns-right {
            float: right;
            margin-top: 2px;
            .ivu-btn {
                font-size: 13px;
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 25px;
            }
            .c-btn-back {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        padding: 20px 0;
        border-top: 5px solid #f0f0f0;
        /deep/.ivu-row {
            padding-left: 20px;
        }
        .table-title{
            display:flex;
            justify-content: space-between;
            font-size: 14px;
            height: 40px;
            h3{
                text-indent: 10px;
                line-height: 30px;
                font-size: 15px;
            }
            .ivu-btn {
                font-size: 13px;
                min-width: 70px;
                margin: 0 2px;
                border: none;
                background: #576374;
                color:#fff;
                border-radius: 3px;
                height: 25px;
            }
        }
        .action{
            color:rgb(75, 126, 254);
            border:0;
            font-size:12px;
            background:transparent
        }
        .page{
            text-align: right;
            margin-top: 10px;
        }
    }
}
.mg-select-table-tip {
    text-align: right;
    line-height: 30px;
    color: #999;
    font-size: 13px;
    a {
        margin-left: 10px;
    }
}
.modalPage {
    text-align: right;
    margin: 10px 0 0;
}
</style>

