<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>调拨新增</h3> 
            <div class="c-btns-right">
                <Button type="primary" @click="submit" :loading="submitLoading">保存</Button>
                <Button type="primary" class="c-btn-back" @click="backClick">取消</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Row>
                    <Col span="12">
                        <FormItem label="组织信息：" prop="orgId">
                            <TreeSelect v-model="formValidate.orgId" :data="orgList" v-width="300" @on-change="orgChange" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="创建人员：" prop="userId">
                            <Select 
                                v-model="formValidate.userId" 
                                placeholder='请选择' 
                                style="width:300px" 
                                :label-in-value="true" 
                                @on-change="selectUser"
                            >
                                <Option v-for="(item, index) in storeMember" :value="item.id" :key="index">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="出库仓库：" prop="warehouseOutId">
                            <Select 
                                v-model="formValidate.warehouseOutId" 
                                :label-in-value="true"
                                @on-change="outIdChange"
                                placeholder='请选择' 
                                style="width:300px"
                            >
                                <Option v-for="(item,index) in warehouseByOut" :value="item.id" :key="item.id">{{ item.warehouseName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                         <FormItem label="入库仓库：" prop="warehouseInId">
                            <Select 
                                v-model="formValidate.warehouseInId" 
                                :label-in-value="true"
                                @on-change="inIdChange"
                                placeholder='请选择' 
                                style="width:300px"
                            >
                                <Option v-for="(item,index) in warehouseByIn" :value="item.id" :key="item.id">{{ item.warehouseName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
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
                <Button @click="addRow">新增</Button>
            </div>
            <Table stripe :columns="tableList" :data="listData" :loading="loading"></Table>
        </div>
        <Modal
            v-model="modalShown"
            title="选择物料"
            width="800">
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
import { orgMethod, warePersonMethod, wareMethod1, wareMethod2, listMethod, saveMethod } from '@/api/store/allot'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'
var cacheDataByList = []

export default {
    name:'allotAdd',
    data (){
        var _self = this
        return {
            height:'',
            formValidate:{
               // 组织信息
                orgId: '',
                orgName: '',
                // 出库仓库
                warehouseOutId: '',
                // 入库仓库
                warehouseInId: '',
                // 创建人员
                userId: '',
                // 备注
                remark: ''
            },
            ruleValidate:{
                orgId: [
                    { required: true, message: '请选择组织信息', trigger: 'change' }
                ],
                userId: [
                    { required: true, message: '请选择创建人员', trigger: 'change', type: 'number' }
                ],
                warehouseOutId: [
                    { required: true, message: '请选择出库仓库', trigger: 'change', type: 'number' }
                ],
                warehouseInId: [
                    { required: true, message: '请选择入库仓库', trigger: 'change', type: 'number' }
                ],
            },
            submitLoading: false,
            trees: [],
            orgList: [],
            storeMember: [],
            warehouseByOut: [],
            warehouseByIn: [],
            // 出库仓库选中缓存数据
            warehouseOut:{
                id:'',
                name:''
            },
            // 入库仓库选中缓存数据
            warehouseIn:{
                id:'',
                name:''
            },
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
                    title: '出库库位',
                    key: 'warehousePositionOutName',
                    ellipsis: true
                }, {
                    title: '出库库存数量',
                    key: 'storageAmount',
                    ellipsis: true
                }, {
                    title: '入库库位',
                    key: 'warehousePositionInName',
                    render: (h, data) => {
                        return h("div", [
                            h(
                                "Select",
                                {
                                    props: {
                                        "label-in-value": true,
                                        value: _self.listData[data.index].warehousePositionInName||'',
                                        filterable: true,
                                        remote: true,
                                        "remote-method": _self.remoteMethodByPositionIn,
                                        loading: _self.loadingByIn
                                    },
                                    on: {
                                        "on-change": item => {
                                            Object.assign(_self.listData[data.index],{
                                                warehousePositionInName: item.label,
                                                warehousePositionInId: item.value
                                            })
                                        },
                                        "on-open-change":status=>{
                                            if(status){
                                                _self.storagePosByIn = [];
                                                _self.remoteMethodByPositionIn(_self.listData[data.index].warehousePositionInName)
                                            }
                                        }
                                    }
                                },
                                    _self.storagePosByIn.map(function(item) {
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
                    title: '调拨数量',
                    key: 'amount',
                    render: (h, data) => {
                        return h("div", [
                            h("InputNumber", {
                                props: {
                                    value: data.row.amount||0
                                },
                                on: {
                                    input: newValue => {
                                        _self.listData[data.index].amount=newValue;
                                    }
                                }
                            })
                        ]);
                    }
                }, {
                    title: '计量单位',
                    key: 'measurementUnit'
                }
            ],
            listData: [],
            storagePosByOut: [],
            storagePosByIn: [],
            loading: false,
            loadingByIn: false,
            modalShown: false,
            modalName: '',
            selectedData: [],
            modelColumns: [
                { type: "selection", width: 60 },
                { title: "物料编号", key: "materielNumber", ellipsis: true },
                { title: "物料名称", key: "materielName", ellipsis: true },
                { title: "型号", key: "model", ellipsis: true },
                { title: "规格", key: "standard", ellipsis: true },
                { title: "计量单位", key: "measurementUnit", ellipsis: true },
                { title: "库位", key: "warehousePositionOutName", ellipsis: true }
            ],
            modelData: [],
            modalTotal:0,
            page: 1
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
                    trees[i].value = trees[i].id.toString()
                    treeItem.push(trees[i])
                }
                this.orgList = createTree(treeItem, 0)
            }).catch(err=> {

            })
        },
        orgChange(id) {
            this.formValidate = {
                orgId: id,
                warehouseOutId: '',
                warehouseOutName: '',
                warehouseInId: '',
                warehouseInName: '',
                userId: '',
                remark: ''
            }
            this.trees.map(item=> {
                if(item.id == id) {
                    this.formValidate.orgName = item.name
                }
            })

            this.warehouseCombo = []
            this.warehouseByOut = []
            this.warehouseByIn = []

            warePersonMethod(id).then(res=> {
                this.storeMember = res.data.items
            })

            wareMethod1(id).then(res=> {
                this.warehouseByOut = res.data
                this.warehouseByIn = res.data
                this.warehouseCombo = res.data
            })
        },  
        // 选择创建人员
        selectUser(item) {
            this.formValidate.userName = item.label
        },
        //出库仓库
        outIdChange(item) {
            if(this.warehouseOut.id && this.warehouseIn.id && this.warehouseOut.id != item.value) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "请确认更改出库仓库，更改后将清空已增加的调拨明细列表",
                    onOk: () => {
                        this.warehouseOut.id = item.vale
                        this.warehouseOut.name = item.label
                        this.formValidate.warehouseOutName = item.label
                        // 初始化新增物料选择弹框
                        this.initSelectTable({
                            warehouseOutId: item.value,
                            warehouseInId: this.formValidate.warehouseInId
                        })
                        // TODO：从入库仓库的列表过滤掉已选的出库仓库
                        this.warehouseByIn = []
                        this.warehouseCombo.forEach(element=> {
                            if(element.id != item.value) {
                                this.warehouseByIn.push(Object.assign({},element))
                            }
                        })
                    },
                    onCancel:()=>{
                        this.formValidate.warehouseOutId = this.warehouseOut.id
                        this.formValidate.warehouseOutName = this.warehouseOut.name
                    }
                })
            } else {
                if(!this.warehouseOut.id && this.warehouseIn.id) {
                    // 已选入库仓库，第一次选出库仓库时
                    // 初始化新增物料选择弹框
                    this.initSelectTable({
                        warehouseOutId: item.value,
                        warehouseInId: this.formValidate.warehouseInId
                    });
                }
                // TODO：从入库仓库的列表过滤掉已选的出库仓库
                this.warehouseByIn = []
                this.warehouseCombo.forEach(element=> {
                    if(element.id != item.value){
                        this.warehouseByIn.push(Object.assign({},element))
                    }
                })
                this.warehouseOut.id = item.value
                this.warehouseOut.name = item.label
                this.formValidate.warehouseOutName = item.label
            }
        },
        //入库仓库
        inIdChange(item) {
            // 当不是第一次选择入库仓库且出库仓库不为空且选择与上次不同仓库时，弹出确认框
            if(this.warehouseIn.id && this.warehouseOut.id && this.warehouseIn.id != item.value) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "请确认更改入库仓库，更改后将清空已增加的调拨明细列表",
                    onOk: () => {
                        this.warehouseIn.id = item.value
                        this.warehouseIn.name = item.label
                        this.formValidate.warehouseInName = item.label
                        // 初始化新增物料选择弹框
                        this.initSelectTable({
                            warehouseOutId: this.formValidate.warehouseOutId,
                            warehouseInId: item.value
                        });
                        // 刷新库位列表
                        this.loadingByIn = true
                        this.getPositionComboxListByIn({
                            warehouseId: item.value,
                            queryName: ''
                        },function(res){
                            this.loadingByIn = false
                            this.storagePosByIn = res
                        });
                        // TODO：从出库仓库的列表过滤掉已选的入库仓库
                        this.warehouseByOut = []
                        this.warehouseCombo.forEach(element=>{
                            if(element.id != item.value) {
                                this.warehouseByOut.push(Object.assign({},element))
                            }
                        })
                    },
                    onCancel:()=>{
                        this.formValidate.warehouseInId = this.warehouseIn.id
                        this.formValidate.warehouseInName = this.warehouseIn.name
                    }
                });
            } else {
                if(!this.warehouseIn.id) {
                    if(this.warehouseOut.id) { 
                        // 已选出库仓库，第一次选入库仓库时
                        // 初始化新增物料选择弹框
                        this.initSelectTable({
                            warehouseOutId: this.formValidate.warehouseOutId,
                            warehouseInId: item.value
                        })
                    }
                    // 刷新库位列表
                    this.loadingByIn = true
                    this.getPositionComboxListByIn({
                        warehouseId: item.value,
                        queryName: ''
                    }, function(res){
                        this.loadingByIn = false
                        this.storagePosByIn = res
                    })
                }
                 // TODO：从出库仓库的列表过滤掉已选的入库仓库
                this.warehouseByOut = []
                this.warehouseCombo.forEach(element=> {
                if(element.id != item.value) {
                    this.warehouseByOut.push(Object.assign({},element))
                }
                })
                this.warehouseIn.id = item.value
                this.warehouseIn.name = item.label
                this.formValidate.warehouseInName = item.label
            }
        },
        initSelectTable(params) {
            this.listData = []
            // 重新拉取指定仓库下的物料列表(清空弹框中的已选物料)
            this.getList()
            // this.$refs.selectTable.getData(params)
        },
        // 远程获取库位信息入库库位
        remoteMethodByPositionIn(query) {
            this.loadingByIn = true;
            this.getPositionComboxListByIn({
                warehouseId: this.formValidate.warehouseInId,
                queryName: query
            })
        },
        // 查询指定仓库下以关键字开头的五个入库库位信息
        getPositionComboxListByIn(params, callback){
            wareMethod2(params).then(res => {
                this.loadingByIn = false
                this.storagePosByIn = res.data
            })
        },
        addRow() {
            if(this.formValidate.warehouseOutId && this.formValidate.warehouseInId) {
                this.modalShown = true
            } else {
                this.$Notice.warning({title: "请先选择出库仓库和入库仓库"});
            }
        },
        getList() {
            let queryName = this.modalName
            let currentPage = this.page
            let warehouseOutId = this.formValidate.warehouseOutId
            let warehouseInId = this.formValidate.warehouseInId
            listMethod({
                queryName,
                currentPage,
                warehouseOutId,
                warehouseInId
            }).then(res=> {
                this.modelData = res.data.items
                this.modalTotal = res.data.total
            }).catch(err=> {

            })
        },
        changeSize(num) {
            this.page = num
            this.getList()
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
            const selection = this.modelData
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.id === item.id);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
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
            this.listData.forEach(element=>{
                cacheDataByList.push(Object.assign({}, element))
            })
            this.listData = []
            this.selectedData.forEach(element => {
                var currentElement = element
                cacheDataByList.forEach(item => {
                    if(element.id == item.id){
                        currentElement = Object.assign({}, element, item)
                    }
                })
                this.listData.push(Object.assign({}, currentElement))
            })
            this.listData.forEach(element => {
                var amount = element.amount
                delete element.amount
                if(!amount) {
                    element.amount = 0
                } else {
                    element.amount = amount
                }
            });
        },  
        submit() {
            this.$refs['formValidate'].validate(valid => {
                if(valid) {
                    if(this.listData.length == 0) {
                        this.$Notice.warning({title: "请增加调拨明细"})
                        return false
                    }
                    // 检测调拨明细中入库库位是否填写
                    var flag = this.listData.every((element,index) => {
                        if(!element.warehousePositionInId) {
                            this.$Notice.warning({title: "请选择第"+(index+1)+"行中入库库位"})
                            return false
                        } else {
                            return true
                        }
                    })
                    if(!flag) {
                        return false
                    }
                    this.submitLoading = true
                    this.formValidate.details = this.listData.slice(0)
                    saveMethod(this.formValidate).then(res=> {
                        this.submitLoading = false
                        if(res.data.id) {
                            this.$Notice.success({
                                title: '保存成功！',
                            })
                            // 跳转到详情页
                            this.$router.push({
                                path: '/childPage/allotDetail',
                                query: { id: res.data.id }
                            })
                        }
                    }).catch(err=> {
                        this.submitLoading = false
                    })
                }
            })
        },  
        backClick() {
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
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 28px;
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
                height: auto;
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
/deep/.ivu-table-wrapper {
    overflow: visible;
}
</style>