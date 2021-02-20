<template>
    <div class="c-main-border" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>设备详情</h3>
            <div class="c-btns-right">
                <Button @click="saveHandle()" :loading="btnLoadding">保存</Button>
                <Button class="cancel" @click="back()">取消</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <div class="equ-edit-left">
                <div class="equ-edit-img">
                    <div style="width: 130px;height: 150px;">
                        <img :src="equipment.imageUrl" width="130" height="150" v-show="equipment.imageUrl" /> 
                        <!-- <img src="http://chaoying.tjdeht.cn:8801/images/a6133ca5be7d6307c4ae35d9e4493f54.png" width="130" height="150" /> -->
                        <img :src="imgPath" width="130" height="150" style="display: none" />
                    </div>
                    <Upload 
                        action=""
                        :format="['jpg','jpeg','png']"
                        :before-upload="handleUploadicon"
                        :on-format-error="uploadError"
                        accept=".jpg , .png, .jpeg"
                        ref="upload"
                        :on-exceeded-size="exceededSize"
                    >
                        <Button>上传图片</Button>
                    </Upload>
                </div>
            </div>
            <div class="equ-edit-info">
                <Form ref="equForm" :model="equipment" :rules="ruleValidate" :label-width="110" :show-message="false">
                    <Row>
                        <Col span="12">
                            <FormItem label="设备名称：" prop="name">
                                <Input v-model="equipment.name" style="width: 200px"></Input>
                            </FormItem>
                            <FormItem label="设备编号：" prop="code">
                                <Input v-model="equipment.code" style="width: 200px"></Input>
                            </FormItem>
                            <FormItem label="资产状态：" prop="state">
                                <Select v-model="equipment.state" style="width: 200px" placeholder="请选择">
                                    <Option v-for="item in stateList" :value="item.value" :key="item.value">
                                        {{ item.label }}
                                    </Option>
                                </Select>
                            </FormItem>
                            <FormItem label="所属组织：" prop="orgName">
                                <TreeSelect 
                                    v-model="equipment.orgName" 
                                    :data="orgNameList" 
                                    v-width="200" 
                                    placeholder="请选择"
                                    @on-change="getOrgId"
                                />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="设备类型：">
                                <span style="margin-right: 10px;">{{ equipment.typeName }}</span>
                                <a class="c-btn-text" href="javascript:;" @click="chooseType">{{equipment.typeId?'[更改]':'[选择]'}}</a>
                            </FormItem>
                            <FormItem label="区域位置：" prop="processId">
                                <TreeSelect 
                                    v-model="equipment.processId" 
                                    :data="processList" 
                                    v-width="200" 
                                    placeholder="请选择" 
                                    @on-change="getSiteId"
                                />
                            </FormItem>
                            <FormItem label="ABC类：" prop="abc">
                                <Select v-model="equipment.abc" style="width: 200px" placeholder="请选择">
                                    <Option v-for="item in abcList" :value="item.value" :key="item.value">
                                        {{ item.label }}
                                    </Option>
                                </Select>
                            </FormItem>
                            <FormItem label="责任人：">
                                <Select 
                                    v-model="equipment.duty" 
                                    multiple 
                                    style="width: 200px" 
                                    placeholder="请选择人员"
                                >
                                    <Option v-for="item in dutyList" :value="item.value" :key="item.value">
                                        {{ item.label }}
                                    </Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div class="equ-edit-right">
                <a href="javascript:;" title="查看AR图片" class="equ-add-icon-ar" @click="ARmodal = true"></a>
            </div>
        </div>
        <div class="c-top-border-gray" style="clear: both;">
            <div class="equ-tab">
                <Tabs :animated="false" @on-click="tabClick" :value="activeTab">
                    <TabPane label="附属信息" name="info">
                        <attach-info v-bind="equipment" @infoDataChange="infoDataChange" :isEdit="true"></attach-info>
                    </TabPane>
                    <TabPane label="原厂附件" name="attach">
                        <equ-attach :attachData="equAttachs" @addAttaItem="addAttaItem" @delAttaItem="delAttaItem" @editAttaItem="editAttaItem" :isEdit="true"></equ-attach>
                    </TabPane>
                    <TabPane label="相关资料" name="file">
                        <equ-file :fileData="equFiles" @addFileItem="addFileItem" @delFileItem="delFileItem" :isEdit="true"></equ-file>
                    </TabPane>
                    <TabPane label="设备参数" name="params">
                        <equ-params :paramsData="equParam" @paramsDataChange="paramsDataChange" :isEdit="true"></equ-params>
                    </TabPane>
                    <TabPane label="上级设备" name="parent">
                        <parent-equ :parentEquData="parentEquData" @parentDataChange="parentDataChange" :isEdit="true"></parent-equ>
                    </TabPane>
                    <TabPane label="相关测点" name="mpoint">
                        <equ-mpoint :pointsData="equMpoints" :siteId="siteId" @mpointsDataChange="mpointsDataChange" :isEdit="true"></equ-mpoint>
                    </TabPane>
                </Tabs>
            </div>
        </div>
        <!-- 设备类型modal -->
        <Modal
            v-model="typeModal"
            title="设备类型"
            width="800">
            <div class="c-tree">
                <div class="c-tree-left">
                    <div>
                        <h3>设备类型</h3>
                        <div style="padding: 12px 14px; border-bottom: 1px solid rgb(230, 230, 230);">
                            <Select
                                v-model="typeSelModel"
                                filterable
                                :remote-method="remoteMethod"
                                style="width: 270px"
                                placeholder="输入设备类型以检索"
                                :loading="selLoading">
                                <Option v-for="(option, index) in selOptions" :value="option.name" :key="option.id" @click.native="optionClick(option)">{{option.name}}</Option>
                            </Select>
                        </div>
                        <div style="padding: 10px 0px 10px 20px;">
                            <Tree :data="typeTree" :render="renderContent"></Tree>
                        </div>
                    </div>
                </div>
                <div class="c-tree-right" id="J_BASIC_TREE_C">
                    <div class="c-plain-bg-h">
                        <h3>设备类型信息</h3> 
                        <div class="c-btns-right" v-show="typeBtn">
                            <Button type="primary" @click="typeSubmit()">提交并选择</Button>
                            <Button @click="typeCancle()">取消</Button>
                        </div>
                    </div>
                    <div class="base-equ-detail">
                        <Form ref="typeValidate" :model="typeValidate" :rules="typeRule">
                            <h4>设备类型名称</h4>
                            <FormItem prop="name" v-if="typeSpan == 2">
                                <Input v-model="typeValidate.name" style="width: 300px"></Input>
                            </FormItem>
                            <span v-if="typeSpan == 3">{{ type.name }}</span>
                            <h4>备注</h4>
                            <FormItem v-if="typeSpan == 2">
                                <Input v-model="typeValidate.remark" style="width: 300px"></Input>
                            </FormItem>
                            <span v-if="typeSpan == 3">{{ type.remark }}</span>
                        </Form>
                    </div>
                </div>
            </div>
            <div slot="footer" v-show="equTypeFooter">
                <Button>取消</Button>
                <Button type="primary" @click="typeOk">确定</Button>
            </div>
        </Modal>
        <!-- AR -->
        <Modal
            v-model="ARmodal"
            title="AR管理"
            width="400"
            @on-ok="ARok"
            @on-cancel="ARcancel">
            <div class="equ-ar">
                <div class="equ-ar-left">
                    <div class="equ-ar-img">
                        <img :src="arUploadSrc" width="130" height="180" v-show="!!arUploadSrc">
                    </div>
                    <div class="equ-edit-upload">
                        <Upload 
                            action="/zuul/base/api/files/upload"
                            :before-upload="beforeArUpload"
                            :on-success="ArSuccessUpload"
                            :on-error="ArErrorUpload"
                            :show-upload-list="false"
                            :max-size="2048"
                            accept="image/*"
                            :on-exceeded-size="exceededSize"
                        >
                            <Button>添加图片</Button>
                        </Upload>
                    </div>
                </div>
                <div class="equ-ar-right"> 
                    <div v-for="(arItem, index) in arUploadItems" :key="index" class="equ-ar-img-item">
                        <span class="equ-ar-img-url ell" :title="arItem.name" @click="ArImageView(arItem)">
                            {{arItem.name}}
                        </span>
                        <a href="javascript:;" @click="ArImageDel(index)" class="equ-ar-btn-del">删除</a>
                    </div>
                    <div v-show="arUploadItems.length == 0" class="c-nodata-tip">请添加图片</div>
                </div>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import { regionalCon, orgMethod, dutyMethod, uploadImg, typeMethod, typeNewMethod, addEquMethod } from '@/api/deviceManage/equEdit'
