<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>入库新增</h3> 
            <div class="c-btns-right">
                <Button type="primary" @click="submit()" :loading="submitLoading">保存</Button>
                <Button type="primary" class="c-btn-back" @click="back()">取消</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Row>
                    <Col span="12">
                        <FormItem label="所属组织：" prop="orgId">
                            <TreeSelect v-model="formValidate.orgId" :data="orgList" v-width="300" @on-change="orgChange" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="入库仓库：" prop="warehouseNo">
                            <Select 
                                v-model="formValidate.warehouseNo" 
                                placeholder='请选择' 
                                style="width:300px"
                                :label-in-value="true"
                                @on-change="warehouseChange"
                            >
                                <Option v-for="item in warehouseList" :value="item.warehouseNo" :key="item.warehouseNo">{{ item.warehouseName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="入库人员：" prop="userId">
                            <Select v-model="formValidate.userId" placeholder='请选择' style="width:300px">
                                <Option v-for="item in warePersonList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="入库时间：" prop="createDate">
                        <DatePicker v-model="formValidate.createDate" type="date" placeholder="请选择入库时间" style="width: 300px"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
        <div class="c-top-border-gray table-wrapper">
            <div class="table-title">
                <h3>入库明细</h3>
                <Button @click="addBtn()">新增</Button>
            </div>
            <Table stripe :columns="tableList" :data="tableData"></Table>\
        </div>

        <Modal v-model="modalShown" width="800" title="选择物料">
            <div class="mg-select-table">
                <div class="mg-select-table-header">
                    <div>
                        <Input 
                            v-model="modalName" 
                            search
                            placeholder="物料编号或物料名称" 
                            style="width: 230px" 
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
import { orgMethod, wareMethod1, warePersonMethod, wareListMethod, chooseMethod, saveMethod } from '@/api/store/put'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'
var cacheDataByList = []

export default {
    data (){
        var _self = this
        return {
            height:'',
            formValidate:{
               orgId:'',
               orgName: '',
               warehouseNo:'',
               warehouseName: '',
               userId:'',
               createDate:'',
               inboundDetails: []
            },
            orgList: [],
            warehouseList: [],
            warePersonList: [],
            ruleValidate:{
                orgId: [
                    { required: true, message: '请选择组织', trigger: 'change', type: 'number' }
                ],
                warehouseNo: [
                    { required: true, message: '请选择入库仓库', trigger: 'change' }
                ],
                userId: [
                    { required: true, message: '请选择入库人员', trigger: 'change', type: 'number' }
                ],
                createDate: [
                    { required: true, message: '请选择入库时间', trigger: 'change', type: 'date' }
                ]
            },
            submitLoading: false,
            modalShown: false,
            modalTotal:0,
            page: 1,
            modalName: '',
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
                    title: '物料类别',
                    key: 'categoryName',
                    ellipsis: true
                }, {
                    title: 'ABC分类',
                    key: 'abc'
                }, {
                    title: '品牌',
                    key: 'brand',
                    ellipsis: true
                }, {
                    title: '型号',
                    key: 'model',
                    ellipsis: true
                }, {
                    title: '规格',
                    key: 'standard',
                    ellipsis: true
                }
            ],
            modelData: [],
            selectedData: [],
            tableList: [
                {
                    title: '物料编号',
                    key: 'materielNumber'
                }, {
                    title: '物料名称',
                    key: 'materielName'
                }, {
                    title: '物料类别',
                    key: 'categoryName'
                }, {
                    title: 'ABC分类',
                    key: 'abc'
                }, {
                    title: '品牌',
                    key: 'brand'
                }, {
                    title: '型号',
                    key: 'model'
                }, {
                    title: '规格',
                    key: 'standard'
                }, {
                    title: '库位',
                    key: 'warehouseLocationNo',
                    render: (h, data) => {
                        return h("div", [
                            h(
                                "Select", { 
                                    props: {
                                        "label-in-value": true,
                                        value: data.row.warehouseLocationNo,
                                        filterable: true,
                                        remote: true,
                                        "remote-method": _self.remoteMethodByPosition,
                                        loading: _self.loadingByPosition
                                    },
                                    on: {
                                        "on-change": item => {
                                            Object.assign(_self.tableData[data.index],{
                                                warehouseLocationNo: item.label,
                                                warehouseLocationNoId: item.value
                                            })
                                        },
                                        "on-open-change":status=>{
                                            if(status) {
                                                if(!_self.formValidate.warehouseNo){
                                                    _self.$Notice.warning({title: "请先选择入库仓库"})
                                                    return false;
                                                }
                                                _self.storagePos = []
                                                _self.remoteMethodByPosition(_self.tableData[data.index].warehouseLocationNo)
                                            }
                                        }
                                    }
                                },
                                _self.storagePos.map(function(item) {
                                    return h("Option", {
                                        props: {
                                            value: item.id,
                                            label: item.locationNo
                                        }
                                    });
                                })
                            )
                        ]);
                    }
                }, {
                    title: '入库数量',
                    key: 'amount',
                    render: (h, data) => {
                        return h("div", [
                            h("InputNumber", {
                                props: {
                                    value: data.row.amount || 0
                                },
                                on: {
                                    input: newValue => {
                                        _self.tableData[data.index].amount = newValue
                                    }
                                }
                            })
                        ])
                    }
                },
            ],
            tableData: [],
            loadingByPosition: false,
            storagePos: [],
            warehouseCombo: [],
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
                this.trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.orgList = createTree(treeItem, 0)
            }).catch(err=> {

            })
        },
        orgChange(id) {
            this.formValidate = {
                orgId: id,
                orgName: '',
                warehouseNo:'',
                userId:'',
                createDate:'',
                inboundDetails: []
            }
            this.trees.map(item=> {
                if(item.id == id) {
                    this.formValidate.orgName = item.name
                }
            })
            this.tableData = []
            this.selectedData = []
            wareMethod1(id).then(res=> {
                this.warehouseList = res.data
            })

            warePersonMethod(id).then(res=> {
                this.warePersonList = res.data.items
            })

            this.getList()
        },
        warehouseChange(val) {
            var params = {
                warehouseNo: val.value
            }
            this.formValidate.warehouseName = val.label
            this.getPositionComboxList(params)
        },
        addBtn() {
            if(this.formValidate.orgId){
                this.modalShown = true
            }else{
                this.$Notice.warning({
                    title: "请先选择所属组织"
                })
            }
        },
        getList() {
            let queryName = this.modalName
            let currentPage = this.page
            let orgIds = this.formValidate.orgId
            wareListMethod({
                queryName,
                orgIds,
                currentPage
            }).then(res=> {
                this.modelData = res.data.items
                this.modalTotal = res.data.total
            })
        },
        changeSize(num) {
            this.page = num
            this.getList()
        },
        cancleModal() { 
            this.modalShown = false
        },
        sureModal() {
            if(!this.selectedData.length) {
                this.$Notice.warning({
                    title: '请选择物料'
                })
                return
            }
            this.modalShown = false

            cacheDataByList = []
            // 缓存原列表新增的数据
            this.tableData.forEach(element=>{
                cacheDataByList.push(Object.assign({}, element))
            })
            this.tableData = []
            this.selectedData.forEach(element => {
                var currentElement = element
                cacheDataByList.forEach(item => {
                    if(element.id == item.id){
                        currentElement = Object.assign({}, element, item)
                    }
                })
                this.tableData.push(Object.assign({}, currentElement))
            })
            this.tableData.forEach(element => {
                var amount = element.amount
                delete element.amount
                if(!amount) {
                    element.amount = 0
                } else {
                    element.amount = amount
                }
            })
        },
        nameSearch(val) {
            this.modalName = val
            this.getList()
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
        // 远程获取库位信息
        remoteMethodByPosition(query) {
            this.getPositionComboxList({
                warehouseNo: this.formValidate.warehouseNo,
                queryName: query
            })
        },
        // 查询指定仓库下以关键字开头的五个库位信息
        getPositionComboxList(params) {
            console.log(params)
            this.loadingByPosition = true
            chooseMethod(params.warehouseNo).then(res=> {
                console.log(res)
                this.loadingByPosition = false
                this.storagePos = res.data
            })
        },
        checkAmount() {
            var datas = this.tableData
            var valid = true
            datas.forEach((item)=>{
                if(item.afterAmount === "") valid = false
            })
            return valid
        },  
        submit() {
            this.$refs['formValidate'].validate((valid) => {
                if(valid) {
                    if(this.tableData.length == 0) {
                        this.$Notice.warning({title: "请增加入库明细"})
                        return false
                    }
                }
                // 检测调拨明细中入库库位/入库数量是否填写
                var flag = this.tableData.every((element,index) => {
                    if(!element.warehouseLocationNoId){
                        this.$Notice.warning({title:"请选择第"+(index+1)+"行中入库库位"})
                        return false
                    } else {
                        return true
                    }
                })
                if(!flag) {
                    return false
                }
                this.submitLoading = true
                this.formValidate.inboundDetails = this.tableData.slice(0)
                saveMethod(this.formValidate).then(res=> {
                    this.submitLoading = false
                    if(res.data.id){
                        this.$Notice.success({
                            title: '保存成功！',
                        })
                        // 跳转到详情页
                        this.$router.push({
                            path: '/childPage/putDetail',
                            query: { id: res.data.id }
                        })
                    }
                }).catch(err=> {
                    this.submitLoading = false
                })
            })  
        },
        back() {
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
            button {
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 28px;
                font-size: 12px;
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
            button {
                min-width: 70px;
                margin: 0 2px;
                border: none;
                background: #576374;
                color:#fff;
                border-radius: 3px;
                height: 25px;
                 font-size: 12px;
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
/deep/.ivu-table-wrapper {
    overflow: visible;
}
</style>