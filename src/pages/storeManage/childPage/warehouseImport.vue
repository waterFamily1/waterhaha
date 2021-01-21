<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="c-main-border">
            <div class="c-left-border-blue">
                <h3>库位导入</h3>
                <div class="c-btns-right">
                    <Button @click="back">关闭</Button>
                </div>
            </div>
            <div class="c-top-border-gray">
                <div class="equ-import-process">
                    <span :class="{active: processActive == 'upload'}">数据上传</span>
                    <span :class="{active: processActive == 'validate'}">数据验证</span>
                    <span :class="{active: processActive == 'complete'}">完成</span>
                </div>
                <div v-show="processActive == 'upload'">
                    <div class="equ-import-upload">
                        <Upload 
                            ref = "upload"
                            name = 'file'
                            accept = ".xls,.xlsx"
                            :format = "['xls', 'xlsx']"
                            :on-success = "uploadSucess"
                            :on-error = "uploadError"
                            :action="importUrl"
                            :data="params">
                            <Button  type="primary" shape="circle">文件上传</Button>
                        </Upload>
                    </div>
                    <div class="equ-import-download">
                        <a @click="downExcel" download>导入模版下载<Icon type="md-cloud-download" /></a>
                    </div>
                </div>
                <div v-show="processActive == 'validate'" style="margin-top: 30px">
                    <ul class="validate-box clearfix">
                        <li class="all-validate">
                            共<em>{{totalNum}}</em>行
                        </li>
                        <li class="all-pass">
                            验证通过<em>{{passNum}}</em>行
                        </li>
                        <li class="all-error">
                            错误<em>{{errNum}}</em>行
                        </li>                
                    </ul>
                    <Button type="primary" v-show="!errNum" class="submit-btn" @click="saveExcelData">确定导入</Button>   
                </div>
                <div v-show="processActive == 'complete'" class="complete-box">
                    <Icon type="md-checkmark-circle" style="color:#56D43F" size="60"></Icon>
                    <h3>本次成功导入{{totalNum}}行数据</h3>
                    <Button type="primary" class="c-btn-back btn-back" @click="backClick">返回上一级</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { saveExcelMethod } from '@/api/store/ware'
import util from '@/libs/public_js'
const map = ['upload', 'validate', 'complete']

export default {
    data() {
        var _self = this
        return {
            height: '',
            params: {
                warehouseNo: this.$route.query.warehouseNo
            },
            totalNum: 0,
            passNum: 0,
            errNum: 0,
            processActive: map[0],
            iccidImportResults: [],
            excelDataCachekey: '',
        }
    },
    computed:{
        // 导入
        importUrl() {
            return '/inventory/api/warehousePosition/excel-import'
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods:{
        back() {
			this.$router.back()
        },
        backClick(){
            this.$router.back()
        },
        downExcel() {
            util.download('/inventory/api/warehousePosition/excel-temlate-down')
        },
        uploadSucess (res, file, fileList) {
            console.log(res)
            if(res) {
                this.processActive = map[1]             
                this.iccidImportResults = res.importResults
                this.excelDataCachekey = res.excelDataCacheKey
                this.totalNum = res.totalNum
                this.passNum = res.passNum
                this.errNum = res.errNum
            }
        },
        uploadError (error, file, fileList) {
            this.$Message.error('文件上传失败！')
        },
        saveExcelData() {
            if(!!this.errNum) {
                this.$Message.error('Excel表格校验不通过！')
            } else {
                saveExcelMethod(this.excelDataCachekey).then(res=> {
                    console.log(res)
                    if(res.data.count) {
                        this.$Notice.success({
                            title: '成功！',
                            desc: '数据保存成功',
                            duration: 3
                        })
                        this.processActive = map[2]
                        this.$emit('save-excelData', res)
                    }
                })
            }
        },
    }
}
</script>

<style lang="less" scoped>
.index-box {
    margin: 5px;
    background: #fff;
    .c-main-border {
        border: 5px solid #f0f0f0;
        min-height: 100%;
        width: 100%;
        .c-left-border-blue {
            border-radius: 3px;
            padding: 5px;
            display: flex;
            justify-content: space-between;
            h3 {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                text-indent: 10px;
            }
            .ivu-btn {
                height: 28px;
                min-width: 70px;
                margin: 0 5px;
                background-color: #c8c8c8;
                border: none;
                color: #fff;
                padding: 4px 12px;
                font-size: 13px;
            }
        }
        .c-top-border-gray {
            border-top: 5px solid #f0f0f0;
            padding: 20px 0;
            .equ-import-process {
                width: 620px;
                height: 110px;
                background: #FFF url('../../../assets/images/import/process-bg.png') repeat-x 0 -9px;
                margin: 0 auto 20px;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                span {
                    font-size: 13px;
                    display: inline-block;
                    width: 74px;
                    height: 70px;
                    background: #fff url('../../../assets/images/import/process-point.png') no-repeat 15px -48px;
                    background-size: 60%;            
                    text-align: center;
                    color: #666;
                    padding-top: 65px;
                    &.active {
                        font-size: 16px;
                        color: #0bb1df;
                        font-weight: 700;
                        background: #fff url('../../../assets/images/import/process-point.png') no-repeat 10px 10px;
                        background-size: 70%;
                    }
                }
            }
            .equ-import-upload {
                height: 40px;
                margin: 100px auto 20px;
                text-align: center;
                .ivu-btn {
                    width: 110px;
                    border-radius: 15px;
                    font-size: 13px;
                    color: #FFF;
                }
            }
            .equ-import-download {
                text-align: center;
                height: 40px;
                margin: 0 auto;
                .ivu-icon {
                    font-size: 20px;
                    margin-left: 10px;
                }
            }
            .validate-box{
                width: 600px;
                height: 40px;
                margin: 0 auto 20px;
                li{
                    float: left;
                    width: 200px;
                    height: 40px;
                    line-height: 40px;            
                    list-style: none;
                    text-align: center;
                    &:before{
                        content:'';
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        margin-right: 10px;
                        border-radius: 50%;
                    }
                    &.all-validate:before{
                        background-color: #0BB1DF;
                    }
                    &.all-pass:before{
                        background-color: #55d43f;
                    }
                    &.all-error:before{
                        background-color: #e03d3e;
                    }
                    em{
                        margin: 0 20px;
                        font-size: 26px;
                        font-weight: 700;
                        font-style: normal;
                        color: #000;
                    }
                }
                
            }
            .submit-btn{
                display: block;
                width: 120px;
                margin: 30px auto;
            }
        }
    }
}
</style>