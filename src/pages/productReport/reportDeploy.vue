<template>
    <div class="deploy-box" :style="{height: height+'px'}">
        <div class="deploy-main">
            <div class="deploy-left">
                <div class="left-box">
                    <AutoComplete
                        v-model="formName"
                        :data="formData"
                        :clearable="true"
                        @on-search="handleSearch"
                        placeholder="输入报表名称以检索"
                        size="small">
                    </AutoComplete>
                    <div class="tree-box">
                        <Tree :data="treeData" :render="renderContent" @on-select-change="selectNode"></Tree>
                    </div>
                </div>
            </div>
            <div class="deploy-right">
                <div v-if="template">
                    <div class="right-title">
                        <h3>报表模板</h3>
                        <div class="btns-right">
                            <Button type="primary" size="small" @click="templateSave('formValidate')">保存</Button>
                             <Button type="primary" size="small" @click="preview()">预览</Button>
                        </div>
                    </div>
                    <div class="right-form">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                            <FormItem label="报表模板名称" prop="name">
                                <Input v-model="formValidate.name" style="width: 160px;" size="small"></Input>
                            </FormItem>
                            <FormItem label="报表类型" prop="type">
                                <Select v-model="formValidate.type" style="width: 160px;" size="small">
                                    <Option value="D">日报</Option>
                                    <Option value='M'>月报</Option>
                                </Select>
                            </FormItem>
                        </Form>
                    </div>
                    <h3 class="c-gray-bg-h" style="margin: 0px 10px; text-indent: 10px;">报表数据源</h3>
                    <div class="right-btn">
                        <Button size="small" @click="addData()">新增</Button>
                    </div>
                    <Table size="small" :columns="columns" :data="data">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <Button  size="small" @click="tableRemove(index)" style="color:rgb(75, 126, 254);border:0;font-size:13px">删除</Button>
                        </template>
                    </Table>
                </div>
                <div v-if="catalog">
                    <div class="right-title">
                        <h3>报表目录</h3>
                        <div class="btns-right">
                            <Button type="primary" size="small" @click="logSave('formValidate')">保存</Button>
                        </div>
                    </div>
                    <div class="right-form">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                            <FormItem label="目录名称" prop="logName">
                                <Input v-model="formValidate.logName" style="width: 160px;" placeholder="目录名称" size="small"></Input>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
        <Modal v-model="modal" width="600" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">选择测点</span>
            </p>
            <div>
                <div class="key-item">
                    <label>关键字：</label>
                    <Input  placeholder="输入测点名称以检索" size="small" style="width: 150px" />
                </div>
                <div class="key-item" style="margin-left:4px">
                    <label>区域位置：</label>
                    <!-- <Select v-model="tissue" style="width:160px" size="small">
                        <Option v-for="item in tissueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select> -->
                </div>
                <div class="search-btn">
                    <Button size="small">搜索</Button>
                    <Button size="small" class="reset">重置</Button>
                </div>
                    
            </div>
            <div class="tabel-num">
                    已选择<strong>{{ selectedData.length }}</strong>个
                    <a href="" @click="handleClearSelect(false)">[清空]</a>
                </div>
                    <div class="model-table">
                <Table size="small" ref="selection" :columns="modelColumns" :data="modelData"
                    @on-select="handleSelect"
                    @on-select-cancel="handleSelectCancel"
                    @on-select-all="handleSelectAll"
                    @on-select-all-cancel="handleSelectAllCancel">
                </Table>
                    <Page :total="100" show-elevator size="small" class="page" style="text-align:right;margin-top:20px"  />
                    <div class="action-btn">
                    <span>取消</span>
                    <span style="background: #4b7efe;">确定</span>
                    </div>
            </div>
            <div slot="footer" >
                <!-- <Button type="primary"  long  @click="save" style="font-size:12px">保存为新模版</Button> -->
            </div>
        </Modal>
    </div>
