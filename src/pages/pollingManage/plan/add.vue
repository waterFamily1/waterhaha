<template>
    <div class="plan-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>巡检计划</h3>
            <div class="map-type-icon" v-if="type=='map'"></div>
            <div class="c-btns-right">
                <button @click="save()">保存</button>
                <button class="cancel">取消</button>
            </div>
        </div>
        <Form action="" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="140" class="form-module">
            <div class="c-top-border-gray">
                <Row>
                    <Col span="12">
                        <FormItem label="巡检计划名称:" prop="name">
                            <Input v-model="formValidate.name"  style="width:300px" size="small"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="提前通知时间:" prop="time">
                            <Input v-model="formValidate.time"  style="width:50px" size="small"></Input>  分钟
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="所属组织:" prop="tissue">
                            <Select v-model="formValidate.tissue" placeholder="请选择" style="width:300px">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="开始时间:" prop="startTime">
                             <DatePicker type="date" :options="options3" 
                                placeholder="Select date" style="width: 150px" 
                                @on-change="getDate" :format="format"
                             size="small">
                             </DatePicker>
                             <TimePicker format="HH:mm" placeholder="Select time" style="width: 112px;margin-left:5px" :value="value1" size="small" :disabled="this.single"></TimePicker>
                             <Checkbox v-model="single" style="margin-left:5px" @on-change="choosestart">全天任务</Checkbox>
                        </FormItem>
                    </Col>  
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="执行人员:" prop="person">
                            <Select v-model="formValidate.tissue" placeholder="请选择" style="width:300px">
                                <Option value="beijing">New York</Option>
                                <Option value="shanghai">London</Option>
                                <Option value="shenzhen">Sydney</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="结束时间:" prop="endTime">
                             <DatePicker type="date" :options="options3" 
                                placeholder="Select date" style="width: 150px" 
                                @on-change="getDate" :format="format" size="small"
                            >
                             </DatePicker>
                              <TimePicker format="HH:mm" placeholder="Select time" style="width: 112px;margin-left:5px" :value="value2"  size="small"></TimePicker>
                              <div style="display:inline-block;margin-left:5px">
                                  <Icon type="md-refresh" style="font-size:24px;color:#4b7efe;vertical-align:middle" />
                                  <span>重复周期</span>
                              </div>
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
                                <Radio label="执行"></Radio>
                                <Radio label="不执行"></Radio>
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
            <Table stripe :columns="tableList" >
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                    <Button class="action" size="small">查看</Button>
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
                        <Input  placeholder="巡检点名称" size="small" style="width: 150px" />
                    </div>
                    <div class="key-item">
                        <label>区域位置：</label>
                        <Select v-model="tissue" style="width:180px" size="small">
                            <Option v-for="item in tissueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
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
                    <Page :total="100" show-elevator size="small" class="page" style="text-align:right;margin-top:20px"  />
                     <div class="action-btn">
                        <span>取消</span>
                        <span style="background: #4b7efe;">确定</span>
                     </div>
                </div>
            </div>
            <div slot="footer" >
                <!-- <Button type="primary"  long  @click="save" style="font-size:12px">保存为新模版</Button> -->
            </div>
        </Modal>
    </div>
</template>
<script>
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
                time:5

            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                time: [
                     { required: true, message: '请输入数值', trigger: 'blur' }
                ],
                tissue: [
                    { required: true, message: '', trigger: 'change' }
                ],
            },
            options3: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            format: '',
            value1:'00:00',
            value2:'00:00',
            single:false,
            setting:'执行',
            tableList: [
                {
                    title: '序号',
                    key: 'number'
                },
                {
                    title: '巡检点名称',
                    key: 'name'
                },
                {
                    title: '描述',
                    key: 'describe'
                },
                {
                    title: '巡检步骤',
                    key: 'steps'
                },
                {
                    title: '区域位置',
                    key: 'location'
                },
                {
                    title: '编号',
                    key: 'serialNum'
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
                    key: 'name'
                },
                {
                    title: '描述',
                    key: 'describe'
                },
                {
                    title: '巡检步骤',
                    key: 'steps'
                },
                {
                    title: '区域位置',
                    key: 'location'
                },
                  {
                    title: '编号',
                    key: 'number'
                }
            ],
            modelData: [
                {
                    number: '吴镕譞0',
                    location: '技术部0',
                    name: '易烊千玺老婆团'
                },
                {
                    number: '吴镕譞1',
                    location: '技术部1',
                    name: '易烊千玺老婆团'
                },
                {
                    number: '吴镕譞2',
                    location: '技术部2',
                    name: '易烊千玺老婆团'
                }
            ],
            modal:false,
            tissueList: [
                {
                    value: 'New York',
                    label: 'New York'
                }
            ],
            selectedData: [],
            tissue:''
        }
    },
    created() {
        this.type = this.$route.query.type
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    watch: {
        data(format) {
            console.log(format)
        }
    },
    methods: {
        getDate(date) {
            console.log(date)
            let week = this.$Date(date).day()
            console.log(week)
            let matter
            switch(week) {
                case 0 : 
                    matter = '星期日';
                    break;
                case 1 : 
                    matter = '星期一';
                    break;
                case 2 : 
                    matter = '星期二';
                    break;
                case 3 : 
                    matter = '星期三';
                    break;
                case 4 : 
                    matter = '星期四';
                    break;
                case 5 : 
                    matter = '星期五';
                    break;
                case 6 : 
                    matter = '星期六';
                    break;
            }
            console.log(this.$Date(date).format('YYYY-MM-DD'+ matter))
            this.format = this.$Date(date).format('YYYY-MM-DD'+  matter)
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
        save(){
            let data = {
                executorId: 14,
                holidayDisabled: 0,
                id: "",
                name: "map1",
                orgId: "10",
                period: 27,
                periodMonth: null,
                periodRank: null,
                periodRankValue: null,
                periodType: "Daily",
                periodUnit: "Hour",
                periodValue: 1,
                planEnd: "2020-12-16T21:00:00.000Z",
                planStart: "2020-12-15T18:00:00.000Z",
                remindAdvance: 10,
                status: "New",
                type: "Outside",
                pointsList:[{
                    description: null,
                    id: 6,
                    no: "00538",
                    orgName: null,
                    patrolPoint: "1",
                    relatedProcessNames: "龙溪澄清池",
                    stepCount: 2
                }]
            }
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
            button{
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
                button{
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
</style>