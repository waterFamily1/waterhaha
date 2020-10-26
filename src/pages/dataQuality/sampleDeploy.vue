<template>
    <div class="sample-wrap" :style="{height: height+'px'}">
        <div class="sample-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="keyword" placeholder="测点名称" style="width: 300px" />
                </div>
                <div class="form-item">
                    <label>区域位置：</label> 
                    <TreeSelect v-model="areaValue" :multiple="true"  :data="areaData" v-width="300" />
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
                        <label>信号类型：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="singalType" @on-change="singalChange">
                                <TagSelectOption name="State">状态信号</TagSelectOption>
                                <TagSelectOption name="Digtal">数值信号</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
                 <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>数据分类：</label>
                        <div class="cmp-tab">
                            <TagSelect v-model="dataClassify" @on-change="dataChange" >
                                <TagSelectOption :name="item.id" v-for="(item,index) in dataCategoryArr" :key="index">{{ item.categoryName }}</TagSelectOption>
                            </TagSelect>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="log-content">
            <div class="c-table-top-btns">
                <button type="button" @click="addSample()">添加样本</button>
            </div>
            <div class="table-wrapper">
                <Table stripe size="small" :columns="tableList" :data="tableData">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;" @click="setting(row.id)">配置</Button>
                        <Button class="action" size="small" @click="deleteData(row)">删除</Button>
                    </template>
                </Table>
                 <Page :total="total" show-elevator show-total class="page"  @on-change="tableChange" />
            </div>
        </div>
        <!-- 添加样本 -->
        <Modal
            v-model="sampleModal"
            title="添加样本"
            width="650" footer-hide>
            <div class="model-box">
                <div class="model-search">
                    <div>
                        <div class="search-item">
                            <label>关键字：</label>
                            <Input v-model="modalKeyword" placeholder="用户名称/手机号" size="small" style="width: 150px" />
                        </div>
                        <div class="search-item">
                            <label>结构组织：</label>
                            <TreeSelect v-model="siteValue" size="small"  :data="areaData" v-width="180" />
                        </div>
                        <div class="search-btn">
                            <Button size="small" @click="searchData()">搜索</Button>
                            <Button size="small" class="reset" @click="resetData()">重置</Button>
                        </div>
                    </div>
                    <div class="tabel-num">
                        已选择<strong>{{ selectedData.length }}</strong>个
                        <Button size="small" @click="handleClearSelect(false)">清空</Button>
                    </div>
                </div>
                <div class="model-table">
                    <Table size="small" ref="selection" :columns="modelColumns" :data="modelData"
                        @on-select="handleSelect"
                        @on-select-cancel="handleSelectCancel"
                        @on-select-all="handleSelectAll"
                        @on-select-all-cancel="handleSelectAllCancel">
                    </Table>
                    <Page :total="modelTotal" size="small" show-total show-elevator class="modalPage" @on-change="modelChange" />
                     <div class="action-btn">
                        <span @click="cancel">取消</span>
                        <span style="background: #4b7efe;" @click="ok()">确定</span>
                     </div>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>

