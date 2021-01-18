<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>出库新增</h3> 
            <div class="c-btns-right">
                <Button type="primary" :loading="submitLoading" @click="submit()">保存</Button>
                <Button type="primary" class="c-btn-back" @click="backClick()">取消</Button>
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
                        <FormItem label="出库仓库：" prop="warehouseNo">
                            <Select 
                                v-model="formValidate.warehouseNo" 
                                placeholder='请选择' 
                                style="width:300px"
                                :label-in-value="true"
                                @on-change="warehouseChange"
                            >
                                <Option v-for="item in warehouseCombo" :value="item.warehouseNo" :key="item.warehouseNo">{{ item.warehouseName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="出库人员：" prop="userId">
                            <Select v-model="formValidate.userId" placeholder='请选择' style="width:300px">
                                <Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="申请人员：" prop="applicantId">
                            <Select v-model="formValidate.applicantId" placeholder='请选择' style="width:300px">
                                <Option v-for="item in applicantList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                   <Col span="12">
                        <FormItem label="出库时间：" prop="outPutDate">
                           <DatePicker v-model="formValidate.outPutDate" type="date" placeholder="请选择入库时间" style="width: 300px"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="申请用途：">
                          <Input v-model="formValidate.applicantPurpose" type="textarea" style="width:300px"></Input>
                        </FormItem>
                    </Col>
                </Row>
             </Form>
        </div>
        <div class="c-top-border-gray table-wrapper">
            <div class="table-title">
                <h3>出库明细</h3>
                <Button @click="addRow">新增</Button>
            </div>
            <Table stripe :columns="tableList" :data="tableData"></Table>
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
import { orgMethod, wareMethod1, applyMethod, warePersonMethod, listMethod1, saveMethod, method } from '@/api/store/out'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'
var cacheDataByList = []

export default {
    data (){
        var _self = this
        return {
            height:'',
            submitLoading: false,
            formValidate:{
               // 组织信息
                orgId: '',
                orgName: '',
                // 出库仓库
                warehouseNo: '',
                warehouseName: '',
                // 出库人员
                userId: '',
                // 申请人员
                applicantId: '',
                // 出库时间
                outPutDate: '',
                // 申请用途
                applicantPurpose: ''
            },
            orgList: [],
            warehouseCombo: [],
            applicantList: [],
            userList: [],
            // 出库仓库选中缓存数据
            warehouse:{
                no: '',
                name: ''
            },
            ruleValidate:{
                orgId: [
                    { required: true, message: '请选择组织', trigger: 'change' }
                ],
                warehouseNo: [
                    { required: true, message: '请选择出库仓库', trigger: 'change' }
                ],
                userId: [
                    { required: true, message: '请选择出库人员', trigger: 'change', type: 'number' }
                ],
                applicantId: [
                    { required: true, message: '请选择申请人员', trigger: 'change', type: 'number' }
                ],
                outPutDate: [
                    { required: true, message: '请选择出库时间', trigger: 'change', type: 'date' }
                ]
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
                }, {
                    title: '库位',
                    key: 'locationName',
                    ellipsis: true
                }, {
                    title: '出库数量',
                    key: 'amount'
                }, {
                    title: '出库数量',
                    key: 'outAmount',
                    render: (h, data) => {
                        return h("div", [
                            h("InputNumber", {
                                props: {
                                    value: _self.tableData[data.index].outAmount||0
                                },
                                on: {
                                    input: newValue => {
                                        _self.tableData[data.index].outAmount = newValue
                                        _self.tableData[data.index] = data.row
                                    }
                                }
                            })
                        ]);
                    }
                }
            ],
            tableData: [],
            modalShown: false,
            modalName: '',
            selectedData: [],
            modelColumns: [
                { type: "selection", width: 60 },
                { title: "物料编号", key: "materielNumber", ellipsis: true },
                { title: "物料名称", key: "materielName", ellipsis: true },
                { title: "物料类别", key: "categoryName", ellipsis: true },
                { title: "ABC分类", key: "abc", ellipsis: true },
                { title: "品牌", key: "brand", ellipsis: true },
                { title: "型号", key: "model", ellipsis: true },
                { title: "规格", key: "standard", ellipsis: true },
                { title: "库位", key: "locationName", ellipsis: true }
            ],
            modelData: [],
            modalTotal:0,
            page: 1,
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
                warehouseNo: '',
                userId: '',
                applicantId: '',
                outPutDate: '',
                applicantPurpose: ''
            }
            this.trees.map(item=> {
                if(item.id == id) {
                    this.formValidate.orgName = item.name
                }
            })
            wareMethod1(id).then(res=> {
                this.warehouseCombo = res.data
            })

            applyMethod(id).then(res=> {
                this.applicantList = res.data
            })

            warePersonMethod(id).then(res=> {
                this.userList = res.data.items
            })
        },
        warehouseChange(item) {
            var params = {warehouseNo: item.value}
            if(this.warehouse.no && this.warehouse.no != item.value) {
                this.$Modal.confirm({
                    title: "提示",
                    content: "请确认更改出库仓库，更改后将清空已增加的出库明细列表",
                    onOk: () => {
                        this.warehouse.no = item.value
                        this.warehouse.name = item.label
                        this.formValidate.warehouseName = item.label
                        // 初始化新增物料选择弹框
                        this.getList()
                        this.tableData = []
                        // 刷新库位列表
                        // this.getPositionComboxList(params)
                    },
                    onCancel:()=>{
                        this.formValidate.warehouseNo = this.warehouse.no
                        this.formValidate.warehouseName = this.warehouse.name
                    }
                });
            } else {
                // 当第一次选择出库仓库时
                if(!this.warehouse.no) {
                    //初始化新增物料选择弹框
                    this.getList();
                    this.tableData = []
                // 刷新库位列表
                // this.getPositionComboxList(params);
                }
                this.warehouse.no = item.value
                this.warehouse.name = item.label
                this.formValidate.warehouseName = item.label
            }
        },
        getList() {
            let warehouseNo = this.formValidate.warehouseNo
            let queryName = this.modalName
            let currentPage = this.page
            listMethod1({
                warehouseNo,
                queryName,
                currentPage
            }).then(res=> {
                this.modelData = res.data.items
                this.modalTotal = res.data.total
            })
        },
        // 新增出库明细
        addRow() {
            if(this.formValidate.warehouseNo){
                this.modalShown = true
            }else{
                this.$Notice.warning({title:"请先选择出库仓库"})
            }
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
                var outAmount = element.outAmount
                delete element.outAmount
                if(!outAmount) {
                    element.outAmount = 0
                } else {
                    element.outAmount = outAmount
                }
            })
        },
        backClick() {
            this.$router.back()
        },
        submit() {
            this.$refs['formValidate'].validate(valid => {
                if (valid) {
                    if(this.tableData.length == 0) {
                        this.$Notice.warning({title: "请增加出库明细"})
                        return false
                    }
                    var flag = this.tableData.every((element,index) => {
                        if(!element.warehouseLocationNoId) {
                            this.$Notice.warning({title:"请选择第"+(index+1)+"行中出库库位"})
                            return false
                        } else {
                            return true
                        }
                    })
                    if(!flag){
                        return false;
                    }
                    this.submitLoading = true
                    this.formValidate.outboundDetailVos = this.tableData.slice(0)
                    saveMethod(this.formValidate).then(res=> {
                        this.submitLoading = false
                        if(res.data.id) {
                            this.$Notice.success({
                                title: '保存成功！',
                            });
                            // 跳转到详情页
                            this.$router.push({
                                path: '/childPage/outDetail',
                                query: { id: res.data.id }
                            })
                        }
                    }).catch(()=>{
                        this.submitLoading = false
                    })
                }
            })
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
                height: auto;
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
            .ivu-btn {
                height: auto;
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