<template>
    <div class="user-information" :style="{height: height+'px'}">
        <div class="user-title">
            <h3>终端测试</h3>
            <div>
                <Button type="info" size="small" style="background:#4b7efe" @click="clean()">清空</Button>
                <Button type="info" size="small" style="background:#c8c8c8" @click="goBack()">返回</Button>
            </div>
        </div>
        <div class="test-table">
            <div class="test-title">连接成功！正在测试...</div>
        </div>
    </div>
</template>
<script>
  export default {
      data(){
        return {
            height:''
        }
      },
      mounted() {
        this.height = document.body.clientHeight - 75
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        clean() {
            
        }
    }
  }
</script>
<style lang="less" scoped>
.user-information{
    margin: 5px;
    background: #fff;
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
    .test-table {
        width: 100%;
        border-top: 5px solid #f0f0f0;
        padding: 40px 10px 10px;
        position: relative;
        .test-title {
            position: absolute;
            top: 10px;
            right: 10px;
            color: rgb(92, 160, 177);
            font-size: 12px;
        }
    }
}
</style>
