<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-main-border">
            <div class="c-left-border-blue">
                <h3>物料详细</h3>
                <div class="c-btns-right">
                    <Button style="background: #2d8cf0;" @click="saveHandle">保存</Button>
                    <Button @click="back">取消</Button>
                </div>
            </div>
            <div class="c-top-border-gray">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <Row>
                        <Col span="12">
                            <div class="c-form-item" style="line-height: 35px;margin-bottom: 10px;">
                                <label>物料编号：</label>
                                <span>{{ formValidate.materielNumber }}</span>
                            </div>
                            <div class="c-form-item">
                                <FormItem label="物料名称：" prop="materielName">
                                    <Input v-model="formValidate.materielName" style="width: 300px" />
                                </FormItem>
                            </div>
                            <div class="c-form-item">
                                <FormItem label="ABC分类：" prop="abc">
                                    <Select v-model="formValidate.abc" style="width:300px">
                                        <Option
                                        v-for="(item, index) in ABCClassify"
                                        :value="item.value"
                                        :key="index"
                                        >{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                            </div>
                            <div class="c-form-item">
                                <FormItem label="规格：" prop="standard">
                                    <Input v-model="formValidate.standard"  style="width: 300px" />
                                </FormItem>
                            </div>
                            <div class="c-form-item">
                                <FormItem label="型号：">
                                    <Input v-model="formValidate.model"  style="width: 300px" />
                                </FormItem>
                            </div>
                        </Col>
                        <Col span="12">
                            <div class="c-form-item">
                                <FormItem label="组织信息：" prop="orgId">
                                    <TreeSelect v-model="formValidate.orgId" :data="orgList" v-width="300" @on-change="orgChange" />
                                </FormItem>
                            </div>
                            <div class="c-form-item">
                                <FormItem label="物料类别：" prop="materielCategoryId">
                                    <Select v-model="formValidate.materielCategoryId" style="width:300px">
                                        <Option v-for="item in materielCategoryArr" :value="item.id.toString()" :key="item.id.toString()">{{ item.categoryName }}</Option>
                                    </Select>
                                </FormItem>
                            </div>
                            <div class="c-form-item">
                                <FormItem label="计量单位：" prop="measurementUnit">
                                    <Select v-model="formValidate.measurementUnit" placeholder='请选择' style="width:300px">
                                    <Option v-for="(item, index) in unitList" :value="item.value" :key="index">{{ item.label }}</Option>
                                </Select>
                                </FormItem>
                            </div>
                            <div class="c-form-item">
                                <FormItem label="品牌：" prop="personInCharge">
                                    <Input v-model="formValidate.brand" style="width: 300px" />
                                </FormItem>
                            </div>
                            <div class="c-form-item">
                                <FormItem label="备注：" prop="personInCharge">
                                    <Input v-model="formValidate.remark"  style="width: 300px" type="textarea"/>
                                </FormItem>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div class="c-top-border-gray" style="padding: 10px">
                <Tabs value="name1" :animated="false">
                    <TabPane label="库存分布" name="name1">
                        <div style="padding: 10px">
                            <div style="padding: 10px">
                                <Input v-model="searchParamsByDistr.warehouseName" placeholder="仓库名称" style="width: 200px" />
                                <Button type="primary" @click="searchDistribution" class="c-btn-add">搜索</Button>
                            </div>
                            <Table :columns="columnsByDistr" :data="listDataByDistr" :loading="loadingByDistr" stripe></Table>
                            <Page 
                                :total="totalByDistr"
                                :page-size="searchParamsByDistr.pageSize"
                                :current="searchParamsByDistr.currentPage"
                                class="table-page"
                                show-total
                                show-elevator
                                @on-change="pageChangeByDistr"
                            ></Page>
                        </div>
                    </TabPane>
                    <TabPane label="存储上下限" name="name2">
                        <div style="padding: 10px">
                            <div style="padding: 10px;display: flex;justify-content: space-between;">
                                <div>
                                    <Input v-model="searchParamsByLimit.warehouseName" placeholder="仓库名称" style="width: 200px" />
                                    <Button type="primary" @click="searchLimit" class="c-btn-add">搜索</Button>
                                </div>
                                <div class="c-btns-right btns-box">
                                    <Button
                                        class="c-btn-add"
                                        @click="addRow"
                                    >新增</Button>
                                </div>
                            </div>
                            <Table :columns="columnsByLimit" :data="listDataByLimit" :loading="loadingByLimit" stripe></Table>
                            <Page 
                                :total="totalByLimit"
                                :page-size="searchParamsByLimit.pageSize"
                                :current="searchParamsByLimit.currentPage"
                                class="table-page"
                                show-total
                                show-elevator
                                @on-change="pageChangeByLimit"
                            ></Page>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    </div>
</template>

<script>
import { detailMethod, orgMethod, unitMethod, materielMethod, wareMethod, wareMethod1, storeMethod, deleteMethod1, editMethod } from '@/api/store/materialInfor'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'
var warehouseCombo = []

export default {
    data() {
        var _self = this
        return {
            height: '',
            id: '',
            formValidate:{
                materielNumber: '',
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
            // 库存分布
            searchParamsByDistr: {
                materielNumber: '',
                warehouseName: '',
                currentPage: 1,
                pageSize: 5
            },
            totalByDistr: 0,
            loadingByDistr: false,
            columnsByDistr: [
                {
                    title: '仓库名称',
                    key: 'warehouseName'
                }, {
                    title: '库位',
                    key: 'locationNo'
                }, {
                    title: '数量',
                    key: 'amount'
                }
            ],
            listDataByDistr: [],
            // 存储上下限
            searchParamsByLimit: {
                materielNumber: '',
                warehouseName: '',
                currentPage: 1,
                pageSize: 5
            },
            totalByLimit: 0,
            loadingByLimit: false,
            // 存储上下限提交
            submitLoading:false,
            columnsByLimit: [
                {
                    title: '仓库名称',
                    key: 'warehouseName',
                    render: (h, data) => {
                        return h("Select",{
                            props: {
                                placeholder: "请选择",
                                value: data.row.warehouseNo,
                                "label-in-value": true
                            },
                            on: {
                                "on-change": item => {
                                    data.row.warehouseNo = item.value
                                    data.row.warehouseName = item.label
                                    _self.listDataByLimit[data.index] = data.row
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
                    title: '下限',
                    key: 'lower',
                    render: (h, data) => {
                        return h("div", [
                            h("InputNumber", {
                                props: {
                                    min: 0,
                                    precision: 2,
                                    value: data.row.lower || 0
                                },
                                on: {
                                    input: newValue => {
                                        data.row.lower = newValue
                                        _self.listDataByLimit[data.index] = data.row
                                    }
                                }
                            })
                        ]);
                    }
                }, {
                    title: '上限',
                    key: 'upper',
                    render: (h, data) => {
                        return h("div", [
                            h("InputNumber", {
                                props: {
                                    min: 0,
                                    precision: 2,
                                    value: data.row.upper || 0
                                },
                                on: {
                                    input: newValue => {
                                        data.row.upper = newValue
                                        _self.listDataByLimit[data.index] = data.row
                                    }
                                }
                            })
                        ]);
                    }
                }, {
                    title: '操作',
                    key: 'act',
                    render: (h, data) => {
                        return h("div", [
                            h("a", {
                                attrs: { href: "javascript:;" },
                                style: {
                                    color: "#346C93",
                                    margin: "0 10px 0 0"
                                },
                                on: {
                                    click: () => {
                                    // TODO：如果有id，则调用接口删除
                                        if(data.row.id) {
                                            deleteMethod1(data.row.id).then(res=> {
                                                _self.listDataByLimit.splice(data.index, 1)
                                                _self.$Notice.success({
                                                    title: '删除成功！',
                                                })
                                                _self.searchLimit()
                                            })
                                        } else {
                                            _self.listDataByLimit.splice(data.index, 1)
                                        }
                                    }
                                }
                            }, "删除")
                        ]);
                    }
                }
            ],
            listDataByLimit: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.id = this.$route.query.id
        this.getDetail()
        this.getOrg()
        this.getUnit()
        this.getWare()
    },
    methods: {
        getDetail() {
            detailMethod(this.$route.query.id).then(res=> {
                // console.log(res)
                this.formValidate = res.data
                this.formValidate.orgId = res.data.orgId.toString()
                this.formValidate.materielCategoryId = res.data.materielCategoryId.toString()
                this.getMater(this.formValidate.orgId)
                this.searchParamsByDistr.materielNumber = res.data.materielNumber
                this.searchParamsByLimit.materielNumber = res.data.materielNumber
                this.getListByDistr() //仓库分布
                this.getListByLimit()
            })
        },
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
            this.getMater(id)
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
        getMater(id) {
            materielMethod(id).then(res=> {
                this.materielCategoryArr = res.data
            })
        },
        getListByDistr() {
            this.loadingByDistr = true
            let materielNumber = this.searchParamsByDistr.materielNumber
            let warehouseName = this.searchParamsByDistr.warehouseName
            let currentPage = this.searchParamsByDistr.currentPage
            wareMethod1({
                materielNumber,
                warehouseName,
                currentPage
            }).then(res=> {
                this.listDataByDistr = res.data.items
                this.totalByDistr = res.data.total
                this.loadingByDistr = false
            })
        },
        getListByLimit() {
            this.loadingByLimit = true
            let materielNumber = this.searchParamsByLimit.materielNumber
            let warehouseName = this.searchParamsByLimit.warehouseName
            let currentPage = this.searchParamsByLimit.currentPage
            storeMethod({
                materielNumber,
                warehouseName,
                currentPage
            }).then(res=> {
                console.log(111)
                this.listDataByLimit = res.data.items
                this.totalByLimit = res.data.total
                this.loadingByLimit = false
            })
        },
        searchDistribution() {
            // 搜索仓库名称——库存分布
            this.searchParamsByDistr.currentPage = 1
            this.getListByDistr()
        },
        searchLimit() {
            this.searchParamsByLimit.currentPage = 1
            this.getListByLimit()
        },
        pageChangeByDistr(num) {
            this.searchParamsByDistr.currentPage = num
            this.getListByDistr()
        },
        pageChangeByLimit(num) {
            this.searchParamsByLimit.currentPage = num
            this.getListByLimit()
        },
        addRow() {
            this.listDataByLimit.push({
                materielNumber: this.formValidate.materielNumber,
                warehouseName: '',
                warehouseNo: '',
                upper: 0,
                lower: 0,
                isEdit: true
            });
        },
        saveHandle() {
            var _self = this
            var hasNoSubmitRow = false
            var hasNoSubmitRow = _self.listDataByLimit.some((element, index)=> {
                if(!element.warehouseName) {
                    _self.$Notice.warning({
                        title: "请选择第" + (index + 1) + "行中的仓库名称"
                    })
                    return true
                }
                if(!element.lower) {
                    _self.$Notice.warning({
                        title: "请输入第" + (index + 1) + "行中的下限"
                    })
                    return true
                }
                if(!element.upper) {
                    _self.$Notice.warning({
                        title: "请输入第" + (index + 1) + "行中的上限"
                    })
                    return true
                }
                if(element.upper < element.lower) {
                    _self.$Notice.warning({
                        title: "第" + (index + 1) + "行中输入的上限不应该小于下限"
                    })
                    return true
                }
                return false
            })
            // 存储上下限是否每行都验证通过
            if(hasNoSubmitRow) {
                return false
            }
            this.submitLoading = true
            this.formValidate.materielStockLimits = this.listDataByLimit
            editMethod(this.formValidate).then(res=> {
                this.submitLoading = false
                if(res.data.count) {
                    this.$Notice.success({
                        title: "保存成功！"
                    })
                    this.$router.push({
                        path: '/childPage/materialDetail',
                        query: { 
                            id: this.id
                        }
                    });
                }
            }).catch(() => {
                this.submitLoading = false
            })
        },
        back() {
            this.$router.back()
        }
    }
}
</script>

<style lang="less" scoped>
.index-box {
    margin: 5px;
    background: #fff;
    .c-main-border {
        border: 5px solid #f0f0f0;
        min-height: 100%;
        width: 100%;
        .c-left-border-blue {
            border-radius: 3px;
            padding: 5px;
            display: flex;
            justify-content: space-between;
            h3 {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                text-indent: 10px;
            }
            .ivu-btn {
                height: 28px;
                min-width: 70px;
                margin: 0 5px;
                background-color: #c8c8c8;
                border: none;
                color: #fff;
                padding: 4px 12px;
                font-size: 13px;
            }
        }
        .c-top-border-gray {
            border-top: 5px solid #f0f0f0;
            padding: 20px 0;
            .c-form-item {
                line-height: 24px;
                vertical-align: top;
                padding-left: 20px;
                padding-top: 9px;
                position: relative;
                display: flex;
                label {
                    width: 100px;
                    text-align: right;
                    font-weight: bold;
                }
            }
            .c-plain-bg-h {
                border-bottom: 1px solid #f0f0f0;
                height: 45px;
                padding: 10px 0 5px 10px;
                display: flex;
                justify-content: space-between;
                .c-btns-right {
                    .ivu-btn {
                        height: auto;
                        min-width: 70px;
                        padding: 4px 12px;
                        margin-right: 10px;
                    }
                    .cancle-btn {
                        background: #d8d5d5;
                        color: #fff;
                        border: none;
                        font-size: 13px;
                    }
                }
            }
            .c-btn-add {
                background-color: #576374;
                border: none;
                color: #fff;
                padding: 6px 15px;
                font-size: 13px;
                height: auto;
                margin-left: 5px;
            }
        }
    }
    .ivu-form-item {
        margin-bottom: 10px;
    }
    .table-page {
        text-align: right;
        margin: 10px 0;
    }
}
/deep/.ivu-tabs-bar {
    margin: 0;
}
/deep/.ivu-table-wrapper {
    overflow: visible;
}
</style>