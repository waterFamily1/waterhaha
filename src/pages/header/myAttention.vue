<template>
    <div class="concern-wrap c-sub-lay" :style="{height: height+'px'}">
        <Row :gutter="24" :style="{height: height+'px'}">
            <Col :xl="4" :lg="4" :md="0" :sm="0" :xs="0" :style="{height: height+'px'}">
                <Card shadow :padding="0">
                    <CellGroup @on-click="handleChangeCell" class="ivu-pt-8 ivu-pb-8">
                        <Cell title="设备台账" name="name1" :selected="currentType === 'name1'" />
                        <Cell title="巡检任务" name="name2" :selected="currentType === 'name2'" />
                        <Cell title="消缺任务" name="name3" :selected="currentType === 'name3'" />
                        <Cell title="维修工单" name="name4" :selected="currentType === 'name4'" />
                        <Cell title="保养任务" name="name5" :selected="currentType === 'name5'" />
                    </CellGroup>
                </Card>
            </Col>
            <Col :xl="20" :lg="20" :md="24" :sm="24" :xs="24" :style="{height: height+'px'}">
                <div class="card-box">
                    <div v-if="currentType === 'name1'">
                        <div class="c-plain-bg-h">
                            <h3>设备台账</h3>
                        </div>
                        <div class="padding-10">
                            <Table :columns="columns1" :data="data1"></Table>
                            <Page :total="total1" class="page" @on-change="pageChange1" show-elevator show-total />
                        </div>
                    </div>
                    <div v-if="currentType === 'name2'">
                        <div class="c-plain-bg-h">
                            <h3>巡检任务</h3>
                        </div>
                        <div class="padding-10">
                            <Table :columns="columns2" :data="data2"></Table>
                            <Page :total="total2" class="page" @on-change="pageChange2" show-elevator show-total />
                        </div>
                    </div>
                    <div v-if="currentType === 'name3'">
                        <div class="c-plain-bg-h">
                            <h3>缺陷申报</h3>
                        </div>
                        <div class="padding-10">
                            <Table :columns="columns3" :data="data3"></Table>
                            <Page :total="total3" class="page" @on-change="pageChange3" show-elevator show-total />
                        </div>
                    </div>
                    <div v-if="currentType === 'name4'">
                        <div class="c-plain-bg-h">
                            <h3>维修工单</h3>
                        </div>
                        <div class="padding-10">
                            <Table :columns="columns4" :data="data4"></Table>
                            <Page :total="total4" class="page" @on-change="pageChange4" show-elevator show-total />
                        </div>
                    </div>
                    <div v-if="currentType === 'name5'">
                        <div class="c-plain-bg-h">
                            <h3>保养任务</h3>
                        </div>
                        <div class="padding-10">
                            <Table :columns="columns5" :data="data5"></Table>
                            <Page :total="total5" class="page" @on-change="pageChange5" show-elevator show-total />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import { method1, cancle1, method2, method3, method4, method5 } from '@/api/header/attention'
import util from '@/libs/public_js'

