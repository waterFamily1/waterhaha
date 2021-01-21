<template>
    <div class="document-box" :style="{height: height+'px'}">
        <div class="c-tree-left">
            <div class="c-plain-bg-h">
                <h3>文档中心</h3>  
            </div>
            <div class="serach-box">
                <Input v-model="value" placeholder="输入文档目录以检索" style="width: 100%" />
            </div>
            <div class="z-tree">
                <Tree :data="docList" :render="renderContent" @on-select-change="selectNode"></Tree>
            </div>
        </div>
        <div class="c-tree-right">
            <div class="c-main-border">
               <div></div>
               <div class="c-left-border-blue">
                    <Form  label-position="right" :label-width="100" inline style="display:inline-block">
                        <FormItem label="关键字：">
                            <Input placeholder="文档名称/文档标签" style="width:200px" size="small" v-model="kword"></Input>
                        </FormItem>
                        <FormItem label="上传时间：">
                            <DatePicker type="date" :options="startDate" v-model="startTime" @on-change="startTimeChange"  format="yyyy-MM-dd"  placeholder="开始时间" style="width: 120px" size="small"></DatePicker> -
                            <DatePicker type="date" :options="endDate"  v-model="endTime" @on-change="endTimeChange" format="yyyy-MM-dd" placeholder="结束时间" style="width: 120px" size="small"></DatePicker>
                        </FormItem>
                    </Form>
                    <div class="action-btn">
                        <button @click="search()">搜索</button>
                        <button class="reset" @click="reset()">重置</button>
                    </div>
               </div>
               <div class="c-top-border-gray">
                   <div class="c-table-top-btns">
                        <button>下载</button>
                        <button>上传</button>
                        <button>移动</button>
                        <button>删除</button>
                    </div>
                    <Table stripe :columns="tableList" size="small" :data="tableData">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button class="action" type="text" size="small" style="margin-right: 5px;font-size:13px;color:rgb(75, 126, 254)">编辑</Button>
                            <Button class="action" type="text" size="small" style="margin-right: 5px;font-size:13px;color:rgb(75, 126, 254)">收藏</Button>
                            <Button class="action" type="text" size="small" style="color:rgb(75, 126, 254);font-size:13px">推荐</Button>
                        </template>
                    </Table>
                    <Page :total="total" show-elevator class="page" size="small" />
               </div>
            </div>
        </div>
    </div>
