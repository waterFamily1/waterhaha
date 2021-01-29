<template>
    <div class="detail-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>保养计划详情</h3> 
            <div class="c-btns-right">
                <Button type="primary" @click="saveHandle()">保存</Button>
                <Button type="primary" class="c-btn-back" @click="goBack()">取消</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <div class="repair-search-box" style="width: 940px;">
                <Row>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>计划名称：</label>
                            <Input v-model="planName" style="width: 200px" />
                            <span class="label-required">*</span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>节假日：</label>
                            <RadioGroup v-model="execute">
                                <Radio label="2">执行</Radio>
                                <Radio label="1">不执行</Radio>
                            </RadioGroup>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>起止日期：</label>
                            <DatePicker type="date"  placement="bottom-end"  @on-change="startTimeChange" :options="startDate" format="yyyy-MM-dd"  v-model="startTime" placeholder="开始日期" style="width: 160px"></DatePicker> -
                            <DatePicker type="date"  placement="bottom-end"  @on-change="endTimeChange" :options="endDate" format="yyyy-MM-dd"  v-model="endTime" placeholder="结束日期" style="width: 160px"></DatePicker>
                            <span class="label-required">*</span>
                        </div>
                    </Col>
                    <Col span="12" style="margin-top:5px">
                        <div class="c-form-item">
                            <Checkbox v-model="byMonth" style="width:100%;margin-left:44px">按月生成多个保养计划</Checkbox>
                        </div>
                    </Col>
                </Row>
                <div style="margin-top:16px">
                    <label  style="display:inline-block;width:104px;text-align:right">描述：</label>
                    <Input type="textarea" style="width:80%" v-model="describe"  />
                </div>
            </div>
        </div>
        <div class="c-top-border-gray">
            <div>
                <h3 style="display:inline-block">保养项信息</h3>
                <div class="c-adv-search-btn">
                    <a href="javascript:;" style="color:#576374;font-size:6px" @click="higherSearch()"  >
                         <Icon type="ios-arrow-down" v-if="searchShow" />
                        <Icon type="ios-arrow-up" v-else />
                        <span>筛选</span>
                    </a>
                    <Button type="primary" style="background:#576374;border-color:#576374;height:26px;line-height:26px;font-size:12px;margin-left:8px" @click="allRemain()">全部保养</Button>
                    <Button type="primary" style="background:#576374;border-color:#576374;height:26px;line-height:26px;font-size:12px;margin-left:8px" @click="toggle()">是否保养切换</Button>

                    <Dropdown trigger="click" @on-click="defineDuration">
                        <Button type="primary" style="background:#576374;border-color:#576374;height:26px;line-height:26px;font-size:12px;margin-left:8px" >自定义保养周期</Button>
                        <DropdownMenu slot="list">
                            <DropdownItem :name="item.value" v-for="(item,index) in durationList" :key="index"> {{item.label}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                   
                </div>
            </div>
            <div :class="{searchTrans:searchShow, searchPack:!searchShow}" style="margin-top:20px">
                <div class="c-form-item">
                    <label>区域位置：</label>
                     <TreeSelect v-model="area" multiple :data="treeData" v-width="240"  />
                </div>
                <div class="c-form-item">
                    <label>设备类型：</label>
                     <TreeSelect v-model="equ" multiple :data="genreList" v-width="240"  />
                </div>
                 <div class="c-form-item">
                    <label>保养内容：</label>
                     <Select v-model="maincon" style="width:200px" size="small">
                        <Option v-for="(item,index) in mainList" :value="index" :key="index">{{ item}}</Option>
                    </Select>
                </div>
            </div>
            <div >
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
    </div>
</template>
<script>
// maintainList
import { editDetail,typeMethod,regionalCon ,addPlan,remainCon,remainDetail} from '@api/upkeep/plan';
import createTree from '@/libs/public-util'
import { typeTreeMethod1 } from '@/libs/public'
import {formatTime} from '@/libs/public'
export default {
    name: 'planDetail',
    data() {
        return {
            selectedData:[],
            height: '',
            planName: '',
            execute: '1',
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
                        return h('Select',{
                            props:{
                                size:'small',
                                transfer:true,
                                value :that.tableData[params.index].maintainPeriod
                            },
                            on:{
                                'on-change':(val)=>{
                                   that.tableData[params.index].maintainPeriod = val
                                }
                            }
                        },
                        this.durationList.map(item=>{
                            return h('Option',{
                                props:{
                                    value: item.value,
                                    key: item.value
                                }
                            },item.label)
                        })
                        )
                    }
                    
                }, {
                    title: '设备类型',
                    key: 'equipmentTypeName',
                    
                }, {
                    title: '保养设备',
                    key: 'equipmentName',
                }, {
                    title: '执行人',
                    key: 'state',
                    
                   
                }, {
                    title: '保养内容',
                    key: 'content',
                    render: (h, params) => {
                        
                        let that = this;
                        return h('Input', {
                            props:{
                                size:'small',
                                value:that.tableData[params.index].contents
                            },
                            on: {
                                input: function (event) {
                                    that.tableData[params.index].contents = event
                                    that.tableData[params.index]._index = params.row._index
                                    that.tableData[params.index]._rowKey = params.row._rowKey
                                }
                            }
                        }, '');
                    }            
                }, {
                    title: '检查方法',
                    key: 'maintainStep',
                    render: (h, params) => {
                        let that = this;
                        return h('Input', {
                            props:{
                                size:'small',
                                value:that.tableData[params.index].maintainStep
                            },
                            on: {
                                input: function (event) {
                                    that.tableData[params.index].maintainStep = event
                                    that.tableData[params.index]._index = params.row._index
                                    that.tableData[params.index]._rowKey = params.row._rowKey
                                }
                            }
                        }, '');
                    }   
                }, {
                    
                    title: '是否保养',
                    key: 'isRepiar',
                    width: 100,
                    render: (h, params) => {
                        let text = params.row.isRepiar=='true' ?'是':'否'
                        console.log(text)
                        return h('span', {} ,text );
                    }  
                }, 
            ],
            tableData: [],
            total:0,
            searchShow: false,
            treeData:[],
            area:[],
            equ:[],
            genreList:[],
            areaId:'',
            equipmentTypeId:'',
            durationList:[
                {
                    label:"日度",
                    value:1
                },{
                    label:"月度",
                    value:2
                },{
                    label:"季度",
                    value:3
                },{
                    label:"年度",
                    value:4
                }
            ],
            byMonth:false,
            maincon:"",
            describe:'',
            id:'',
            mainList:[]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getRegional()
        this.equipmentTypeId = this.$route.query.equipmentTypeId
        this.areaId = this.$route.query.areaId
        this.id = this.$route.query.id
        this.getTableList()
        this.getType()
        this.maintain()
        this.getDetail()
    },
    
    methods:{
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
        allRemain(){
          this.tableData.map(ele=>{
              ele.isRepiar  ='true'
          })
          this.tableData.splice(0,0)
        },
        toggle(){
            console.log(this.selectedData)
            if(this.selectedData.length==0){
                this.$Message.warning('请选择保养项');
                return
            }
            this.selectedData.map(item=>{
                this.tableData.map(ele=>{
                    if(item.id == ele.id){
                        ele.isRepiar = 'false'
                    }
                    
                })
            })
            this.tableData.splice(0,0)
        },
        // 获取详情
        getDetail(){
            remainDetail(this.id).then(res=>{
                // console.log(res)
                if(res.data){
                    let temp =res.data
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
                    this.planName = temp.planName
                    this.execute = String(temp.isIncloudeHoliday)
                    this.start = formatTime(temp.startDate , 'yyyy-MM-dd')
                    this.startTime = formatTime(temp.startDate , 'yyyy-MM-dd')
                    this.endTime = formatTime(temp.endDate , 'yyyy-MM-dd')
                    this.end = formatTime(temp.endDate , 'yyyy-MM-dd')
                    this.byMonth = temp.isByMonth==1?true:false
                    this.describe = temp.remark
                }
            })
        },
        defineDuration(name){
             this.tableData.map(ele=>{
              ele.maintainPeriod = name
          })
        },
        changeSize(){
            
        },
        check(id){
            console.log(id)
            this.$router.push({
                path: '/upkeep/planAllot',
                query:{
                   id:id 
                }
            })
        },
        saveHandle(){
            console.log(this.area)
            this.tableData.map(ele=>{
                ele.guid = ""
            })
            let data = [{
                details:this.tableData,
                head:{
                    areaId: this.area.length!=0?this.area.join(','):'',
                    endDate: this.$moment(this.end).utc().format(),
                    equipmentTypeId: this.equ.length!=0?this.equ.join(''):'',
                    isByMonth: this.byMonth?1:2,
                    isIncloudeHoliday: this.execute,
                    planDuration: "",
                    planName: this.planName,
                    remark: this.describe,
                    startDate: this.$moment(this.start).utc().format(),
                    id:this.id,
                }
            }]
             console.log(data)
            // nums
            addPlan(data).then(res=>{
                if(res.data.nums){
                    this.$Message.success('数据保存成功');
                    this.$router.go(-1)
                }
            })
        },
        // 获取保养内容
        maintain(){
            remainCon(this.id).then(res=>{
                // console.log(res)
                if(res.data){
                    this.mainList = res.data
                }
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
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        getTableList(){
            // equipmentTypeId,areaId
            // this.page,this.id,equId,areaId,this.maincon
            editDetail(this.id,this.equipmentTypeId,this.areaId).then(res=>{
               console.log(res)
               if(res.data.items){
                   this.tableData = res.data.items
                   this.total = res.data.total
                   this.tableData.map(ele=>{
                        ele.isRepiar = 'true'
                   })
               }
            })
        },
    }
}
</script>
<style lang="less" scoped>
.detail-wrap {
    margin: 5px;
    background: #fff;
    overflow: scroll;
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
                height: 28px;
                background-color: #576374;
            }
            .c-btn-back {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-form-item {
            display: inline-block;
            min-height: 33px;
            label {
                display: inline-block;
                width: 104px;
                text-align: right;
            }
            .label-required {
                color: red;
                font-size: 16px;
                margin-left: 5px;
            }
        }
        /deep/.ivu-row {
            margin: 20px -8px 0; 
            /deep/.ivu-col-span-12 {
                padding: 0 8px;
            }
        }
        .c-adv-search-btn{
            float: right;
            margin-top: 4px;
        }
         .page{
            text-align: right;
            margin-top: 10px;
        }
        .searchTrans {
            height: 52px;
            overflow: hidden;
            transition: 0.5s height;
        }
        .searchPack {
            height: 0;
            overflow: hidden;
            transition: 0.5s height;
        }
    }
}
</style>