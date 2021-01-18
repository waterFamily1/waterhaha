<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-main-border">
            <div class="c-left-border-blue">
                <h3>仓库详细</h3>
                <div class="c-btns-right">
                    <Button style="background: #2d8cf0;" @click="saveHandle">保存</Button>
                    <Button @click="back">取消</Button>
                </div>
            </div>
            <div class="c-top-border-gray">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <Row>
                        <Col span="12">
                            <div class="c-form-item" style="line-height: 35px;margin-bottom: 24px;">
                                <label>仓库编号：</label>
                                <span>{{ formValidate.no }}</span>
                            </div>
                            <div class="c-form-item">
                                <FormItem label="仓库名称：" prop="name">
                                    <Input v-model="formValidate.name" style="width: 300px" />
                                </FormItem>
                            </div>
                            <div class="c-form-item">
                                <FormItem label="仓库地址：">
                                    <Input v-model="formValidate.address"  style="width: 300px" />
                                </FormItem>
                            </div>
                        </Col>
                        <Col span="12">
                            <div class="c-form-item">
                                <FormItem label="所属组织：" prop="orgId">
                                    <TreeSelect v-model="formValidate.orgId" :data="orgList" v-width="300" @on-change="orgChange" />
                                </FormItem>
                            </div>
                            <div class="c-form-item">
                                <FormItem label="负责人：" prop="personInCharge">
                                    <Select 
                                        v-model="formValidate.personInCharge" 
                                        :label-in-value="true" 
                                        @on-change="personChange"
                                        style="width:300px"
                                    >
                                        <Option v-for="(item, index) in personInCharge" :value="item.id" :key="index">{{ item.name }}</Option>
                                    </Select>
                                </FormItem>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div class="c-top-border-gray" style="padding: 10px">
                <Tabs value="name1" :animated="false">
                    <TabPane label="库存信息" name="name1">
                        <div style="padding: 10px">
                            <div style="padding: 10px">
                                <Input v-model="searchParamsByStock.queryName" placeholder="物料编号或物料名称" style="width: 200px" />
                                <Button type="primary" @click="searchStock" class="c-btn-add">搜索</Button>
                            </div>
                            <Table :columns="columnsByStock" :data="listDataByStock" :loading="loadingByStock" stripe></Table>
                            <Page 
                                :total="totalByStock" 
                                :page-size="searchParamsByStock.pageSize" 
                                :current="searchParamsByStock.currentPage" 
                                class="table-page" 
                                size="small" 
                                show-total show-elevator 
                                @on-change="pageChangeByStock"
                            ></Page>
                        </div>
                    </TabPane>
                    <TabPane label="库位信息" name="name2">
                        <div style="padding: 10px">
                            <div style="padding: 10px;display: flex;justify-content: space-between;">
                                <div>
                                    <Input v-model="searchParamsByLocator.locationNo" placeholder="库位编号" style="width: 200px" />
                                    <Button type="primary" @click="searchLocator" class="c-btn-add">搜索</Button>
                                </div>
                                <div class="c-btns-right">
                                    <Button
                                        class="c-btn-add"
                                        @click="addRow"
                                    >库位新增</Button>
                                    <Button
                                        class="c-btn-add"
                                        @click="toInfoImport"
                                    >库位导入</Button>
                                </div>
                            </div>
                            <Table :columns="columnsByLocator" :data="formValidate.warehousePositions" :loading="loadingByLocator" stripe></Table>
                            <Page 
                                :total="totalByLocator" 
                                :page-size="searchParamsByLocator.pageSize" 
                                :current="searchParamsByLocator.currentPage" 
                                class="table-page" 
                                size="small" 
                                show-total show-elevator 
                                @on-change="pageChangeByLocator"
                            ></Page>
                        </div>
                    </TabPane> 
                </Tabs>
            </div>
        </div>
    </div>
</template>

<script>
import { detailMethod, personMethod, orgMethod, listMethod, listMethod1, listDeleteMethod, saveMethod1 } from '@/api/store/ware'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'

