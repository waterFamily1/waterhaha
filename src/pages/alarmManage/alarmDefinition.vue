<template>
    <div class="defin-wrap" :style="{height: height+'px'}">
        <div class="defin-search">
            <Form :model="definList" label-position="right" :label-width="100">
                <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
                    <div class="search-main">
                        <div class="form-item">
                            <FormItem label="关键字:">
                                <Input v-model="definList.name" placeholder="编号/报警名称" style="width: 200px;"></Input>
                            </FormItem>
                        </div>
                        <div class="form-item">
                             <label style="display:inline-block;width:120px;text-align:right">区域位置：</label> 
                             <TreeSelect size="small" v-model="definList.area" multiple :data="treeData" v-width="200" />
                        </div>
                        <div class="form-search-btn">
                            <a href="javascript:;" @click="higherSearch()">
                                <Icon type="ios-arrow-down" v-if="searchShow" />
                                <Icon type="ios-arrow-up" v-else />
                                高级搜索
                            </a>
                            <Button type="primary" @click="search()">搜索</Button>
                            <Button type="primary" class="reset" @click="reset()">重置</Button>
                        </div>
                    </div>
                    <div class="c-adv-search">
                        <div class="c-adv-search-row">
                            <div class="form-item">
                                <FormItem label="确认方法:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="confirmWay">
                                            <TagSelectOption name="Auto">自动</TagSelectOption>
                                            <TagSelectOption name="AutoOrManual">自动或者人工</TagSelectOption>
                                            <TagSelectOption name="Manual">人工</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="报警等级:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="alarmLevel">
                                            <TagSelectOption name="1">1级</TagSelectOption>
                                            <TagSelectOption name="2">2级</TagSelectOption>
                                            <TagSelectOption name="3">3级</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="使用状态:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="useState">
                                            <TagSelectOption name="ON">启用</TagSelectOption>
                                            <TagSelectOption name="OFF">停用</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
        <div class="defin-content">
            <div class="c-table-top-btns">
                <Button @click="addHandle()">新增</Button>
                <Button @click="deleteHandle()">删除</Button>
                <Button @click="startHandle()">启用</Button>
                <Button @click="disableHandle()">停用</Button>
                <Button @click="leadHandle()">导入</Button>
            </div>
            <Table stripe :columns="tableList" :data="tableData"
            @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="text" size="small" style="margin-right: 5px;color:rgb(75, 126, 254);font-size:12px" @click="checkHandle(row)">查看</Button>
                    <Button type="text" size="small" style="color:rgb(75, 126, 254);font-size:12px" @click="editHandle(row)">编辑</Button>
                </template>
            </Table>
            <Page :total="total" show-elevator show-total class="page" />
        </div>
    </div>
