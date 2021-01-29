<template>
    <div class="allot-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>保养计划分配</h3> 
            <div class="c-btns-right" >
                <div style="display:inline-block" v-if="detailObj.state!=3">
                    <Button type="primary" @click="editHandle()" >编辑</Button>
                    <Button type="primary" :class="{'c-btn-up':!isUp, 'c-btn-disabled':isUp}" @click="up()" :disabled="isUp">下达</Button>
                </div>
                <Button type="primary" class="c-btn-back" @click="goBack()" >返回</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <div class="content">
                <Row>
                    <Col span="12">
                        <label for="">计划名称：</label>
                        <span>{{detailObj.planName}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <label for="">起止日期：</label>
                        <DatePicker type="date" v-model="detailObj.startDate" style="width: 160px" disabled></DatePicker> - 
                        <DatePicker type="date" v-model="detailObj.endDate" style="width: 160px" disabled></DatePicker>
                    </Col>
                    <Col span="12" style="color:rgb(224, 61, 62)">
                        <label for="">分配完成：</label>
                        <span>{{detailObj.contentsItems}}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <label for="">区域位置：</label>
                        <TreeSelect v-model="area" multiple :data="treeData" v-width="200" />
                    </Col>
                    <Col span="12">
                        <label for="">保养内容：</label>
                        <Select v-model="maincon" style="width:200px" @on-change="maincoChange" :clearable="true" @on-clear="maincoClear">
                            <Option v-for="(item,index) in mainList" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <label for="">执行人员：</label>
                       <Select v-model="userId" style="width:200px">
                            <Option v-for="item in userList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <span class="label-required">*</span>
                    </Col>
                    <Col span="12">
                        <label for="">设备类型：</label>
                        <TreeSelect v-model="equ" multiple :data="genreList" v-width="200" />
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <label for="">描述：</label>
                        <span>{{detailObj.remark}}</span>
                    </Col>
                </Row>
            </div>
            
        </div>
        <div class="c-top-border-gray">
            <div class="c-btn-left">
                <Button type="primary" @click="selectAll()">全选</Button>
                <Button type="primary" @click="allotHandle()">分配</Button>
            </div>
           <Table ref="selection" :columns="columns" :data="tableData" 
                 @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254)" @click="check(row.id)">查看</Button>
                        <Button class="action" type="text" size="small" style="color:rgb(75, 126, 254)">复制</Button>
                    </template>
                </Table>
                <Page :total="total" show-elevator show-total class="page" @on-change="changeSize" />
        </div>
    </div>
