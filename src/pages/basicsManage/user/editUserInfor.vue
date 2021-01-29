<template>
    <div class="user-information" :style="{height: height+'px'}">
        <div class="user-title">
            <h3>用户编辑</h3>
            <div>
                <Button type="info" size="small" style="background:#4b7efe" @click="save()">保存</Button>
                <Button type="info" size="small" style="background:#c8c8c8" @click="cancel()">取消</Button>
            </div>
        </div>
        <div class="con-show" :style="{height: (height-45)+'px'}">
            <Form ref="formInline" label-position="right" :label-width="100" :model="formInline" :rules="ruleValidate">
                <FormItem label="用户姓名：" prop="name">
                    <Input v-model="formInline.name" placeholder="请输入用户姓名" value="123" style="width:350px"></Input>
                </FormItem>
                <FormItem label="所属组织：" prop="orgId" >
                     <TreeSelect 
                    v-model="formInline.orgId" 
                    :data="data4"
                    v-width="350" 
                /></FormItem>
                <FormItem label="手机号：" prop="tel">
                    <Input v-model="formInline.tel" placeholder="请输入手机号" value="123" style="width:350px"></Input>
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
                    <Input v-model="formInline.email" placeholder="请输入邮箱" value="123" style="width:350px"></Input>
                </FormItem>
            </Form>
            
        </div>
    </div>
</template>
<script>
import { putUser,getUser,getOrganizations} from '@api/basic/user';
import createTree from '@/libs/public-util'
  export default {
      name:'addUserInfor',
      data(){
        return {
            formInline: {
                name: '',
                orgId:'',
                tel:'',
                email:'',
             },
             ruleValidate:{
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                orgId: [
                    { required: true, message: '请选择组织', trigger: 'change',type:'number' }
                ],
                tel: [
                    { required: true, message: '请输入手机号', trigger: 'blur' }
                ],
             },
            height:0,
            model1: '',
            data4: [],
            baseData:[]
        }
      },
      mounted() {
        this.height = document.body.clientHeight-70
        this.getOrg()
        putUser(this.$route.query.id).then(res=>{
            console.log(res)
            this.userDetail = res.data
            this.formInline = {
                name: res.data.name,
                orgId:res.data.orgId,
                tel:res.data.tel,
                email:res.data.email
            }
        })
    },
    methods: {
        getOrg(){
            getOrganizations().then(res=>{
                console.log(res)
                let treeItem = []
                let trees = res.data
                for(let i = 0; i < trees.length; i ++) {
                    trees[i].title = trees[i].name
                    trees[i].value = trees[i].id
                    treeItem.push(trees[i])
                }
                this.baseData = treeItem
                this.show=true
                this.data4 = createTree(treeItem,0)
            })
        },
        save(){
            let orgName = ""
            this.baseData.map(ele=>{
                if(ele.id == this.userDetail.orgId ){
                    orgName = ele.name
                }
            })
            this.userDetail.name= this.formInline.name
            this.userDetail.email = this.formInline.email
            this.userDetail.orgId = this.formInline.orgId
            this.userDetail.tel = this.formInline.tel
            this.userDetail.orgName = orgName
            console.log(this.userDetail)
            getUser('put',this.userDetail).then(res=>{
                console.log(res)
                if(res.data.count==1){
                    this.$Message.success('数据保存成功');
                    this.$router.go(-1);
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
            .ivu-btn{
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
</style>
