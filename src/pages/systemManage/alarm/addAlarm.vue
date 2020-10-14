<template>
    <div class="add-box" :style="{height: height+'px'}">
        <div class="add-title">
            <h3>{{ title }}</h3>
            <div>
                <Button type="info" size="small" style="background:#4b7efe" @click="saveHandle('formValidate')">保存</Button>
                <Button type="info" size="small" style="background:#c8c8c8" @click="goBack('formValidate')">取消</Button>
            </div>
        </div>
        <div class="add-content">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
                <FormItem label="报警类型:">
                    <Select v-model="formValidate.type">
                        <Option value="1">单卡报警</Option>
                    </Select>
                </FormItem>
                <FormItem label="报警对象:" prop="object">
                    <div @click="objHandle()">
                        <Input v-model="formValidate.object" placeholder="请选择报警对象" readonly></Input>
                    </div>
                </FormItem>
                <FormItem label="订阅方式:">
                    <Select v-model="formValidate.way" multiple @on-change="wayChange">
                        <Option v-for="item in wayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="阈值:" prop="value">
                    <Input v-model="formValidate.value" placeholder="请输入阈值"></Input>
                    <div class="form-tool">
                        %
                        <div class="center-right">
                            <Tooltip content="Right Center text" placement="right">
                                <Icon type="ios-help-circle" 
                                    style="font-size: 20px;color: rgb(0, 151, 207);vertical-align: middle;margin-left: 6px" 
                                    @click="disabled = true" />
                                <div slot="content">
                                    <p>流量剩余百分比小于等于阈值时触发报警</p>
                                    <p>阈值范围值为1~100之间</p>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                </FormItem>
                <FormItem label="订阅人:" prop="people" class="select-item">
                    <div class="form-content">
                        <Tag 
                            v-for="item in alarmUsersList" 
                            :key="item" 
                            :name="item" 
                            closable 
                            @on-close="handleTagClose"
                        >
                            {{ item }}
                        </Tag>
                    </div>
                    <Button type="primary" class="form-btn" @click="peopleModel = true">选择</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 报警对象 -->
        <Modal
            v-model="objModal"
            title="选择报警对象"
            width="650"
            @on-ok="ok">
            <div class="model-search">
                <div class="model-search-box">
                    <label>关键字：</label>
                    <Input v-model="keyword" placeholder="ICCID" style="width: 200px" />
                </div>
                <Button type="primary" @click="objHandle()">搜索</Button>
            </div>
            <div class="model-table">
                <Table 
                    ref="selection" 
                    :columns="columns" 
                    :data="data"
                    @on-selection-change="objSelecionChange"
                ></Table>
                <div class="model-page">
                    <Page 
                        :total="objTotal" 
                        size="small" 
                        show-total 
                        show-elevator 
                        @on-change="objChangePage" 
                        style="text-align: right"
                    />
                </div>
            </div>
        </Modal>
        <!-- 选择订阅人 -->
        <Modal
            v-model="peopleModel"
            title="报警订阅新增对象"
            width="500"
            @on-ok="peopleOk">
            <div class="people-model">
                <Form ref="peopleForm" :model="peopleForm" :rules="peopleRule" :label-width="80">
                    <FormItem label="所属组织" prop="organization">
                        <TreeSelect 
                            v-model="peopleForm.organization" 
                            :data="orgTree" 
                            @on-change="orgChange"
                        />
                    </FormItem>
                    <FormItem label="用户" prop="user">
                        <Select 
                            v-model="peopleForm.user" 
                            multiple 
                            placeholder="请选择" 
                            :label-in-value="true" 
                            @on-change="userChange"
                        >
                            <Option v-for="item in userList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </Form>
            </div>
        </Modal>
    </div>
</template>
<script>
import { orgMethod, userMethod, alarmMethod, saveMethod, editMethod, editSaveMethod } from '@/api/system/alarm'
import createTree from '@/libs/public-util'

