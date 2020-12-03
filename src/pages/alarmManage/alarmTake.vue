<template>
    <div class="take-wrap" :style="{height: height+'px'}">
        <div class="take-search">
            <Form  label-position="right" :label-width="120">
                <div class="search-box" :class="{searchTrans:searchShow, searchPack:!searchShow}">
                    <div class="search-main">
                        <div class="form-item">
                            <label style="display:inline-block;width:120px;text-align:right">关键字：</label>
                            <Input size="small" v-model="keyword" placeholder="报警名称" style="width: 200px;"></Input>
                        </div>
                        <div class="form-item">
                             <label style="display:inline-block;width:120px;text-align:right">区域位置：</label> 
                             <TreeSelect size="small" v-model="area" multiple :data="treeData" v-width="200" />
                        </div>
                        <div class="form-search-btn">
                            <a href="javascript:;" @click="higherSearch()">
                                <Icon type="ios-arrow-down" v-if="searchShow" />
                                <Icon type="ios-arrow-up" v-else />
                                高级搜索
                            </a>
                            <button type="button" @click="search()">搜索</button>
                            <button type="button" class="reset" @click="reset()">重置</button>
                        </div>
                    </div>
                    <div class="c-adv-search">
                        <div class="c-adv-search-row">
                            <div class="form-item">
                                <FormItem label="接收方式:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="acceptWay">
                                            
                                            <TagSelectOption name="SysMsg">在线消息</TagSelectOption>
                                            <TagSelectOption name="SMS">短信</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="推送频率:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="pushFre" >
                                            <TagSelectOption :name="index+1" v-for="(item,index) in freList" :key="index">{{item}} </TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="推迟推送时间:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="pushTime">
                                            <TagSelectOption :name="index+1" v-for="(item,index) in timeList" :key="index">{{item}}</TagSelectOption>
                                        </TagSelect>
                                    </div>
                                </FormItem>
                            </div>
                            <div class="form-item">
                                <FormItem label="发生时间:">
                                    <div class="cmp-tab">
                                        <TagSelect v-model="happenTime">
                                            <TagSelectOption name="tag1">24小时</TagSelectOption>
                                            <TagSelectOption name="tag2">一周</TagSelectOption>
                                            <TagSelectOption name="tag3">一月</TagSelectOption>
                                        </TagSelect>
                                        <!-- <DatePicker class="item-picker" type="daterange" :options="options2" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker> -->
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
        <div class="c-top-border-gray">
            <div class="c-table-top-btns">
                <Button @click="addHandle()">新增</Button>
                <Button @click="selectHandle()">删除</Button>
            </div>
            <Table ref="selection" :columns="columns" :data="data" 
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel"
            ></Table>
            <Page :total="total" show-total show-elevator class="page" />
        </div>
    </div>