import { datacategory,tableData,modelData,regionalCon,searchData,addSample,deleteSample} from '@api/dataQuality/sample';
import {formatTime} from '@/libs/public'
import createTree from '@/libs/public-util'
export default {
    name: 'sampleDeploy',
    data() {
        return {
            height: '',
            keyword: '',
            areaValue: '',
            areaData: [],
            searchShow: false,
            singalType: [],
            dataClassify: [],
            tableList: [
                {
                    title: '测点名称',
                    key: 'mpointName'
                },
                {
                    title: '区域位置',
                    key: 'siteName'
                },
                {
                    title: '信号类型',
                    key: 'datype',
                    render: (h, params) => {
                        let text= params.row.datype =='Digtal'?'A':'D'
                        let color = params.row.datype =='Digtal'?'#7ED321':'#4A90E2'
                        return h('div',{
                            style:{
                                background:color,
                                width:'20px',
                                height:'20px',
                                lineHeight:'20px',
                                color:'#fff',
                                fontSize:'12px',
                                borderRadius:'50%',
                                textAlign:'center'
                            }
                        },text);
                    }
                },
                {
                    title: '数据分类',
                    key: 'categoryName'
                },
                {
                    title: '推送周期',
                    key: 'period'
                },
                {
                    title: '所属设备',
                    key: 'equName'
                },
                {
                    title: '配置时间',
                    key: 'updateTime'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            tableData: [],
            sampleModal: false,
            modalKeyword: '',
            modalTissue: '',
            modelColumns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '测点编号',
                    key: 'mpointId'
                },
                {
                    title: '区域位置',
                    key: 'siteName'
                },
                {
                    title: '测点名称',
                    key: 'mpointName'
                }
            ],
            modelData: [],
            list: [],
            selectedData: [],
            dataCategoryArr:[],
            total:0,
            modelTotal:0,
            categoryId:'',
            dataType:'',
            page:1,
            siteId :"",
            siteName:'',
            baseData:[],
            siteValue:''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getCategory()
        this.getTableData(this.keyword,this.dataType,this.categoryId,1)
        this.getModelData(this.modalKeyword,this.siteValue,1,1,'AUTO')
        this.getRegional()
    },
    methods: {
        higherSearch() {
            this.searchShow = !this.searchShow
        },
        ok () {
           console.log(this.selectedData)
           if(this.selectedData.length==0){
                this.$Message.info('请选择测点');
                return
           }
            let data=[]
            this.selectedData.forEach(ele=>{
                data.push({
                    mpointId :ele.id
                })
            })
            addSample(data).then(res=>{
                console.log(res)
                if(res.data.id){
                    this.getTableData(this.keyword,this.dataType,this.categoryId,1)
                    this.getModelData('','',1,1,'AUTO')
                    this.sampleModal = false
                }
            })
        },
        cancel () {
            this.sampleModal = false
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
        getCategory(){
            datacategory().then(res=>{
                console.log(res)
                if(res.data){
                    this.dataCategoryArr = res.data
                }
            })
        },
        getTableData(queryName,dataType,categoryId,page){
            tableData(queryName,dataType,categoryId,page).then(res=>{
                console.log(res)
                if(res.data){
                    let data= res.data.items
                    data.forEach(ele=>{
                        ele.updateTime = formatTime(ele.updateTime, 'HH:mm:ss yyyy-MM-dd')
                    })
                    this.tableData = res.data.items
                    this.total = res.data.total
                }
            })
        },

        getModelData(queryName,siteId,page,confDataQuality,datasource){
            modelData(queryName,siteId,page,confDataQuality,datasource).then(res=>{
              console.log(res)
                if(res.data){
                    this.modelData = res.data.items
                    this.modelTotal = res.data.total
                }
            })
        },
        modelChange(size){
             this.getModelData(this.modalKeyword,this.siteValue,size,1,'AUTO')
        },
        getRegional() {
            regionalCon().then(res => {
                // console.log(JOSN.stringify(res.data))
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].expand = true
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.baseData = treeItem
                this.areaData= createTree(treeItem)
            }).catch(err => {
                // 异常情况
            })
        },
        dataChange(checkedNames, name){
           if(checkedNames.length==this.dataCategoryArr.length){
               this.categoryId = ''
           }else{
               this.categoryId = checkedNames.join(',')
           }
        }, 
        search(){
            this.siteId = this.areaValue.join(',')
            let arr=[]
            this.baseData.forEach(ele=>{
                this.areaValue.forEach(item=>{
                    if(ele.id == item){
                        arr.push(ele.name)
                    }
                })
            })
            this.siteName = arr.join(',')
            searchData (this.keyword,this.dataType,this.categoryId,this.page,this.siteId,this.siteName).then(res=>{
                console.log(res)
                if(res.data){
                    let data= res.data.items
                    data.forEach(ele=>{
                        ele.updateTime = formatTime(ele.updateTime, 'HH:mm:ss yyyy-MM-dd')
                    })
                    this.tableData = res.data.items
                    this.total = res.data.total
                }
            })
        },
        singalChange(checkedNames,name){
            if(checkedNames.length == 2){
                this.dataType = ''
            }else{
                this.dataType = name
            }
        },
        tableChange(size){
            this.page = size
            this.getTableData(this.keyword,this.dataType,this.categoryId,size)
        },
        addSample(){
            this.sampleModal = true
            this.selectedData = []
        },
        searchData(){
            this.getModelData(this.modalKeyword,this.siteValue,1,1,'AUTO')
        },
        resetData(){
            this.modalKeyword = ''
            this.siteValue = ''
        },
        reset(){
            this.keyword = ''
            this.areaValue = []
        },
        deleteData(row){
            deleteSample(row.id).then(res=>{
                if(res.data.count){
                    this.getTableData(this.keyword,this.dataType,this.categoryId,1)
                }
                
            })
        },
        setting(id){
            this.$router.push({
                path:"/stat/detailSetting",
                query :{
                    id: id
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.sample-wrap {
    margin: 5px;
    background: #fff;
    .sample-search {
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
        .c-adv-search {
            margin-top: 10px;
            padding-top: 5px;
            border-top: 1px solid #ececec;
            .c-adv-search-row {
                margin: 5px 0;
                .form-item {
                    display: inline-block;
                    height: 33px;
                    label {
                        display: inline-block;
                        width: 100px;
                        line-height: 35px;
                        text-align: right;
                        color: #576374;
                        float: left;
                    }
                }
                .cmp-tab {
                    display: inline-block;
                    /deep/.ivu-tag-text {
                        font-size: 14px;
                    }
                }
                /deep/.ivu-form-item {
                    margin-bottom: 5px;
                }
            }
        }
    }
    .searchTrans {
        height: 140px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .searchPack {
        height: 43px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .log-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
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
            }
        }
        .table-wrapper {
            .action{
                color:rgb(75, 126, 254);
                border:0;
                font-size:12px;
                background:transparent
            }
            .page{
                text-align: right;
                margin-top: 10px;
            }
        }
    }
}
.model-box {
    .model-search {
        .search-item {
            display: inline-block;
            label {
                font-size: 13px;
                margin-left: 10px;
            }
            /deep/.ivu-input,
            /deep/.ivu-select {
                font-size: 13px;
            }
        }
        .search-btn {
            display: inline-block;
            float: right;
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
            font-size: 13px;
            color: #999;
            line-height: 30px;
            margin-top: 10px;
            /deep/.ivu-btn {
                font-size: 12px;
                background: #57a3f3;
                color: #fff;
            }
        }
    }
    .model-table {
        margin-top: 10px;
    }
}
/deep/.ivu-modal-footer {
    /deep/.ivu-btn-text {
        border: 1px solid #dcdee2;
    }
}
.modalPage {
    text-align: right;
    margin: 10px 0 0;
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