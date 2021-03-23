<template>
    <div class="upload-box" :style="{height: height+'px'}">
        <div class="upload-tree">
            <div class="upload-title">
                <h3>测点导入</h3>
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
                        <div style="margin-top: 20px; color: rgb(102, 102, 102);">(上传文件数量不超过500条)</div>
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
                            <TabPane label="测点信息" :icon="mpointImportResults.length ? 'ios-information-circle':''">
                                <Table :columns="mpointImportResultsColumns" :data="mpointImportResults" :loading="loading" v-show="mpointImportResults.length" stripe></Table>                    
                                <validate-pass :flag="!!mpointImportResults.length"></validate-pass>
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
import { importMethod } from '@/api/dataManage/siteManage'

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
            importHref: '/loong/api/mpoints/excel-template-download',
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
            mpointImportResults:[],
            mpointImportResultsColumns:[{
                title:'行序号',
                key: 'mpoint.index',
                minWidth:80,
                render(h,params) {
                    return h('span',params.row.mpoint.index)
                }
            }, {
                title:'区域位置',
                key: 'mpoint.siteName',
                minWidth:150,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','siteName')
                }
            }, {
                title:'测点名称',
                key: 'mpoint.mpointName',
                minWidth:150,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','mpointName')
                }
            }, {
                title:'所属设备',
                key: 'mpoint.equipmentName',
                minWidth:150,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','equipmentName')
                }
            }, {
                title:'数据来源',
                key: 'mpoint.datasource',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','datasource')
                }
            }, {
                title:'数据分类',
                key: 'mpoint.categoryName',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','categoryName')
                }
            }, {
                title:'信号类型',
                key: 'mpoint.datype',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','datype')
                }
            }, {
                title:'单位',
                key: 'mpoint.unit',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','unit')
                }
            }, {
                title:'显示小数位',
                key: 'mpoint.numtail',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','numtail')
                }
            }, {
                title:'状态值',
                key: 'mpoint.enumvalue',
                minWidth:100,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','enumvalue')
                }
            }, {
                title:'备注',
                key: 'mpoint.remarks',
                minWidth:150,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','remarks')
                }
            }, {
                title:'倍数',
                key: 'mpoint.magnification',
                minWidth:110,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','magnification')
                }
            }, {
                title:'基数',
                key: 'mpoint.cardinality',
                minWidth:110,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','cardinality')
                }
            }, {
                title:'上限',
                key: 'mpoint.upperRange',
                minWidth:150,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','upperRange')
                }
            }, {
                title:'下限',
                key: 'mpoint.lowerRange',
                minWidth:150,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','lowerRange')
                }
            }, {
                title:'斜率',
                key: 'mpoint.slope',
                minWidth:150,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','slope')
                }
            }, {
                title:'单调递增',
                key: 'mpoint.increase',
                minWidth:150,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','increase')
                }
            }, {
                title:'等级',
                key: 'mpoint.coefficient',
                minWidth:150,                
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','coefficient')
                }
            }, {
                title:'其他错误',
                key: 'mpoint.otherError',
                minWidth:200,
                render(h,params) {
                    return _self.renderHandle(h,params,'mpoint','otherError')
                }
            }],

            Action: '/loong/api/mpoints/import',
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
            if(res.outnumber) {
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
                })
                return false
            }
            this.processActive = map[1]
            this.mpointImportResults = this.dataHandle(res.importResults)
            this.excelDataCachekey = res.excelDataCachekey
            this.totalNum = res.totalNum
            this.passNum = res.passNum
            this.errNum = res.errNum
        },
        dataHandle(data) {
            data.forEach((v, i) => {
                v.validateResult.otherError = '无'
                if(v.validateResult.dbExistFlag) {
                    v.validateResult.otherError = '数据库中已经存在'
                }
                if(v.validateResult.excelRepeat) {
                    v.validateResult.otherError = 'excel中重复存在'               
                }
                if(v.validateResult.siteNameNotExist){
                    v.validateResult.otherError = '区域位置不存在'                  
                }
                if(v.validateResult.equipmentNotExist) {
                    v.validateResult.otherError = '设备不存在'
                }
                if(v.validateResult.categoryNameNotExist) {
                    v.validateResult.otherError = '数据分类不存在'                 
                }
                if(v.validateResult.datasourceFormatError) {
                    v.validateResult.otherError = '数据类型必须是自动采集/人工录入'               
                }
                if(v.validateResult.datypeFormatError) {
                    v.validateResult.otherError = '数据类型必须是状态信号/数值信号'                 
                }
                if(v.validateResult.numtailFormatError1) {
                    v.validateResult.otherError = '显示小数位数必须是0/1/2/3/4/5'
                }
                if(v.validateResult.enumvalueFormatError) {
                    v.validateResult.otherError = '枚举值格式不正确(例如： 0,关;1,开;)'                
                }
                if(v.validateResult.rangeError) {
                    v.validateResult.otherError = '范围值下限不能大于范围值上限'
                }
            })
            return data
        },
        renderHandle(h, params, type, key, isDate) {
            let validate = params.row.validateResult[key]
            let color = (!validate || (key == 'otherError' && validate == '无')) ? '#333' : 'red',    
                value = validate || params.row[type][key]

            isDate && (value = util.transDateFromServer(value))
            if(!validate && key == 'datasource') {
                value = (value == 'INPUT' ? '人工录入' : '自动采集')
            }
            if(!validate && key == 'datype') {
                value = (value == 'State' ? '状态信号' : '数值信号')
            }
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
            importMethod({
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