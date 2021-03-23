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
                        <Icon type="ios-arrow-up" v-if="searchShow"/>
                        <Icon type="ios-arrow-down" v-else />
                        高级搜索
                    </a>
                    <Button @click="search()">搜索</Button>
                    <Button class="reset" @click="reset()">重置</Button>
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
            <Table ref="selection" :columns="columns" :data="data"
             @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                <template slot-scope="{ row, index }" slot="action">
                    <Button class="action" type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254)" @click="check(row.id)">查看</Button>
                    <Button class="action" type="text" size="small" style="color:rgb(75, 126, 254)" @click="copy(row.id)">复制</Button>
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
                    <TreeSelect v-model="addForm.value" multiple :data="treeData" :max-tag-count="2" v-width="240"  />
                    
                </FormItem>
                <FormItem label="设备类型： " >
                    <TreeSelect 
                        v-model="addForm.type" 
                        multiple 
                        :data="genreList" 
                        v-width="240" 
                        :max-tag-count="2"
                    />
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
// planList
import { planList,typeMethod,regionalCon,deletePlan } from '@api/upkeep/plan';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
import { typeTreeMethod1 } from '@/libs/public'
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
                    ellipsis: true
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
                    ellipsis: true
                }, {
                    title: '保养内容项',
                    key: 'contentsItems',
                    width:120,
                    ellipsis: true
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
            treeData: [],
            addForm: {
                value: [],
                type: []
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
            stateList:['未分配','已分配','已下达','转派','逾期','终止','完成'],
            genreList:[],
            selectedData:[]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getList()
        this.getRegional()
        this.getType()
    },
    methods: {
        deleteHandle(){
            if(this.selectedData.length==0){
                // 
                this.$Message.warning('请选择删除的计划');
                return
            }
            this.$Modal.confirm({
                title: '提示',
                content: '<p>你确定要删除吗？</p>',
                onOk: () => {
                    let arr = []
                    this.selectedData.map(ele=>{
                        arr.push(ele.id)
                    })
                    let ids = arr.join(',')
                    deletePlan(ids).then(res=>{
                        if(res.data.count){
                            this.$Message.success('删除成功');
                            this.getList()
                        }
                    })
                },
                onCancel: () => {
                    
                }
            });
            
            
        },
        check(id){
            // console.log(id)
            this.$router.push({
                path: '/upkeep/planAllot',
                query:{
                   id:id 
                }
            })
        },
        copy(id){
            this.$router.push({
                path: '/upkeep/planDetail',
                query:{
                    id:id
                }
            })
        },
        // 清空所有已选项
        handleClearSelect (status) {
            this.selectedData = [];
            this.$refs.selection.selectAll(status);
        },
        // 选中一项，将数据添加至已选项中
        handleSelect (selection, row) {
            this.selectedData.push(row);
        },
        // 取消选中一项，将取消的数据从已选项中删除
        handleSelectCancel (selection, row) {
            const index = this.selectedData.findIndex(item => item.id === row.id);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            this.selectedData=selection
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            const selection = this.modelData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.id === item.id);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        },
         getRegional() {
            regionalCon().then(res => {
                // console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].checked = false
                    treeItem.push(trees[i])
                }
                this.treeData = createTree(treeItem,0)
            }).catch(err => {
                // 异常情况
            })
        },
         getType() {
            typeMethod().then(res=> {
                // console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].checked = true
                    treeItem.push(trees[i])
                }
                this.genreList = typeTreeMethod1(treeItem, '0')
            }).catch(err=> {

            })
        },
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
            // console.log(range)
            let state = this.confirmWay.length!=0?this.confirmWay.join(','):''
            planList(this.planList.name,range,begin,end,state,this.page).then(res=>{
            //   console.log(res)
              if(res.data.items){
                  let temp = res.data.items
                  temp.map(ele=>{
                      ele.startDate = formatTime(ele.startDate, 'yyyy-MM-dd')
                      ele.endDate = formatTime(ele.endDate, 'yyyy-MM-dd')
                      ele.createDate = formatTime(ele.createDate, 'HH:mm:ss yyyy-MM-dd')
                      if(ele.state == 3){
                          ele._disabled= true
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
            // console.log(this.addForm)
            let equIds = this.addForm.length!=0?this.addForm.type.join(','):''
            let areaIds =this.addForm.value.length!=0?this.addForm.value.join(','):''
            this.$router.push({
                path: '/upkeep/planDetail',
                query:{
                    equipmentTypeId:equIds,
                    areaId:areaIds
                }
            })
        },
        cancel() {
            // this.$Message.info('Clicked cancel');
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
            .ivu-btn { 
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