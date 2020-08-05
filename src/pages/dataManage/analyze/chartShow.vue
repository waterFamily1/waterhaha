<template>
  <div>
      <div class="title">
          <!-- <h3>您还没有选择测点</h3> -->
          <div>
              <span>您选择的测点：</span>
              <div class="tag" :key="index" v-for="(item ,index) in actionList" @click="remove(index)">
                 <span>{{item.name}}</span> 
                 <Icon type="ios-close-circle-outline" />
              </div>
              <Button type="primary" size="small" style="font-size:12px">刷新</Button>
              <div style="float:right">
                   <Button type="default" size="small" style="font-size:12px;background:#576374;color:#fff">清空</Button>
                   <Button type="default" size="small" style="font-size:12px;background:#576374;color:#fff">保存为组合</Button>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            actionList:[
               {name:'关键设备',id:1},
               {name:'缺陷月度',id:2},
            ]
        }
    },
    methods:{
        remove(index,selection, row){
           
        }
    }
}
</script>
<style lang="less" scoped>
.title{
    height: 50px;
    border-bottom: 1px solid #EEE;
    padding: 10px;
    font-size: 13px;
    line-height: 40px;
    .tag{
        display: inline-block;
        border: 1px solid #ccc;
        padding:0 3px;
        margin-right: 8px;
        height: 27px;
        line-height: 27px;
        position: relative;
        .ivu-icon{
            position: absolute;
            right: -6px;
            top: -10px;
            font-size: 18px;
            background: #fff;
        }
    }
    
}
</style>