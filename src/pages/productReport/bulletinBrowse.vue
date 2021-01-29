<template>
    <div class="bulletin-box" :style="{height: height+'px'}">
        <div class="bulletin-main">
            <div class="bulletin-left">
                <div class="left-box">
                    <AutoComplete
                        v-model="formName"
                        :data="formData"
                        :clearable="true"
                        @on-search="handleSearch"
                        placeholder="输入智能报表名称以检索"
                        size="small">
                    </AutoComplete>
                    <div class="tree-box">
                        <Tree :data="treeData" @on-select-change="selectNode" :render="renderContent"></Tree>
                    </div>
                </div>
            </div>
            <div class="bulletin-right">
                <div class="c-left-border-blue">
                    <div class="form-item">
                        <label>业务时间：</label>
                        <DatePicker type="date" v-model="currentDate" :options="endTimeOptions"  style="width: 250px" size="small" @on-change="changeTime"></DatePicker>
                    </div>
                    <div class="form-item">
                        <label>分组内容：</label>
                        <!-- <Anchor> -->
                            <Select v-model="groupDetail" style="width:200px" size="small">
                                
                                <Option v-for="item in currentRecord.mpointList" :value="item.groupName" :key="item.groupName">
                                    <!-- <AnchorLink href="'#'+item.groupName" title="item.groupName" />  -->
                                    {{item.groupName}}
                                </Option>        
                              
                            </Select>
                          <!-- </Anchor> -->
                       
                    </div>
                </div>
                <div class="c-top-border-gray">
                    <div class="table-top-btns">
                        <Button  @click="exportTable()">导出</Button>
                    </div>
                    <div style="padding:10px" class="app-content">

                        <div style="font-weight:bold">{{currentRecord.formName}}</div>
                        <div style="padding: 5px 5px 5px 0px !important; color: gray;">{{time}}</div>
                        <table style="width:100%;" v-for="(item,index) in currentRecord.mpointList" :key="index">
                            <thead>
                                <tr :id="item.groupName">
                                    <th style="color:#838A95;text-align:left">{{item.groupName}}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <Row>
                                        <Col span="4">
                                            <td>{{item.mpointName}}</td>
                                        </Col>
                                    </Row>    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