</template>
<script>
import { labelTree,orgMethod,documentTree,tableList} from '@api/knowledgeManage/document';
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name:'documentManage',
    data (){
        return {
            height:'',
            value:'',
             tableList: [
                {
                    type: 'selection',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '文档名称',
                    key: 'name',
                    width:120,
                    ellipsis: true,
                    render: (h, params) => {
                        let text = params.row.name+"."+params.row.type
                        return h('div',{},text);
                    }
                },
                {
                    title: '文档路径',
                    key: 'idPathName',
                    ellipsis: true,
                },
                {
                    title: '文档标签',
                    key: 'labelName'
                },
                {
                    title: '文档大小',
                    key: 'size',
                    render: (h, params) => {
                        let that = this
                        const text = params.row.size
                        return h('span', {}, (text/1048576).toFixed(2)+'M');
                    }
                },
                {
                    title: '上传人员',
                    key: 'createUserName'
                },
                {
                    title: '上传时间',
                    key: 'createDate',
                    // 
                     render: (h, params) => {
                        let that = this
                        const text = params.row.createDate
                        return h('span', {}, formatTime(text, 'HH:mm:ss yyyy-MM-dd'));
                    }

                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 200,
                    align: 'center'
                }
            ],
            docList:[],
            orgList:[],
            data1:[],
            currentNode:{},
            page:1,
            processId:'',
            directoryId:'',
            startTime:'',
            endTime:'',
            start:'',
            end:'',
            startDate: {
                disabledDate (date) {
                    return date && date.valueOf() >= Date.now();
                }
            },
            endDate: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 8*86400000;
                }
            },
            tableData:[],
            total:0,
            kword:''
        }
    },

    methods:{
        endTimeChange(date){
            this.endTime = date
            this.end = date
        },
        startTimeChange(date){
            this.startTime = date
            this.start = this.getYesterday(date)
            console.log(this.startTime)
        },
          // 获取前一天
        getYesterday(date) {
            var date = date.split('-'),
            today = new Date().setFullYear(+date[0], +date[1]-1, +date[2]), 
            yesterday = new Date(today - 24 * 60 * 60 * 1000);
            var y = yesterday.getFullYear();
            var m = yesterday.getMonth() + 1;
            var d = yesterday.getDate();
            if(m<10){
            m = '0'+m;   
            }
            if(d<10){
                d = '0'+d; 
            }
        
            return y+'-'+m+'-'+d;  
        },
        search(){
            this.getList()
        },
        reset(){
            this.kword = ""
            this.startTime = ""
            this.start = ""
            this.end = ""
            this.endTime = ""
        },
        selectNode(node){
            console.log(node)
            
            this.currentNode = node[0]
            if(this.currentNode.type == 0){
               this.processId = node[0].id
            }else{
                this.directoryId = node[0].processId
            }
            this.getList()
        }, 
        getList(){
            let start = this.start?this.$moment(this.start).utc().format():''
            let end = this.end?this.$moment(this.end).utc().format():''
            // page,queryName,processId,directoryId,start,end
            tableList(this.page,this.kword,this.processId,this.directoryId,start,end).then(res=>{
                if(res.data.items){
                    this.tableData = res.data.items
                    this.total = res.data.total
                    this.processId = ""
                    this.directoryId = ""
                }
            })
        },
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                },
                on: {
                    //鼠标进入
                    'mouseenter': () => {
                        data.is_show = true;
                    },
                    //鼠标离开
                    'mouseleave': () => {
                        data.is_show = false;
                    }
                }
            }, [
                h('span', [
                    h('span', data.title),
                    h('span',{
                        style:{
                            color:'rgb(75, 126, 254)',
                            fontSize: '12px',
                            display:data.count==0?'none':'inline-block'
                        }
                    }, "("+data.count+")")
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size:'small'
                        }),
                        style: {
                            marginRight: '4px',
                            display:data.parentId!=0?'none':( data.is_show ? 'inline-block' : 'none'),
                             fontSize:'12px'
                        },
                        on: {
                            click: (e) => { 
                                 e.stopPropagation()
                                this.append(data) 
                            }
                        }
                    },'新建'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size:'small'
                        }),
                        style: {
                            marginRight: '4px',
                            display: data.is_show ? 'inline-block' : 'none',
                             fontSize:'12px'
                        },
                        on: {
                            click: (e) => { 
                                 e.stopPropagation()
                                this.editFun(data)
                             }
                        }
                    },'编辑'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size:'small'
                        }),
                        style: {
                            display: data.is_show ? 'inline-block' : 'none',
                             fontSize:'12px'
                        },
                        on: {
                            click: (e) => { 
                                 e.stopPropagation()
                                 this.remove(data) 
                            }
                        }
                    },'删除')
                ])
            ]);
        },
        getTree(){
           labelTree().then(res=>{
               console.log(res)
                if(res.data){
                    let treeItem = []
                    let trees = res.data
                    for(let i = 0; i < trees.length; i ++) {
                        trees[i].title = trees[i].name
                        trees[i].value = trees[i].id
                        // trees[i].expand = true
                        treeItem.push(trees[i])
                    }
                    this.baseData = treeItem
                    this.data1 = createTree(treeItem, 0)
                }
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
                this.orgList = createTree(treeItem, 0)
            }).catch(err=> {

            })
        },
        getDocTree(){
            documentTree().then(res=>{
                console.log(res)
                if(res.data){
                    let treeItem = []
                    let trees = res.data
                    for(let i = 0; i < trees.length; i ++) {
                        trees[i].title = trees[i].name
                        trees[i].value = trees[i].id
                        treeItem.push(trees[i])
                    }
                    this.docList = createTree(treeItem, 0)
                    console.log(this.docList)
                }
            })
        }
    },
     mounted() {
        this.height = document.body.clientHeight-46
        this.getOrg()
        this.getTree()
        this.getDocTree()
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
        .z-tree{
            padding-left: 10px;
            /deep/.ivu-icon{
                color: #4b7efe;
            }
            /deep/.ivu-tree-title{
                width: 93%;
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
                height: 43px;
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