</template>
<script>
import { typeMethod,regionalCon,patrolList ,remainCon,remainDetail,detailList,assignTask,distributeTask} from '@api/upkeep/plan'
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
import { typeTreeMethod1 } from '@/libs/public'
export default {
    name: 'planAllot',
    data() {
        return {
            height: '',
            area:[],
            maincon:'',
            mainList:[],
            treeData:[],
            genreList:[],
            equ:[],
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
                    title: '保养周期',
                    key: 'maintainPeriod',
                    width: 110,
                    render: (h,params) => {
                        let that = this;
                        let index = Number(that.tableData[params.index].maintainPeriod) -1
                        let text = that.durationList[index]
                        return h('span', {
                        }, text);
                    }
                    
                }, {
                    title: '设备类型',
                    key: 'equipmentTypeName',
                    
                }, {
                    title: '保养设备',
                    key: 'equipmentName',
                }, {
                    title: '执行人',
                    key: 'assignUserName',
                    
                   
                }, {
                    title: '保养内容',
                    key: 'contents',
                            
                }, {
                    title: '检查方法',
                    key: 'maintainStep'
                }
            ],
            tableData: [],
            userList:[],
            id:'',
            selectedData:[],
            userId:'',
            total:0,
            detailObj:{},
            page:1,
            durationList:['日度','月度','季度','年度'],
            checkAll:false,
            isUp:true,
            areaId:'',
            equipmentTypeId:''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.id = this.$route.query.id
        this.getRegional()
        this.getType()
        this.getUsers()
        this.maintain()
        this.getDetail()
        this.getDetailList()
    },
    methods:{
        editHandle(){
            this.$router.push({ 
                path: '/upkeep/planEdit',
                query:{
                   id:this.id ,
                   areaId:this.areaId,
                   equipmentTypeId:this.equipmentTypeId
                }
            })
        },
        goBack(){
            this.$router.go(-1)
        },
        allotHandle(){
            if(!this.userId){
               this.$Message.warning('请先选择执行人员');
               return
            }
            if(this.selectedData.length==0){
                this.$Message.warning('请先选择分配任务');
                return
            }
            let areaArr=[],equArr=[],idArr=[],contentArr=[] ;

            this.selectedData.map(ele=>{
                areaArr.push(ele.areaId)
                equArr.push(ele.equipmentTypeId)
                idArr.push(ele.id)
                contentArr.push(ele.contents)

            })
            let data = {
                areaId: areaArr.join(','),
                contents:contentArr.join(','),
                equipmentTypeId: equArr.join(','),
                executeUserId: this.userId,
                ids: idArr.join(','),
                planId: this.id,
            }
            assignTask(data).then(res=>{
                // console.log(res)
                if(res.data.nums){
                    this.$Message.success('分配成功！');
                    this.getDetail()
                    this.getDetailList()
                }
            })
        },
       
        changeSize(size){
            this.page = size
            this.getDetailList()
        },
        maincoChange(val) {
            this.maincon = val
            this.page = 1
            this.getDetailList()
        },
        maincoClear() {
            this.maincon = ''
            this.page = 1
            this.getDetailList()
        },
        // 详情列表
        getDetailList(){
            let equId = this.equ.length!=0?this.equ.join(','):''
            let areaId = this.area.length!=0?this.area.join(','):''
            detailList(this.page,this.id,equId,areaId,this.maincon).then(res=>{
            //    console.log(res)
               if(res.data.items){
                    this.tableData = res.data.items
                    this.total = res.data.total
                }
            })
        }, 
        up(){
            let data ={
               planId:this.id
            }
            distributeTask(data).then(res=>{
                // console.log(res)
                if(res.data.num){
                    this.$Message.success('下达成功！');
                    this.$router.go(-1)
                }
            }).catch(err => {
                
                // 异常情况
            })
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
                console.log(this.treeData)
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
        // 获取执行人员
        getUsers(){
            patrolList().then(res=>{
                this.userList = res.data
            })
        },
        // 获取保养内容
        maintain(){
            remainCon(this.id).then(res=>{
                // console.log(res.data)
                if(res.data){
                    this.mainList = res.data
                }
            })
        },
        // 获取详情
        getDetail(){
            remainDetail(this.id).then(res=>{
                // console.log(res)
                if(res.data){
                    let temp =res.data
                    res.data.startDate = formatTime(res.data.startDate , 'yyyy-MM-dd')
                    res.data.endDate = formatTime(res.data.endDate , 'yyyy-MM-dd')
                    this.areaId = temp.areaId
                    this.equipmentTypeId = temp.equipmentTypeId
                    if(temp.areaId.indexOf(',')!=-1){
                        temp.areaId.split(',').map(ele=>{
                            this.area.push(Number(ele))
                        })
                    }else{
                        this.area.push(Number(temp.areaId))
                    }
                    if(temp.state == 2){
                        this.isUp = false
                    }
                    // console.log(this.area)
                    this.detailObj = res.data
                }
            })
        },
        selectAll(selection){
            this.checkAll = !this.checkAll
            if(this.checkAll){
                this.$refs.selection.selectAll(true);
            }else{
                this.$refs.selection.selectAll(false);
            }
            // console.log(this.selectedData)
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
            this.$refs.selection.selectAll(status);
            this.selectedData=selection
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            const selection = this.tableData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.id === item.id);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        },
    }
}
</script>
<style lang="less" scoped>
.allot-wrap {
    margin: 5px;
    background: #fff;
    .c-left-border-blue {
        border-radius: 3px;
        padding: 5px;
        h3 {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
        }
        .c-btns-right {
            float: right;
            margin-top: 2px;
            .ivu-btn{ 
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 26px;
                background-color: #576374;
                font-size: 12px;
            }
            .c-btn-back {
                background: #c8c8c8;
            }
            .c-btn-up{
                background: #8790ff;
                color: #fff;
                border-color:#8790ff;
            }
            .c-btn-disabled{
                background: #eaeaea;
                color: #bbbec4;
                border-color:#eaeaea;
            }
        }
    }
    .c-top-border-gray {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .content{
            label{
                display: inline-block;
                width: 104px;
                text-align:right;
            }
            .label-required {
                color: red;
                font-size: 16px;
                margin-left: 5px;
            }
        }
        /deep/.ivu-row{
            margin-bottom: 20px;
        }
        .c-btn-left{
            height: 36px;
            border-bottom: 1px solid #EEE;
            .ivu-btn{
                min-width: 50px;
                margin: 0 5px;
                border: none;
                height: 26px;
                background-color: #576374;
                font-size: 12px;
            }
        }
        .page{
            text-align: right;
            margin-top: 20px;
        }
    }
}
</style>