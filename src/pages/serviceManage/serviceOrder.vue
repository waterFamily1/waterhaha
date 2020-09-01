<template>
    <div class="plan-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键词：</label>
                    <Input v-model="keyword" placeholder="故障设备" style="width: 250px" size="small" />
                </div>
                <div class="form-item">
                    <label>区域位置：</label> 
                    <Select v-model="tissue" style="width:150px" size="small">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-down" v-if="searchShow" />
                        <Icon type="ios-arrow-up" v-else />
                        高级搜索
                    </a>
                    <button type="button">搜索</button>
                    <button type="button" class="reset">重置</button>
                </div>
            </div>
            <div class="c-adv-search">
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>报修时间：</label>
                        <div class="cmp-tab">
                           <DatePicker type="date" placeholder="Select date" style="width: 120px"></DatePicker> - 
                           <DatePicker type="date" placeholder="Select date" style="width: 120px"></DatePicker>
                        </div>
                    </div>
                </div>
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>巡检状态：</label>
                        <div class="cmp-tab">
                            <a href="javascript:;" @click="typeCheckAll()" :class="{checked:typeCheckedAll}">全部</a>
                            <a href="javascript:;" v-for="(item, index) in stateList" 
                            :key="index" @click="typeCheck(item.id)" 
                            :class="{checked:typeBox.includes(item.id)}">{{ item.label }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="task-content">
             <Table stripe :columns="tableList" :data="tableData">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                    <Button class="action" size="small">查看</Button>
                </template>
            </Table>
            <Page :total="100" show-elevator size="small" class="page" style="text-align:right;margin-top:20px"  />
        </div>
    </div>
</template>
<script>
export default {
    name:"serviceOrder",
    data(){
        return {
            searchShow: false,
            height:"",
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                }
            ],
            stateList: [
                {label: '待处理',id: 1},
                {label: '处理中',id: 2},
                {label: '挂起',id: 3},
                {label: '关闭',id: 4},
                {label: '完成',id: 5},
                {label: '未分配',id: 6}
            ],
            typeCheckedAll: false,
            typeBox: [],
            tissue:'',
            modal:false,
            keyword:'',
            tableList: [
                {
                    title: '故障设备',
                    key: 'failureEquipment'
                },
                {
                    title: '维修编号',
                    key: 'number'
                },
                {
                    title: '报修人',
                    key: 'person'
                },
                {
                    title: '报修时间',
                    key: 'date'
                },
                
                {
                    title: '完成时间',
                    key: 'finishDate'
                },
                {
                    title: '区域位置',
                    key: 'location'
                },
                {
                    title: '当前状态',
                    key: 'currentState'
                },
                {
                    title: '当前处理人',
                    key: 'conductor'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'default',
                                    size: 'small'
                                },
                                style: {
                                    color:'rgb(75, 126, 254)',
                                    border:'0'
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({path:'/serviceManage/serviceDetail'})
                                    }
                                }
                            }, '查看')
                        ]);
                    }
                }
            ],
            tableData:[
                {
                   failureEquipment:'测试3' ,
                   number:'R20200807001',
                   person:'xxx',
                   date:'08:54:25 2020-08-07',
                   finishDate:'',
                   location:'沙陂村150吨巡检点',
                   currentState:'待处理',
                   conductor:'xxxx',

                }
            ]
        }
    },
    methods :{
        higherSearch() {
            this.searchShow = !this.searchShow
        },
         higherSearch() {
            this.searchShow = !this.searchShow
        },
        typeCheckAll() {
            this.typeBox = []
            this.typeCheckedAll = true
        },
        typeCheck(i) {
            this.typeCheckedAll = false
            if(this.typeBox.includes(i)) {
                this.typeBox = this.typeBox.filter((ele) => {
                    return ele != i
                });
            } else {
                this.typeBox.push(i);
            }
        },
        mapClick(){
            console.log("1111")
            this.$router.push({
                path:'/pollingManage/plan/add',
                query: {
                    type: 'map'
                }
            })
        },
        customClick(){
            this.$router.push({
                path:'/pollingManage/plan/add',
                query: {
                    type: 'normal'
                }
            })
        }
    },
    mounted() {
        this.height = document.body.clientHeight-130
    }
}
</script>
<style lang="less" scoped>
/deep/.ivu-col-span-12{
    width: 47%;
}
.plan-box{
    margin: 5px;
    background: #fff;
    overflow: auto;
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
                    }
                }
                .cmp-tab {
                    display: inline-block;
                    a {
                        margin-right: 20px;
                        color: #576374;
                    }
                    .checked {
                        color: #4B7EFE;
                    }
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
   .task-content{
       border-top: 5px solid #f0f0f0;
       padding: 10px;
       .title{
            height: 36px;
            border-bottom: 1px solid #EEE;
            button{
                background: #576374;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
            }
       }
   }
}
</style>