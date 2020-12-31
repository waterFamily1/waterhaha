<template>
    <div class="index-add" :style="{height: height+'px'}">
        <div class="index-title">
            <h3>{{ title }}</h3>
            <div v-if="type == false">
                <Button type="info" size="small" style="background:#4b7efe" @click="saveHandle('formItem')">保存</Button>
                <Button type="info" size="small" style="background:#c8c8c8" @click="cancelHandle('formItem')">取消</Button>
            </div>
            <div v-if="type == true">
                <Button type="info" size="small" style="background:#4b7efe" @click="editHandle()">编辑</Button>
                <Button type="info" size="small" style="background:#c8c8c8" @click="cancelHandle('formItem')">取消</Button>
            </div>
        </div>
        <div class="index-content">
            <div v-if="type == false">
                <Form :model="formItem" ref="formItem" :rules="ruleValidate" :label-width="150">
                    <div class="c-form-row">
                        <div class="c-form-item">
                            <FormItem label="指标名称：" prop="name">
                                <Input v-model="formItem.name"></Input>
                            </FormItem>
                        </div>
                        <div class="c-form-item">
                            <FormItem label="指标类型：" prop="type">
                                <Select v-model="formItem.type" @on-change="typeChange" style="width:300px">
                                    <Option v-for="item in typeList" :value="item.value" :key="item.value">
                                        {{ item.label }}
                                    </Option>
                                </Select>
                            </FormItem>
                        </div>
                    </div>
                    <div class="c-form-row">
                        <div class="c-form-item">
                            <FormItem label="区域位置：" prop="location">
                                <TreeSelect 
                                    v-model="formItem.location" 
                                    :data="areaList"
                                    @on-change="treeChange"
                                    v-width="300" 
                                />
                            </FormItem>
                        </div>
                        <div class="c-form-item">
                            <FormItem label="测点名称：" prop="sightName">
                                <Input v-model="formItem.sightName" disabled></Input>
                                <Button type="primary" class="sight-btn" @click="addModal = true">添加</Button>
                            </FormItem>
                        </div>
                    </div>
                </Form>
            </div>
            <div v-if="type == true">
                <Row class="row-box">
                    <Col span="12">
                        <div class="row-item">
                            <label>指标名称:</label>
                            <span>{{ indexName }}</span>
                        </div>
                        <div class="row-item">
                            <label>区域位置:</label>
                            <span>{{ processName }}</span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="row-item">
                            <label>指标类型:</label>
                            <span>{{ indexType }}</span>
                        </div>
                        <div class="row-item">
                            <label>测点名称:</label>
                            <span>{{ mpointName }}</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <!-- 添加 -->
        <Modal
            v-model="addModal"
            title="添加测点"
            width="650px"
            :footer-hide="true">
            <div class="mg-single-select-table">
                <div class="mg-single-select-table-header">
                    <div class="mg-single-select-table-search">
                        <Input v-model="name" placeholder="测点编号/名称" style="width: 200px;">
                            <Button slot="append" icon="ios-search" @click="addSearch"></Button>
                        </Input>
                    </div>
                </div>
                <div class="mg-single-table" style="margin-top: 10px">
                    <Table size="small" :columns="columns" :data="data">
                        <template slot-scope="{ row, index }" slot="action">
                            <a href="javascript:;" class="table-icon" @click="chooseHandle(row)">
                                <Icon type="md-checkmark-circle-outline" style="font-size: 22px;color: #999;" />
                            </a>
                        </template>
                    </Table>
                    <Page 
                        :total="allTotal" 
                        size="small" 
                        @on-change="changePage" 
                        show-total show-elevator 
                        style="text-align: right;margin-top: 10px;"
                    />
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
import { detailMethod, areaMethod, pointMethod, saveMethod, saveAddMethod } from '@/api/system/indicator'
import createTree from '@/libs/public-util'

