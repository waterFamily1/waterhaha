<template>
    <div class="detail-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <div>
                <h3>缺陷详情</h3>
                <a href="javascript:;" v-if="attention" @click="cancelAttention()">取消关注</a>
                 <a href="javascript:;" v-else @click="addAttention()">添加关注</a>
            </div>
            <div class="c-btns-right">
                <Button type="primary" @click="allocation=true">任务分派</Button>
                <Button type="primary" style="background:#c8c8c8">返回</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Row>
                <Col span="12">
                    <div class="item-form">
                        <label>保养任务名称：</label>
                        <span>{{ faultDto.taskName }}</span>
                    </div>
                    <div class="item-form">
                        <label>所属组织：</label>
                        <span>{{ faultDto.orgName }}</span>
                    </div>
                    <div class="item-form">
                        <label>执行人员：</label>
                        <span>{{ faultDto.executeUserName }}</span>
                    </div>
                    <div class="item-form">
                        <label>保养持续时间：</label>
                        <span>{{ faultDto.planDuration }}</span>
                    </div>
                </Col>
                <Col span="12">
                    <div class="item-form">
                        <label>任务状态：</label>
                        <span>{{ faultDto.state }}</span>
                    </div>
                    <div class="item-form">
                        <label>执行开始日期：</label>
                        <span>{{ faultDto.startDate }}</span>
                    </div>
                    <div class="item-form">
                        <label>实际耗时：</label>
                        <span></span>
                    </div>

                </Col>
            </Row>
        </div>
        <div class="c-top-border-gray">
             <Table ref="selection" :columns="applyColumns" :data="tableData" >
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254)" @click="check(row.id)">查看</Button>
                        <Button class="action" type="text" size="small" style="color:rgb(75, 126, 254)">复制</Button>
                    </template>
                </Table>
                <Page :total="total" show-elevator show-total class="page" @on-change="changeSize" />
        </div>
        <!-- 任务分派 -->
         <Modal
            v-model="allocation"
            title="任务分派"
            width="330"
            :footer-hide="true">
            <div>选择相应的执行人员进行分派：</div>
            <div style="margin-top:20px">
                <TreeSelect v-model="orgId" placeholder="请选择组织"  :data="orgData" v-width="300" @on-change="changeOrg" size="small" />              
            </div>
            <div style="margin-top:20px">
                <Select v-model="personId" style="width:300px" placeholder="请选择人员" size="small">
                    <Option v-for="item in handlerList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="btn"> <span @click="alloacte()">分配</span></div>
        </Modal>
    </div>
