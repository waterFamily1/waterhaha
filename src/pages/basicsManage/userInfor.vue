<template>
     <div class="user-information" :style="{height: height+'px'}">
        <div class="search-header">
            <div class="c-form-item">
                <label>关键词：</label>
                <Input placeholder="用户姓名/手机号/邮箱" style="width: 300px" />
            </div>
             <div class="c-form-item">
                 <label>所属组织：</label>
                <Select v-model="model1" style="width:300px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="c-adv-search-btn">
                 <button type="button">搜索</button>
                  <button type="button" class="reset">重置</button>
            </div>
        </div>  
        <div class="c-top-border-gray">
            <div class="c-table-top-btns">
                <button type="button">新增用户</button>
                <button type="button" style="margin-left:10px">批量导入</button>
            </div>
            <div class="table-wrapper" :style="{height: (height-45)+'px'}">
                <Table stripe :columns="columns1" :data="data1">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button class="action" size="small" style="margin-right: 5px;" @click="show(index)">查看</Button>
                        <Button class="action" size="small" @click="remove(index)">删除</Button>
                    </template>
                </Table>
                 <Page :total="100" show-elevator class="page" />
            </div>
        </div>
        <Modal  v-model="modal" title="提示" @on-ok="asyncOK">
          <p>您确定要删除吗？</p>
        </Modal>
     </div>
</template>
<script>
    export default {
        data () {
            return {
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: '',
                height:0,
                columns1: [
                    {
                        title: '序号',
                        key: 'number'
                    },
                    {
                        title: '用户姓名',
                        key: 'name'
                    },
                    {
                        title: '部门',
                        key: 'department'
                    },
                    {
                        title: '所属组织',
                        key: 'organization'
                    },
                    {
                        title: '手机号',
                        key: 'phone'
                    },
                    {
                        title: '邮箱地址',
                        key: 'email'
                    },
                    {
                        title: '权限角色',
                        key: 'authorizationRole'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                data1: [
                    {
                        number:'1',
                        name: '萧鸿耀',
                        department:'',
                        organization:'联泰潮英智慧水务',
                        phone:'123444',
                        email:'123@qq.com',
                        authorizationRole:'组长',
                        action:''
                    },
                    {
                        number:'2',
                        name: '萧鸿耀',
                        department:'',
                        organization:'联泰潮英智慧水务',
                        phone:'123444',
                        email:'123@qq.com',
                        authorizationRole:'组长',
                        action:''
                    },
                    {
                        number:'3',
                        name: '萧鸿耀',
                        department:'',
                        organization:'联泰潮英智慧水务',
                        phone:'123444',
                        email:'123@qq.com',
                        authorizationRole:'组长',
                        action:''
                    },
                    
                ],
                modal: false,
            }
        },
        mounted() {
            this.height = document.body.clientHeight-70
        },
        methods: {
            remove(index) {
                let that=this;
               that.modal=true
            },
             asyncOK () {
                setTimeout(() => {
                    this.modal = false;
                }, 2000);
            }
        }
    }
</script>
<style lang="less" scoped>
.user-information{
    margin: 5px;
    .search-header{
        background: #fff;
        padding: 5px;
        .c-form-item{
            display: inline-block;
            min-height: 33px;
            label{
                width: 100px;
                text-align: right;
                display: inline-block;
                line-height: 35px;
            }
            
        }
        .c-adv-search-btn{
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
        background: #fff;
        margin-top: 5px;
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
        .table-wrapper{
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
</style>