import createTree from '@/libs/public-util'
import { typeTreeMethod } from '@/libs/public'

import attachInfo from '../book/info.vue'
import equAttach from '../book/attach.vue'
import equFile from '../book/file.vue'
import equParams from '../book/params.vue'
import parentEqu from '../book/parent.vue'
import equMpoint from '../book/mpoint.vue'

export default {
    data(){
        return {
            equTypeFooter: true, 
            height: '',
            equipment: {
                imageUrl: ''
            },
            formValidate: {
                name: '',
                code: '',
                state: '',
                orgName: '',
                typeName: '',
                processId: '',
                abc: '',
                duty: []
            },
            ruleValidate: {
                name: [
                    { required: true, trigger: 'blur' }
                ],
                code: [
                    { required: true, trigger: 'blur' }
                ],
                state: [
                    { required: true, trigger: 'blur' }
                ],
                orgName: [
                    { required: true, trigger: 'blur', type: 'number' }
                ],
                processId: [
                    { required: true, trigger: 'blur', type: 'number' }
                ],
                abc: [
                    { required: true, trigger: 'blur' }
                ]
            },
            stateList: [
                {
                    value: '1',
                    label: '启用'
                }, {
                    value: '2',
                    label: '封存'
                }, {
                    value: '3',
                    label: '报废'
                }
            ],
            orgNameList: [],
            processList: [],
            abcList: [
                {
                    value: '1',
                    label: 'A'
                }, {
                    value: '2',
                    label: 'B'
                }, {
                    value: '3',
                    label: 'C'
                }
            ],
            dutyList: [],
            isEdit: 'true',
            activeTab: 'info',
            imgPath: '',
            typeModal: false,
            typeSelModel: [],
            selLoading: false,
            selOptions: [],
            typeValidate: {
                name: '',
                remark: '',
                orgId: '',
                parentId: ''
            },
            typeRule: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ]
            },
            typeTree: [],
            typeBtn: false,
            type: {
                name: '',
                remark: '',
                busId: ''
            },
            typeSpan: 1,
            searchType: [],//搜索用
            ARmodal: false,
            arUploadItems: [],
            arUploadSrc: '',
            equAttachs: [],
            equFiles: [],
            equParam: {},
            parentEquData: {},
            equMpoints: [],
            siteId: '',
            btnLoadding: false,
            treeId: ''
        }
    },
    components: {
        attachInfo,
        equAttach,
        equFile,
        equParams,
        parentEqu,
        equMpoint
    },
    mounted() {
        this.height = document.body.clientHeight-64
        this.getRegional() //区域位置
        this.getOrg() //所属组织
    },
    methods: {  
        getRegional() {
            regionalCon().then(res => {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].checked = false
                    if(trees[i].idPath == ',0,') {
                        trees[i].disabled = true
                    }
                    treeItem.push(trees[i])
                }
                this.processList = createTree(treeItem,0)
            }).catch(err => {
                // 异常情况
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
                this.orgNameList = createTree(treeItem, 0)
            }).catch(err=> {

            })
        },
        getOrgId(data) {
            this.getDuty(data)
            this.equipment.orgId = Number(data)
        },
        getDuty(id) {
            dutyMethod(id).then(res=> {
                this.dutyList = res.data
            }).catch(err=> {

            })
        },
        getType() {
            typeMethod().then(res=> {
                // console.log(res.data)
                let treeItem = []
                let trees = res.data
                this.searchType = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].expand = true
                    treeItem.push(trees[i])
                }
                this.typeTree = typeTreeMethod(treeItem, '0')
            }).catch(err=> {

            })
        },
        renderContent(h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%'
                },
                on: {
                    //鼠标进入
                    mouseover: () => {
                        this.$set(data,'is_show', true)
                    },
                    //鼠标离开
                    mouseout: () => {
                        this.$set(data,'is_show', false)
                    }
                }
            }, [
                h('span', [
                    h('span', {
                        on: {
                            click: () => { 
                                if(data.children.length == 0) {
                                    this.typeInfor(root, node, data) 
                                }
                            }
                        }
                    }, data.title)
                ]),
                h('span', [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            fontSize: '12px',
                            zIndex: '999',
                            display: data.is_show ? 'inline-block' : 'none'
                        },
                        on: {
                            click: () => { this.appendTypeTree(root, node, data) }
                        }
                    },'新建')
                ])
            ]);
        },
        appendTypeTree(root, node, data) {
            console.log(data)
            this.typeSpan = 2
            this.typeBtn = true
            this.typeValidate.orgId = data.orgId
            this.typeValidate.parentId = data.busId
        },
        typeInfor(root, node, data) {
            // console.log(root, node, data)
            this.type.name = data.name
            this.type.remark = data.remark
            this.type.busId = data.busId
            this.typeBtn = false
            this.typeSpan = 3
        },
        typeCancle() {
            this.typeSpan = 1
            this.typeBtn = false
        },
        typeSubmit() {
            typeNewMethod({
                name: this.typeValidate.name,
                orgId: this.typeValidate.orgId,
                parentId: this.typeValidate.parentId,
                remarks: this.typeValidate.name
            }).then(res=> {
                // console.log(res)
                this.typeModal = false
                if(res.status == 200) {
                    this.$Notice.success({
                        title: '新建成功'
                    });
                }

                this.equipment.typeName = this.typeValidate.name
                this.equipment.busId = res.data.id

            }).catch(err=> {
                if(err.response.data.message == 'equ_equType_idHasUsed') {
                    this.$Message.error('该设备类型已经被使用')
                }
            })
        },
        tabClick(tab) {
            this.activeTab = tab;
        },
        uploadError(){
            // console.log(file)
        },
        handleUploadicon(file) {
            // console.log(file)
            let formData = new FormData()
            formData.append('file', file)
            uploadImg(formData).then(res=> {
                console.log(res)
                this.imgPath = res.data.fullPath
            }).catch(err => {
                // 异常情况
            })
        },
        remoteMethod(query) {
            if (query !== '') {
                this.selLoading = true;
                setTimeout(() => {
                    this.selLoading = false;
                    this.selOptions = this.searchType.filter((item,index)=>{
                        if(item.name.indexOf(query) >= 0) return item;
                    });
                }, 200);
            } else {
                this.selOptions = [];
            }
        },
        optionClick(option) {
            let childLen = option.children.length
            if(!childLen) {
                this.type.name = option.name
                this.type.remark = option.remarks
                this.type.busId = option.busId
                this.typeBtn = false
                this.typeSpan = 3
            } else {
                this.type.name = ''
                this.type.remark = ''
                this.type.busId = ''
                this.typeBtn = false
                this.typeSpan = 3
            }
        },
        chooseType() {
            this.typeModal = true
            this.getType() //设备类型
        },
        typeOk() {
            this.equipment.typeName = this.type.name
            this.equipment.typeId = this.type.busId
            this.selectEquType = false;
        },
        exceededSize() {
            this.$Notice.warning({title: '最大上传图片大小为2M'})
        },
        beforeArUpload() {
            if(this.arUploadItems.length >=10) {
                this.$Notice.warning({title: '最多上传10张图片'})
                return false;
            }
        },
        ArSuccessUpload(res, file) {
            this.arUploadItems.push({
                url: res.fullPath,
                name: res.name
            });
            this.arUploadSrc = res.fullPath;
        },
        ArErrorUpload(res, file) {
            this.$Notice.error({title: '上传失败'})
        },
        ArImageDel(i) {
            this.arUploadItems.splice(i, 1);
        },
        ArImageView(data) {
            this.arUploadSrc = data.url;
        },
        ARok() {

        },
        ARcancel() {

        },
        //暴露给子组件调用的方法
        infoDataChange(data) {
            Object.assign(this.equipment, data)
            console.log(this.equipment)
        },
        addAttaItem(item) {
            this.equAttachs.push(item)
        },
        editAttaItem(item){
            this.equAttachs.splice(item.index, 1, item)
        },
        delAttaItem(id) {
            var equAttachs = this.equAttachs
            equAttachs.forEach(function(item, i) {
                var _id = item.id || item.tempID
                if (_id === id) equAttachs.splice(i, 1)
            })
        },
        addFileItem(item) {
            this.equFiles.push(item)
        },
        delFileItem(id) {
            var equFiles = this.equFiles;
            equFiles.forEach(function(item, i) {
                var _id = item.id || item.tempID
                if (_id === id) equFiles.splice(i, 1)
            });
        },
        paramsDataChange(data) {
            Object.assign(this.equParam, data)
        },
        parentDataChange(data) {
            if (!data.code) {
                this.equipment.parentId = null
            } else {
                this.equipment.parentId = data.id
            }
            this.parentEquData = data
        },
        mpointsDataChange(data) {
            this.equMpoints = data
        },
        getSiteId(data) {
            this.siteId = Number(data)
            this.equipment.processId = Number(data)
        },
        saveHandle() {
            console.log(this.equipment)
            this.btnLoadding = true
            let _valid = false
            
            this.$refs['equForm'].validate(valid => {
                if (valid) {
                    _valid = true
                }
            })

            if (!_valid){
                this.btnLoadding = false;                
                return;
            } 
   
            let data = {
                equArs: this.arUploadItems,
                equAttachs: this.equAttachs,
                equFiles: this.equFiles,
                equMpoints: this.equMpoints,
                equParam: this.equParam,
                equipment: this.equipment
            }
            addEquMethod(data).then(res=> {
                if (res.id) {
                    this.$Notice.success({
                        title: "添加成功",
                        desc: "添加设备成功！",
                        duration: 3
                    });
                    this.$router.back()
                    // if (this.$route.name == "equ-edit") {
                    //     this.$Notice.success({
                    //         title: "修改成功",
                    //         desc: "修改设备成功！",
                    //         duration: 3
                    //     });
                    //     this.isEdit = false;
                    //     this.$router.back();
                    // } else {
                    //     this.$Notice.success({
                    //         title: "添加成功",
                    //         desc: "添加设备成功！",
                    //         duration: 3
                    //     });
                    // }
                }else{
                    this.btnLoadding = false
                }
            }).catch(err=> {
                this.btnLoadding = false
            })
        },
        back() {
            this.$router.back()
        }
    }
}
</script>

