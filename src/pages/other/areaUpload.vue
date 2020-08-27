<template>
    <div class="upload-box" :style="{height: height+'px'}">
        <div class="upload-tree">
            <div class="upload-title">
                <h3>{{ uploadName }}</h3>
                <Button @click="goBack()">返回</Button>
            </div>
            <div class="upload-content">
                <div class="import-mod-process import-mod-process-1"></div>
                <div class="import-mod-upload">
                    <Upload action="//jsonplaceholder.typicode.com/posts/"
                        :format="['xls','xlsx']">
                        <Button type="primary">文件上传</Button>
                    </Upload>
                </div>
                <div class="import-mod-download">
                    <a href="/uaa/api/excel/template?type=process" download="" style="color: rgb(75, 126, 254);">
                        导入模版下载 
                        <Icon type="ios-cloud-upload" size="20" style="color: #3399ff"></Icon>
                    </a>
                    <div style="margin-top: 20px; color: rgb(102, 102, 102);">(上传文件数量不超过500条)</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'areaUpload',
    data () {
        return {
            height: '',
            uploadName: ''
        }
    },
    created() {
        this.uploadName = this.$route.query.uploadName
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {
        goBack() {
            this.$router.go(-1)
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
            }
        }
        .upload-content {
            width: 100%;
            height: 100%;
            background: #fff;
            border-top: 5px solid #f0f0f0;
            padding: 10px;
            .import-mod-process-1 {
                background-position: 0 0 !important;
            }
            .import-mod-process {
                margin: 20px auto;
                width: 567px;
                height: 107px;
                background: url('../../assets/images/upload1.png') no-repeat 0 0;
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
}
</style>