<template>
    <div class="map-box" :style="{height: height+'px'}">
        <div class="index-search">
            <div class="search-main">
                <div class="form-item">
                    <label>关键词：</label>
                    <Input v-model="keyword" placeholder="巡检点名称" style="width: 200px" size="small" />
                </div>
                <div class="form-item">
                    <label>所属组织：</label> 
                     <TreeSelect v-model="areaSite" multiple :data="processList"  v-width="200" size="small"  />
                </div>
                
                  <div class="form-search-btn">
                    <button type="button" @click="search()">搜索</button>
                    <button type="button" class="reset" @click="reset()"> 重置</button>
                </div>
            </div>
        </div>
        <div class="map-content" :style="{height: (height-45)+'px'}">
             <div class="c-table-top-btns">
                 <div style="display:inline-block">
                    <Dropdown @on-click="changeItem">
                        <Button type="primary" style="margin-right:10px" >
                            导出二维码<Icon type="md-arrow-dropdown" />
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem name="all">
                                <Button  type="text" style="background:none;color:#495060">全部巡检点</Button>
                            </DropdownItem>
                            <DropdownItem name="check">
                                <Button   type="text" style="background:none;color:#495060">选中巡检点</Button>
                            </DropdownItem> 
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <Button type="primary" @click="add()">新增</Button>
                <Button type="primary" @click="cancel()" style="margin-left:10px">删除</Button>
                <Button type="primary" @click="upload()" style="margin-left:10px">导入</Button>
                
            </div>
                <Table stripe :columns="tableList" size="small" :data="data"
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                        <Button class="action" size="small" type="text" style="font-size:13px;color:rgb(75, 126, 254)" @click="checkDetail(row.id)">查看</Button>
                    </template>
                </Table>
                 <Page :total="total" show-elevator show-total class="page" @on-change="changeSize" />
        </div>
    </div>
</template>
<script>
import {regionalCon,manageList,deletePoint } from '@/api/pollingManage/manage'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'
export default {
    name:'pollingManage',
    data () {
        return {
            height :'',
            tableList: [
                {
                    type: 'selection',
                    width: 70,
                    align: 'center'
                },
                 {
                    title: '巡检点',
                    key: 'patrolPoint'
                },
                {
                    title: '描述',
                    key: 'description'
                },
                {
                    title: '巡检步骤',
                    key: 'stepCount'
                },
                {
                    title: '区域位置',
                    key: 'relatedProcessNames'
                },
               
                {
                    title: '编号',
                    key: 'no'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            areaSite:[],
            keyword:'',
            processList:[],
            page:1,
            baseData:[],
            data:[],
            total:0,
            selectedData:[]
        }
    },
    methods: {
        checkDetail(id){
            this.$router.push({
                path:'/pointDetail',
                query: {
                    id: id
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
            const index = this.selectedData.findIndex(item => item.id === row.id);
            this.selectedData.splice(index, 1);
        },
        // 当前页全选时，判断已选数据是否存在，不存在则添加
        handleSelectAll (selection) {
            selection.forEach(item => {
                if (this.selectedData.findIndex(i => i.id === item.id) < 0) {
                    this.selectedData.push(item);
                }
            });
        },
        // 取消当前页全选时，将当前页的数据（即 modelData）从已选项中删除
        handleSelectAllCancel () {
            const selection = this.modelData;
            selection.forEach(item => {
                const index = this.selectedData.findIndex(i => i.id === item.id);
                if (index >= 0) {
                    this.selectedData.splice(index, 1);
                }
            });
        },
        changeSize(size){
           this.page = size
           this.getList()
        },
        search(){
          this.getList()
        },
        reset(){
            this.areaSite=[]
            this.keyword = ""
            this.page = 1
        },
        getList(){
            // queryName,ids,page,names
            let ids = this.areaSite.length!=0?this.areaSite.join(','):''
            let arr = []
            this.areaSite.map(item=>{
                this.baseData.map(ele=>{
                    if(item == ele.id){
                       arr.push(ele.name)
                    }
                })
            })
            let names = this.areaSite.length!=0?arr.join(','):''
            manageList(this.keyword,ids,this.page,names).then(res=>{
                console.log(res)
                if(res.data.items){
                    this.data = res.data.items
                    this.total = res.data.total
                }
            })
        },
        getRegional() {
            regionalCon().then(res => {
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    trees[i].checked = false
                    treeItem.push(trees[i])
                }
                this.baseData = trees
                console.log(trees)
                this.processList = createTree(treeItem)
            }).catch(err => {
                // 异常情况
            })
        },
        changeItem(name){
            let ids = []
            this.selectedData.map(ele=>{
                ids.push(ele.id)
            })
            let id = ids.length!=0?ids.join(','):''
            let proIds = this.areaSite.length!=0?this.areaSite.join(','):''
            if(name == 'all'){
                const defaultParams = {
                    ids: id,
                    getAll: true,
                    queryName: this.keyword,
                    processIds: proIds,
                };
                util.download( '/patrol/api/points/qrcode-export', defaultParams)
            }else{
                console.log(this.selectedData)
                if(this.selectedData.length==0){
                    this.$Message.warning('请选择导出巡检点!');
                    return
                }else{
                    const defaultParams = {
                        ids: id,
                        getAll: '',
                        queryName: this.keyword,
                        processIds: proIds,
                    };
                util.download( '/patrol/api/points/qrcode-export', defaultParams)
                }
                
                
            }
        },
        add(){
            this.$router.push({path:'/addPoint'})
        },
        cancel(){
            if(this.selectedData.length==0){
                this.$Message.warning('请删除后选中');
                return
            }
            let arr = []
            this.selectedData.map(ele=>{
                arr.push(ele.id)
            })
            this.$Modal.confirm({
                title: '您确定要删除吗?',
                width: '300',
                onOk: () => {
                    deletePoint(arr.join(',')).then(res=>{
                        if(res.data.count){
                            qis.getList()
                        }
                    })
                },
                onCancel: () => {
                    // this.$Message.info('Clicked cancel');
                }
            });
        },
        upload(){
            this.$router.push({
                path:'/other/areaUpload',
                query: {
                    uploadName: '巡检点导入'
                }
            })
        }
    },
    mounted() {
        this.height = document.body.clientHeight-75
        this.getRegional()
        this.getList()
    }
}
</script>
<style lang="less" scoped>
.map-box{
    margin: 5px;
    background: #fff;
    overflow: auto;
    .index-search {
        padding: 5px;
        height: 43px;
        .search-main {
            height: 33px;
            .form-item {
                display: inline-block;
                min-height: 33px;
                label {
                    display: inline-block;
                    width: 100px;
                    line-height: 35px;
                    text-align: right;
                    color: #576374;
                }
            }
            .form-search-btn {
                float: right;
                margin-top: 4px;
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
    }
    .map-content{
        border-top: 5px solid #f0f0f0;
        padding:10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            button{
                min-width: 50px;
                background: #576374;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                height: 26px;
            }
        }
    }
     .page{
        text-align: right;
        margin-top: 10px;
    }
}
</style>