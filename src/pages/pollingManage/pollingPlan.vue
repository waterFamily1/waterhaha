<template>
    <div class="plan-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="keyword" placeholder="名称" style="width: 200px" size="small" />
                </div>
                <div class="form-item">
                    <label>所属组织：</label> 
                 <TreeSelect v-model="area"  :data="processList"  v-width="200"  />
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
                    <div class="form-item">
                        <label>创建时间：</label>
                        <div class="cmp-tab">
                          <DatePicker type="date"  placement="bottom-end"  @on-change="startTimeChange" :options="startDate" format="yyyy-MM-dd"  v-model="startTime" placeholder="开始日期" style="width: 190px"></DatePicker> -
                    <DatePicker type="date"  placement="bottom-end"  @on-change="endTimeChange" :options="endDate" format="yyyy-MM-dd"  v-model="endTime" placeholder="结束日期" style="width: 190px"></DatePicker>
                        </div>
                    </div>
                </div>
                <div class="c-adv-search-row">
                    <div class="form-item" style="display:flex;margin-top:20px">
                        <label>巡检状态：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="state">
                                <TagSelectOption :name="item.id" v-for="(item, index) in stateList" :key="index">{{ item.label }}</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="plan-content" :style="{height: (height-45)+'px'}">
           <div class="btn-add"><button @click="modal = true">新增计划</button></div>
           <div class="c-top-border-gray">
               <div>
                    <h3 class="plan-title">地图巡检</h3>
                    <div class="plan-cards">
                        <Card v-for="(item , index) in mapList" class="plan-card" :key="index">
                            <h5 slot="title" :class="{'gray':item.status=='Interrupt'||item.status=='Finish'}">
                                {{ item.name }}
                            </h5>
                            <a href="javascript:;" slot="extra" class="icon">
                            <Icon type="ios-trash-outline"  style="margin-right:8px" v-if="item.status=='New'||item.status=='Ing'" @click="deleteHandle(item.id)" />
                            <Icon type="ios-copy-outline" />
                            </a>
                            <div class="plan-card-info">
                                <p>状态：{{item.state}}</p> 
                                <p class="ell">所属组织：{{ item.org }}</p>
                                <p>起止日期：{{ item.planStart }} - {{item.planEnd}}</p>
                                <p class="ell">巡检周期：{{ item.periodValue }}</p> 
                                <p>创建时间：{{ item.createDate }}</p>
                            </div>
                        </Card>
                    </div>
               </div>
                <div>
                    <h3 class="plan-title">普通巡检</h3>
                    <div class="plan-cards">
                        <Card v-for="(item , index) in customList" class="plan-card" :key="index">
                           <h5 slot="title" :class="{'gray':item.status=='Interrupt'||item.status=='Finish'}">
                                {{ item.name }}
                            </h5>
                            <a href="javascript:;" slot="extra" class="icon">
                            <Icon type="ios-trash-outline"  style="margin-right:8px" v-if="item.status=='New'||item.status=='Ing'"  @click="deleteHandle(item.id)" />
                            <Icon type="ios-copy-outline" />
                            </a>
                            <div class="plan-card-info">
                                <p>状态：{{item.state}}</p> 
                                <p class="ell">所属组织：{{ item.org }}</p>
                                <p>起止日期：{{ item.planStart }} - {{item.planEnd}}</p>
                                <p class="ell">巡检周期：{{ item.periodValue }}</p> 
                                <p>创建时间：{{ item.createDate }}</p>
                            </div>
                        </Card>
                    </div>
                </div>
              
           </div>
        </div>
        <Modal v-model="modal" width="442" class="modal" footer-hide :closable="false">
            <div style="text-align:center">
                <Row>
                    <Col span="12" style="border:solid 2px #eee;padding:10px;margin-right:20px;width:195px" > 
                       <div @click="mapClick()">
                            <Icon type="ios-copy-outline"  style="font-size:50px;padding-bottom:10px"/>
                            <p style="font-size:12px">使用GPS地图功能巡检</p>
                            <p style="font-size:12px">对巡检过程轨迹进行记录和跟踪 </p>
                            <h2 style="font-size:16px;margin-top:15px">地图巡检</h2>
                       </div>
                    </Col>
                    <Col span="12" style="border:solid 2px #eee;padding:10px;">
                       <div  @click="customClick()">
                            <Icon type="ios-copy-outline" style="font-size:50px;padding-bottom:10px;width:195px" />
                            <p style="font-size:12px">不记录GPS定位信息，只要求对巡检点考察进行记录</p>
                            <h2 style="font-size:16px;margin-top:15px">普通巡检</h2>
                       </div>
                       
                    </Col>
                </Row>
            </div>
        </Modal>
    </div>
