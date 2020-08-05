<template>
    <div class="handle-box" :style="{height: height+'px'}">
        <div class="handle-search">
            <div class="search-main">
                <div class="form-item">
                    <label>操作时间：</label>
                    <DatePicker type="date" :options="startTime" placeholder="Select date1" style="width: 110px"></DatePicker> -
                    <DatePicker type="date" :options="endTime" placeholder="Select date2" style="width: 110px"></DatePicker>
                </div>
                <div class="form-item">
                    <label>平台：</label>
                    <Select v-model="platform" style="width:70px">
                        <Option v-for="item in platList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="form-item">
                    <label>业务名称：</label>
                    <Select v-model="platform" style="width:130px">
                        <Option v-for="item in platList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="form-item">
                    <label>操作名称：</label>
                    <Input v-model="handleName" placeholder="请输入操作名称" style="width: 130px" />
                </div>
                <div class="form-search-btn">
                    <button type="button">搜索</button>
                    <button type="button" class="reset">重置</button>
                </div>
            </div>
        </div>
        <div class="handle-content">
            <Table stripe size="small" :columns="handleColumns" :data="handleData"></Table>
            <div class="handle-page">
                <Page :total="100" show-total show-elevator style="text-align: right;" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'hangleLog',
    data() {
        return {
            height: '',
            startTime: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            endTime: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            platform: '',
            platList: [
                {
                    value: '0',
                    label: 'WEB'
                },
                {
                    value: '1',
                    label: 'APP'
                },
            ],
            handleName: '',
            handleColumns: [
                {
                    title: '平台',
                    key: 'platform'
                }, {
                    title: '业务名称',
                    key: 'operationName'
                }, {
                    title: '操作人',
                    key: 'operator'
                }, {
                    title: '操作名称',
                    key: 'handleName'
                }, {
                    title: '操作详情',
                    key: 'handleDetail',
                    ellipsis: true
                }, {
                    title: '操作时间',
                    key: 'handleTime'
                }, {
                    title: '操作地址',
                    key: 'handleSite',
                    ellipsis: true
                }, {
                    title: 'IP地址',
                    key: 'IPSite'
                }, {
                    title: '客户端版本',
                    key: 'client',
                    ellipsis: true
                }
            ],
            handleData: [
                {
                    platform: 'WEB',
                    operationName: '流量报警设置',
                    operator: 'deht',
                    handleName: '查询SIM报警列表',
                    handleDetail: 'RequestParam: {pageSize=10, currentPage=1}; ',
                    handleTime: '10:13:19  2020-08-03',
                    handleSite: '中国天津市天津',
                    IPSite: '60.29.200.129',
                    client: 'Windows--Chrome-84.0.4147.89'
                }
            ]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {

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
}
</style>