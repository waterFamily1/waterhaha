<template>
    <div class="plan-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>巡检计划</h3>
            <div class="map-type-icon" v-if="type=='map'"></div>
            <div class="c-btns-right">
                <Button @click="save('formValidate')">保存</Button>
                <Button class="cancel">取消</Button>
            </div>
        </div>
        <Form action="" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140" class="form-module">
            <div class="c-top-border-gray">
                <Row>
                    <Col span="12">
                        <FormItem label="巡检计划名称:" prop="name">
                            <Input v-model="formValidate.name"  style="width:300px" ></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="提前通知时间:" prop="time">
                            <InputNumber v-model="formValidate.time"  style="width:50px"></InputNumber>  分钟
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="所属组织:" prop="tissue">
                             <TreeSelect v-model="formValidate.tissue"  :data="processList"  v-width="300" @on-change="changeArea" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="开始时间:" prop="startTime">
                             <DatePicker type="date"  
                                placeholder="Select date" style="width: 180px" :options="options3" 
                                @on-change="getStartDate" format="yyyy-MM-dd" v-model="startTime" >
                             </DatePicker>
                             <TimePicker format="HH:mm" @on-change="timeSchange" placeholder="Select time" style="width: 112px;margin-left:5px" v-model="value1"  :disabled="this.single"></TimePicker>
                             <Checkbox v-model="single"  style="margin-left:5px" @on-change="choosestart">全天任务</Checkbox>
                        </FormItem>
                    </Col>  
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="执行人员:" prop="person">
                            <Select v-model="personId" style="width:300px" placeholder="请选择人员" size="small">
                                <Option v-for="item in handlerList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="结束时间:" prop="endTime">
                            <DatePicker type="date" :options="options3" 
                                placeholder="Select date" style="width: 180px" 
                                @on-change="getEndDate" format="yyyy-MM-dd" v-model="endTime"
                            >
                            </DatePicker>
                            <TimePicker format="HH:mm" @on-change="timeEchange" placeholder="Select time" style="width: 112px;margin-left:5px" v-model="value2" :disabled="this.single"></TimePicker>
                            <Poptip trigger="hover" placement="bottom" word-wrap width="380"  content="周期：每1天（2020-12-28 08:00至2020-12-28 08:30）持续时间：30分钟">
                                <div style="display:inline-block;margin-left:5px" @click="settingDuration()">
                                    <Icon type="md-refresh" style="font-size:24px;color:#4b7efe;vertical-align:middle" />
                                    <span >重复周期</span>
                                </div>
                            </Poptip>
                        </FormItem>
                    </Col>  
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="计划状态:" prop="state">
                            <span>新建</span>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="节假日设置:" prop="setting">
                            <RadioGroup v-model="setting">
                                <Radio label="0">执行</Radio>
                                <Radio label="1">不执行</Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>  
                </Row>
            </div>
        </Form>
        <div class="c-top-border-gray">
            <div class="patrol-points-title">
                <h3>巡检点信息</h3>
                <div class="c-btns-right" @click="modal = true"><button>添加巡检点</button></div>
            </div>
            <Table stripe :columns="tableList" :data="tableData">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button class="action" size="small" type="text" style="color:rgb(52, 108, 147)" @click="deleteItem(index)">删除</Button>
                </template>
            </Table>
        </div>
        <Modal v-model="modal" width="800" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">选择巡检点</span>
            </p>
            <div>
                <div>
                    <div class="key-item">
                        <label>关键字：</label>
                        <Input v-model="modalKey"  placeholder="巡检点名称"  style="width: 150px" />
                    </div>
                    <div class="key-item">
                        <label>区域位置：</label>
                        <TreeSelect v-model="tissue" :max-tag-count="1" multiple :data="treeData" v-width="150" @on-change="changeArea"  />
                    </div>
                    <div class="search-btn">
                        <Button size="small">搜索</Button>
                        <Button size="small" class="reset">重置</Button>
                    </div>
                    
                </div>
                <div class="tabel-num">
                        已选择<strong>{{ selectedData.length }}</strong>个
                        <a href="" @click="handleClearSelect(false)" style="color:#5c51fd">[清空]</a>
                    </div>
                     <div class="model-table">
                    <Table size="small" ref="selection" :columns="modelColumns" :data="modelData"
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                    </Table>
                    <Page :total="modelTotal" show-elevator show-total size="small" class="page" style="text-align:right;margin-top:20px"  />
                     <div class="action-btn">
                        <span>取消</span>
                        <span style="background: #4b7efe;" @click="modalSure()">确定</span>
                     </div> 
                </div>
            </div>
            <div slot="footer" >
                <!-- <Button type="primary"  long  @click="save" style="font-size:12px">保存为新模版</Button> -->
            </div>
        </Modal>
         <Modal v-model="durationModal" width="620" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">重复周期</span>
            </p>
            <div>
                <div class="modal-form-item">
                    <h3>任务时间</h3>
                    <div>
                        <div class="form-line">
                            <span>开始</span>
                            <TimePicker @on-change="timeSchange" format="HH:mm" placeholder="Select time" style="width: 112px;" v-model="value1"></TimePicker>
                        </div>
                        <div class="form-line">
                            <span>结束</span>
                            <TimePicker @on-change="timeEchange" format="HH:mm" placeholder="Select time" style="width: 112px;" v-model="value2"></TimePicker>
                        </div>
                        <div >
                            <span>持续时间</span>
                            <span>{{period}}{{unit}}</span>
                            <Select v-model="millionValue" :value="millionValue" style="width:112px" @on-select="changeTimeT">
                                <Option v-for="item in timeList" :value="item.id" :key="item.id">{{ item.label}}</Option>
                            </Select>
                        </div>
                    </div>
                   
                </div>
                <div class="modal-form-item" style="margin-top:10px">
                    <h3>定期模式</h3>
                    <div>
                        <div class="left-block">
                            <RadioGroup @on-change="changeDuration" v-model="moduleTime">
                                <ul>
                                    <li><Radio  label="Hourly">按小时</Radio></li>
                                    <li><Radio  label="Daily">按天</Radio></li>
                                    <li><Radio  label="Weekly">按周</Radio></li>
                                    <li><Radio  label="Monthly">按月</Radio></li>
                                    <li><Radio  label="Yearly">按年</Radio></li>
                            </ul>
                            </RadioGroup>
                            
                        </div>
                        <div class="right-block">
                            <div v-if="moduleTime=='Hourly'">
                                每 <Input v-model="periodValue" style="width: 60px" /> 小时
                            </div>
                            <div v-if="moduleTime=='Daily'">
                                <RadioGroup v-model="dayFre">
                                    <div>
                                        <Radio label="每"></Radio>  <Input v-model="periodValue" style="width: 60px" /> 天
                                    </div>
                                    <div style="margin-top:10px">
                                        <Radio label="每个工作日"></Radio> 
                                    </div> 
                                </RadioGroup>
                            </div>
                            <div v-if="moduleTime=='Weekly'">
                                <div>
                                    <span>重复间隔为</span><InputNumber  :min="1" v-model="periodValue"></InputNumber><span>周后的：</span>
                                </div>
                                <div >
                                    <CheckboxGroup v-model="weekArr">
                                        <Checkbox label="2">星期一</Checkbox>
                                        <Checkbox label="3">星期二</Checkbox>
                                        <Checkbox label="4">星期三</Checkbox>
                                        <Checkbox label="5">星期四</Checkbox>
                                        <Checkbox label="6">星期五</Checkbox>
                                        <Checkbox label="7">星期六</Checkbox>
                                        <Checkbox label="1">星期日</Checkbox>
                                    </CheckboxGroup>
                                </div> 
                            </div>
                            <div v-if="moduleTime=='Monthly'">
                                <RadioGroup v-model="monthFre">
                                    <div>
                                        <Radio label="每"></Radio> <InputNumber  :min="1" v-model="periodValue"></InputNumber> 个月的第 <InputNumber  :min="1" :max="31" v-model="periodRank"></InputNumber> 天
                                    </div>
                                    <div style="margin-top:20px">
                                        <Radio label=""></Radio>每 <InputNumber  :min="1" v-model="mValue"></InputNumber> 个月的第
                                        <Select v-model="mData" style="width:80px">
                                            <Option v-for="item in orderList" :value="item.id" :key="item.id">{{ item.label}}</Option>
                                        </Select>
                                        <Select v-model="typeDate" style="width:80px;margin-left:5px">
                                            <Option v-for="item in weekList" :value="item.id" :key="item.id">{{ item.label}}</Option>
                                        </Select>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div v-if="moduleTime=='Yearly'">
                                <div>
                                    <span>重复间隔为</span><InputNumber  :min="1" v-model="periodValue"></InputNumber><span>年后的：</span>
                                </div>
                                <RadioGroup v-model="yearFre">
                                    <div style="margin-top:10px">
                                        <Radio label="时间"></Radio> 
                                        <Select v-model="monthValue" style="width:80px">
                                            <Option v-for="item in monthList" :value="item.id" :key="item.id">{{ item.label}}</Option>
                                        </Select>
                                        <InputNumber  :min="1" :max="31" style="margin:0 5px" v-model="yData"></InputNumber> 
                                        <label for="">日</label>
                                    </div>
                                    <div style="margin-top:10px">
                                        <Radio label=""></Radio> 
                                        <label>时间</label>
                                        <Select v-model="ymData" style="width:80px">
                                            <Option v-for="item in monthList" :value="item.id" :key="item.id">{{ item.label}}</Option>
                                        </Select>
                                        <label style="margin:0 5px">的</label>
                                        <Select v-model="orderData" style="width:80px">
                                            <Option v-for="item in orderList" :value="item.id" :key="item.id">{{ item.label}}</Option>
                                        </Select>
                                        <Select v-model="yType" style="width:80px;margin-left:5px">
                                            <Option v-for="item in weekList" :value="item.id" :key="item.id">{{ item.label}}</Option>
                                        </Select>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-form-item" style="margin-top:10px">
                    <h3>重复范围</h3>
                    <Row>
                        <Col span="12">
                           <div class="form-line">
                                <span>开始日期：</span>
                                <DatePicker type="date"  
                                    placeholder="Select date" style="width: 150px" :options="options3" 
                                    @on-change="getStartDate" format="yyyy-MM-dd" v-model="startTime">
                                    </DatePicker>
                                    
                            </div>
                        </Col>
                        <Col span="12">
                           <RadioGroup v-model="repeat">
                                <div>
                                    <Radio label="重复"></Radio> 
                                    <!-- <label for=""></label> -->
                                    <InputNumber  :min="1" style="width:60px" v-model="repeatCount"></InputNumber>
                                    <span>次结束</span>
                                </div>
                                <div style="margin-top:10px">
                                    <Radio label=""></Radio> 
                                    <span>结束日期:</span>
                                     <DatePicker type="date" :options="options3" 
                                placeholder="Select date" style="width: 180px" 
                                @on-change="getEndDate" format="yyyy-MM-dd" v-model="endTime"></DatePicker>
                                </div>
                           </RadioGroup>
                           
                        </Col>
                    </Row>
                    
                   
                </div>
                <div class="action-btn">
                    <span @click="durationModal= false">取消</span>
                    <span style="background: #4b7efe;" @click="durationSure()">确定</span>
                </div> 
            </div>
            <div slot="footer" >
                <!-- <Button type="primary"  long  @click="save" style="font-size:12px">保存为新模版</Button> -->
            </div>
        </Modal>
    </div>