<style lang="less" scoped>
.c-main-border {
    border: 5px solid #f0f0f0;
    background: #fff;
    overflow: auto;
    .c-left-border-blue {
        padding: 5px;
        h3 {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
            a {
                color: #4b7efe;
                margin-left: 20px;
                display: inline-block;
                font-size: 14px;
            }
        }
        .c-btns-right {
            float: right;
            margin-top: 2px;
            /deep/.ivu-btn {
                height: auto;
                background: #4b7efe;
                font-size: 12px;
                padding: 4px 0;
                min-width: 70px;
                text-align: center;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
            }
            .cancel {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        border-top: 5px solid #f0f0f0;
        padding: 10px 14px;
        display: flex;
        position: relative;
        .equ-edit-left {
            width: 130px;
            position: relative;
            .equ-edit-img {
                .ivu-btn {
                    background-color: #576374;
                    border: none;
                    padding: 4px 12px;
                    height: auto;
                    font-size: 12px;
                    color: #fff;
                }
            }
        }
        .equ-edit-info {
            width: 800px;
            /deep/.ivu-form-item {
                margin-bottom: 10px;
            }
            /deep/.ivu-btn {
                height: auto;
                padding: 2px 10px;
                font-size: 12px;
            }
        }
        .equ-edit-right {
            position: absolute;
            right: 10px;
            .equ-add-icon-ar {
                display: block;
                width: 30px;
                height: 30px;
                background: url('../../../assets/images/AR.png') no-repeat 0 0;
                margin: 30px;
            }
        }
        .equ-tab {
            width: 100%;
        }
    }
}
.c-tree {
    height: 380px;
    overflow: hidden auto;
    display: flex;
    min-height: 100%;
    .c-tree-left {
        width: 300px;
        height: 380px;
        border-top: 3px solid #f0f0f0;
        div {
            width: 300px;
            border: 1px solid #f0f0f0;
            h3 {
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-weight: 100;
                background: #eee;
                text-indent: 10px;
                border-bottom: 1px solid #f0f0f0;
                font-size: 14px;
            }
        }
    }
    .c-tree-right {
        width: 400px;
        height: 380px;
        border: 1px solid #f0f0f0;
        position: absolute;
        left: 330px;
        top: 60px;
        flex: 1;
        .c-plain-bg-h {
            padding: 0;
            height: 30px;
            border-bottom: none;
            h3 {
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-weight: 100;
                background: #eee;
                text-indent: 10px;
                border-bottom: 1px solid #f0f0f0;
                font-size: 14px;
            }
            .c-btns-right {
                margin-top: 10px;
                float: right;
                .ivu-btn {
                    height: auto;
                    padding: 4px 12px;
                    font-size: 12px;
                    margin-right: 10px;
                    border: none;
                }
                .ivu-btn-default {
                    background-color: #c8c8c8;
                    color: #FFF;
                }
            }
        }
        .base-equ-detail {
            padding: 40px 15px;
            h4 {
                height: 40px;
                margin-top: 20px;
            }
            /deep/.ivu-form-item-content {
                padding-bottom: 30px;
                border-bottom: 1px dashed #f0f0f0;
            }
        }
    }
}
/deep/.ivu-tree-title-selected,
/deep/.ivu-tree-title {
    width: 85%;
}
.equ-ar {
    height: 220px;
    display: flex;
    .equ-ar-left {
        width: 130px;
        .equ-ar-img {
            width: 130px;
            height: 180px;
            background-color: #F9F9F9;
        }
        /deep/.ivu-btn {
            background-color: #576374;
            border: none;
            padding: 4px 12px;
            height: auto;
            font-size: 12px;
            color: #fff;
        }
        .equ-edit-upload {
            text-align: center;
            margin: 10px auto;
        }
    }
    .equ-ar-right {
        margin-left: 20px;
        width: 200px;
        .c-nodata-tip {
            text-align: center;
            line-height: 50px;
        }
    }
}
/deep/.ivu-modal-footer {
    border-top: none;
}
.equ-ar-img-item {
    display: flex;
    justify-content: space-between;
}
</style>