export default {
    name: 'indexAdd',
    data() {
        return {
            height: '',
            title: '',
            type: '',
            formItem: {
                name: '',
                type: '',
                location: '',
                sightName: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入指标名称', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择指标类型', trigger: 'blur' }
                ],
                location: [
                    { required: true, message: '请选择区域位置', trigger: 'change', type: 'number' }
                ],
                sightName: [
                    { required: true, message: '请选择测点', trigger: 'change' }
                ]
            },
            typeList: [
                {
                    label: '数据KPI',
                    value: '1'
                },
                {
                    label: '设备KPI',
                    value: '2'
                },
                {
                    label: '关键指标',
                    value: '3'
                }
            ],
            addModal: false,
            name: '',
            columns: [
                {
                    title: '区域位置',
                    key: 'siteName'
                },
                {
                    title: '测点名称',
                    key: 'mpointName'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data: [],
            ids: '',
            id: '',
            indexName: '',
            mpointName: '',
            indexType: '',
            processName: '',
            areaList: [],
            cancle: '',
            siteId: '',
            mpointId: '',
            allTotal: 0,
            pageNum: '1'
        }
    },
    created() {
        let type = this.$route.query.type
        if(type == 0) {
            this.title = '新增指标'
            this.type = false
        } else if(type == 1) {
            this.title = '指标详情'
            this.type = true
            this.ids = this.$route.query.ids
        }
    },
    mounted() {
        this.height = document.body.clientHeight-130
        this.getDetail()
        if(this.type == false) {
            this.getArea()
        }
    },
    methods: {
        getDetail() {
            this.cancle = '0'
            if(this.type == true) {
                let ids = this.ids
                detailMethod(ids).then(res=> {
                    this.indexName = res.data.indexName
                    this.processName = res.data.processName
                    this.mpointName = res.data.mpointName
                    this.formItem.location = res.data.processId
                    this.formItem.type = res.data.indexType.toString()
                    this.mpointId = res.data.mpointId
                    this.formItem.name = this.indexName
                    this.formItem.sightName = this.mpointName
                    this.id = res.data.idea-box
                    if(res.data.indexType == '1') {
                        this.indexType = '数据KPI'
                    } else if(res.data.indexType == '2') {
                        this.indexType = '设备KPI'
                    } else if(res.data.indexType == '3') {
                        this.indexType = '关键指标'
                    }
                }).catch(err=> {

                })
            }
        },
        getArea() {
            areaMethod().then(res=> {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].selected = false
                    trees[i].expand = true
                    treeItem.push(trees[i])
                }
                this.areaList = createTree(treeItem, 0)
            }).catch(err=> {

            })
        },
        typeChange(value) {
            this.formItem.type = value
        },
        treeChange(value) {
            let val = value
            let tree = this.areaList
            let processName
            var find = function(arr, id) {
                arr.forEach((item) => {
                    if(item.value == val) {
                        processName = item.title
                        return item
                    } else if (item.children) {
                        find(item.children, id)
                    }
                })
            }
            var item = find(tree, val)
            this.processName = processName
            this.formItem.location = value
            this.formItem.sightName = ''
            this.siteId = value
            this.addSearch()
        },
        saveHandle(name) {  
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.cancle == '0') {
                        saveAddMethod({
                            indexName: this.formItem.name,
                            indexType: this.formItem.type,
                            mpointId: this.mpointId,
                            mpointName: this.formItem.sightName,
                            processId: this.formItem.location,
                            processName: this.processName
                        }).then(res=> {
                            // console.log(res)
                            if(res.data.status == 200) {
                                this.$router.push({
                                    path:'/indicator'
                                })
                            }
                        }).catch(err=> {

                        })
                    } else if(this.cancle == '1') {
                        saveMethod({
                            id: this.id,
                            indexName: this.formItem.name,
                            indexType: this.formItem.type,
                            mpointId: this.mpointId,
                            mpointName: this.formItem.sightName,
                            processId: this.formItem.location,
                            processName: this.processName,
                            userId: ''
                        }).then(res=> {
                            // console.log(res)
                            if(res.data.count == 1) {
                                this.$router.push({
                                    path:'/indicator'
                                })
                            }
                        }).catch(err=> {

                        })
                    }
                }
            })
        },
        cancelHandle(name) {
            if(this.cancle == '1' && this.type == false) {
                this.$refs[name].resetFields();
                this.type = true
            } else {
                this.$router.go(-1)
            }
        },
        editHandle() {
            this.getDetail()
            this.type = false
            this.cancle = '1'
            this.getArea()
            this.addSearch()
        },
        addSearch() {
            let queryName = this.name
            let pageNum = this.pageNum
            let siteId = this.siteId
            pointMethod({
                queryName,
                pageNum,
                siteId
            }).then(res=> {
                this.data = res.data.items
                this.allTotal = res.data.total
            }).catch(err=> {

            })
        },
        changePage(index) {
            this.pageNum = index
            this.addSearch()
        },
        chooseHandle(row) {
            this.mpointId = row.id
            this.formItem.sightName = row.mpointName
            this.addModal = false
        }
    }
}
</script>
<style lang="less" scoped>
.index-add {
    margin: 5px;
    background: #fff;
    .index-title {
        padding: 5px;
        h3{
            display: inline-block;
            line-height: 30px;
            text-indent: 10px;
        }
        div{
            float: right;
            button{
                min-width: 70px;
                margin: 0 5px;
                color: #fff;
                border: 0;
            }
        }
    }
    .index-content {
        border-top: 5px solid #f0f0f0;
        padding: 30px 10px;
        .c-form-row {
            .c-form-item {
                width: 45%;
                display: inline-block;
                min-height: 33px;
                /deep/.ivu-form-item-content {
                    /deep/.ivu-input-wrapper {
                        width: 300px;
                    }
                    .ivu-checkbox-wrapper {
                        margin-left: 20px;
                    }
                }
                .sight-btn {
                    margin-left: 20px;
                    height: 28px;
                }
            }
        }
    }
    .mg-single-select-table {
        .mg-single-select-table-header {
            min-height: 40px;
            .mg-single-select-table-search {
                width: 250px;
            }
        }
    }
    .row-box {
        label {
            display: inline-block;
            width: 100px;
            text-align: right;
        }
        .row-item {
            height: 40px;
            line-height: 40px;
            span {
                margin-left: 20px;
            }
        }
    }
}
</style>