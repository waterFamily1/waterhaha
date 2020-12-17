<template>
    <div class="plan-wrap" :style="{height: height+'px'}">
        <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="planList.name" placeholder="计划名称" style="width: 200px;"></Input>
                </div>
                <div class="form-item">
                    <label>起止日期：</label>
                    <DatePicker type="date"  placement="bottom-end"  @on-change="startTimeChange" :options="startDate" format="yyyy-MM-dd"  v-model="startTime" placeholder="开始日期" style="width: 190px"></DatePicker> -
                    <DatePicker type="date"  placement="bottom-end"  @on-change="endTimeChange" :options="endDate" format="yyyy-MM-dd"  v-model="endTime" placeholder="结束日期" style="width: 190px"></DatePicker>
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-down" v-if="searchShow" />
                        <Icon type="ios-arrow-up" v-else />
                        高级搜索
                    </a>
                    <button type="button" @click="search()">搜索</button>
                    <button type="button" class="reset" @click="reset()">重置</button>
                </div>
            </div>
            <div class="c-adv-search">
                <div class="c-adv-search-row">
                    <div class="form-item" style="display: flex;">
                        <label>状态：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="confirmWay">
                                <TagSelectOption :name="index+1" v-for="(item,index) in stateList" :key="index">{{item}}</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="c-table-top">
            <div class="c-table-top-btns">
                <Button @click="addModal = true">新增</Button>
                <Button @click="deleteHandle()">删除</Button>
            </div>
            <Table ref="selection" :columns="columns" :data="data">
                <template slot-scope="{ row, index }" slot="action">
                    <Button class="action" type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254)">查看</Button>
                    <Button class="action" type="text" size="small" style="color:rgb(75, 126, 254)">复制</Button>
                </template>
            </Table>
            <Page :total="total" show-elevator show-total class="page" @on-change="changeSize" />
        </div>
        <!-- 新增弹出框 -->
        <Modal
            v-model="addModal"
            title="新增保养项目"
            width="500"
            @on-ok="ok"
            @on-cancel="cancel"
            ok-text="生成保养项目">
            <Form :model="addForm" :label-width="100">
                <FormItem label="区域位置： ">
                    <TreeSelect v-model="addForm.value" multiple :data="treeData" />
                </FormItem>
                <FormItem label="设备类型： " >
                    <Select v-model="addForm.type">
                        <Option value="0">站点设备</Option>
                        <Option value="1">泵站设备</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
