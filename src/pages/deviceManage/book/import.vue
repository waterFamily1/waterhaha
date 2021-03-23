<template>
    <div class="upload-box" :style="{height: height+'px'}">
        <div class="upload-tree">
            <div class="upload-title">
                <h3>设备信息导入</h3>
                <div class="upload-btn">
                    <Button v-show="activeProcess == 2" type="primary" @click="redo" style="background: #2d8cf0">重新整理</Button>
                    <Button class="c-btn-back" @click="goBack">返回</Button>
                </div>
            </div>
            <div class="upload-content">
                <div class="import-mod-process" :class="'import-mod-process-'+activeProcess"></div>
                <div v-show="activeProcess == 1">
                    <div class="import-mod-upload">
                        <Upload 
                            name = "file"
                            :data = "uploadData"
                            :show-upload-list = "false"
                            :format = "['xls', 'xlsx']"
                            :accept = "Accpet"
                            :before-upload = "beforeUpload"
                            :on-format-error="handleFormatError"
                            :on-success = "uploadSucess"
                            :on-error = "uploadError"
                            :action="Action"
                        >
                            <Button type="primary" :loading="loading">文件上传</Button>
                        </Upload>
                    </div>
                    <div class="import-mod-download">
                        <a :href="importHref" download="" style="color: rgb(75, 126, 254);">
                            导入模版下载 
                            <Icon type="ios-cloud-upload" size="20" style="color: #3399ff"></Icon>
                        </a>
                        <div style="margin-top: 20px; color: rgb(102, 102, 102);">(上传文件数量不超过2000条)</div>
                    </div>
                </div>

                <div v-show="activeProcess == 2">
                    <ul class="import-mod-info">
                        <li class="import-mod-info-all">
                            共<em>{{totalNum}}</em>行
                        </li>
                        <li class="import-mod-info-true">
                            验证通过<em>{{passNum}}</em>行
                        </li>
                        <li class="import-mod-info-false">
                            错误<em>{{errNum}}</em>行
                        </li>                
                    </ul>
                    
                    <div v-show="errNum > 0">
                        <Tabs :animated="false">
                            <TabPane label="设备基本信息" :icon="equImportResults.length ? 'ios-information-circle':''">
                                <Table :columns="equImportResultsColumns" :data="equImportResults" :loading="loading" v-show="equImportResults.length" stripe></Table>                    
                                <validate-pass :flag="!!equImportResults.length"></validate-pass>
                            </TabPane>
                            <TabPane label="原厂附件" :icon="equAttachImportResults.length ? 'ios-information-circle':''">
                                <Table :columns="equAttachImportResultsColumns" :data="equAttachImportResults" :loading="loading" v-show="equAttachImportResults.length" stripe></Table>
                                <validate-pass :flag="!!equAttachImportResults.length"></validate-pass>
                            </TabPane>
                            <TabPane label="设备参数" :icon="equParamImportResults.length ? 'ios-information-circle':''">
                                <Table :columns="equParamImportResultsColumns" :data="equParamImportResults" :loading="loading" v-show="equParamImportResults.length" stripe></Table>                    
                                <validate-pass :flag="!!equParamImportResults.length"></validate-pass>
                            </TabPane>
                            <TabPane label="上级设备" :icon="parentEquImportResults.length ? 'ios-information-circle':''">
                                <Table :columns="parentEquImportResultsColumns" :data="parentEquImportResults" :loading="loading" v-show="parentEquImportResults.length" stripe></Table>                    
                                <validate-pass :flag="!!parentEquImportResults.length"></validate-pass>
                            </TabPane>
                        </Tabs>
                    </div>      
                    
                    <div v-show="errNum == 0">
                        <div class="import-mod-valid-tip">
                            <div>
                                <Button type="primary" style="margin: 20px auto;width: 100px;" @click="submit" :loading="submitLoading">确定导入</Button>
                            </div>
                        </div>
                    </div>      
                </div>
                <div v-show="activeProcess == 3" class="complete-box">
                    <Icon type="md-checkmark-circle" style="color:#56D43F" size="60"></Icon>
                    <h4 v-if="!generateNum" style="display:block;margin: 15px 0">本次成功导入{{totalNum}}行数据</h4>
                    <h4 v-if="generateNum" style="display:block;margin: 15px 0">本次成功导入{{totalNum}}行数据，并另外生成{{generateNum}}行测点数据</h4>
                    <Button type="primary" class="c-btn-back btn-back" @click="backClick">返回上一级</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const map = ['upload','validate','complete']

