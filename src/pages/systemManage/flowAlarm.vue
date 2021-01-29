<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="keyword" placeholder="报警对象" style="width: 200px" />
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-up" v-if="searchShow"/>
                        <Icon type="ios-arrow-down" v-else />
                        高级搜索
                    </a>
                    <Button @click="getList()">搜索</Button>
                    <Button class="reset" @click="resetHandle()">重置</Button>
                </div>
            </div>
            <div class="c-adv-search">
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>报警类型：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="typeValue" @on-change="typeChange">
                                <TagSelectOption name="1">单卡报警</TagSelectOption>
                                <TagSelectOption name="2">流量池报警</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>订阅方式：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="takeValue" @on-change="takeChange">
                                <TagSelectOption name="1">系统消息</TagSelectOption>
                                <TagSelectOption name="2">短信</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="index-content">
            <div class="c-table-top-btns">
                <Button @click="addHandle()">新增报警</Button>
                <Button style="margin-left:10px" @click="deleteHandle()">删除</Button>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table 
                    stripe 
                    :columns="tableList" 
                    :data="tableData"
                    @on-selection-change="handleSelectRow"
                >
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;" @click="editHandle(row.id)">编辑</Button>
                    </template>
                </Table>
                 <Page 
                    :total="allTotal" show-total show-elevator @on-change="changePage" 
                    style="text-align: right;margin-top: 10px;" 
                />
            </div>
        </div>
    </div>
</template>
<script>
import { getListMethod, deleteMethod } from '@/api/system/alarm'
import { formatTime } from '@/libs/public'

export default {
    name: 'indexManage',
    data() {
        return {
            height: '',
            keyword: '',
            searchShow: false,
            typeValue: [],
            takeValue: [],
            tableList: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '报警对象',
                    key: 'alarmObject'
                },
                {
                    title: '订阅人',
                    key: 'userName'
                },
                {
                    title: '订阅方式',
                    key: 'subscribeMode'
                },
                {
                    title: '阈值(%)',
                    key: 'threshold'
                },
                {
                    title: '报警类型',
                    key: 'alarmType'
                },
                {
                    title: '最近报警时间',
                    key: 'alarmTime'
                },
                {
                    title: '创建时间',
                    key: 'createTime'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            tableData: [],
            allTotal: 0,
            pageNum: '1',
            ids: ''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getList()
        let from = this.$route.query.from
        if(from == 'addSuccess') {
            this.$Notice.success({
                title: '成功',
                desc: '添加成功！'
            });
        } else if(from == 'editSuccess') {
            this.$Notice.success({
                title: '成功',
                desc: '编辑成功！'
            });
        }
    },
    methods: {
        getList() {
            let queryName = this.keyword
            let currentPage = this.pageNum
            let alarmType = this.typeValue
            let subscribeMode = this.takeValue
            getListMethod({
                queryName,
                currentPage,
                alarmType,
                subscribeMode
            }).then(res=> {
                // console.log(res.data)
                let arr = res.data.items
                let list = arr.map((item) => {
                    if(item.subscribeMode == 1) {
                        item.subscribeMode = '系统消息'
                    } else if (item.subscribeMode == 2) {
                        item.subscribeMode = '短信'
                    } else if (item.subscribeMode == '1,2') {
                        item.subscribeMode = '系统消息,短信'
                    }

                    if(item.alarmType == 1) {
                        item.alarmType = '单卡报警'
                    } else if(item.alarmType == 2) {
                        item.alarmType = '流量池报警'
                    }
                    if(item.alarmTime == null) {

                    } else {
                        item.alarmTime = formatTime(item.alarmTime, 'HH:mm:ss yyyy-MM-dd')
                    }

                    item.createTime = formatTime(item.createTime, 'HH:mm:ss yyyy-MM-dd')

                    return item
                })
                this.tableData = list
                this.allTotal = res.data.total
            }).catch(err=> {

            })
        },  
        resetHandle() {
            this.keyword = ''
            this.typeValue = []
            this.takeValue = []
            this.pageNum = '1'
            this.getList()
        },
        typeChange(checkedNames, name) {
            if(name == '' || name == undefined || name == null) {
                this.typeValue = []
            }
        },
        takeChange(checkedNames, name) {
            if(name == '' || name == undefined || name == null) {
                this.takeValue = []
            }
        },
        handleSelectRow(selection) {
            let arr = selection
            let idArr = []
            arr.forEach(item => {
                idArr.push(item.id)
                return
            })
            let ids1 = JSON.stringify(idArr).replace("[","").replace("]","")
            this.ids = ids1
            // console.log(this.ids)
        },
        changePage(index) {
            this.pageNum = index
            this.getList()
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        addHandle() {
            this.$router.push({
                path: '/alarm/addAlarm',
                query: {
                    alarm: 'add'
                }
            })
        },
        editHandle(id) {
            this.$router.push({
                path: '/alarm/addAlarm',
                query: {
                    alarm: 'edit',
                    ids: id
                }
            })
        },
        deleteHandle() {
            if( this.ids == '' ||  this.ids == null ||  this.ids == undefined) {
                this.$Notice.warning({
                    title: '警告',
                    desc: '请选中后删除'
                });
            } else {
                this.$Modal.confirm({
                title: '确定要删除吗?',
                width: '300',
                onOk: () => {
                    let ids = this.ids.replace("\"","").replace("\"","")
                    deleteMethod(ids).then(res=> {
                        // console.log(res)
                        if(res.status == 200) {
                            this.$Notice.success({
                                title: '成功',
                                desc: '删除成功！'
                            })
                            this.getList()
                        }
                    }).catch(err=> {

                    })
                },
                onCancel: () => {
                    // this.$Message.info('Clicked cancel');
                }
            });
                
            }
        }
    }
}
</script>
<style lang="less" scoped>
.index-box {
    margin: 5px;
    background: #fff;
    .index-search {
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
                a {
                    margin: 0 10px 0 0;
                    color: #576374;
                    font-size: 12px;
                }
                .ivu-btn {
                    height: auto;
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
        .c-adv-search {
            margin-top: 10px;
            padding-top: 5px;
            border-top: 1px solid #ececec;
            .c-adv-search-row {
                margin: 5px 0;
                .form-item {
                    display: inline-block;
                    height: 33px;
                    label {
                        display: inline-block;
                        width: 100px;
                        line-height: 35px;
                        text-align: right;
                        color: #576374;
                        float: left;
                    }
                }
                .cmp-tab {
                    display: inline-block;
                    /deep/.ivu-tag-text {
                        font-size: 14px;
                    }
                }
                /deep/.ivu-form-item {
                    margin-bottom: 5px;
                }
            }
        }
    }
    .searchTrans {
        height: 140px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .searchPack {
        height: 43px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .index-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            .ivu-btn {
                height: auto;
                min-width: 50px;
                background: #576374;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
            }
        }
        .table-wrapper{
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
}
</style>