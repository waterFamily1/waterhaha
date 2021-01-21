<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-main-border">
            <div class="c-left-border-blue">
                <h3>物料详细</h3>
                <div class="c-btns-right">
                    <Button style="background: #2d8cf0;" @click="edit">编辑</Button>
                    <Button @click="back">返回</Button>
                </div>
            </div>
            <div class="c-top-border-gray">
                <Row>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>物料编号：</label>
                            <span>{{ detailInfo.materielNumber }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>物料类别：</label>
                            <span>{{ detailInfo.categoryName }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>计量单位：</label>
                            <span>{{ detailInfo.measurementUnit }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>组织信息：</label>
                            <span>{{ detailInfo.orgName }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>型号：</label>
                            <span>{{ detailInfo.model }}</span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>物料名称：</label>
                            <span>{{ detailInfo.materielName }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>ABC分类：</label>
                            <span>{{ detailInfo.abc }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>规格：</label>
                            <span>{{ detailInfo.standard }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>品牌：</label>
                            <span>{{ detailInfo.brand }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>备注：</label>
                            <span>{{ detailInfo.remark }}</span>
                        </div>
                    </Col>
                </Row>
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
import { detailMethod, wareMethod1, storeMethod } from '@/api/store/materialInfor'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'

export default {
    data() {
        var _self = this
        return {
            height: '',
            id: '',
            detailInfo: {},
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
                    key: 'warehouseName'
                }, {
                    title: '下限',
                    key: 'lower'
                }, {
                    title: '上限',
                    key: 'upper'
                }
            ],
            listDataByLimit: []
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
                this.searchParamsByDistr.materielNumber = res.data.materielNumber
                this.searchParamsByLimit.materielNumber = res.data.materielNumber
                this.getListByDistr() //仓库分布
                this.getListByLimit()
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
        edit() {
            this.$router.push({
                path: '/childPage/materialEdit',
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