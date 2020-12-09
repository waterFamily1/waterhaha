<template>
    <div class="declare-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>缺陷申报</h3> 
            <div class="c-btns-right">
                <Button type="primary" @click="saveHandle('formValidate')">保存</Button>
                <Button type="primary" class="c-btn-back" @click="goBack()">取消</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <Row>
                    <Col span="12">
                        <FormItem label="组织：">
                            <span>{{parentNode.name}}</span>
                        </FormItem>
                        <FormItem label="缺陷类型：" prop="type">
                            <Select v-model="formValidate.type" placeholder="请选择缺陷类型" style="width: 200px;">
                                <Option value="1">工艺缺陷</Option>
                                <Option value="2">设备缺陷</Option>
                                <Option value="3">管理缺陷</Option>
                                <Option value="4">其他缺陷</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="区域位置：" prop="area">
                            <TreeSelect v-model="formValidate.area"  :data="areaData" v-width="300" />
                        </FormItem>
                        <FormItem label="处理人：" class="special">
                            <TreeSelect v-model="formValidate.handler"  :data="orgData" v-width="200" @on-change="changeOrg" />
                            <Select v-model="formValidate.handlerName" style="width:200px" placeholder="请选择人员">
                                <Option v-for="item in handlerList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <a href="javascript:;" @click="peoModal = true">[在勤人员]</a>
                        </FormItem>
                        <FormItem label="备注：">
                            <Input v-model="formValidate.remark" type="textarea" />
                        </FormItem>
                        <FormItem label="附件上传：" class="special">
                            <Upload action=""
                             :format="['jpg','jpeg','png']"
                                :before-upload="handleUploadicon"
                                :on-format-error="uploadError"
                                accept=".jpg , .png, .jpeg"
                                ref="upload">
                                <Button>点击上传</Button>
                            </Upload>
                            <Tooltip placement="top" class="spec-tip">
                                <Icon type="md-help-circle" />
                                <div slot="content" class="inner">
                                    <p>1、可上传图片，格式如：png，jpg，jpeg；</p>
                                    <p>2、小视频，格式如： mp4，单个视频不超过5M</p>
                                </div>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="" v-if="imgPath">
                             <img :src="imgPath" alt="" style="width:130px;height:130px;background:#eee">
                             <Icon type="ios-close-circle-outline" style="font-size:22px;position:absolute;top:-10px;left:110px;color:#aaa"  @click="deleteImg()" />
                        </FormItem>
                       
                    </Col>

                    <Col span="12">
                        <FormItem label="申报人：">
                            <span>{{parentNode.leader}}</span>
                        </FormItem>
                        <FormItem label="严重程度：" prop="extent">
                            <Select v-model="formValidate.extent" placeholder="请选择严重程度" style="width: 200px;">
                                <Option value="1">严重</Option>
                                <Option value="2">一般</Option>
                                <Option value="3">轻微</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="相关设备：" class="special">
                            <span>
                                <a href="javascript:;" @click="equModal = true">[选择设备]</a>
                                <a href="javascript:;">[清除]</a>
                            </span>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
        <!-- 选择相关设备 -->
        <Modal
            v-model="equModal"
            title="选择相关设备"
            width="600"
            :footer-hide="true"
            @on-ok="equOk"
            @on-cancel="equCancel">
            <div class="que-search">
                <Input v-model="equName" style="width: 200px" placeholder="输入设备名称以检索">
                    <Button slot="append" icon="ios-search"></Button>
                </Input>
            </div>
            <Table :columns="equColumns" :data="equData"></Table>
            <Page :total="100" show-elevator show-total size="small" class="page"/>
        </Modal>
        <!-- 选择在勤人员 -->
        <Modal
            v-model="peoModal"
            title="选择在勤人员"
            width="600"
            :footer-hide="true"
            @on-ok="peoOk"
            @on-cancel="peoCancel">
            <div class="que-search">
                <Input v-model="peoName" style="width: 200px" placeholder="输入姓名以检索">
                    <Button slot="append" icon="ios-search"></Button>
                </Input>
            </div>
            <Table :columns="peoColumns" :data="peoData"></Table>
            <Page :total="100" show-elevator show-total size="small" class="page"/>
        </Modal>
    </div>
