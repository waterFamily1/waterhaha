<template>
    <div class="user-information" :style="{height: height+'px'}">
        <div class="user-title">
            <h3>用户详情</h3>
            <div>
                <Button type="info" size="small" style="background:#4b7efe" @click="edit()">编辑</Button>
                <Button type="info" size="small" style="background:#c8c8c8" @click="back()">返回</Button>
            </div>
        </div>
        <div class="con-show" :style="{height: (height-45)+'px'}">
          <div class="ivu-form-item" style="margin-top:5px">
              <span class="first">用户姓名：</span>
              <span>{{ userDetail.name }}</span>
          </div>
          <div class="ivu-form-item">
              <span class="first">所属组织：</span>
              <span>{{ userDetail.orgName }}</span>
          </div>
          <div class="ivu-form-item">
              <span class="first">手机号：</span>
              <span>{{ userDetail.tel }}</span>
          </div>
          <div class="ivu-form-item">
              <span class="first">邮箱：</span>
              <span>{{ userDetail.email }}</span>
          </div>
        </div>
    </div>
</template>
<script>
import { putUser } from '@api/basic/user';
  export default {
      name:'checkUserInfor',
      data(){
        return {
            height:0,
            userDetail:{},
            userId:''
        }
      },
      mounted() {
        this.height = document.body.clientHeight-70
        this.userId = this.$route.query.id
        putUser(this.$route.query.id).then(res=>{
            console.log(res)
            this.userDetail = res.data
        })
    },
    methods: {
        edit(){
            this.$router.push({path:'/user/editUserInfor',query:{id:this.userId}})
        },
        back(){
            this.$router.go(-1);
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
            .ivu-btn {
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
            .first{
                width: 80px;
                text-align: right;
                display: inline-block;
            }
        }
    }
}
</style>