</template>
<script>
import { getTree,getList,deletDefine,changeState} from '@/api/alarm/definition'
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name: 'alarmDefinition',
    data() {
        return {
            height: '',
            searchShow: false,
            definList: {
                name: '',
                area: []
            },
            treeData: [],
            confirmWay: [],
            alarmLevel: [],
            useState: [],
            tableList: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '报警名称',
                    key: 'alarmName'
                },
                {
                    title: '确认方法',
                    key: 'disarmMethod',
                    render: (h, params) => {
                        let a = params.row.disarmMethod
                        const text = a == 'Auto'?'自动':(a=='AutoOrManual'?'自动或者人工':'人工')
                        return h('span', {
                        }, text);
                    }
                },
                {
                    title: '报警等级',
                    key: 'alarmLevel',
                    
                     render: (h, params) => {
                        let a = params.row.alarmLevel
                        const color= a==1?'#F5423F':(a==2?'#F9A10F':'#739AFB')
                        return h('span', {
                            style:{
                                color:color
                            }
                        }, a+'级');
                        
                    }
                },
                {
                    title: '使用状态',
                    key: 'enabledStatus',
                    render: (h, params) => {
                        let a = params.row.enabledStatus
                        const text = a == 'ON'?'启用':'停用'
                        return h('span', {
                        }, text);
                    }
                },
                {
                    title: '最近报警时间',
                    key: 'alarmTriggerTime',
                     render: (h, params) => {
                        let that = this
                        const text = params.row.alarmTriggerTime
                        if(text){
                            return h('span', {}, formatTime(text, 'HH:mm:ss yyyy-MM-dd'));
                        }else{
                            return h('span', {}, '');
                        }
                        
                    }
                },
                {
                    title: '区域位置',
                    key: 'siteName'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            tableData: [],
            page:1,
            total:0,
            selectedData:[]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getRegional()
        this.getdefList()
    },
    methods: {
         getRegional() {
            getTree().then(res => {
                console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].expand = true
                    treeItem.push(trees[i])
                }
                console.log(treeItem)
                this.treeData = createTree(treeItem,0)
            }).catch(err => {
                // 异常情况
            })
        },
        getdefList(){
            console.log('getList')
            let way = this.confirmWay.length!=0?this.confirmWay.join(','):''
            let level = this.alarmLevel.length!=0?this.alarmLevel.join(','):''
            let state = this.useState.length!=0?this.useState.join(','):''
            let siteId = this.definList.area.length!=0?this.definList.area.join(','):''
            getList(siteId,this.definList.name,state,way,level,this.page).then(res=>{
                console.log(res)
                this.tableData = res.data.items
                this.total = res.data.total
            })
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        addHandle() {
            this.$router.push({
                path:'alarm/definAdd'
            })
        },
        deleteHandle() {
           console.log(this.selectedData)
           if(this.selectedData.length==0){
               this.$Message.warning('请选中后删除');
               return
           }
           let arr = []
           this.selectedData.map(ele=>{
             arr.push(ele.id)
           })
           deletDefine(arr.join(',')).then(res=>{
               console.log(res)
               if(res.data){
                   this.$Message.success('数据删除成功');
                    this.getdefList()
               }
           })
        },
        startHandle() {
            if(this.selectedData.length==0){
               this.$Message.warning('请选中后启用');
               return
           }
           let arr = []
           this.selectedData.map(ele=>{
             arr.push(ele.id)
           })
           let data = {
               ids:arr,
               status: "ON"
           }
           changeState(data).then(res=>{
              if(res.data.count){
                  this.$Message.success('操作成功');
                    this.getdefList()
              }
           })
        },
        disableHandle() {
              if(this.selectedData.length==0){
               this.$Message.warning('请选中后停用');
               return
           }
           let arr = []
           this.selectedData.map(ele=>{
             arr.push(ele.id)
           })
           let data = {
               ids:arr,
               status: "OFF"
           }
           changeState(data).then(res=>{
              if(res.data.count){
                  this.$Message.success('操作成功');
                    this.getdefList()
              }
           })
        },
        leadHandle() {
            this.$router.push({
                path:'/other/areaUpload',
                query: {
                    uploadName: '用户导入'
                }
            })
        },
        editHandle(row) {
            console.log("sff")
            //编辑
            this.$router.push({
                path:'alarm/definEdit',
                query:{
                    id : row.id
                }
            })
        },
        checkHandle(row) {

            //查看
            this.$router.push({
                path:'alarm/definCheck',
                query:{
                    id : row.id
                }
            })
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
            const index = this.selectedData.findIndex(item => item.mpointId === row.mpointId);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            // selection.forEach(item => {
            //     if (this.selectedData.findIndex(i => i.mpointId === item.mpointId) < 0) {
            //         this.selectedData.push(item);
            //     }
            // });
            this.selectedData=selection
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            console.log("取消全选")
            const selection = this.modelData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.mpointId === item.mpointId);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        },
        search(){
            this.getdefList()
        },
        reset(){
            this.definList.name = ''
            this.confirmWay = []
            this.alarmLevel=[]
            this.useState =[]
            this.definList.area = []
            this.getdefList()
        }
    }
}
</script>
<style lang="less" scoped>
.defin-wrap {
    margin: 5px;
    background: #fff;
    .defin-search {
        .search-box {
            padding: 5px;
            height: 43px;
            .search-main {
                height: 33px;
                overflow: hidden;
                .form-item {
                    min-height: 33px;
                    display: inline-block;
                    /deep/.ivu-input {
                        height: 28px;
                        font-size: 13px;
                    }
                }
                .form-search-btn {
                    margin-top: 4px;
                    float: right;
                    a {
                        margin: 0 10px 0 0;
                        color: #576374;
                        font-size: 12px;
                    }
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
            .c-adv-search {
                margin-top: 10px;
                padding-top: 5px;
                border-top: 1px solid #ececec;
                .c-adv-search-row {
                    margin: 5px 0;
                    /deep/.ivu-input-wrapper {
                        width: 150px;
                        /deep/.ivu-input {
                            height: 28px;
                            font-size: 13px;
                        }
                    }
                    .cmp-tab {
                        display: inline-block;
                        margin-left: 10px;
                        /deep/.ivu-tag-text {
                            font-size: 14px;
                        }
                    }
                    /deep/.ivu-form-item {
                        margin-bottom: 5px;
                    }
                }
                /deep/.ivu-form-item-content {
                    line-height: 6px;
                }
            }
        }
        .searchTrans {
            height: 180px;
            overflow: hidden;
            transition: 0.5s height;
        }
        .searchPack {
            height: 43px;
            overflow: hidden;
            transition: 0.5s height;
        }
    }
    .defin-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            button {
                background-color: #576374;
                border: none;
                min-width: 50px;
                height: 26px;
                color: #fff;
                margin-right: 10px;
                font-size: 13px;
            }
        }
        .page{
            text-align: right;
            margin-top: 10px;
        }
    }
}
</style>