// 
import { getTree,getDetail,exportTable,getTable} from '@api/productReport/bulletin';
import { formatTime } from '@/libs/public'
import util from '@/libs/public_js'
export default {
    name: 'bulletinBrowse',
    data() {
        return {
            height: '',
            formName: '',
            formData: [],
            treeData: [],
            groupDetail: '',
            groupList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }

            ],
            id:'',
            currentRecord:{},
            currentDate:'',
            preDay:"",
            endTimeOptions :{
                disabledDate(date){
                    let myDate = new Date(date).getDay();
                    let curDate = new Date().getDay()
                    if(myDate == curDate){
                       return false
                    }else{
                        return true
                    }
                    
                }
            },
            time:''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getOrg()
        console.log(this.getTime())
        this.currentDate = this.getTime().split(',')[1]
        this.preDay = this.getTime().split(',')[0]
    },
    methods: {
        // renderContent (h, { root, node, data }) {
        //     console.log(data)
        //         return h('span', {
        //             style: {
        //                 display: 'inline-block',
        //                 width: '100%'
        //             }
        //         }, [
        //             h('span', [
        //                 h('span',{
        //                     // style:{
        //                     //    display: data.children.length==0?'none':'inline-block'
        //                     // }
        //                 }, data.title)
        //             ])
        //         ]);
        //     },
         exportTable(){
            const defaultParams = {
                formId: this.currentRecord.id,
                recordDate: this.preDay+'T16:00:00.000Z',
                cycleId: this.currentRecord.cycleId
            };
            util.download( '/api/loong/api/datainput-reports/export', defaultParams)
        },
        handleSearch (value) {
            this.formData = !value ? [] : [
                value,
                value + value,
                value + value + value
            ];
        }, 
        changeTime(time){
           console.log(time)
           this.preDay = this.getYesterday(time)
           this.getTablebyTime()
           
        },
        getTime(){
            let now  = new Date()
            let year = now.getFullYear()
            let month = now.getMonth()+1
            month=month<10?'0'+month:month
            let day = now.getDate()
            let dayPre = now.getDate()-1
            day = day<10?'0'+day:day
             dayPre = dayPre<10?'0'+ dayPre:dayPre
            let pre = year+"-"+month+"-"+dayPre
            let today = year+"-"+month+"-"+day
            return  pre+","+today
        },
        getOrg(){
            getTree().then(res=>{
                console.log(res)
                let arr = []
                res.data.map(item=>{
                    if(item.parentId ==0 ||(item.id.includes('_'))){
                        arr.push(item)
                    }
                })
                let trees = arr

                let tree=[]
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = true
                    tree.push(trees[i])
                }
                this.treeData=this.drawTree(tree)
            })
        },
        drawTree(treeItem){
            let  parent=treeItem.filter(item => item.parentId == 0)
            treeItem.forEach(element => {
                 if (element.parentId == 0) return
                 this.draw(element,parent)
            });
            return parent;
        },
        draw(item,arr){
            for(var i=0;i<arr.length;i++) {
                if(item.parentId==arr[i].id){
                    if( !(arr[i].children &&  arr[i].children.length>0)){
                        arr[i].children = []
                    }
                    arr[i].children.push(item)

                }else if(arr[i].children && arr[i].children.length>0){
                    this.draw(item,arr[i].children)
                }
            }
        },
        getDetailbyId(){
            getDetail(this.id).then(res=>{
                 this.currentRecord = res.data
                 this.currentRecord.time = formatTime(res.data.formLatestdate, 'yyyy-MM-dd')
                 
                 this.getTablebyTime()
            })
        },
        getTablebyTime(){
            getTable(this.currentRecord.id,this.preDay,this.currentRecord.cycleId).then(res=>{
               console.log(res)
               this.time = formatTime(res.data.items.recordDate, 'yyyy-MM-dd')
            })
        },

        selectNode(node){
            console.log(node)
            this.id = node[0].id.split('_')[1]
            this.getDetailbyId()
        },
        // 获取前一天
        getYesterday(date) {
            var date = date.split('-'),
            today = new Date().setFullYear(+date[0], +date[1]-1, +date[2]), 
            yesterday = new Date(today - 24 * 60 * 60 * 1000);
            var y = yesterday.getFullYear();
            var m = yesterday.getMonth() + 1;
            var d = yesterday.getDate();
            if(m<10){
            m = '0'+m;   
            }
            if(d<10){
                d = '0'+d; 
            }
        
            return y+'-'+m+'-'+d;  
        },
    }
}
</script>
<style lang="less" scoped>
.bulletin-box {
    margin: 5px;
    background: #fff;
    overflow-y: scroll;
    .bulletin-main {
        width: 100%;
        height: 100%;
        display: flex;
        .bulletin-left {
            width: 350px;
            height: 100%;
            .left-box {
                width: 100%;
                /deep/.ivu-select {
                    padding: 3px;
                }
                .tree-box {
                    font-size: 13px;
                    border-top: 1px solid rgb(230, 230, 230);
                    width: 100%;
                }
            }
        }
        .bulletin-right {
            width: 100%;
            border-left: 5px solid #f0f0f0;
            .c-left-border-blue {
                border-radius: 3px;
                padding: 5px;
                .form-item {
                    display: inline-block;
                    min-height: 33px;
                    label {
                        display: inline-block;
                        width: 100px;
                        line-height: 35px;
                        text-align: right;
                    }
                }
            }
            .c-top-border-gray {
                border-top: 5px solid #f0f0f0;
                .table-top-btns {
                    padding: 10px;
                    border-bottom: 1px solid #e6e6e6;
                    height: 50px;
                    /deep/.ivu-btn {
                        background: #576374;
                        color: #fff;
                        font-size: 13px;
                    }
                }
            }
        }
    }
}
</style>