import util from '@/libs/public_js'
import { saveMethod } from '@/api/deviceManage/equ'

export default {
    components: {
        'validate-pass':{
            props:{
                flag: Boolean
            },
            data(){
                return {}
            },
            template: '<div v-show="!flag" class="validate-pass-box"><span class="complete-icon"></span><span>文件确认通过</span></div>'
        }
    },
    data() {
        var _self = this
        return {
            height: '',
            importHref: '/equipment/api/excel-temlate-down',
            Accpet: "xls, xlsx",
            loading: false,
            activeProcess: 1,
            uploadData: {
                type: ''
            },
            config: {},
            totalNum: 0,
            passNum: 0,
            errNum: 0,
            generateNum: 0,
            tableDatas: [],
            excelDataCachekey: '',
            submitLoading: false,
            equImportResults: [],
            equImportResultsColumns: [{
                title:'行序号',
                key: 'equipment.index',
                minWidth:80,
                render(h,params) {
                    return h('span',params.row.equipment.index);
                }
            }, {
                title:'设备名称',
                key: 'equipment.name',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','name');
                }
            }, {
                title:'设备编号',
                key: 'code',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','code');
                }
            }, {
                title:'设备状态',
                key: 'equipment.state',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','state');
                }
            }, {
                title:'设备类型',
                key: 'equipment.typeId',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','typeId');
                }
            }, {
                title:'所属组织',
                key: 'equipment.orgName',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','orgName');
                }
            }, {
                title:'区域位置',
                key: 'equipment.processName',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','processName');
                }
            }, {
                title:'ABC类',
                key: 'equipment.abc',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','abc');
                }
            }, {
                title:'责任人',
                key: 'equipment.personResponsible',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','personResponsible');
                }
            }, {
                itle:'设备型号',
                key: 'equipment.model',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','model');
                }
            }, {
                title:'规格',
                key: 'equipment.specification',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','specification');
                }
            }, {
                title:'品牌',
                key: 'equipment.brand',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','brand');
                }
            }, {
                title:'供应商名称',
                key: 'equipment.vendor',
                minWidth:120,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','vendor');
                }
            }, {
                title:'生产厂家',
                key: 'equipment.manufacturer',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','manufacturer');
                }
            }, {
                title:'出厂编号',
                key: 'equipment.serialNumber',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','serialNumber');
                }
            }, {
                title:'出厂日期',
                key: 'equipment.manufactureDate',
                minWidth:150,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','manufactureDate', true);
                }
            }, {
                title:'安装日期',
                key: 'equipment.installDate',
                minWidth:150,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','installDate', true);
                }
            }, {
                title:'保修期限(年)',
                key: 'equipment.warrantyPeriod',
                minWidth:150,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','warrantyPeriod');
                }
            }, {
                title:'其他错误',
                key: 'equipment.otherError',
                minWidth:200,                
                render(h,params) {
                    return _self.renderHandle(h,params,'equipment','otherError');
                }
            }],

            equAttachImportResults:[],
            equAttachImportResultsColumns:[{
                title:'行序号',
                key: 'equattachBo.index',
                minWidth:80,
                render(h,params){
                    return h('span',params.row.equattachBo.index);
                }
            },{
                title:'设备编号',
                key: 'equattachBo.equId',
                minWidth:100,                
                render(h,params){
                    return _self.renderHandle(h,params,'equattachBo','equId');
                }
            },{
                title:'附件名称',
                key: 'equattachBo.name',
                minWidth:100,                
                render(h,params){
                    return _self.renderHandle(h,params,'equattachBo','name');
                }
            },{
                title:'类型',
                key: 'equattachBo.type',
                minWidth:100,                
                render(h,params){
                    return _self.renderHandle(h,params,'equattachBo','type');
                }
            },{
                title:'型号',
                key: 'equattachBo.model',
                minWidth:100,                
                render(h,params){
                    return _self.renderHandle(h,params,'equattachBo','model');
                }
            },{
                title:'规格',
                key: 'equattachBo.specification',
                minWidth:100,                
                render(h,params){
                    return _self.renderHandle(h,params,'equattachBo','specification');
                }
            },{
                title:'出厂数量',
                key: 'equattachBo.quantity',
                minWidth:100,                
                render(h,params){
                    return _self.renderHandle(h,params,'equattachBo','quantity');
                }
            },{
                title:'计量单位',
                key: 'equattachBo.unit',
                minWidth:100,                
                render(h,params){
                    return _self.renderHandle(h,params,'equattachBo','unit');
                }
            },{
                title:'备注',
                key: 'equattachBo.remarks',
                minWidth:100,                
                render(h,params){
                    return _self.renderHandle(h,params,'equattachBo','remarks');
                }
            },{
                title:'其他错误',
                key: 'equattachBo.otherError',
                minWidth:200,                
                render(h,params){
                    return _self.renderHandle(h,params,'equattachBo','otherError');
                }
            }],

            equParamImportResults:[],
            equParamImportResultsColumns:[{
                title:'行序号',
                key: 'equParam.index',
                minWidth:80,
                render(h,params){
                    return h('span',params.row.equParam.index);
                }
            },{
                title:'设备编号',
                key: 'equParam.equId',
                minWidth:100,                
                render(h,params){
                    return _self.renderHandle(h,params,'equParam','equId');
                }
            },{
                title:'设备参数',
                key: 'equParam.param',
                minWidth:100,                
                render(h,params){
                    return _self.renderHandle(h,params,'equParam','param');
                }
            },{
                title:'养护要求',
                key: 'equParam.mtRequirements',
                minWidth:100,                
                render(h,params){
                    return _self.renderHandle(h,params,'equParam','mtRequirements');
                }
            },{
                title:'其他错误',
                key: 'equParam.otherError',
                minWidth:200,                
                render(h,params){
                    return _self.renderHandle(h,params,'equParam','otherError');
                }
            }],

            parentEquImportResults:[],
            parentEquImportResultsColumns:[{
                title:'行序号',
                key: 'parentEquipment.index',
                minWidth:80,
                render(h,params){
                    return h('span', params.row.parentEquipment.index);
                }
            },{
                title:'设备编号',
                key: 'parentEquipment.equId',
                minWidth:100,                
                render(h,params){
                    return _self.renderHandle(h,params,'parentEquipment','equId');
                }
            },{
                title:'上级设备编号',
                key: 'parentEquipment.parentId',
                minWidth:100,                
                render(h,params){
                    return _self.renderHandle(h,params,'parentEquipment','parentId');
                }
            },{
                title:'其他错误',
                key: 'parentEquipment.otherError',
                minWidth:200,                
                render(h,params){
                    return _self.renderHandle(h,params,'parentEquipment','otherError');
                }
            }],
            Action: '/equipment/api/excel-import',
            processActive: false
        }
    },
    mounted() {
        this.height = document.body.clientHeight - 115
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        redo(){
            if(this.excelDataCachekey) {
                this.$http.del(this.config.cancelUrl, {excelDataCacheKey: this.excelDataCachekey})
            }
            this.activeProcess = 1
        },
        beforeUpload() {
            this.loading = true
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '只支持xls,xlsx格式文件'
            });
            this.loading = false
        },
        uploadError (error, file, fileList) {
            this.$Notice.error({title: '文件上传失败！'})
        },
        uploadSucess (res, file, fileList) {
            this.loading = false
            this.activeProcess = 2
            if(res.equOutnumber||res.attOutnumber||res.paramOutnumber||res.partOutnumber){
                this.$refs.upload.clearFiles()
                this.$Modal.warning({
                    title: "上传警告",
                    render(h){
                        return h('div', {
                            "class":{
                                'import-modal':true
                            }
                        },"上传数据已超过500行，请重新整理后上传！")
                    }
                });
                return false
            }
            if(res.allowCreateEquNum != null) {
                this.$refs.upload.clearFiles()
                this.$Modal.warning({
                    title: "上传警告",
                    render(h){
                        return h('div', {
                            "class":{
                                'import-modal':true
                            }
                        },"剩余可创建设备量："+res.allowCreateEquNum+"，此次导入将达到购买上限，请重新整理后上传！")
                    }
                })
                return false
            }
            if(res.allowCreateMpoiontNum != null) {
                this.$refs.upload.clearFiles()
                this.$Modal.warning({
                    title: "上传警告",
                    render(h){
                        return h('div', {
                            "class":{
                                'import-modal':true
                            }
                        },"剩余可创建测点量："+res.allowCreateMpoiontNum+"，此次导入将达到购买上限，请重新整理后上传！")
                    }
                });
                return false
            }
            this.processActive = map[1]                                                   
            this.equAttachImportResults = this.dataHandle(res.equAttachImportResults)
            this.equImportResults = this.dataHandle(res.equImportResults)
            this.equParamImportResults = this.dataHandle(res.equParamImportResults)
            this.parentEquImportResults = this.dataHandle(res.parentEquImportResults)
            this.excelDataCachekey = res.excelDataCachekey
            this.totalNum = res.totalNum
            this.passNum = res.passNum
            this.errNum = res.errNum
            this.generateNum = res.generateNum
        },
        dataHandle(data) {
            data.forEach((v, i) => {
                v.validateResult.otherError = '无'
                if(v.validateResult.boxCode) {
                    v.validateResult.otherError = v.validateResult.boxCode
                }
                if(v.validateResult.generateMpoint) {
                    v.validateResult.otherError = v.validateResult.generateMpoint
                }
                if(v.validateResult.parseMethod) {
                    v.validateResult.otherError = v.validateResult.parseMethod
                }
                if(v.validateResult.dbExistFlag) {
                    v.validateResult.otherError = '数据库中已存在当前设备'
                }
                if(v.validateResult.equIdNoExistEqu) {
                    v.validateResult.otherError = '设备编号不存在'
                }
                if(v.validateResult.excelRepeat) {
                    v.validateResult.otherError = 'Excel表中设备编号重复'                  
                }
            })
            return data
        },
        renderHandle(h, params, type, key, isDate) {
            let validate = params.row.validateResult[key]
            let color = (!validate || (key == 'otherError' && validate == '无')) ? '#333' : 'red',    
                value = validate || params.row[type][key]

            isDate && (value = util.transDateFromServer(value))
            return h('span', {
                style:{
                    color: color
                },
                attrs:{
                    title: value
                }
            }, value)
        },
        submit() {
            this.submitLoading = true
            saveMethod({
                excelDataCacheKey: this.excelDataCachekey
            }).then(res=> {
                this.submitLoading = false
                if(res){
                    this.$Notice.success({
                        title: '成功！',
                        desc: '数据保存成功',
                        duration: 3
                    })
                    this.activeProcess = 3
                    
                }
            }).catch(err=> {
                this.submitLoading = false
            })
        },
        backClick(){
            this.$router.back()
        }
    }
}
</script>