</template>
<script>
import { taskDetail,detailList,getOrg,getUsers,addCon,cancelCon,assign} from '@api/upkeep/task';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name: 'detail',
    data() {
        return {
            height: '',
            type: '111',
            number: '',
            tissue: '',
            area: '',
            status: '',
            handler: '',
            severity: '',
            polling: '',
            device: '',
            applyColumns: [
                {   
                    title: '序号',
                      width: 70,
                    type: 'index',
                },
                {
                    title: '保养周期',
                    key: 'maintainPeriod',
                    render: (h,params) => {
                        let that = this;
                        let index = Number(that.tableData[params.index].maintainPeriod) -1
                        let text = that.durationList[index]
                        return h('span', {
                        }, text);
                    }
                }, {
                    title: '设备类型',
                    key: 'equipmentTypeName'
                }, {
                    title: '保养设备',
                    key: 'equipmentName'
                }, {
                    title: '保养内容',
                    key: 'contents'
                }, {
                    title: '检查方法',
                    key: 'maintainStep'
                }, {
                    title: '执行人',
                    key: 'executeUserName'
                }
            ],
            applyData: [],
            id:'',
            attention:false,
            allocation:false,
            hangModal:false,
            closeModal:false,
            orgId:'',
            personId:'',
            handlerList:[],
            hangList:[
                {
                    label:'缺少备品',
                    value:1
                },
                {
                    label:'等待整改',
                    value:2
                },
                {
                    label:'统一规划',
                    value:3
                },
                {
                    label:'其他原因',
                    value:4
                },
            ],
            closeList:[
                {
                    label:'重复填报',
                    value:1
                },
                {
                    label:'误报',
                    value:2
                },
                {
                    label:'其他原因',
                    value:3
                }
            ],
            closeId:'',
            hangId:'',
            orgData:[],
            tableData:[],
            faultDto:{},
            page:1,
            total:0,
            durationList:['日度','月度','季度','年度'],
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.id = this.$route.query.id
        this.defectDetail()
        this.getList()
        this.getRegional()
        this.userList()
    },
    methods:{
        userList(){
           getUsers(this.orgId).then(res=>{
               this.handlerList = res.data
           })
        },
        getRegional() {
            getOrg().then(res => {
                // console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].checked = false
                    treeItem.push(trees[i])
                }
                this.orgData = createTree(treeItem)
            }).catch(err => {
                // 异常情况
            })
        },
        changeSize(size){
            this.page = size
            this.getList()
        },
        getList(){
           detailList(this.id,this.page).then(res=>{
               if(res.data.items){
                   this.tableData = res.data.items
                   this.total = res.data.total
               }
           })
        },
        alloacte(){
          assign(this.id,this.personId).then(res=>{
              console.log(res)
              if(res.data.nums==0){
                   this.$Message.success('指派人员成功!');
                    this.$router.go(-1)
              }
          })
        },
        changeItem(name){
          console.log(name)
          if(name=='hang'){
              this.hangModal = true
          }else{
              this.closeModal = true
          }
        },
        changeOrg(id){
            this.orgId = id
           this.userList(id)
        },
        cancelAttention(){
          cancelCon(this.id).then(res=>{
             if(res.data.count){
                //  
                this.$Message.success('取消关注成功!');
                this.attention = false
             }
          })
        },
        addAttention(){
            let data = {
                concernId: this.id,
                type: "maintain"
            }
            addCon(data).then(res=>{
                if(res.data.id){
                    this.$Message.success('关注成功!');
                    this.attention = true
                }
            })
        },
        defectDetail(){
            taskDetail(this.id).then(res=>{
                console.log(res)
                if(res.data){
                   res.data.startDate=formatTime(res.data.startDate, 'yyyy-MM-dd')
                    this.faultDto = res.data
                }
            })
        } ,       
    }
}
</script>
<style lang="less" scoped>
.detail-wrap {
    margin: 5px;
    background: #fff;
    .c-left-border-blue {
        border-radius: 3px;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        div {
            a {
                display: inline;
                // color: #4b7efe;
                // font-weight: 700;
            }
            h3 {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                text-indent: 10px;
                margin-right: 20px;
            }
        }
        .c-btns-right {
            float: right;
            margin-top: 2px;
            button {
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 28px;
            }
            /deep/.ivu-dropdown {
                button {
                    background: #495566;
                }
            }
            .c-btn-back {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        padding: 20px 10px;
        border-top: 5px solid #f0f0f0;
        /deep/.ivu-row {
            margin-left: 20px;
            .item-form {
                margin-bottom: 15px;
                height: 24px;
                line-height: 24px;
                label {
                    display: inline-block;
                    color: #495060;
                    font-weight: 700;
                    width: 100px;
                    text-align: right;
                }
            }
        }
        /deep/.ivu-tabs-content {
            padding: 10px;
            .tabs-tabpane {
                text-indent: 20px;
                margin-bottom: 20px;
            }
            .fault-detail {
                .c-gray-bg-h {
                    background-color: #f4f4f4;
                    height: 30px;
                    line-height: 30px;
                    text-indent: 20px;
                    font-weight: 100;
                    font-size: 13px;
                }
                .c-nodata-tip {
                    text-align: center;
                    line-height: 50px;
                }
            }
        }
    }
    /deep/.ivu-timeline-item-content {
        div {
            div {
                display: inline-block;
                // color: #4b7efe;
                // font-weight: 700;
                font-size: 13px;
                margin-right: 10px;
            }
            div:first {
                border-right: 2px solid #d8d8d8;
            }
        }
    }
    .active{
        color: #4b7efe;
        font-weight: 700;
    }
}
.btn{
    margin-top:20px;
    width:300px;
    color:#fff;
    span{
        background: #4b7efe;
        display:inline-block;
        width:100%;
        text-align:center;
        line-height:34px;
        border-radius:5px;
    }
}
.page{
    text-align: right;
    margin-top: 20px;
}
</style>