</template>
<script>
import { getOrganizations,getTree,siteList,getUsers,addPlan } from '@api/pollingManage/plan';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name: 'add',
    data() {
        return {
            type: '',
            height:'',
            formValidate: {
                location:'',
                name:"",
                category:"",
                time:5,
                tissue:''

            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                time: [
                     { required: true, message: '请输入数值', trigger: 'blur',type:'number' }
                ],
                tissue: [
                    { required: true, message: '请选择组织', trigger: 'change' ,type:'number'}
                ],
            },
            options3: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            formatStart: '',
            formatEnd: '',
            value1:'08:00',
            value2:'08:30',
            single:false,
            setting:'0',
            tableList: [
                {
                    title: '序号',
                    type: 'index',
                    width:70,
                },
                {
                    title: '巡检点名称',
                    key: 'patrolPoint'
                },
                {
                    title: '描述',
                    key: 'description'
                },
                {
                    title: '巡检步骤',
                    key: 'stepCount'
                },
                {
                    title: '区域位置',
                    key: 'relatedProcessNames'
                },
                {
                    title: '编号',
                    key: 'no'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            modelColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '巡检点',
                    key: 'patrolPoint'
                },
                {
                    title: '描述',
                    key: 'description',
                    ellipsis: true
                },
                {
                    title: '巡检步骤',
                    key: 'stepCount'
                },
                {
                    title: '区域位置',
                    key: 'relatedProcessNames',
                    ellipsis: true
                },
                  {
                    title: '编号',
                    key: 'no' 
                }
            ],
            modelData: [],
            modal:false,
            selectedData: [],
            tissue:[],
            modalKey:'',
            page:1,
            modelTotal:0,
            processList:[],
            handlerList:[],
            personId:'',
            treeData:[],
            start:'',
            end:"",
            startTime:'',
            endTime:'',
            tableData:[],
            arr:[],
            durationModal:false,
            timeList:[
                {label:'30分钟',id:1800000},
                {label:'1小时',id:3600000},
                {label:'2小时',id:7200000},
                {label:'3小时',id:10800000},
                {label:'4小时',id:14400000},
                {label:'5小时',id:18000000},
                {label:'6小时',id:21600000},
                {label:'7小时',id:25200000},
                {label:'8小时',id:28800000},
                {label:'9小时',id:32400000},
                {label:'10小时',id:36000000},
                {label:'11小时',id:39600000},
                {label:'1天',id:86400000},
                {label:'2天',id:172800000},
                {label:'3天',id:259200000},
                {label:'4天',id:345600000},
                {label:'1周',id:604800000},
                {label:'2周',id:1209600000},
            ],
            moduleTime:'Daily',
            weekArr:[],
            model1:'30分钟',
            periodNum:1,
            repeat:'',
            period:'20分',
            periodValue:1,
            dayFre:'每',
            repeatCount:1,
            periodRank:'1',
            monthFre:'每',
            orderList:[
                {label:'第一个',id:'First'},
                {label:'第二个',id:'Second'},
                {label:'第三个',id:'Third'},
                {label:'第四个',id:'Fourth'},
                {label:'最后一个',id:'Last'}
            ],
            weekList:[
                {label:'日子',id:'Day'},
                {label:'工作日',id:'Weekday'},
                {label:'周末',id:'Weekend Day'},
                {label:'星期日',id:'Sunday'},
                {label:'星期一',id:'Monday'},
                {label:'星期二',id:'Tuesday'},
                {label:'星期三 ',id:'Wednesday'},
                {label:'星期四 ',id:'Thursday'},
                {label:'星期五 ',id:'Friday'},
                {label:'星期六 ',id:'Saturday'},
            ],
            monthList:[
                {label:'1月',id:'1'},
                {label:'2月',id:'2'},
                {label:'3月',id:'3'},
                {label:'4月',id:'4'},
                {label:'5月',id:'5'},
                {label:'6月',id:'6'},
                {label:'7月',id:'7'},
                {label:'8月',id:'8'},
                {label:'9月',id:'9'},
                {label:'10月',id:'10'},
                {label:'11月',id:'11'},
                {label:'12月',id:'12'}
            ],
            mData:'',
            typeDate:'',
            monthValue:'',
            yData:'1',
            yearFre:'时间',
            orderData:'',
            yType:'',
            ymData:'',
            unit:'',
            millionValue:0
        }
    },
    created() {
        this.type = this.$route.query.type
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getModel()
        this.getOrg()
        this.getRegional()
        this.geCurrent()
        this.calTime()
    },
    watch: {
        data(format) {
            console.log(format)
        }
    },
    methods: {
        add0(m){return m<10?'0'+m:m },
        format(shijianchuo){
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm);
        },
        changeTimeT(name){
            console.log(name)
           let start = new Date(this.start+" "+this.value1).getTime()
           let end =this.format(new Date(start + name.value))
           this.end = end.slice(0,10)
           this.endTime = end.slice(0,10)
           this.value2 = end.slice(11,)
        },
        durationSure(){
            if(this.moduleTime =='Weekly'){
                if(this.weekArr.length==0){
                    // 
                    this.$Message.warning('请选择按周定期模式的星期!');
                    return
                }
            }
            this.durationModal = false
        },
        settingDuration(){
            this.calTime()
           
            this.durationModal = true
        },
        calTime(){
            let start = new Date(this.start+" "+this.value1).getTime()
            let end = new Date(this.end+" "+this.value2).getTime()
            console.log(this.value2)
            let usedTime = end - start;  //两个时间戳相差的毫秒数
            this.millionValue = usedTime
            let minute=usedTime/60/1000
            console.log(minute)
            if(minute%(60*24)==0){
                this.period = minute%(60*24)
                this.unit = "Day"
                console.log(minute%(60*24)+"天")
            }else if(minute%60==0 ){
                 this.period =minute%60
                console.log(minute%60+"小时")
                this.unit = "Hour"
            }else if((((minute/60)+"").search(".5")!= -1)&& ((minute/60)>1 )&& (minute/60).toString().split('.')[1].length==1){
                 this.period =minute/60
                 this.unit = "Hour"
                console.log(minute/60+"小时")
            }else{
                 this.period =minute
                 this.unit = "Minute"
                console.log(minute+"分钟")
            }
        },
        changeDuration(name){
           console.log(name)
        },
        deleteItem(index){
           this.arr= this.tableData.slice(index,1)
           this.tableData = this.arr
        },
        modalSure(){
            this.modal = false
            this.tableData = this.selectedData
        },
        getRegional() {
            getTree().then(res => {
                console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].expand = true
                    treeItem.push(trees[i])
                }
                this.treeData = createTree(treeItem)
            }).catch(err => {
                // 异常情况
            })
        },
        changeArea(){
            this.userList()
        },
        userList(){
            let orgId = this.formValidate.tissue
            getUsers(orgId).then(res=>{
                this.handlerList = res.data
            })
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
                this.processList = createTree(treeItem,1)
             })
        },
        getModel(){
            let area = this.tissue.length!=0?this.tissue.join(','):''
           siteList(this.modalKey,area,this.page).then(res=>{
               console.log(res)
               if(res.data.items){
                   this.modelData = res.data.items
                   this.modelTotal = res.data.total
               }
           })
        },
        geCurrent(){
            const myDate = new Date();
            const year = myDate.getFullYear(); // 获取当前年份
            const month = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
            const day = myDate.getDate(); // 获取当前日（1-31）
            let current = year+"-"+month+"-"+day
            this.start = current
            this.startTime = current
            this.end = current
            this.endTime = current
        },
        timeSchange(){
            this.calTime()
        },
        timeEchange(){
            this.calTime()
        },
        getStartDate(date) {
            this.start = date
            this.startTime = date
            let week = this.$Date(date).day()
            let matter
            switch(week) {
                case 0 : 
                    matter = '周日';
                    break;
                case 1 : 
                    matter = '周一';
                    break;
                case 2 : 
                    matter = '周二';
                    break;
                case 3 : 
                    matter = '周三';
                    break;
                case 4 : 
                    matter = '周四';
                    break;
                case 5 : 
                    matter = '周五';
                    break;
                case 6 : 
                    matter = '周六';
                    break;
            }
            // this.formatStart = this.$Date(date).format('YYYY-MM-DD ('+  matter+")")
        },
        getEndDate(date) {
            console.log(date)
            this.end = date
             this.endTime = date
            this.calTime()
        },
        choosestart(){
            this.single=!this.single
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
            const index = this.selectedData.findIndex(item => item.name === row.name);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            selection.forEach(item => {
                if (this.selectedData.findIndex(i => i.name === item.name) < 0) {
                    this.selectedData.push(item);
                }
            });
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            const selection = this.modelData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.name === item.name);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                } 
            });
        },
        cancel(){
           this.$router.go(-1)
        },
        save(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.tableData.length==0){
                        this.$Message.warning('请添加巡检点信息!');
                        return
                    }
                    let periodRank,periodRankValue,periodValue,monthValue;
                    if(this.moduleTime =='Monthly'){
                        if(this.monthFre=='每'){
                            periodRank = this.periodRank
                        }else{
                            periodRank = this.mData
                            periodRankValue=this.typeDate
                            periodValue=this.mValue
                        }
                      
                    }else if(this.moduleTime == 'Weekly'){
                        periodRank = this.weekArr.join(',')
                        periodValue = this.periodValue
                    }else if(this.moduleTime == 'Yearly'){
                        if(this.yearFre=='时间'){
                            periodRank = this.yData 
                            monthValue = this.monthValue       
                            periodValue = this.periodValue 
                        }else{
                            periodRank = this.orderData
                            periodRankValue= this.yType
                            monthValue = this.ymData
                            periodValue = this.periodValue
                        }
                        
                    }else{
                        periodValue = this.periodValue
                        periodRank = null
                        periodRankValue = null
                    }
                    
                    let data = {
                        executorId: this.personId,
                        holidayDisabled: Number(this.setting),
                        id: "",
                        name: this.formValidate.name,
                        orgId: this.formValidate.tissue,
                        period: this.period,
                        periodMonth:this.moduleTime == 'Yearly'? Number(monthValue):null,
                        periodRank:periodRank,
                        periodRankValue: periodRankValue,
                        periodType: this.moduleTime,
                        periodUnit: this.unit,
                        periodValue: Number(periodValue),
                        planEnd: this.repeat=='重复'?null:this.$moment(this.end+" "+this.value2).utc().format(),
                        planStart: this.$moment(this.start+" "+this.value1).utc().format(),
                        remindAdvance: this.formValidate.time,
                        status: "New",
                        type: this.type=='map'?"Outside":'Inside',
                        pointsList:this.tableData,
                        repeatCount:this.repeat=='重复'?this.repeatCount:null
                    }
                    console.log(data)
                    addPlan(data).then(res=>{
                        if(res.data.id){
                            this.$Message.success('数据保存成功!');
                            // this.$router.go(-1)
                            this.$router.push({
                                path:'/plan/editMap',
                                query: {
                                    id:res.data.id
                                }
                            })
                        }
                    })
                } else {
                    this.$Message.error('Fail!');
                }
            })
            // 巡检计划的开始日期不可大于或等于结束日期
            
        }
    }
}
</script>
<style lang="less" scoped>
/deep/.ivu-modal-header{
    padding: 0;
    border-bottom: 0;
}
.plan-box{
    border: 5px solid #f0f0f0;
    min-height: 100%;
    width: 100%;
    background: #fff;
    overflow: auto;
    .c-left-border-blue{
        border-radius: 3px;
        padding: 5px;
        h3{
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
        }
        .map-type-icon{
            margin-left: 10px;
            vertical-align: top;
            display: inline-block;
            width: 64px;
            height: 25px;
            background: url('../../../assets/images/map.png') no-repeat 0 0;
        }
        .c-btns-right{
            float: right;
            margin-top: 2px;
            .ivu-btn {
                height: auto;
                background: #4b7efe;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
                min-width: 70px;
            }
            .cancel{
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray{
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .patrol-points-title{
            height: 40px;
            h3{
                display: inline-block;
            }
            .c-btns-right{
                float: right;
                margin-top: 2px;
                .ivu-btn {
                    height: auto;
                    background: #4b7efe;
                    font-size: 12px;
                    padding: 4px 12px;
                    color: #fff;
                    border: 0;
                    border-radius: 3px;
                    margin: 0 5px;
                    min-width: 70px;
                }
            }
        }
    }
}
.key-item{
    display: inline-block;
    label{
        font-size: 12px;
    }
}
.search-btn{
    display: inline-block;
    /deep/.ivu-btn {
        height: auto;
        font-size: 12px;
        background: #838A95;
        color: #fff;
        margin-right: 10px;
        border-radius: 1px;
        padding: 4px 12px;
    }
    .reset {
        background: #aaafb8;
    }
}
.tabel-num {
    text-align: right;
    font-size: 12px;
    color: #999;
    line-height: 30px;
    margin-top: 10px;
    /deep/.ivu-btn {
        font-size: 12px;
        background: #57a3f3;
        color: #fff;
    }
}
.action-btn{
    margin-top: 20px;
    text-align:center;
    span{
        display: inline-block;
        min-width: 130px;
        margin: 0 15px;
        padding: 4px 12px;
        font-size: 12px;
        background: #c8c8c8;
        color: #fff;
        border-radius: 3px;
    }
}
.modal-form-item{
    padding-bottom: 10px;
    border-bottom: 1px solid #f1f1f1;
    h3{
        color: #4b7efe;
        font-size:14px;
        margin-bottom: 10px;
    }
    span{
        color: #666;
        font-size: 13px;
        display: inline-block;
        width: 80px;
    }
    .form-line{
        margin-bottom: 10px;
    }
    .left-block{
        display: inline-block;
        width: 100px;
        border-right: 1px solid #f1f1f1;
        li{
            list-style: none;
            margin-bottom: 10px;
        }
    }
    .right-block{
        display: inline-block;
        width: 380px;
        margin-left: 10px;
        vertical-align: top;
    }
}
/deep/.ivu-checkbox-group-item{
    margin-top: 10px;
}
</style>