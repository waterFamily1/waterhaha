<template>
    <div class="related-data">
        <!-- 相关资料 -->
        <div class="attach-btns" v-show="isEdit">
            <Button @click="del">删除</Button>
            <!-- <Upload
                class="upload-demo"
                action="/zuul/base/api/files/upload"
                :on-success="successUpload">
                <Button class="c-btn-back">点击上传</Button>
            </Upload> -->

            <Upload 
                class="upload-demo"
                action="/zuul/base/api/files/upload"
                :on-success="successUpload"
                :limit="1"
                :before-upload="beforeUpload">
                <Button>点击上传</Button>
            </Upload>
        </div>
        <div class="common-table-c">
            <Table size="small" :columns="columns" :data="fileData" @on-selection-change="changeSelection" stripe>
            </Table>
        </div>
    </div>
</template>

<script>
import util from '@/libs/public_js'

function FItem(opt) {
    this.name = opt.name;
    this.type = opt.type;
    this.url = opt.url;
    this.tempID = util.guid();
    this.size = opt.size;
}

export default {
    name: 'equFile',
    props: {
        fileData: {
            type: Array
        },
        isEdit: {
            type: Boolean
        },
        isView:{
            type: Boolean,
            default: false            
        }
    },
    data() {
        let columns =  [
            { 
                type: 'selection', width: 60, align: 'center' 
            }, { 
                title: '文件名称', key: 'name', width: 200,
                render: (h,data)=>{
                    return h('div', [
                        h('span', data.row.name),
                        h('a', {
                            class: 'c-btn-text',
                            on:{
                                click:()=>{
                                    util.download('/base/api/files/download',{fileUrl:data.row.url})
                                }
                            }
                        }, '[下载]')
                    ])
                }
            }, { 
                title: '文件编号', key: 'code', align: 'center'
            }, { 
                title: '文件类型', key: 'type' , width: 120
            }, {
                title: '文件大小',
                key: 'size',
                width: 120,
                render: (h, data) => {
                    return h('span', {
                            props: {
                                type: 'text',
                                size: 'small'
                            },
                            on: {
                                click: () => {}
                            }
                        },
                        (data.row.size/1000/1024).toFixed(2) + 'M'
                    );
                }
            }
        ];
        return {
            selectedIds: [],
            fileItem: {
                name: '',
                type: '',
                url: '',
                size: ''
            },
            uploadSize: '',
            columns: this.isView ? columns.slice(1) : columns
        }
    },
    methods: {
        changeSelection(data) {
            this.selectedIds = data
        },
        del() {
            var _self = this;
            if (this.selectedIds.length)
                this.$Modal.confirm({
                    title: '删除文件',
                    content: '<p>您确定要删除吗？</p>',
                    onOk: () => {
                        var selected = this.selectedIds,
                            fileData = this.fileData;
                        for (var i = 0, len = selected.length; i < len; i++) {
                            innerLoop: for (
                                var j = 0, jlen = fileData.length;
                                j < jlen;
                                j++
                            ) {
                                if (
                                    selected[i].id == fileData[j].id ||
                                    selected[i].tempID == fileData[j].tempID
                                ) {
                                    _self.$emit(
                                        'delFileItem',
                                        selected[i].id || selected[i].tempID
                                    );
                                    break innerLoop;
                                }
                            }
                        }
                    }
                });
            else
                this.$Notice.warning({
                    title: '请选择',
                    desc: '请至少选择一个附件'
                });
        },
        beforeUpload(file) {
            const isLt20M = file.size / 1024 / 1024 < 20;
            if (!isLt20M) {
                this.$Message.error("上传文件大小不能超过 20MB!");
            }
            // this.$refs.upload.clearFiles();
            return isLt20M;
        },
        successUpload(res, file) {
            // this.uploadName = file.name;
            this.uploadSize = Math.round(file.size / 1024) + "KB";
            this.fileItem.url = res.fullPath
            this.fileItem.size = file.size
            this.fileItem.name = file.name
            console.log(this.fileItem)
            
            this.$emit('addFileItem', new FItem(this.fileItem));
            console.log('上传成功')
        }
    }
}
</script>

<style lang="less" scoped>
.related-data {
    .attach-btns {
        margin-bottom: 15px;
        .ivu-btn {
            height: auto;
            color: #fff;
            background-color: #576374;
            border: none;
            padding: 4px 12px;
            font-size: 12px;
            margin-right: 5px;
        }
        .upload-demo {
            display: inline-block;
        }
    }
}
/deep/.ivu-upload-list {
    display: none;
}
</style>