export default {
    name: 'addAlarm',
    data() {
        return {
            height: '',
            title: '',
            formValidate: {
                type: '1',
                object: '',
                way: ['1'],
                value: '',
                people: ''
            },
            subscribeMode: '1',
            ruleValidate: {
                object: [
                    { required: true, message: '请选择报警对象', trigger: 'change' }
                ],
                value: [
                    { required: true, message: '请输入阈值', trigger: 'blur' }
                ]
            },
            wayList: [
                {
                    value: '1',
                    label: '系统消息'
                },
                {
                    value: '2',
                    label: '短信'
                }
            ],
            objModal: false,
            keyword: '',
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '报警对象',
                    key: 'iccid'
                },
                {
                    title: '备注',
                    key: 'remark'
                }
            ],
            data: [],
            objTotal: 0,
            objPageNum: '1',
            peopleModel: false,
            peopleForm: {
                organization: '',
                user: []
            },
            peopleRule: {
                organization: [
                    { required: true, message: '请选择所属组织', trigger: 'blur' }
                ],
                user: [
                    { required: true, message: '请选择用户', trigger: 'blur' }
                ]
            },
            orgTree: [],
            userList: [],
            alarmUsers: [],
            alarmUsersArr: [],
            alarmUsersList: [],
            userChangeList: [],
            ids: '',
            userName: '',
            updateTime: '',
            updateUserid: '',
            alarmTime: '',
            createTime: '',
            createUserid: '',
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getOrg()
        let tit = this.$route.query.alarm
        if(tit == 'add') {
            this.title = '新增报警'
        } else if (tit == 'edit') { 
            this.title = '编辑报警'
            this.ids = this.$route.query.ids
            this.editHandle()
        }
    },
    methods: {
        editHandle() {
            let ids = this.ids
            editMethod(ids).then(res=> {
                // console.log(JSON.stringify(res.data))
                this.formValidate.object = res.data.alarmObject
                this.formValidate.value = res.data.threshold.toString()
                if(res.data.subscribeMode == '1') {
                    this.formValidate.way = ['1']
                } else if(res.data.subscribeMode == '2') {
                    this.formValidate.way = ['2']
                } else if(res.data.subscribeMode == '1,2') {
                    this.formValidate.way = ['1','2']
                }
                this.subscribeMode = res.data.subscribeMode
                let arr = []
                let num = []
                res.data.alarmUsers.map(item=> {
                    arr.push(item.label)
                    num.push(item.value)
                })
                this.alarmUsersList = arr
                this.userChangeList = res.data.alarmUsers
                this.alarmUsersArr = res.data.alarmUsers
                this.peopleForm.user = num

                this.userName = res.data.userName
                this.updateTime = res.data.updateTime
                this.updateUserid = res.data.updateUserid
                this.alarmTime = res.data.alarmTime
                this.createTime = res.data.createTime
                this.createUserid = res.data.createUserid
            }).catch(err=> {

            })
        },
        getOrg() {
            orgMethod().then(res=> {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.orgTree = createTree(treeItem)
            }).catch(err=> {

            })
        },
        orgChange(value) {
            userMethod(value).then(res=> {
                // console.log(res)
                this.userList = res.data.items
            }).catch(err=> {

            })
        },
        userChange(value) {
            // console.log(value)
            this.userChangeList = value
        },
        peopleOk() {
            this.alarmUsersArr = this.userChangeList
            let list = this.userChangeList
            let arr = []
            let num = []
            for(var i = 0; i < list.length; i ++) {
                arr.push(list[i].label)
                num.push(list[i].value)
            }

            this.alarmUsersList = arr
            this.peopleForm.user = num
        },
        handleTagClose(event, name) {
            const index = this.alarmUsersList.indexOf(name);
            this.alarmUsersList.splice(index, 1);
            this.alarmUsersArr.splice(index, 1);
            let arr = this.alarmUsersArr
            arr.map((item)=> {
                delete item.disabled
            })
            this.alarmUsers = arr
            let list = []
            console.log(arr)
            for(var i = 0; i < arr.length; i ++) {
                list.push(arr[i].value)
            }
            this.peopleForm.user = list
            // console.log(this.peopleForm.user)
            // console.log(JSON.stringify(this.alarmUsersArr))
        },
        wayChange(value) {
            this.formValidate.way = value
            let len = this.formValidate.way.length
            if(len == 0 ) {
                this.subscribeMode = '0'
            } else if(len == 1) {
                this.formValidate.way.map(item=> {
                    this.subscribeMode = item
                })
            } else if(len > 1) {
                this.subscribeMode = '1,2'
            }
        },
        saveHandle(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.title == '新增报警') {
                        let userId = JSON.stringify(this.peopleForm.user).replace("[","").replace("]","")
                        saveMethod({
                            alarmObject: this.formValidate.object,
                            alarmType: 1,
                            subscribeMode: this.subscribeMode,
                            threshold: this.formValidate.value,
                            userId: userId
                        }).then(res=> {
                            // console.log(res)
                            if(res.status == 200) {
                                this.$router.push({
                                    path: '/sim/sim-alarm',
                                    query: {
                                        from: 'addSuccess'
                                    }
                                })
                            }
                        }).catch(err=> {

                        })
                    } else if(this.title == '编辑报警') {
                        let userId = JSON.stringify(this.peopleForm.user).replace("[","").replace("]","")
                        editSaveMethod({
                            alarmObject: this.formValidate.object,
                            alarmTime: this.alarmTime,
                            alarmType: 1,
                            alarmUsers: this.alarmUsersArr,
                            createTime: this.createTime,
                            createUserid: this.createUserid,
                            id: this.ids,
                            subscribeMode: this.subscribeMode,
                            threshold: this.formValidate.value,
                            updateTime: this.updateTime,
                            updateUserid: this.updateUserid,
                            userId: userId,
                            userName: this.userName,
                        }).then(res=> {
                            // console.log(JSON.stringify(res))
                            if(res.status == 200) {
                                this.$router.push({
                                    path: '/sim/sim-alarm',
                                    query: {
                                        from: 'editSuccess'
                                    }
                                })
                            }
                        }).catch(err=> {

                        })
                    }
                }
            })
        },
        goBack(name) {
            this.$refs[name].resetFields();
            this.$router.go(-1)
        },
        objHandle() {
            this.objModal = true
            let queryName = this.keyword
            let currentPage = this.objPageNum
            alarmMethod({
                queryName,
                currentPage
            }).then(res=> {
                // console.log(JSON.stringify(res))
                this.data = res.data.items
                this.objTotal = res.data.total
            }).then(err=> {

            })
        },
        objChangePage(index) {
            this.objPageNum = index
            this.objHandle()
        },
        objSelecionChange(selection) {
            let arr = selection
            let idArr = []
            arr.forEach(item => {
                idArr.push(item.iccid)
                return
            })
            let ids1 = JSON.stringify(idArr).replace("[","").replace("]","")
            this.formValidate.object = ids1.replace("\"","").replace("\"","")
        },
        ok () {
            console.log(111)
        }
    }
}
</script>
<style lang="less" scoped>
.add-box {
    margin: 5px;
    background: #fff;
    .add-title {
        padding: 5px;
        h3{
            display: inline-block;
            line-height: 30px;
            text-indent: 10px;
        }
        div{
            float: right;
            button{
                min-width: 70px;
                margin: 0 5px;
                color: #fff;
                border: 0;
            }
        }
    }
    .add-content {
        border-top: 5px solid #f0f0f0;
        padding: 30px 10px 10px;
        .ivu-form-item {
            width: 35%;
            .form-tool {
                position: absolute;
                top: 0;
                right: -50px;
                .center-right {
                    float: right;
                }
                .ivu-tooltip-inner {
                    p {
                        font-size: 12px;
                    }
                }
            }
            .form-btn {
                position: absolute;
                top: 0;
                right: -70px;
                font-size: 12px;
                height: 24px;
            }
        }
    }
    .select-item {
        .form-content {
            border: 1px solid #ddd;
            border-radius: 5px;
            padding-left: 10px;
            padding-bottom: 5px;
            overflow: hidden;
            min-height: 40px;
        }
    }
}
.model-search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    vertical-align: top;
    zoom: 1;
    /deep/.ivu-input {
        height: 28px;
    }
    /deep/.ivu-btn {
        height: 28px;
        line-height: 25px;
        font-size: 13px;
    }
}
.model-page {
    margin-top: 20px;
}
/deep/.ivu-btn-text {
    border: 1px solid #e3e5e8;
}
</style>