<template>
    <div class="user-information" :style="{height: height+'px'}">
        <div class="user-title">
            <h3>简报采集</h3>
            <div>
                 <Button type="primary" size="small" style="background:#4b7efe" @click="edit()">编辑</Button>
                <Button type="primary" size="small" style="background:#c8c8c8" @click="cancel()">返回</Button>
            </div>
        </div>
         <div class="con-show" >
           <div class="search-con">
                <Form ref="formInline" label-position="right" :label-width="100" :model="formInline" >
                    <Row>
                        <Col span="12">
                            <FormItem label="区域位置：" prop="location">
                               <span>{{ detail.siteName }}</span>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="名称：" prop="name">
                               <span>{{detail.formName }}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem label="采集周期：" prop="duration">
                       <span>{{ detail.cycleName }}</span>
                     </FormItem>
                </Form>
           </div>
           <div class="data-table" :style="{height: (height-80)+'px'}">
                <Table stripe :columns="columns1" :data="detail.mpointList" size="small">
                    <template slot-scope="{ row }" slot="name">
                        <strong>{{ row.name }}</strong>
                    </template>
                </Table>
                
           </div>
        </div>
    </div>
</template>
<script>
import { checkForm} from '@api/dataManage/labour';

export default {
    name:'bulletinCheckForm',
    data (){
        return {
            height : 0,
            formInline: {
                location: '',
                name:'',
                duration:''
             },
              columns1:[
                {
                    title: '测点名称',
                    key: 'mpointName'
                },
                {
                    title: '文本类型',
                    key: 'groupOrder',
                    render: (h, params) => {
                        let text = params.row.textType=='single'?'单行文本':'多行文本' ;
                        return h('div',{},text);
                    }
                },
                {
                    title: '自动填充上次数据',
                    key: 'autoComplete',
                    title: '文本类型',
                    key: 'groupOrder',
                    render: (h, params) => {
                        let text = params.row.autoComplete==0?'否':'是' ;
                        return h('div',{},text);
                    }
                },
                {
                    title: '名称分组',
                    key: 'groupName',
                },
                {
                    title: '组序号',
                    key: 'groupOrder',
                },
                {
                    title: '组内序号',
                    key: 'mpointOrder',
                }
            ],
            detail:{},
            editFlag:false,
            id :''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-70
        console.log(this.$route.query.id)
        this.id = this.$route.query.id
        this.getDetail(this.$route.query.id)
    },
    methods : {
        getDetail(id){
             checkForm(id).then(res=>{
                console.log(res)
                if(res.data){
                    this.detail= res.data
                }
             })
        },
        edit(){
            this.$router.push({
                 path:'/bulletin/bulletinEdit',
                 query : {
                     id: this.id
                 }
            })
        },
        cancel(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
.user-information{
    margin: 5px;
    .user-title{
        background: #fff;
        padding: 5px;
        h3{
            display: inline-block;
            line-height: 30px;
            text-indent: 10px;
        }
        div{
            float: right;
            button{
                min-width: 70px;
                margin: 0 5px;
                color: #fff;
                border: 0;
            }
        }
    }
    .con-show{
        // background: #fff;
        margin-top: 5px;
        // padding: 10px;
        .search-con{
            background: #fff;
            padding-top: 10px;
        }
        .ivu-form-item{
            margin-bottom: 24px;
            display: inline-block;
            .ivu-input{
                width: 350px;
            }
        }
        .data-table{
            background: #fff;
            margin-top: 5px;
            padding:10px;
            .action-btn{
                 margin-bottom: 10px;
                button{
                    background: #576374;
                    font-size: 12px;
                    box-shadow: 0;
                    margin-right: 8px;
                }
            }
        }
    }
}
</style>