</template>
<script>
import { getTree,newCate,deleteCate,editCate,deleteTemp} from '@api/productReport/reportSetting';
export default {
    name: 'reportDeploy',
    data() {
        return {
            height: '',
            formName: '',
            formData: [],
            treeData: [
                
            ],
            formValidate: {
                name: '',
                type: 'D',
                logName:''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入报表模板名称', trigger: 'blur' }
                ],
                logName: [
                    { required: true, message: '请输入目录名称', trigger: 'blur' }
                ]
            },
            columns: [
                {
                    title: '分组名称',
                    key: 'name',
                    render: (h, params) => {
                        let that = this
                        return h('div', [
                            h('Input', {
                                props: {
                                    size:'small', 
                                    value : that.data[params.index].name
                                },
                                style:{
                                    color:'blue',
                                    cursor: 'pointer',
                                    marginRight: '5px',
                                    fontSize:'18px'
                                },
                                on: {
                                    input: function (event) {
                                    //   console.log(that.mpointList)
                                    //   that.mpointList[params.index].groupName = event
                                    }
                                }
                            })
                        ]);
                    }
                }, {
                    title: '分组序号',
                    key: 'number',
                    width:'110',
                    render: (h, params) => {
                        let that = this
                        return h('div', [
                            h('Input', {
                                props: {
                                    size:'small', 
                                    value : that.data[params.index].number
                                },
                                style:{
                                    color:'blue',
                                    cursor: 'pointer',
                                    marginRight: '5px',
                                    fontSize:'18px'
                                },
                                on: {
                                    input: function (event) {
                                    //   console.log(that.mpointList)
                                    //   that.mpointList[params.index].groupName = event
                                    }
                                }
                            })
                        ]);
                    }
                }, {
                    title: '测点',
                    key: 'station'
                }, {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            data: [],
            template:false,
            catalog:false,
            curSiteId:'',
            modal:false
            ,
            modelColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '测点',
                    key: 'name'
                },
                {
                    title: '部门',
                    key: 'department'
                },
                {
                    title: '所属组织',
                    key: 'tissue'
                }
            ],
            modelData: [
                {
                    name: '吴镕譞0',
                    department: '技术部0',
                    tissue: '易烊千玺老婆团'
                },
                {
                    name: '吴镕譞1',
                    department: '技术部1',
                    tissue: '易烊千玺老婆团'
                },
                {
                    name: '吴镕譞2',
                    department: '技术部2',
                    tissue: '易烊千玺老婆团'
                }
            ],
            selectedData: [],
            keyword:'',
            catEdit:false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getOrg()
    },
    methods: {
        templateSave(){

        },
        handleSearch (value) {
            this.formData = !value ? [] : [
                value,
                value + value,
                value + value + value
            ];
        },
        tableRemove(index) {
            this.data.splice(index,1)
        },
        getOrg(){
            getTree().then(res=>{
                console.log(res)
                 let trees = res.data
                let tree=[]
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = true
                    tree.push(trees[i])
                }
                this.treeData=this.drawTree(tree)
            })
        },
        drawTree(treeItem){
            let  parent=treeItem.filter(item => item.parentId == 0)
            treeItem.forEach(element => {
                 if (element.parentId == 0) return
                 this.draw(element,parent)
            });
            return parent;
        },
        draw(item,arr){
            for(var i=0;i<arr.length;i++) {
                if(item.parentId==arr[i].id){
                    if( !(arr[i].children &&  arr[i].children.length>0)){
                        arr[i].children = []
                    }
                    arr[i].children.push(item)

                }else if(arr[i].children && arr[i].children.length>0){
                    this.draw(item,arr[i].children)
                }
            }
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
                    h('Icon', {
                        props: {
                            // type: 'ios-folder-outline',
                            type: data.id.includes('folder')?'ios-folder-outline':'ios-paper-outline',
                            color:"#2d8cf0",
                        },
                        style: {
                            marginRight: '8px',
                            display : data.id.indexOf('_')!=-1? 'inline-block':'none'
                        }
                    }),
                    h('span', data.title)
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
                            size: 'small'
                        }),
                        style: {
                            marginRight: '4px',
                            display: (data.id.indexOf('_')!=-1)?'none':(data.is_show ? 'inline-block' : 'none'),
                            fontSize:'12px'
                        },
                        on: {
                            click: (e) => { 
                                e.stopPropagation()
                                this.createCat(data) 
                            }
                        }
                    },'新增目录'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            marginRight: '4px',
                            display: ((data.type == 1)||(data.id.indexOf('template')!=-1))?'none':(data.is_show ? 'inline-block' : 'none'),
                            fontSize:'12px'
                        },
                        on: {
                            click: (e) => { 
                                e.stopPropagation() 
                                this.createTemp(data)
                            }
                        }
                    },'新增模板'),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            type: 'primary',
                            size: 'small'
                        }),
                        style: {
                            marginRight: '4px',
                            display: (data.id.indexOf('_')==-1)?'none':(data.is_show ? 'inline-block' : 'none'),
                            fontSize:'12px'
                        },
                        on: {
                            click: (e) => {
                               e.stopPropagation()
                               this.deleteItem(data) 
                            }
                        }
                    },'删除')
                    
                ])
            ]);
        },
        createCat(data){
           console.log(data)
           this.template = false
           this.catalog = true
           this.curSiteId = data.id
           this.catEdit = true
        },
        logSave(name){
            
            this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.catEdit){
                            let data= {
                                fname: this.formValidate.logName ,
                                siteid: this.curSiteId,
                            }
                            newCate(data).then(res=>{
                                console.log(res)
                                if(res.data.id){
                                    this.getOrg()
                                    this.$Message.success('数据保存成功');
                                    this.catEdit = false
                                }
                            })
                        }else{
                            let data= {
                                fname: this.formValidate.logName ,
                                id: this.curSiteId,
                            }
                            editCate(data).then(res=>{
                                console.log(res)
                                if(res.data.id){
                                    this.getOrg()
                                    this.$Message.success('数据保存成功');
                                    this.catEdit = false
                                }
                            })
                        }
                       
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            console.log(data)
        
        },
        createTemp(){
           this.template = true
           this.catalog = false
        },
        deleteItem(data){
            console.log(data)
            this.$Modal.confirm({
                title: '提示',
                content: '<p>你确定要删除吗？</p>',
                onOk: () => {
                    if(data.id.includes('folder')){
                        deleteCate(data.id).then(res=>{
                            console.log(res)
                            if(res.data.count){
                                this.$Message.success('删除成功');
                                this.getOrg()
                            }
                        })
                    }else{
                        deleteTemp(data.id).then(res=>{
                            console.log(res)
                            if(res.data.count){
                                this.$Message.success('删除成功');
                                this.getOrg()
                            }
                        })
                    }
                   
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                }
            });
            
            
        },
        templateSave(name){
            let data = {
                rname: "模板1",
                siteid: "5",
                temptype: "M",
                mpoints:[
                    {
                        groupname: "group1",
                        groupno: "3",
                        id: 76,
                        mpointid: 76,
                        mpointname: "11111111",
                    }
                ]
            }
            this.$refs[name].validate((valid) => {
                if (valid) {
                    
                } else {
                    this.$Message.error('Fail!');
                }
            })
            console.log(data)
        },
        preview(){

        },
         // 清空所有已选项
        handleClearSelect (status) {
            this.selectedData = [];
            this.$refs.selection.selectAll(status);
        },
        // 选中一项，将数据添加至已选项中
        handleSelect (selection, row) {
            this.selectedData.push(row);
        },
        // 取消选中一项，将取消的数据从已选项中删除
        handleSelectCancel (selection, row) {
            const index = this.selectedData.findIndex(item => item.name === row.name);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            selection.forEach(item => {
                if (this.selectedData.findIndex(i => i.name === item.name) < 0) {
                    this.selectedData.push(item);
                }
            });
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            const selection = this.modelData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.name === item.name);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        },
        selectNode(node){
            console.log(node)
            this.curSiteId = node[0].id
            if(node[0].id.includes('folder')){
                this.template = false
                this.catalog = true
                this.formValidate.logName = node[0].name
            }else if(node[0].id.includes('template')){
                this.template = true
                this.catalog = false
            }
        },
        addData(){
            this.data.push({
                name:'未命名分组1',
                number:'1',

            })
        }
    }
}
</script>
<style lang="less" scoped>
.deploy-box {
    margin: 5px;
    background: #fff;
    .deploy-main {
        width: 100%;
        height: 100%;
        display: flex;
        .deploy-left {
            width: 500px;
            height: 100%;
            .left-box {
                width: 100%;
                padding-right:20px;
                /deep/.ivu-select {
                    padding: 3px;
                }
                .tree-box {
                    border-top: 1px solid rgb(230, 230, 230);
                    width: 100%;
                }
                /deep/.ivu-tree-title {
                    width: 100%;
                }
            }
        }
        .deploy-right {
            width: 100%;
            border-left: 5px solid #f0f0f0;
            .right-title {
                border-bottom: 1px solid #f0f0f0;
                height: 50px;
                padding: 10px 0 10px 10px;
                h3 {
                    display: inline-block;
                    font-size: 14px;
                    line-height: 30px;
                }
                .btns-right {
                    float: right;
                    margin-top: 2px;
                    /deep/.ivu-btn-small {
                        font-size: 13px;
                        margin-right: 10px;
                        padding: 1px 20px;
                    }
                }
            }
            .right-form {
                margin-top: 10px;
                /deep/.ivu-form-item {
                    width: 45%;
                    display: inline-block;
                }
            }
            .c-gray-bg-h {
                background-color: #f4f4f4;
                height: 30px;
                line-height: 30px;
                text-indent: 20px;
                font-weight: 100;
                font-size: 13px;
            }
            .right-btn {
                margin: 10px 0px 0px 10px;
                border-bottom: 1px solid rgb(239, 239, 239);
                padding-bottom: 10px;
                /deep/.ivu-btn {
                    background-color: #576374;
                    border: none;
                    color: #fff;
                    font-size: 13px;
                    padding: 4px 12px;
                    height: auto;
                }
            }
        }
    }
}
/deep/.ivu-tree li ul{
    font-size:13px
}
.model-table{
    margin-top: 20px;
    .btn-group{
        margin-top: 20px;
        text-align:center;
        span{
            display: inline-block;
            min-width: 130px;
            margin: 0 15px;
            padding: 4px 12px;
            font-size: 12px;
            background: #c8c8c8;
            color: #fff;
            border-radius: 3px;
        }
    }
}
.key-item{
    display: inline-block;
    label{
        font-size: 12px;
    }
}
.search-btn{
    display: inline-block;
    margin-left:20px;
    /deep/.ivu-btn {
        height: auto;
        font-size: 12px;
        background: #838A95;
        color: #fff;
        margin-right: 10px;
        border-radius: 1px;
        padding: 4px 12px;
    }
    .reset {
        background: #aaafb8;
    }
}
.tabel-num {
    text-align: right;
    font-size: 12px;
    color: #999;
    line-height: 30px;
    margin-top: 10px;
    /deep/.ivu-btn {
        font-size: 12px;
        background: #57a3f3;
        color: #fff;
    }
}
.action-btn{
    margin-top: 20px;
    text-align:center;
    span{
        display: inline-block;
        min-width: 130px;
        margin: 0 15px;
        padding: 4px 12px;
        font-size: 12px;
        background: #c8c8c8;
        color: #fff;
        border-radius: 3px;
    }
}
</style>