</template>
<script>
import { getOrg,getDetail,regionalCon,getUsers,saveDefect,uploadImg} from '@api/defect/task';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name: 'declare',
    data() {
        return {
            height: '',
            formValidate: {
                type: '',
                extent: '',
                area: [],
                handler: '',
                handlerName: '',
                remark: ''
            },
            ruleValidate: {
                type: [
                    { required: true, message: '请选择缺陷类型', trigger: 'blur' }
                ],
                extent: [
                    { required: true, message: '请选择严重程度', trigger: 'blur' }
                ],
                area: [
                    { required: true, message: '请选择区域位置', trigger: 'blur',type:'number' }
                ]
            },
            areaData: [],
            handlerList: [],
            equModal: false,
            equName: '',
            equColumns: [
                {
                    title: '设备名称',
                    key: 'name'
                }, {
                    title: '设备编号',
                    key: 'name'
                }, {
                    title: '设备类型',
                    key: 'name'
                }, {
                    title: '型号',
                    key: 'name'
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            equData: [],
            peoModal: false,
            peoName: '',
            peoColumns: [
                {
                    title: '所属组织',
                    key: 'name'
                }, {
                    title: '姓名',
                    key: 'name'
                }, {
                    title: '手机号',
                    key: 'name'
                }, {
                    title: '签到时间',
                    key: 'name'
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            peoData: [],
            orgData:[],
            parentNode:{},
            orgId:'',
            imgPath:'',
            thumbImg:''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getOrganizations()
        this.getRegional()
    },
    methods: {
        deleteImg(){
            this.imgPath = ''
            this.thumbImg = ''
        },
        changeOrg(id){
            this.orgId = id
           this.userList(id)
        },
        userList(id){
          getUsers(id).then(res=>{
              console.log(res)
              if(res.data){
                  this.handlerList = res.data
              }
          })
        },
        getOrganizations(){
            getOrg().then(res=>{
                console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.orgData = createTree(treeItem)
                this.parentNode = this.orgData[0]
                this.formValidate.handler = this.parentNode.id
                this.orgId = this.parentNode.id
                this.userList(this.parentNode.id)
             })
        },
        getRegional() {
            regionalCon().then(res => {
                // console.log(JOSN.stringify(res.data))
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    // trees[i].expand = true
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.areaData = createTree(treeItem)
            }).catch(err => {
                // 异常情况
            })
        },
        goBack() {
            this.$router.go(-1)
        },
        saveHandle(name) {
            this.$refs[name].validate((valid) => {
                console.log(valid)
                if (valid) {
                    let data ={
                        equId: "",
                        equName: "",
                        faultTypeId: this.formValidate.type,
                        imgThumbnailUrl: this.thumbImg,
                        imgUrl:this.imgPath,
                        orgId: this.orgId,
                        processId: this.formValidate.area,
                        processingPersonId: this.formValidate.handlerName,
                        remark: this.formValidate.remark,
                        severityType: this.formValidate.extent,
                    }
                    saveDefect(data).then(res=>{
                        console.log(res)
                        if(res.data.id){
                            this.$router.go(-1)
                        }
                    })
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
         uploadError(){
            // console.log(file)
        },
        handleUploadicon(file) {
            console.log(file)
            let formData = new FormData()
            formData.append('file', file)
            uploadImg(formData).then(res=> {
                console.log(res)
                this.imgPath = res.data.fullPath
                this.thumbImg = res.data.thumbFullPath
            }).catch(err => {
                // 异常情况
            })
        },
        equOk() {

        },
        equCancel() {

        },
        peoOk() {

        },
        peoCancel() {

        }
    }
}
</script>
<style lang="less" scoped>
.declare-wrap {
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
            button {
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 28px;
            }
            .c-btn-back {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        padding: 20px 0;
        border-top: 5px solid #f0f0f0;
        /deep/.ivu-row {
            padding-left: 20px;
        }
        .special {
            a {
                display: inline-block;
                margin-right: 10px;
            }
            /deep/.ivu-select {
                margin-right: 10px;
            }
            button {
                background: #d8d5d5;
                border: none;
                color: #fff;
                height: auto;
                padding: 4px 12px;
                font-size: 13px;
            }
        }
        /deep/.ivu-upload {
            display: inline-block;
        }
        .spec-tip {
            display: inline-block;
            margin-left: 10px;
            /deep/.ivu-icon {
                font-size: 20px;
                color: rgb(173, 173, 173);
                vertical-align: middle;
            }
        }
    }
    /deep/.ivu-tooltip-popper {
        padding: 0 5px 0 8px;
        .inner {
            white-space: normal;
            padding-left: 15px;
            font-size: 13px;
        }
    }
}
.que-search {
    margin-bottom: 10px;
}
.page {
    text-align: right;
    margin-top: 10px;
}
</style>