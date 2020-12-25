<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-main-border">
            <div class="c-left-border-blue">
                <h3>库存调整信息</h3>
                <div class="c-btns-right">
                    <Button @click="audit" :loading="auditLoading" v-if="info.auditedFlag == 0">审核</Button>
                    <Button class="c-btn-back" @click="back" v-if="info.auditedFlag == 0">取消</Button>
                    <Button v-if="info.auditedFlag == 1" @click="back">返回</Button>
                </div>
            </div>
            <div class="c-top-border-gray">
                <Row>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>库存调整单：</label>
                            <span>{{ info.storeAdjustmentNumber }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>创建人员：</label>
                            <span>{{ info.orgName }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>调整仓库：</label>
                            <span>{{ info.warehouseName }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>备注：</label>
                            <span>{{ info.remark }}</span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>组织信息：</label>
                            <span>{{ info.userName }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>创建时间：</label>
                            <span>{{ info.createDate | transDateFromServer }}</span>
                        </div>
                        <div class="c-form-item">
                            <label>审核状态：</label>
                            <span>{{ auditStateText[info.auditedFlag] }}</span>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="c-top-border-gray" style="padding: 10px">
                <div class="c-plain-bg-h">
                    <h3>库存调整明细</h3>
                    <div class="c-btns-right" v-if="info.auditedFlag == 0">
                        <Button size="small" class="c-btn-add" @click="editTable" v-show="status == 'info'">编辑</Button>
                        <Button size="small" class="c-btn-add" :loading="updateLoading" @click="updateTable" v-show="status == 'edit'">提交</Button>
                        <Button size="small" class="c-btn-back" @click="cancelEditTable" v-show="status == 'edit'">取消</Button>
                    </div>
                </div>
                <div style="padding: 10px 0;">
                    <Input v-model="searchParams.queryName" placeholder="物料编号或物料名称" style="width: 200px" />
                    <Button type="primary" @click="search" class="c-btn-add">搜索</Button>
                </div>
                <Table :columns="columns" :data="tableDatas" :loading="loading" stripe></Table>
                <Page 
                    :total="total" 
                    :page-size="searchParams.pageSize" 
                    :current="searchParams.currentPage" 
                    class="table-page" 
                    show-total 
                    show-elevator 
                    @on-change="pageChange"
                ></Page>
            </div>
        </div>
    </div>
</template>

<script>
import { detailMethod, detailTableMethod } from '@/api/store/adjust'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
import { formatTime } from '@/libs/public'
import { mapState } from 'vuex'

export default {
    data() {
        var _self = this
        return {
            height: '',
            id: '',
            info: {},
            searchParams: {
                id: this.$route.query.id,
                queryName: '',
                pageSize: 10,
                currentPage: 1
            },
            tableDatas: [],
            columns: [
                { 
                    title: '物料编号', 
                    key: 'materielNumber'
                }, { 
                    title: '物料名称', 
                    key: 'materielName'
                }, { 
                    title: '型号', 
                    key: 'model'
                }, { 
                    title: '规格', 
                    key: 'standard'
                }, { 
                    title: '库位', 
                    key: 'warehousePositionName'
                }, { 
                    title: '调前数量', 
                    key: 'beforeAmount'
                }, { 
                    title: '调整数量', 
                    key: '',
                    render(h, data) {
                        var offset = Number(data.row.afterAmount) - Number(data.row.beforeAmount),
                            color = '#333'
                        if(offset > 0) color = '#b32f2f';
                        else if(offset < 0) color = '#2f7b34'
                        return h('span', {style: {color: color}}, offset)
                    }
                }, { 
                    title: '调后数量', 
                    key: 'afterAmount',
                    render(h, data) {
                        if(_self.status == 'info') {
                            console.log(111)
                            data.row.afterAmount = data.row.afterAmountCache
                            return h('span', data.row.afterAmount)
                        } else if(_self.status == 'edit') {
                            return h('input', {
                                style: {width: '50px'},
                                attrs: {
                                    type: 'text',
                                    maxlength: '5',
                                    id: 'storage_invertory_item_'+data.row.id
                                },
                                domProps: {
                                    value: data.row.afterAmount
                                },
                                on: {
                                    input: function(event) {
                                        var v = event.target.value
                                        if(isNaN(v)) v = event.target.value = 0
                                        data.row.afterAmount = v
                                    }
                                }
                            })
                        }
                    }
                }, { 
                    title: '计量单位', 
                    key: 'measurementUnit'
                }
            ],
            updateLoading: false,
            auditLoading: false,
            status: 'info',
            loading: false,
            total: 0
        }
    },
    filters:{
        transDateFromServer: util.transDateFromServer
    },
    computed: mapState({
        auditState: state => state.map.storage.inventory.auditState,
        auditStateText: state => state.map.storage.inventory.auditStateText,
    }),
    created () {
        util.initTableColumnTitle(this.columns)           
    },
    mounted() {
        this.id = this.$route.query.id
        this.height = document.body.clientHeight-80
        this.getDetail()
        this.getItems()
    },
    methods: {
        getDetail() {
            detailMethod(this.id).then(res=> {
                // console.log(res)
                this.info = res.data
            }).catch(err=> {

            })
        },
        getItems() {
            this.loading = true
            detailTableMethod(this.searchParams).then(res=> {
                res.data.items.forEach((item)=>{
                    item.afterAmountCache = item.afterAmount
                })
                this.tableDatas = res.data.items
                this.total = res.data.total
                this.loading = false
                this.status = 'info'
            }).catch(err=> {

            })
        },
        pageChange(index) {
            this.searchParams.currentPage = index
            this.getItems()
        },
        editTable() {

        },
        updateTable() {

        },
        cancelEditTable() {

        },
        search() {
            this.getItems()
        },
        audit() {

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
</style>