</template>
<script>
import { getOrganizations,planList,deletePlan } from '@api/pollingManage/plan';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name:"pollingPlan",
    data(){
        return {
            searchShow: false,
            height:"",
            processList:[],
            stateList: [
                {label: '新建',id: 'New'},
                {label: '执行中',id: 'Ing'},
                {label: '已终止',id: 'Interrupt'},
                {label: '已完成',id: 'Finish'}
            ],
            cardList:[
               
            ],
            modal:false,
            keyword:'',
            area:'',
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
            state :['New','Ing'],
            page:1,
            mapList:[],
            customList:[]
        }
    },
    methods :{
        deleteHandle(id){
           deletePlan(id).then(res=>{
               if(res.data.count){
                   this.$Message.success('数据删除成功！');
                   this.getList()
               }
           })
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
        getOrg(){
            getOrganizations().then(res=>{
                console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.processList = createTree(treeItem)
             })
        },
        search(){
            this.getList()
        },
        reset(){
            this.keyword = ''
            this.area = ''
            this.start = ""
            this.end =""
            this.state = ""
            this.getList()
        },
        getList(){
            this.customList=[]
            this.mapList = []
            // queryName,orgId,start,end,status,page
            let start = this.start?this.$moment(this.start).utc().format():''
            let end = this.end?this.$moment(this.end).utc().format():''
            let status = this.state.length?this.state.join(','):''
            planList(this.keyword,this.area,start,end,status,this.page).then(res=>{
                console.log(res)
                if(res.data.items){
                    let temp  = res.data.items
                    temp.map(ele=>{
                        ele.createDate = formatTime(ele.createDate, 'yyyy-MM-dd HH:mm ')
                        ele.planStart = formatTime(ele.planStart, 'yyyy-MM-dd')
                        ele.planEnd = formatTime(ele.planEnd, 'yyyy-MM-dd')
                        ele.state = ele.status == 'New'?'新建':(ele.status=='Ing'?'执行中':(ele.status=='Interrupt')?'已终止':'已完成')
                        if(ele.type == 'Inside'){
                            this.customList.push(ele)
                        }else{
                            this.mapList.push(ele)
                        }
                    })
                }
            })
        },
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
                path:'/plan/add',
                query: {
                    type: 'map'
                }
            })
        },
        customClick(){
            this.$router.push({
                path:'/plan/add',
                query: {
                    type: 'normal'
                }
            })
        }
    },
    mounted() {
        this.height = document.body.clientHeight-130
        this.getOrg()
        this.getList()
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
                    margin-left: 10px;
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
        height: 160px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .searchPack {
        height: 43px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .plan-content{
        .btn-add{
            border-top: 5px solid #f0f0f0;
            padding: 10px;
            button{
               width:100px;
               text-align: center;
               background: #576374;
               font-size: 12px;
               color: #fff;
               border: 0;
               padding: 4px 12px;
               border-radius: 3px;
            }
        }
        .c-top-border-gray{
            border-top: 1px solid rgb(240, 240, 240);
            padding: 10px;
            .plan-title{
                height: 35px;
                background-color: #f4f4f4;
                text-indent: 10px;
                line-height: 35px;
                font-size: 13px;
                font-weight: bold;
            }
            .plan-card{
                display: inline-block;
                width: 24%;
                margin: 10px 0.5% 0;
                overflow: hidden;
                border: 1px solid #b4b4b4;
                border-radius: 3px;
                position: relative;
                /deep/.ivu-card-head{
                    padding: 0;
                }
                /deep/.ivu-card-extra{
                    top: 0;
                }
                h5{
                    height: 30px;
                    line-height: 30px;
                    background-color: #4b7efe;
                    color: #fff;
                    text-indent: 10px;
                }
                .gray{
                    background-color: #e6e6e6 !important;
                    color: #333 !important;
                }
                .icon{
                    font-size: 20px;
                    color: #fff;
                }
                /deep/.ivu-card-body {
                    padding:10px 10px 10px 20px;
                    p{
                        line-height: 25px;
                        color: #333;
                    }
                    
                }
            }
        }
    }
}
</style>