export default {
    data (){
        var _self = this
        return {
            height:'',
            id: '',
            formValidate: {
                id: _self.$route.query.id,
                no: '',
                // 组织信息
                orgId: '',
                orgName: '',
                // 仓库名称
                name: '',
                // 负责人
                personInCharge: '',
                personInChargeName: '',
                // 仓库地址
                address:'',
                // 库位
                warehousePositions:[]
            },
            ruleValidate:{
                orgId: [
                    { required: true, message: '请选择组织', trigger: 'change', type: 'number' }
                ],
                name: [
                    { required: true, message: '仓库名称不能为空', trigger: 'change' }
                ],
                personInCharge: [
                    { required: true, message: '请选择负责人', trigger: 'change', type: 'number' }
                ]
            },
            // 库存信息
			searchParamsByStock: {
				warehouseNo: '',
				queryName: '',
				currentPage: 1,
				pageSize: 5
            },
            columnsByStock: [
                { 
					title: "物料编号", 
                    key: "materielNumber",
                    ellipsis: true
				},{ 
					title: "物料名称", 
                    key: "materielName",
                    ellipsis: true
				},{ 
					title: "规格", 
                    key: "standard",
                    ellipsis: true
				},{ 
					title: "库位", 
                    key: "warehouseLocationNo",
                    ellipsis: true
				},{ 
					title: "数量", 
                    key: "amount",
                    ellipsis: true
				},{ 
					title: "计量单位", 
                    key: "measurementUnit",
                    ellipsis: true
				}
            ],
            listDataByStock: [],
            totalByStock: 0,
            loadingByStock: false,
            searchParamsByLocator: {
				warehouseNo: '',
				locationNo: '',
				currentPage: 1,
				pageSize: 5
			},
			totalByLocator: 0,
            loadingByLocator: false,
            columnsByLocator: [
                {
					title: "库位编号",
					key: "locationNo",
					render: (h, data) => {
						return h("div", [
                            h("Input", {
                                props: {
                                    ref: 'locationNo',
                                    value: data.row.locationNo,
                                    disabled: data.row.disabled
                                },
                                on: {
                                    input: newValue => {
                                        data.row.locationNo = newValue
                                        _self.formValidate.warehousePositions[data.index] = data.row
                                    }
                                }
                            })
                        ]);
					}
				}, {
					title: "描述",
					key: "description",
					render: (h, data) => {
						return h("div", [
                            h("Input", {
                                props: {
                                    value: data.row.description,
                                    disabled: data.row.disabled
                                },
                                on: {
                                    input: newValue => {
                                        data.row.description = newValue
                                        _self.formValidate.warehousePositions[data.index] = data.row
                                    }
                                }
                            })
                        ])
					}
				}, {
                    title: "操作",
                    key: "act",
                    width:200,
                    render: (h, data) => {
                        return h("div", [h("a",{
                            attrs: { href: "javascript:;" },
                            style: {
                                color: "#346C93",
                                margin: "0 10px 0 0"
                            },
                            on: {
                                click: () => {
                                    if(data.row.id){
                                        listDeleteMethod(data.row.id).then(res => {
                                            _self.listDataByLocator.splice(data.index, 1);
                                            _self.$Notice.success({
                                                title: '删除成功！',
                                            });
                                            _self.searchLocator();
                                        });
                                    }
                                }
                            }
                        },"删除")])
                    }
                }
            ],
            submitLoading: false,
            listDataByLocator: [],
            
            trees: [],
            orgList: [],
            personInCharge: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.id = this.$route.query.id
        this.getDetail()
        this.getOrg()
        this.getPerson()
    },
    methods: {
        getDetail() {
            detailMethod(this.$route.query.id).then(res=> {
                this.formValidate.no = res.data.no
                this.formValidate.orgId = res.data.orgId
                this.formValidate.orgName = res.data.orgName
                this.formValidate.name = res.data.name
                this.formValidate.address = res.data.address
                this.formValidate.personInCharge = res.data.personInCharge
                this.formValidate.personInChargeName = res.data.personInChargeName
                this.searchParamsByStock.warehouseNo = res.data.no
                this.searchParamsByLocator.warehouseNo = res.data.no
                this.getListByStock()      
                this.getListByLocator()
            })
        },
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
            this.formValidate.personInCharge = ''
            this.trees.map(item=> {
                if(item.id == id) {
                    this.formValidate.orgName = item.name
                }
            })
            this.getPerson()
        },
        getPerson() {
            personMethod(this.formValidate.orgId).then(res=> {
                this.personInCharge = res.data.items
            })
        },
        personChange(item) {
            this.formValidate.personInCharge = item.value
            this.formValidate.personInChargeName = item.label
        },
        getListByStock() {
            //库存
            this.loadingByStock = true
            let warehouseNo = this.searchParamsByStock.warehouseNo
            let queryName = this.searchParamsByStock.queryName
            let currentPage = this.searchParamsByStock.currentPage
            listMethod({
                warehouseNo,
                queryName,
                currentPage
            }).then(res=> {
                this.listDataByStock = res.data.items
                this.totalByStock = res.data.total
                this.loadingByStock = false
            })
        },
        pageChangeByStock(num) {
            this.searchParamsByStock.currentPage = num
            this.getListByStock()      
        },
        searchStock(){
			this.searchParamsByStock.currentPage = 1
			this.getListByStock()
		},
        getListByLocator() {
            //库位
            this.loadingByLocator = true
            let warehouseNo = this.searchParamsByLocator.warehouseNo
            let locationNo = this.searchParamsByLocator.locationNo
            let currentPage = this.searchParamsByLocator.currentPage
            listMethod1({
                warehouseNo,
                locationNo,
                currentPage
            }).then(res=> {
                this.formValidate.warehousePositions = res.data.items
                this.totalByLocator = res.data.total
                this.loadingByLocator = false
            })
        },
        pageChangeByLocator(num) {
			this.searchParamsByLocator.currentPage = num
            this.getListByLocator()
		},
        searchLocator() {
            this.searchParamsByLocator.currentPage = 1
			this.getListByLocator()
        },
        addRow() {
            this.formValidate.warehousePositions.push({
                locationNo: '',
                description : ''
            });
        },
        toInfoImport() {
            saveMethod1(this.formValidate).then(res=> {
                if(res.data.count) {
                    this.$Notice.success({
                        title: '保存成功！',
                    });
                    this.$router.push({
                        path: '/childPage/warehouseImport',
                        query:{ warehouseNo: this.formValidate.no}
                    })
                }
            })
        },
        saveHandle() {
            saveMethod1(this.formValidate).then(res=> {
                if(res.data.count) {
                    this.$Notice.success({
                        title: '保存成功！',
                    });
                    this.$router.push({
                        path: '/childPage/warehouseDetail',
                        query: { id: this.id }
                    })
                }
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
    .table-page {
        text-align: right;
        margin: 10px 0;
    }
}
/deep/.ivu-tabs-bar {
    margin: 0;
}
</style>