<style lang="less" scoped>
.upload-box {
    margin-top: 5px;
    .upload-tree {
        min-height: 100%;
        height: 100%;
        .upload-title {
            display: flex;
            width: 100%;
            background: #fff;
            justify-content: space-between;
            padding: 5px;
            h3 {
                height: 30px;
                line-height: 30px;
                text-indent: 10px;
            }
            /deep/.ivu-btn {
                min-width: 70px;
                margin: 0 5px;
                background-color: #c8c8c8;
                color: #fff;
                padding: 4px 12px;
                font-size: 12px;
                line-height: 12px;
                height: 26px;
                border: none;
            }
        }
        .upload-content {
            width: 100%;
            height: 100%;
            background: #fff;
            border-top: 5px solid #f0f0f0;
            padding: 10px;
            .import-mod-process {
                margin: 20px auto;
                width: 567px;
                height: 107px;
                background: url('../../../assets/images/upload1.png') no-repeat 0 0;
            }
            .import-mod-process-1 {
                background-position: 0 0 !important;
            } 
            .import-mod-process-2 {
                background-position: 0 -107px !important;
            } 
            .import-mod-process-3 {
                background-position: 0 -214px !important;
            } 
            .import-mod-upload {
                height: 40px;
                margin: 40px auto;
                text-align: center;
                /deep/.ivu-btn-primary {
                    width: 120px;
                    height: 30px;
                    background: #4b7efe;
                }
            }
            .import-mod-download {
                margin: 20px auto;
                text-align: center;
            }
        }
    }
    .import-mod-info {
        width: 600px;
        height: 40px;
        margin: 0 auto 20px;
        li {
            float: left;
            width: 200px;
            height: 40px;
            line-height: 40px;            
            list-style: none;
            text-align: center;
            em {
                margin: 0 20px;
                font-size: 26px;
                font-weight: 700;
                font-style: normal;
                color: #000;
            }
        }
        li:before{
            content:'';
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 10px;
            border-radius: 50%;
        }
    }
    .import-mod-info-all:before {
        background-color: #0BB1DF;
    }
    .import-mod-info-true:before {
        background-color: #55d43f;
    }
    .import-mod-info-false:before {
        background-color: #e03d3e;
    }
    .import-mod-valid-tip {
        margin: 30px auto;
        text-align: center;
    }
    .import-mod-btn-back{
        width:100px;
        border:solid 1px #0BB1DF;
        color:#0BB1DF;
        background:#fff;
    }
    .complete-box {
        text-align: center;
    }
}
/deep/.ivu-tabs-nav {
    .ivu-icon-ios-information-circle {
        color: #e03e3c;
    }
}
/deep/.validate-pass-box {
    text-align: center;
}
</style>