// planList
import { planList } from '@api/upkeep/plan';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name: 'upkeerPlan',
    data() {
        return {
            height: '',
            searchShow: false,
            planList: {
                name: '',
                time: ''
            },
            confirmWay: [],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {   
                    title: '序号',
                      width: 70,
                    type: 'index',
                }, {
                    title: '开始日期',
                    key: 'startDate',
                     width:120,
                }, {
                    title: '结束日期',
                    key: 'endDate',
                     width:120,
                }, {
                    title: '计划名称',
                    key: 'planName',
                }, {
                    title: '状态',
                    key: 'state',
                    width:100,
                    render: (h, params) => {
                        let a = Number(params.row.state)
                        let text = this.stateList[a-1]
                        return h('span', {
                        }, text);
                    }
                }, {
                    title: '保养持续时间',
                    key: 'planDuration',
                     width:120,
                }, {
                    title: '保养内容项',
                    key: 'contentsItems',
                     width:120,
                }, {
                    width:105,
                    title: '创建时间',
                    key: 'createDate',
                }, {
                    title: '操作',
                    slot: 'action',
                    align: 'center',
                     width:140,
                }
            ],
            data: [],
            addModal: false,
            treeData: [
                {
                    title: 'parent1',
                    expand: true,
                    value: 'parent1',
                    selected: false,
                    checked: false,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            value: 'parent1-1',
                            selected: false,
                            checked: false,
                            children: [
                                {
                                    title: 'leaf 1-1-1',
                                    value: 'leaf1',
                                    selected: false,
                                    checked: false,
                                }
                            ]
                        }
                    ]
                }
            ],
            addForm: {
                value: [],
                type: ''
            },
            startDate: {
                disabledDate (date) {
                    return date && date.valueOf() >= Date.now();
                }
            },
            endDate: {
                disabledDate (date) {
                    return date && date.valueOf() <= Date.now()- 86400000
                }
            },
            startTime:'',
            start:'',
            endTime:'',
            end:'',
            page:1,
            total:0,
            stateList:['未分配','已分配','已下达','转派','逾期','终止','完成']
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getList()
    },
    methods: {
        search(){
           this.getList()
        },
        endTimeChange(day){
          this.end = day
            this.startDate = {
                disabledDate (date) {
                    return date && date.valueOf() >new Date(day).getTime();
                }
           }
        },
        startTimeChange(day){
            this.start = day
            this.endDate = {
                disabledDate (date) {
                    return date && date.valueOf() <=new Date(day).getTime()- 86400000;
                }
            }
        },
        changeSize(size){
            this.page = size
            this.getList()
        },
        getList(){
        // planName,dateRange,start,end,state,page
            let begin = this.start?this.$moment(this.start).utc().format():''
            let end  = this.end?this.$moment(this.end).utc().format():''
            let range = {"start":begin,"end":end}
            let state = this.confirmWay.length!=0?this.confirmWay.join(','):''
            planList(this.planList.name,range,begin,end,state,this.page).then(res=>{
              console.log(res)
              if(res.data.items){
                  let temp = res.data.items
                  temp.map(ele=>{
                      ele.startDate = formatTime(ele.startDate, 'yyyy-MM-dd')
                      ele.endDate = formatTime(ele.endDate, 'yyyy-MM-dd')
                      ele.createDate = formatTime(ele.createDate, 'HH:mm:ss yyyy-MM-dd')
                      if(ele.state == 3){
                          ele. _disabled= true
                      }
                  })
                  this.data = temp
                  this.total = res.data.total

              }
            })
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        ok() {
            this.$router.push({
                path: 'upkeep/planDetail'
            })
        },
        cancel() {
            this.$Message.info('Clicked cancel');
        }
    }
}
</script>
<style lang="less" scoped>
.plan-wrap {
    margin: 5px;
    background: #fff;
    .search-box {
        padding: 5px;
        height: 43px;
        .search-main {
            height: 33px;
            overflow: hidden;
            .form-item {
                min-height: 33px;
                display: inline-block;
                /deep/.ivu-input {
                    height: 28px;
                    font-size: 13px;
                }
            }
            .form-search-btn {
                margin-top: 4px;
                float: right;
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
                /deep/.ivu-input-wrapper {
                    width: 150px;
                    /deep/.ivu-input {
                        height: 28px;
                        font-size: 13px;
                    }
                }
                .cmp-tab {
                    display: inline-block;
                    margin-left: 10px;
                    /deep/.ivu-tag-text {
                        font-size: 14px;
                    }
                }
                /deep/.ivu-form-item {
                    margin-bottom: 5px;
                }
            }
            /deep/.ivu-form-item-content {
                line-height: 6px;
            }
        }
        label {
            display: inline-block;
            width: 100px;
            text-align: right;
            margin-right: 5px;
            line-height: 32px;
        }
    }
    .searchTrans {
        height: 100px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .searchPack {
        height: 43px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .c-table-top {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            button {
                background-color: #576374;
                border: none;
                min-width: 50px;
                height: 26px;
                color: #fff;
                margin-right: 10px;
                font-size: 13px;
            }
        }
        .page{
            text-align: right;
            margin-top: 10px;
        }
    }
}
/deep/.ivu-modal-footer {
    /deep/.ivu-btn-text {
        background-color: #cbcbcb;
        color: #FEFEFE;
    }
}
</style>