</template>
<script>
import { getTree,getList ,deleteSub} from '@/api/alarm/subscribe'
import createTree from '@/libs/public-util'
import {formatTime} from '@/libs/public'
export default {
    name: 'alarmTake',
    data() {
        return {
            height: '',
            searchShow: false,
            keyword:'',
            area:[],
            treeData: [],
            acceptWay: [],
            pushFre: [],
            pushTime: [],
            happenTime: [],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                }, {
                    title: '区域位置',
                    width:140,
                    key: 'siteName'
                }, {
                    title: '报警名称',
                    key: 'defineName'
                }, {
                    title: '接收对象',
                    key: 'userName'
                }, {
                    title: '接收方式',
                    key: 'subscribeMode',
                     render: (h, params) => {
                         let a = params.row.subscribeMode
                        const text = a.indexOf(',')!=-1?'短信,在线消息':(a=='SysMsg'?'在线消息':'短信')
                        return h('span', {
                        }, text);
                    }
                }, {
                    title: '推送频率',
                    key: 'pushFrequency',
                    render: (h, params) => {
                        let that = this
                        const text = Number(params.row.pushFrequency)-1
                        return h('span', {}, that.freList[text]);
                    }
                }, {
                    title: '延迟推送时间',
                    key: 'delayPushTime',
                    render: (h, params) => {
                        let that = this
                        const text = Number(params.row.delayPushTime)-1
                        return h('span', {}, that.timeList[text]);
                    }
                }, {
                    title: '创建人',
                    key: 'createUsername',
                    render: (h, params) => {
                        let that = this
                        const text = Number(params.row.delayPushTime)-1
                        return h('span', {}, that.timeList[text]);
                    }
                }, {
                    title: '创建时间',
                    key: 'createTime',
                    render: (h, params) => {
                        let that = this
                        const text = params.row.createTime
                        return h('span', {}, formatTime(text, 'HH:mm:ss yyyy-MM-dd'));
                    }
                }, {
                    title: '操作',
                    key: 'handle',
                    width: 150,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small',
                                },
                                style :{
                                    color:'rgb(75, 126, 254)',
                                    fontSize:'12px'
                                },
                                on: {
                                    click: () => { 
                                        this.checkHandle(params.row.id)
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                },
                                style :{
                                    color:'rgb(75, 126, 254)',
                                    fontSize:'12px'
                                },
                                on: {
                                    click: () => { 
                                        this.editHandle(params.row.id)
                                    }
                                }
                            }, '编辑')
                        ]);
                    }
                },
            ],
            data: [],
            page:1,
            total:0,
            freList:['5分钟','10分钟','15分钟','30分钟','1小时','2小时','12小时','24小时','仅推送1次'],
            timeList :['5分钟','10分钟','15分钟','30分钟','1小时','2小时','12小时','24小时','立即推送','不推送'],
            selectedData:[]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getRegional()
        this.getSubList()
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
                this.treeData = createTree(treeItem)
            }).catch(err => {
                // 异常情况
            })
        },
        getSubList(){
            console.log(this.area)
            let siteId = this.area.length!=0?this.area.join(','):''
            let way = this.acceptWay.length!=0?this.acceptWay.join(','):''
            let fre = this.pushFre.length!=0?this.pushFre.join(','):''
            let time = this.pushTime.length!=0?this.pushTime.join(','):''
            // siteId,queryName,mode,frequency,time,page
            getList(siteId,this.keyword,way,fre,time,this.page).then(res=>{
              console.log(res)
              if(res.data){
                  this.data = res.data.items
                  this.total = res.data.total
              }
            })
        },
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        addHandle() {
            this.$router.push({
                path:'alarm/takeAdd'
            })
        },
        selectHandle() {
           if(this.selectedData.length==0){
               this.$Message.warning('请选择');
               return
           }
           let ids = []
           this.selectedData.map(ele=>{
               ids.push(ele.id)
           })
           deleteSub(ids.join(',')).then(res=>{
               if(res.data.count){
                   this.$Message.success('删除成功');
                    this.getRegional()
                    this.getSubList()
               }
           })
        },
        checkHandle(id) {
            //查看
            this.$router.push({
                path:'alarm/takeCheck',
                query:{
                    params : id
                }
            })
        },
        editHandle(id) {
            //编辑
            this.$router.push({
                path:'alarm/takeEdit',
                query:{
                    params : id
                }
            })
        },
        search(){
           this.getSubList()
        },
        reset(){
            this.area = []
            this.keyword = ""
            this.acceptWay = []
            this.pushFre = []
            this.pushTime = []
            this.page = 1
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
            const index = this.selectedData.findIndex(item => item.userName === row.userName);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            selection.forEach(item => {
                if (this.selectedData.findIndex(i => i.userName === item.userName) < 0) {
                    this.selectedData.push(item);
                }
            });
            console.log(this.selectedData)
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            const selection = this.modelData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.userName === item.userName);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        },
    }
}
</script>
<style lang="less" scoped>
.take-wrap {
    margin: 5px;
    background: #fff;
    .take-search {
        .search-box {
            padding: 5px;
            height: 43px;
            .search-main {
                // height: 33px;
                // overflow: hidden;
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
    .c-top-border-gray {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            button {
                min-width: 50px;
                background-color: #576374;
                border: none;
                height: 28px;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                margin-right: 10px;
            }
        }
    }
    .page {
        text-align: right;
        margin-top: 10px;
    }
}
</style>