<template>
    <div>
        <div class="title">
            <div style="display:inline-block">
                <span>数据组合</span>
                <a href="javascript:;" @click="higherSearch()" >
                    <Icon type="ios-arrow-down" v-if="searchShow" />
                    <Icon type="ios-arrow-up" v-else />
                </a>
            </div>
            <Icon type="ios-add-circle" style="color:rgb(162, 162, 162);font-size:20px;float:right;margin-top:10px" @click="add()" />
        </div>
        <div class="con">
            <ul></ul>
            <div style="text-align:center;margin:30px auto">暂无数据</div>
        </div>
        <Modal v-model="modal" width="600" class="model-box"> 
            <p slot="header" style="color:#1c2438;font-size:14px;border-left:7px solid #4b7efe;background:#f8f9fb;height:39px;line-height:39px">
                <!-- <Icon type="ios-information-circle"></Icon> -->
                <span class="rectangle"></span>
                <span style="margin-left:8px">添加数据组合</span>
            </p>
            <div>
                <div class="search-item">
                    <label>数据组合名称(必填)：</label>
                    <Input v-model="keyword" placeholder="数据组合名称" size="small" style="width: 150px" />
                </div>
                <div>
                    <div class="key-item">
                        <label>关键字：</label>
                        <Input  placeholder="用户名称/手机号" size="small" style="width: 150px" />
                    </div>
                    <div class="key-item">
                        <label>区域位置：</label>
                        <Select v-model="tissue" style="width:180px" size="small">
                            <Option v-for="item in tissueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
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
            </div>
            <div slot="footer" >
                <!-- <Button type="primary"  long  @click="save" style="font-size:12px">保存为新模版</Button> -->
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    name: 'datagroup',
    data(){
        return {
            height:0,
            searchShow:false,
            modal:false,
            tissue: '',
            tissueList: [
                {
                    value: 'New York',
                    label: 'New York'
                }
            ],
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
            selectedData: []
        }
    },
    methods:{
        higherSearch(){
            this.searchShow=!this.searchShow
        },
        add(){
            this.modal=true
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
        }
    },
    mounted() {
        this.height = document.body.clientHeight-70
    },
}
</script>
<style lang="less" scoped>
/deep/.ivu-modal-header{
    padding: 0;
    border-bottom: 0;
}
.title{
    height: 40px;
    line-height: 40px;
    background: #F4F4F4;
    padding: 0 10px;
    a{
         color:#333;
    }
}
.con{
    min-height: 20px;
}
.search-item{
    font-size: 12px;
    height: 40px;
    input::-webkit-input-placeholder{
        color:#999;
        font-size: 13px;
    }
    label{
        font-size: 12px;
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