export default {
    name: 'myAttention',
    data() {
        var _self = this
        return {
            height: '',
            currentType: 'name1',
            columns1: [
                {
                    title: '设备图片',
                    key: 'imgUrl',
                    ellipsis: true,
                    render: (h, params) => {
                        return h('div', [
                            h('img', {
                                style: {
                                    width: '100px',
                                    height: '100px',
                                    display: 'block',
                                    cursor: 'pointer',
                                    margin: '10px 0'
                                },
                                attrs: {
                                    src: (params.row.imgUrl == null || params.row.imgUrl == '' || params.row.imgUrl == undefined) ? "http://web.tjdeht.cn:8801/images/a6133ca5be7d6307c4ae35d9e4493f54.png" : params.row.imgUrl
                                },
                                on: {
                                    click: ()=> {
                                        _self.$router.push({
                                            path:'/checkBook',
                                            query: {
                                                ids: params.row.itemId
                                            }
                                        })
                                        sessionStorage.setItem('isEdit', false)
                                    }   
                                }
                            })
                        ])
                    }
                }, {
                    title: '设备名称',
                    key: 'name',
                    ellipsis: true
                }, {
                    title: '设备编号',
                    key: 'no',
                    ellipsis: true
                }, {
                    title: '运行状态',
                    key: 'maintain',
                    ellipsis: true
                }, {
                    title: '资产状态',
                    key: 'status',
                    ellipsis: true
                }, {
                    title: '区域位置',
                    key: 'process',
                    ellipsis: true
                }, {
                    title: '操作',
                    key: 'act',
                    width: 100,
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.$Modal.confirm({
                                            title: '是否要取消关注词条数据？',
                                            onOk: () => {
                                                let concernIds = params.row.id
                                                let type = 'equipment'
                                                cancle1({
                                                    concernIds,type
                                                }).then(res=> {
                                                    if(res.data.count) {
                                                        _self.$Notice.success({
                                                            title: '成功',
                                                            desc: '取消关注成功！'
                                                        });
                                                        _self.pageNum1 = 1
                                                        _self.getName1()
                                                    }
                                                })
                                            }
                                        });
                                    }
                                }
                            }, '取消关注')
                        ])
                    }
                }
            ],
            data1: [],
            total1: 0,
            pageNum1: 1,
            columns2: [
                {
                    title: '巡检任务名称',
                    key: 'name',
                    ellipsis: true
                }, {
                    title: '状态',
                    key: 'status',
                    ellipsis: true
                }, {
                    title: '执行人',
                    key: 'executorName',
                    ellipsis: true
                }, {
                    title: '执行时间',
                    key: 'dateTime',
                    ellipsis: true
                }, {
                    title: '操作',
                    key: 'act',
                    width: 100,
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.$Modal.confirm({
                                            title: '是否要取消关注词条数据？',
                                            onOk: () => {
                                                let concernIds = params.row.id
                                                let type = 'patrol'
                                                cancle1({
                                                    concernIds,type
                                                }).then(res=> {
                                                    if(res.data.count) {
                                                        _self.$Notice.success({
                                                            title: '成功',
                                                            desc: '取消关注成功！'
                                                        });
                                                        _self.pageNum2 = 1
                                                        _self.getName2()
                                                    }
                                                })
                                            }
                                        });
                                    }
                                }
                            }, '取消关注')
                        ])
                    }
                }
            ],
            data2: [],
            total2: 0,
            pageNum2: 1,
            columns3: [
                {
                    title: '缺陷类型',
                    key: 'name',
                    ellipsis: true
                }, {
                    title: '编号',
                    key: 'no',
                    ellipsis: true
                }, {
                    title: '状态',
                    key: 'status',
                    ellipsis: true
                }, {
                    title: '等级',
                    key: 'severity',
                    ellipsis: true
                }, {
                    title: '申报人',
                    key: 'createrName',
                    ellipsis: true
                }, {
                    title: '所属组织',
                    key: 'orgName',
                    ellipsis: true
                }, {
                    title: '创建时间',
                    key: 'dateTime',
                    ellipsis: true,
                    render (h, data) {
                        return util.tableDatetime(h, data.row.dateTime)
                    }
                }, {
                    title: '操作',
                    key: 'act',
                    width: 100,
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.$Modal.confirm({
                                            title: '是否要取消关注词条数据？',
                                            onOk: () => {
                                                let concernIds = params.row.id
                                                let type = 'fault'
                                                cancle1({
                                                    concernIds,type
                                                }).then(res=> {
                                                    if(res.data.count) {
                                                        _self.$Notice.success({
                                                            title: '成功',
                                                            desc: '取消关注成功！'
                                                        });
                                                        _self.pageNum3 = 1
                                                        _self.getName3()
                                                    }
                                                })
                                            }
                                        });
                                    }
                                }
                            }, '取消关注')
                        ])
                    }
                }
            ],
            data3: [],
            total3: 0,
            pageNum3: 1,
            columns4: [
                {
                    title: '故障设备名称',
                    key: 'name',
                    ellipsis: true
                }, {
                    title: '设备编号',
                    key: 'equNo',
                    ellipsis: true
                }, {
                    title: '区域位置',
                    key: 'process',
                    ellipsis: true
                }, {
                    title: '维修类型',
                    key: 'repairType',
                    ellipsis: true
                }, {
                    title: '维修编号',
                    key: 'no',
                    ellipsis: true
                }, {
                    title: '状态',
                    key: 'status',
                    ellipsis: true
                }, {
                    title: '处理人',
                    key: 'processingPersonName',
                    ellipsis: true
                }, {
                    title: '创建时间',
                    key: 'dateTime',
                    ellipsis: true,
                    render (h, data) {
                        return util.tableDatetime(h, data.row.dateTime)
                    }
                }, {
                    title: '操作',
                    key: 'act',
                    width: 100,
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.$Modal.confirm({
                                            title: '是否要取消关注词条数据？',
                                            onOk: () => {
                                                let concernIds = params.row.id
                                                let type = 'repair'
                                                cancle1({
                                                    concernIds,type
                                                }).then(res=> {
                                                    if(res.data.count) {
                                                        _self.$Notice.success({
                                                            title: '成功',
                                                            desc: '取消关注成功！'
                                                        });
                                                        _self.pageNum4 = 1
                                                        _self.getName4()
                                                    }
                                                })
                                            }
                                        });
                                    }
                                }
                            }, '取消关注')
                        ])
                    }
                }
            ],
            data4: [],
            total4: 0,
            pageNum4: 1,
            columns5: [
                {
                    title: '任务名称',
                    key: 'name',
                    ellipsis: true
                }, {
                    title: '开始日期',
                    key: 'startDate',
                    render (h, data) {
                        return util.tableDatetime(h, data.row.startDate)
                    }
                }, {
                    title: '结束日期',
                    key: 'endDate',
                    render (h, data) {
                        return util.tableDatetime(h, data.row.endDate)
                    }
                }, {
                    title: '状态',
                    key: 'stateName',
                    ellipsis: true
                }, {
                    title: '执行人',
                    key: 'executeUserName',
                    ellipsis: true
                }, {
                    title: '保养内容项',
                    key: 'contentsItems',
                    ellipsis: true
                }, {
                    title: '缺陷数量',
                    key: 'faults',
                    ellipsis: true
                }, {
                    title: '操作',
                    key: 'act',
                    width: 100,
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.$Modal.confirm({
                                            title: '是否要取消关注词条数据？',
                                            onOk: () => {
                                                let concernIds = params.row.id
                                                let type = 'maintain'
                                                cancle1({
                                                    concernIds,type
                                                }).then(res=> {
                                                    if(res.data.count) {
                                                        _self.$Notice.success({
                                                            title: '成功',
                                                            desc: '取消关注成功！'
                                                        });
                                                        _self.pageNum5 = 1
                                                        _self.getName5()
                                                    }
                                                })
                                            }
                                        });
                                    }
                                }
                            }, '取消关注')
                        ])
                    }
                }
            ],
            data5: [],
            total5: 0,
            pageNum5: 1,
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getName1()
    },
    methods: {
        handleChangeCell (name) {
            this.currentType = name
            if(name == 'name1') {
                this.getName1()
            } else if (name == 'name2') {
                this.getName2()
            } else if (name == 'name3') {
                this.getName3()
            } else if (name == 'name4') {
                this.getName4()
            } else if (name == 'name5') {
                this.getName5()
            }
        },
        getName1() {
            method1(this.pageNum1).then(res=> {
                this.data1 = res.data.items
                this.total1 = res.data.total
            })
        },
        pageChange1(num) {
            this.pageNum1 = num
            this.getName1()
        },
        getName2() {
            method2(this.pageNum2).then(res=> {
                this.data2 = res.data.items
                this.total2 = res.data.total
            })
        },
        pageChange2(num) {
            this.pageNum2 = num
            this.getName2()
        },
        getName3() {
            method3(this.pageNum3).then(res=> {
                this.data3 = res.data.items
                this.total3 = res.data.total
            })
        },
        pageChange3(num) {
            this.pageNum3 = num
            this.getName3()
        },
        getName4() {
            method4(this.pageNum4).then(res=> {
                this.data4 = res.data.items
                this.total4 = res.data.total
            })
        },
        pageChange4(num) {
            this.pageNum4 = num
            this.getName4()
        },
        getName5() {
            method5(this.pageNum5).then(res=> {
                this.data5 = res.data.items
                this.total5 = res.data.total
            })
        },
        pageChange5(num) {
            this.pageNum5 = num
            this.getName5()
        },
    }
}
</script>
<style lang="less" scoped>
.c-sub-lay {
    position: relative;
    height: 100%;
    margin: 5px;
    background: #fff;
    .ivu-card-shadow {
        box-shadow: none;
    }
    .ivu-col-span-xl-20 {
        border-left: 5px solid #f7f7f7;
    }
    .card-box {
        .c-plain-bg-h {
            border-bottom: 1px solid #f0f0f0;
            height: 50px;
            padding: 10px 0;
        }
        .padding-10 {
            padding: 10px;
        }
    }
    .page {
        text-align: right;
        margin: 10px 0
    }
}
</style>