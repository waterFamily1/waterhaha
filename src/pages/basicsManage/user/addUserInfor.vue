<template>
    <div class="user-information" :style="{height: height+'px'}">
        <div class="user-title">
            <h3>用户编辑</h3>
            <div>
                <Button type="info" size="small" style="background:#4b7efe" @click="save('formInline')">保存</Button>
                <Button type="info" size="small" style="background:#c8c8c8" @click="cancel()">取消</Button>
            </div>
        </div>
        <div class="con-show" :style="{height: (height-45)+'px'}">
            <Form ref="formInline" label-position="right" :label-width="100" :model="formInline" :rules="ruleValidate">
                <FormItem label="用户姓名：" prop="name">
                    <Input v-model="formInline.name" placeholder="请输入用户姓名"  style="width:350px"></Input>
                </FormItem>
                <FormItem label="所属组织：" prop="orgId" style="position:relative">
                    <!-- <Select v-model="formInline.orgId" :placeholder="orgName?'':'请选择'"  style="width:350px">
                         <Tree :data="data4"  @on-select-change="selectItem" ></Tree>
                    </Select> -->
                    <select name="" id="" v-if="!show"></select>
                    <selectTree v-else v-model="formInline.orgId"  :treeData="data4" style="width:350px"></selectTree>
                    <!-- <div style="position: absolute;top: 3px;left:10px;width:310px;height:28px;">{{orgName}}</div> -->
                </FormItem>
                <FormItem label="手机号：" prop="tel">
                    <Input v-model="formInline.tel" placeholder="请输入手机号"  style="width:350px"></Input>
                    <Tooltip max-width="250"  placement="right" >
                        <Icon type="ios-help-circle" style="font-size:18px;color:rgb(173, 173, 173);vertical-align:middle;margin-left:6px" @click="disabled = true" />
                        <div slot="content">
                            <p>手机和邮箱地址是作为用户登录时使用的ID。</p>
                            <p>请正确填写真实有效的手机号和邮箱地址。</p>
                            <p> <span>如有问题请与我们联系。</span> <a href=""> <Icon type="ios-mail" style="font-size:24px;color:#fff;vertical-align:middle;float:right" /> </a> </p>
                        </div>
                    </Tooltip>
                </FormItem>
                <FormItem label="邮箱：" prop="email" :required="false">
                    <Input v-model="formInline.email" placeholder="请输入邮箱"  style="width:350px"></Input>
                </FormItem>
            </Form>
            
        </div>
    </div>
</template>
<script>
import { getUser,getOrganizations } from '@api/basic/user';
import createTree from '@/libs/public-util'
import selectTree from 'iview-select-tree'
  export default {
      name:'addUserInfor',
      components: {
        selectTree
      },
      data(){
        return {
            formInline: {
                email: '',
                name: '',
                orgId: '',
                tel: ''
             },
             ruleValidate:{
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                orgId: [
                    { required: true, message: '请选择所属组织', trigger: 'change',type:'number' }
                ],
                tel: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {validator:(rule, value, callback)=>{
                        let reg=/^\d{11}$/
                        if(!reg.test(value)){
                            callback(new Error("请正确输入有效的手机号"));
                        }else{
                            callback()
                        }
                    }, trigger: 'blur'}
                ],
                email: [
                    {validator:(rule, value, callback)=>{
                        let reg=/^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$/;
                        // !reg.test(value)
                        if(false){
                            callback(new Error("请正确输入有效的邮箱"));
                        }else{
                            callback()
                        }
                    }, trigger: 'blur'}
                ]
             },
             
            height:0,
            data4: [],
            orgName:'',
            treeData:[],
            show:false
        }
      },
    mounted() {
        this.height = document.body.clientHeight-70
        this.getOrg() 
    },
    methods: {
        async getOrg(){
            await getOrganizations().then(res=>{
                console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.show=true
                this.data4 = createTree(treeItem)
            })
        },
        save(name){
            this.$refs[name].validate((valid) => {
                console.log(valid)
                if (valid) {
                    getUser('post',this.formInline).then(res=>{
                        console.log(res)
                        if(res.data.id){
                            this.$Message.success('添加成功');
                             this.$router.go(-1)
                        }
                    })
                } else {
                    
                }
            })
        },
        cancel(){
             this.$router.go(-1)
        },
        selectItem(value){
            console.log(value)
            this.formInline.orgId= value[0].id
            this.orgName = value[0].name
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
        background: #fff;
        margin-top: 5px;
        padding: 10px;
       
        .ivu-form-item{
            margin-bottom: 24px;
            .ivu-input{
                width: 350px;
            }
        }
    }
}
// /deep/.ivu-select-dropdown div:first-child{
//     display: none
// }
</style>
