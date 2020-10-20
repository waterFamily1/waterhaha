<template>
    <div class="handle-box" :style="{height: height+'px'}">
        <div class="handle-search">
            <div class="search-main">
                <div class="form-item">
                    <label>操作时间：</label>
                    <DatePicker 
                        type="date" v-model="startTime1" :editable="false"
                        :options="startDate" :value="startTime"
                        format="yyyy-MM-dd" 
                        @on-change="handleChange" style="width: 120px">
                    </DatePicker> 
                    -
                    <DatePicker 
                        type="date" v-model="endTime1" :editable="false" 
                        :options="endDate" :value="endTime" 
                        format="yyyy-MM-dd"
                        @on-change="endTimeChange" style="width: 120px"
                    >
                    </DatePicker>
                </div>
                <div class="form-item">
                    <label>平台：</label>
                    <Select v-model="platform" style="width:70px">
                        <Option v-for="item in platList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="form-item tree-item">
                    <label>业务名称：</label>
                    <TreeSelect 
                        v-model="operationName" 
                        :data="operationList" 
                        @on-change="treeChange"
                        v-width="150"
                    />
                </div>
                <div class="form-item">
                    <label>操作名称：</label>
                    <Select
                        v-model="handleName"
                        filterable
                        remote
                        :remote-method="getHandleName"
                        :loading="loading"
                        :label-in-value="true"
                        @on-change="selectChange"
                        style="width: 150px">
                        <Option v-for="(option, index) in handleOptions" :value="option.id" :key="index">
                            {{option.operationName}}
                        </Option>
                    </Select>
                </div>
                <div class="form-search-btn">
                    <button type="button" @click="handleSearch()">搜索</button>
                    <button type="button" class="reset" @click="handleReset()">重置</button>
                </div>
            </div>
        </div>
        <div class="handle-content">
            <Table stripe :columns="handleColumns" :data="handleData"></Table>
            <div class="handle-page">
                <Page :total="allTotal" show-total show-elevator @on-change="changePage" style="text-align: right;" />
            </div>
        </div>
    </div>
</template>
<script>
import { getList, getBusinessName, searchHandleName } from '@/api/system/logs'
import createNameTree from '@/libs/log-util'

export default {
    name: 'hangleLog',
    data() {
        return {
            height: '',
            startDate: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            endDate: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            startTime1: '',
            startTime: '',
            start: '',
            endTime1: '',
            endTime: '',
            end: '',
            platform: 'web',
            platList: [
                {
                    value: 'web',
                    label: 'WEB'
                },
                {
                    value: 'app',
                    label: 'APP'
                },
            ],
            operationName: '',
            operationList: [],
            handleName: '',
            handleColumns: [
                {
                    title: '平台',
                    key: 'platform'
                }, {
                    title: '业务名称',
                    key: 'businessName'
                }, {
                    title: '操作人',
                    key: 'operationUserName'
                }, {
                    title: '操作名称',
                    key: 'operationName',
                    ellipsis: true
                }, {
                    title: '操作详情',
                    key: 'operationDetails',
                    ellipsis: true
                }, {
                    title: '操作时间',
                    key: 'operationTime'
                }, {
                    title: '操作地址',
                    key: 'geoLocation',
                    ellipsis: true
                }, {
                    title: 'IP地址',
                    key: 'ipAddress'
                }, {
                    title: '客户端版本',
                    key: 'sysVersion',
                    ellipsis: true
                }
            ],
            handleData: [],
            loading: false,
            handleOptions: [],
            list: [],
            allTotal: 0,
            pageNum: '1'
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getDate()
        this.getTable()
        this.getName()
    },
    methods: {
        getTable() {    
            this.start = this.startTime+'T16:00:00.000Z'
            this.end = this.endTime+'T15:59:59.000Z'
            let startTime = this.start
            let endTime = this.end
            let platform = this.platform
            let operationName = this.operationName
            let handleName = this.handleName
            let pageNum = this.pageNum
            getList({
                startTime,
                endTime,
                platform,
                operationName,
                handleName,
                pageNum
            }).then(res=> {
                // console.log(JSON.stringify(res.data.items))
                this.handleData = res.data.items
                this.allTotal = res.data.total
            }).catch(err => {
                // 异常情况
            })
        },
        getDate() {
            let nowDate = new Date()
            const year = nowDate.getFullYear();
            const month = nowDate.getMonth() + 1;
            const d1 = nowDate.getDate()-1;
            const d = nowDate.getDate();
            let day1
            let day
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (d1 >= 0 && d1 <= 9) {
                day1 = "0" + d1
            } else {
                day1 = d1
            }
            if (d >= 0 && d <= 9) {
                day = "0" + d
            } else {
                day = d
            }
            this.startTime1 = `${year}-${month}-${day1}`;
            this.endTime1 = `${year}-${month}-${day}`;
            this.startTime = this.startTime1
            this.endTime = this.endTime1
        },
        handleChange(date) {
            let startValue = this.startTime
            startValue = new Date(date).getTime()
            this.endDate = {
                disabledDate(date) {
                    return date && date.valueOf() < startValue - 86400000;
                }
            }
        },
        endTimeChange(date) {
            // console.log(date)
            this.endTime = date
        },  
        getName() {
            let platform = this.platform
            getBusinessName(platform).then(res=> {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].key
                    treeItem.push(trees[i])
                }
                this.operationList = createNameTree(treeItem)
                // console.log(this.operationList)
            }).catch(err => {
                // 异常情况
            })
        },
        getHandleName(query) {
            searchHandleName(query).then(res=> {
                // console.log(JSON.stringify(res.data.items))
                this.list = res.data.items
            }).catch(err => {
                // 异常情况
            })
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.handleOptions = this.list
                }, 500);
            } else {
                this.handleOptions = []
            }
        },
        selectChange(value) {
            this.handleName = value.operationName
        },
        treeChange(value) {
            this.operationName = value
        },
        changePage(index) {
            this.pageNum = index
            this.getTable()
        },
        handleSearch() {
            this.getTable()
        },
        handleReset() {
            this.getDate()
            this.platform = 'web'
            this.operationName = ''
            this.handleName = ''
            this.pageNum = '1'
            this.getTable()
        }
    }
}
</script>
<style lang="less" scoped>
.handle-box {
    margin: 5px;
    background: #fff;
    .handle-search {
        padding: 5px;
        height: 43px;
        .search-main {
            height: 33px;
            .form-item {
                display: inline-block;
                min-height: 33px;
                label {
                    display: inline-block;
                    width: 100px;
                    line-height: 35px;
                    text-align: right;
                    color: #576374;
                }
            }
            .form-search-btn {
                float: right;
                margin-top: 4px;
                button{
                    background: #4b7efe;
                    font-size: 12px;
                    padding: 4px 12px;
                    color: #fff;
                    border: 0;
                    border-radius: 3px;
                    margin: 0 5px;
                }
                .reset{
                    background: #495566;
                }
            }
        }
    }
    .handle-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .handle-page {
            margin-top: 20px;
        }
    }
    .tree-item {
        /deep/.ivu-select-dropdown {
            min-height: 400px;
            /deep/.ivu-tree-title {
                font-size: 13px;
            }
        }
    }
}
</style>