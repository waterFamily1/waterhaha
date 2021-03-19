<template>
    <div class="upload-box" :style="{height: height+'px'}">
        <div class="upload-tree">
            <div class="upload-title">
                <h3>{{ uploadName }}</h3>
                <Button v-show="activeProcess == 2" type="primary" @click="redo" style="background: #2d8cf0">重新整理</Button>
                <Button v-show="activeProcess != 2" class="c-btn-back" @click="goBack">返回</Button>
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
                        <Table :columns="columns" :data="tableDatas" stripe></Table>
                    </div>      
                    
                    <div v-show="errNum == 0">
                        <div class="import-mod-valid-tip">
                            <div class="import-mod-valid-img"></div>
                            <div style="line-height: 50px;">文件确认通过</div>
                            <div>
                                <Button type="primary" style="margin: 20px auto;width: 100px;" @click="submit" :loading="submitLoading">确定导入</Button>
                            </div>
                        </div>
                    </div>      
                </div>
                <div v-show="activeProcess == 3" class="complete-box">
                    <Icon type="md-checkmark-circle" style="color:#56D43F" size="60"></Icon>
                    <h4 style="display:block;margin: 15px 0">本次成功导入{{totalNum}}行数据</h4>
                    <Button type="primary" class="c-btn-back btn-back" @click="backClick">返回上一级</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const map = ['upload','validate','complete']

import util from '@/libs/public_js'

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
            tableDatas: [],
            excelDataCachekey: '',
            submitLoading: false,
            columns: [],
            Action: '',
            processActive: false
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        beforeUpload() {
            this.loading = true
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '只支持xls,xlsx格式文件'
            });
            this.loading = false;
        },
        uploadError (error, file, fileList) {
            this.$Notice.error({title: '文件上传失败！'})
        },
        uploadSucess (res, file, fileList) {

        },
        submit() {

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
        border-top: 1px solid #dddee1;
        margin: 30px auto;
        padding: 30px 0 0;
        text-align: center;
    }
    .import-mod-valid-img {
        margin: 0 auto;
        width: 80px;
        height: 80px;
        background:url('../../../assets/images/import/complete.jpg') no-repeat;
        background-size: 100%;
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
</style>