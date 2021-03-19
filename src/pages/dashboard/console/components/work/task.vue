<template>
    <div class="home-item calendar-item">
        <div class="item-title">
            <h3>我的任务</h3>
            <span>
                <a href="javascript:;" @click="replace" v-if="isEdit">替换</a>
                <a href="javascript:;" @click="del" v-if="isEdit">删除</a>
            </span>
        </div>
        <Tabs :animated="false" @on-click="loadTask" size="small" type="line" >
            <TabPane label="巡检任务"></TabPane>
            <TabPane label="消缺任务"></TabPane>
            <TabPane label="维修工单"></TabPane>
            <TabPane label="保养任务"></TabPane>
        </Tabs>
        <div class="home-task-table">
            <div class="home-task-empty" v-show="taskList.length==0">
                <Icon type="ios-cafe" size="60" color="#DDD"/>
                <p>暂无任务</p>
            </div>
            <Table :columns="columns" :data="taskList" no-data-text="" :show-header="false" size="small" stripe></Table>
        </div>
    </div>
</template>

<script>

import util from '@/libs/public_js'
import { task } from '@/api/home/com'

export default {
    data() {
        var _self = this
        return {
            loading: false,
            taskList: [],
            columns: [
                { 
                    key: 'name',
                    render: (h,data) => {
                        return h('a',{
                            style: {
                                color: '#333'
                            },
                            on: {
                                click() {
                                    var rName;
                                    switch (data.row.type) {
                                        case 1:
                                        rName = "patrol-task-detail";
                                        break;
                                        case 2:
                                        rName = "fault-detail";
                                        break;
                                        case 3:
                                        rName = "repair-detail";
                                        break;
                                        case 4:
                                        rName = "maintain-task-detail";
                                        break;
                                    }
                                    _self.$router.push({
                                        name: rName,
                                        params: { id: data.row.id }
                                    })
                                }
                            }
                        }, data.row.name)
                    }
                }, { 
                    key: 'no', 
                    width:150,
                    render: (h,data)=> {
                        return h('span', {
                            attrs:{
                                title: data.row.no||''
                            }
                        },data.row.no||'')
                    } 
                }, { 
                    key: 'statusName' ,width:80,
                    render: (h,data)=> {
                        if(data.row.statusName == '待处理') {
                            return h('span',{style:{color:'rgb(224, 62, 62)'}}, data.row.statusName);
                        } else {
                            return h('span',{style:{color:'#E03E3E'}}, data.row.statusName);
                        }
                        
                    }
                }, { 
                    key: 'showTime',  width:140,
                    render: (h,data)=> {
                        let time = '';
                        if(data.row.type == 1) {
                            time = util.transDateFromServer(data.row.showTime, "yyyy-MM-dd") + util.transDateFromServer(data.row.startTime, " hh:mm")
                        } else if(data.row.type == 2) {
                            time = util.transDateFromServer(data.row.showTime,"yyyy-MM-dd")
                        } else {
                            time = util.transDateFromServer(data.row.showTime,"yyyy-MM-dd hh:mm")
                        }
                        return h('span',time)
                    } 
                },
            ]
        }
    },
    props: {
        isEdit: Boolean,
        itemData: Object
    },
    mounted() {
        this.loadTask(0)
    },
    methods:{
        del() {
            this.$emit('on-delete', this.itemData)
        },
        replace() {
            this.$emit('on-replace', this.itemData)
        },
        loadTask(index) {
            this.loading = true
            index += 1;// 1：巡检；2：缺陷；3：维修；4：养护
            task(index).then(res=> {
            // this.$http.get(api.task+'?type='+index+'&status=1&pageSize=8').then((res)=>{
                if(res.data.items) {
                    this.taskList = res.data.items
                }
                this.loading = false
            })
        }
    }
}
</script>

<style lang="less" scoped>
.home-task-table {
    height: 160px;
    overflow: auto;
    margin: 0 10px;
    .home-task-empty {
        text-align: center;
        color: #666;
    }
}
/deep/.ivu-tabs {
    height: 34px;
}
</style>