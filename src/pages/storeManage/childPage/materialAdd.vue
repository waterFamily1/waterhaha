<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>物料新增</h3> 
            <div class="c-btns-right">
                <Button type="primary" :loading="submitLoading" @click="save()">保存</Button>
                <Button type="primary" class="c-btn-back" @click="backClick()">取消</Button>
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
                        <FormItem label="物料名称：" prop="materielName">
                            <Input v-model="formValidate.materielName" style="width: 300px"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="物料类别：" prop="materielCategoryId">
                            <Select v-model="formValidate.materielCategoryId" style="width:300px">
                                <Option v-for="item in materielCategoryArr" :value="item.id.toString()" :key="item.id.toString()">{{ item.categoryName }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="ABC分类：" prop="abc">
                            <Select v-model="formValidate.abc" style="width:300px">
                                <Option
                                v-for="(item, index) in ABCClassify"
                                :value="item.value"
                                :key="index"
                                >{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="计量单位：" prop="measurementUnit">
                            <Select v-model="formValidate.measurementUnit" placeholder='请选择' style="width:300px">
                                <Option v-for="(item, index) in unitList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                         <FormItem label="规格：" prop="standard">
                             <Input v-model="formValidate.standard" style="width: 300px" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="品牌：">
                            <Input v-model="formValidate.brand" style="width: 300px" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                         <FormItem label="型号：">
                             <Input v-model="formValidate.model"  style="width: 300px" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="备注：">
                            <Input v-model="formValidate.remark"  style="width: 300px" type="textarea"/>
                        </FormItem>
                    </Col>
                    
                </Row>
             </Form>
        </div>
        <div class="c-top-border-gray table-wrapper">
            <div class="table-title">
                <h3>存储上下限</h3>
                <Button @click="addRow()">新增</Button>
            </div>
            <Table stripe :columns="tableList" :data="formValidate.materielStockLimits" :loading="loading"></Table>
        </div>
    </div>
</template>
<script>
import { orgMethod, unitMethod, materielMethod, saveMethod, wareMethod } from '@/api/store/materialInfor'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'
var warehouseCombo = []

export default {
    name:'materialAdd',
    data (){
        var _self = this
        return {
            height:'',
            formValidate:{
               // 组织信息
                orgId: '',
                orgName: '',
                // 物料名称
                materielName: '',
                // 物料类别
                materielCategoryId: '',
                // ABC分类
                abc: '',
                // 计量单位
                measurementUnit: '',
                // 规格
                standard: '',
                // 品牌
                brand: '',
                // 型号
                model: '',
                // 备注
                remark: '',
                // 存储上下限信息
                materielStockLimits: []
            },
            ruleValidate:{
                orgId: [
                    { required: true, message: '请选择组织', trigger: 'change' }
                ],
                materielName: [
                    { required: true, message: '物料名称不能为空', trigger: 'change' }
                ],
                materielCategoryId: [
                    { required: true, message: '请选择物科类别', trigger: 'change' }
                ],
                abc: [
                    { required: true, message: '请选择ABC分类', trigger: 'change' }
                ],
                measurementUnit: [
                    { required: true, message: '请选择计量单位', trigger: 'change' }
                ],
                standard: [
                    { required: true, message: '规格不能为空', trigger: 'change' }
                ]
            },
            submitLoading: false,
            orgList: [],
            trees: [],
            unitList: [],
            ABCClassify: [
                {
                    label: "A",
                    value: "A"
                }, {
                    label: "B",
                    value: "B"
                }, {
                    label: "C",
                    value: "C"
                }
            ],
            materielCategoryArr: [],
            tableList: [
                {
                    title: '仓库名称',
                    key: 'warehouseName',
                    render: (h, data) => {
                        return h("Select", 
                            {
                                props: {
                                    placeholder: "请选择",
                                    value: data.row.warehouseNo,
                                    "label-in-value": true
                                },
                                on: {
                                    "on-change": item => {
                                        data.row.warehouseNo = item.value
                                        data.row.warehouseName = item.label
                                        _self.formValidate.materielStockLimits[data.index] = data.row
                                    }
                                }
                            },
                            warehouseCombo.map(function(item, index) {
                                return h("Option", {
                                    props: {
                                        value: item.warehouseNo,
                                        label: item.warehouseName
                                    }
                                });
                            })
                        );
                    }
                }, {
                    title:'下限',
                    key: 'lower',
                    render: (h, data) => {
                        return h("div", [
                            h("InputNumber", {
                                props: {
                                    min: 0,
                                    precision: 2,
                                    value: data.row.lower
                                },
                                on: {
                                    input: newValue => {
                                        data.row.lower = newValue
                                        _self.formValidate.materielStockLimits[data.index] = data.row
                                    }
                                }
                            })
                        ]);
                    }
                }, {
                    title:'上限',
                    key: 'upper',
                    render: (h, data) => {
                        return h("div", [
                            h("InputNumber", {
                                props: {
                                    min: 0,
                                    precision: 2,
                                    value: data.row.upper
                                },
                                on: {
                                    input: newValue => {
                                        data.row.upper = newValue
                                        _self.formValidate.materielStockLimits[data.index] = data.row
                                    }
                                }
                            })
                        ]);
                    }
                }, {
                    title: '操作',
                    key: 'act',
                    width: 150,
                    align: 'center',
                    render: (h, data) => {
                        return h("div",[ 
                            h("a",{
                                attrs: { href: "javascript:;" },
                                style: {
                                    color: "#346C93",
                                    margin: "0 10px 0 0"
                                },
                                on: {
                                    click: () => {
                                        _self.formValidate.materielStockLimits.splice(data.index, 1);
                                    }
                                },
                            },"删除")
                        ])
                    }
                }
            ],
            loading: false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getOrg()
        this.getUnit()
        this.getWare()
    },
    methods:{
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
            this.trees.map(item=> {
                if(item.id == id) {
                    this.formValidate.orgName = item.name
                }
            })
            materielMethod(id).then(res=> {
                this.materielCategoryArr = res.data
            })
        },
        getUnit() {
            unitMethod().then(res=> {
                this.unitList = res.data
            })
        },
        getWare() {
            wareMethod().then(res=> {
                warehouseCombo = res.data
            })
        },
        save() {
            var _self = this
            this.$refs['formValidate'].validate(valid => {
                if(valid) {
                    if(this.formValidate.materielStockLimits.length == 0) {
                        this.$Modal.confirm({
                            title: "提示",
                            content: "尚未增加存储上下限，确认提交吗？",
                            onOk: () => {
                                this.submitLoading = true
                                saveMethod(this.formValidate).then(res=> {
                                    this.submitLoading = false
                                    if(res.data.id) {
                                        this.$Notice.success({
                                            title: "保存成功！"
                                        })
                                        _self.$router.push({
                                            path: '/childPage/materialDetail',
                                            query: { 
                                                id: res.data.id 
                                            }
                                        });
                                    }
                                }).catch(() => {
                                    this.submitLoading = false
                                })
                            },
                            onCancel: () => {}
                        });
                    } else {
                        var hasNoSubmitRow = false
                        var hasNoSubmitRow = _self.params.materielStockLimits.some((element,index) => {
                            if (!element.warehouseName) {
                                _self.$Notice.warning({ title:"请选择第"+(index+1)+"行中的仓库名称"})
                                return true
                            }
                            if (!element.lower) {
                                _self.$Notice.warning({ title: "请输入第"+(index+1)+"行中的下限" })
                                return true
                            }
                            if (!element.upper) {
                                _self.$Notice.warning({ title: "请输入第"+(index+1)+"行中的上限" })
                                return true
                            }
                            if (element.upper < element.lower) {
                                _self.$Notice.warning({ title: "第"+(index+1)+"行中输入的上限不应该小于下限" })
                                return true
                            }
                            return false
                        })
                        // 存储上下限是否每行都验证通过
                        if(hasNoSubmitRow) {
                            return false
                        }
                        this.submitLoading = true
                        saveMethod(this.formValidate).then(res=> {
                            this.submitLoading = false
                            if(res.data.id) {
                                this.$Notice.success({
                                    title: "保存成功！"
                                })
                                _self.$router.push({
                                    path: '/childPage/materialDetail',
                                    query: { 
                                        id: res.data.id 
                                    }
                                });
                            }
                        }).catch(() => {
                            this.submitLoading = false
                        })
                    }
                }
            })
        },
        backClick() {
            this.$router.back()
        },
        addRow(){
            this.formValidate.materielStockLimits.push({
                warehouseName: '',
                warehouseNo: '',
                upper: 0,
                lower: 0
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
/deep/.ivu-table-wrapper {
    overflow: visible;
}
</style>