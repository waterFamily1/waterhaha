<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-main-border">
            <div class="c-left-border-blue">
                <h3>仓库详细</h3>
                <div class="c-btns-right">
                    <Button style="background: #2d8cf0;" @click="edit">编辑</Button>
                    <Button @click="back">返回</Button>
                </div>
            </div>
            <div class="c-top-border-gray">
                <Row>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>仓库编号：</label>
                            <span>{{ detailInfo.no }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>仓库名称：</label>
                            <span>{{ detailInfo.name }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>仓库地址：</label>
                            <span>{{ detailInfo.address }}</span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>所属组织：</label>
                            <span>{{ detailInfo.orgName }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>负责人：</label>
                            <span>{{ detailInfo.personInChargeName }}</span>
                        </div>
                    </Col>
                </Row>
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
                            </div>
                            <Table :columns="columnsByLocator" :data="listDataByLocator" :loading="loadingByLocator" stripe></Table>
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
import { detailMethod, listMethod, listMethod1 } from '@/api/store/ware'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { mapState } from 'vuex'

export default {
    data (){
        var _self = this
        return {
            height:'',
            id: '',
            detailInfo: {},
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
						if(!data.row.isEdit) {
							return h("div", data.row.locationNo)
						}
						return h("div", [
							h("Input", {
								props: {
									value: data.row.locationNo,
									disabled: !data.row.isEdit
								},
								on: {
									input: newValue => {
										data.row.locationNo = newValue
                    					_self.listDataByLocator[data.index] = data.row
									}
								}
							})
						]);
					}
				},
				{
					title: "描述",
					key: "description",
					render: (h, data) => {
						if(!data.row.isEdit) {
							return h("div", data.row.description)
						}
						return h("div", [
							h("Input", {
								props: {
									value: data.row.description,
									disabled: !data.row.isEdit
								},
								on: {
									input: newValue => {
										data.row.description = newValue
                    					_self.listDataByLocator[data.index] = data.row
									}
								}
							})
						]);
					}
				}
            ],
            submitLoading: false,
			listDataByLocator: []
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.id = this.$route.query.id
        this.getDetail()
    },
    methods: {
        getDetail() {
            detailMethod(this.$route.query.id).then(res=> {
                this.detailInfo = res.data
                this.searchParamsByStock.warehouseNo = res.data.no
                this.searchParamsByLocator.warehouseNo = res.data.no
                this.getListByStock()      
                this.getListByLocator()
            })
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
                this.listDataByLocator = res.data.items
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
        edit() {
            this.$router.push({
                path: '/childPage/warehousrEdit',
                query: {
                    id: this.id
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