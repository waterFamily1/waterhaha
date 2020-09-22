<template>
    <div class="document-box" :style="{height: height+'px'}">
        <div class="c-tree-left">
            <div class="c-plain-bg-h">
                <h3>文档中心</h3>  
            </div>
            <div class="serach-box">
                <Input v-model="value" placeholder="输入文档目录以检索" style="width: 100%" />
            </div>
        </div>
        <div class="c-tree-right">
            <div class="c-main-border">
               <div></div>
               <div class="c-left-border-blue">
                    <Form  label-position="right" :label-width="100" inline style="display:inline-block">
                        <FormItem label="关键字：">
                            <Input placeholder="文档名称/文档标签" style="width:200px" size="small"></Input>
                        </FormItem>
                        <FormItem label="上传时间：">
                           <DatePicker type="date" placeholder="开始日期" style="width: 120px" size="small"></DatePicker> -
                           <DatePicker type="daterange" placement="bottom-end" placeholder="结束日期" style="width: 120px" size="small"></DatePicker>
                        </FormItem>
                    </Form>
                    <div class="action-btn">
                        <button>搜索</button>
                        <button class="reset">重置</button>
                    </div>
               </div>
               <div class="c-top-border-gray">
                   <div class="c-table-top-btns">
                        <button>下载</button>
                        <button>上传</button>
                        <button>移动</button>
                        <button>删除</button>
                   </div>
                    <Table stripe :columns="tableList" size="small">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                            <Button class="action" size="small">查看</Button>
                        </template>
                    </Table>
                    <Page :total="100" show-elevator class="page" size="small" />
               </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'documentManage',
    data (){
        return {
            height:'',
            value:'',
             tableList: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'center'
                },
                {
                    title: '文档名称',
                    key: 'name'
                },
                {
                    title: '文档路径',
                    key: 'path'
                },
                {
                    title: '文档标签',
                    key: 'tags'
                },
                {
                    title: '文档大小',
                    key: 'small'
                },
                {
                    title: '上传人员',
                    key: 'person'
                },
                {
                    title: '上传时间',
                    key: 'time'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
        }
    },

    methods:{

    },
     mounted() {
        this.height = document.body.clientHeight-46
    },
}
</script>
<style lang="less" scoped>
.document-box{
    display: flex;
    min-height: 100%;
    .c-tree-left{
        width: 350px;
        background-color: #FFF;
        border-top: 3px solid #f0f0f0;
        .c-plain-bg-h{
            border-bottom: 1px solid #f0f0f0;
            height: 50px;
            padding: 10px 0 10px 10px;
            h3{
                font-size: 14px;
            } 
        }
        .serach-box{
            padding: 2px;
            /deep/.ivu-input{
                height: 28px;
                line-height: 28px;
                padding: 0 24px 0 8px;
                font-size: 13px;
                outline: none;
                box-sizing: border-box;
                color: #495060;
                background-color: transparent;
                position: relative;
                cursor: pointer;
            }
        }
    }
    .c-tree-right{
        flex: 1;
        .c-main-border{
            border: 5px solid #f0f0f0;
            min-height: 100%;
            width: 100%;
            background: #fff;
            .c-left-border-blue{
                border-radius: 3px;
                padding: 5px;
                font-size: 13px;
                /deep/.ivu-form .ivu-form-item-label{
                    font-size: 13px;
                }
                .action-btn{
                    float: right;
                    margin-top: 4px;
                    button{
                        background: #4b7efe;
                        font-size: 12px;
                        padding: 4px 12px;
                        color: #fff;
                        border: 0;
                        border-radius: 3px;
                        margin: 0 5px;
                    }
                    .reset{
                        background: #495566;
                    }
                }
            }
            .c-top-border-gray{
                border-top: 5px solid #f0f0f0;
                padding: 10px;
                .c-table-top-btns{
                    height: 36px;
                    border-bottom: 1px solid #EEE;
                    button{
                        background: #576374;
                        font-size: 12px;
                        padding: 4px 12px;
                        color: #fff;
                        border: 0;
                        border-radius: 3px;
                        margin: 0 5px;
                    }
                }
                .page{
                    text-align: right;
                    margin-top: 20px;
                }
            }
        }
    }
}
</style>