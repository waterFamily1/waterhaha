<template>
  <div class="main-con">
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
          <div>
              <span>起始时间：</span>
               <DatePicker type="date" :options="startTime" placeholder="选择时间" style="width: 200px"></DatePicker>
               <div class="cmp-date-step-icon">
                   <a href="javascript:;"> <Icon type="md-arrow-dropleft" /></a>
                   <a href="javascript:;"> <Icon type="md-arrow-dropright" /></a>
                   <a href="javascript:;"><Icon type="ios-skip-forward" /></a>
               </div>
               <span>时间跨度：</span>
              <Select  style="width:70px;display:inline-block">
                <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.name }}</Option>
              </Select>
              <div class="action-btn">
                  <div class="dropdown">
                    <a href="javascript:;">
                        <Icon type="ios-more" style="font-size:25px;color:rgb(75, 126, 254)" />
                    </a>
                
                  </div>
                  <a href="javascript:;" class="c-icon-export"></a>
                  <a href="javascript:;">
                    <Icon type="ios-sync" />
                  </a>
                  <a href="javascript:;" class="c-icon-table"></a>
                  <a href="javascript:;" class="c-icon-dline"> </a>
                  <a href="javascript:;" style="color:#333">
                    <Icon type="ios-expand" />
                  </a>
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
            ],
            startTime:'',
            dateList:[
                {
                    name:'天',
                    value:'day'
                },
                {
                    name:'周',
                    value:'week'
                },
                {
                    name:'月',
                    value:'month'
                },
                {
                    name:'年',
                    value:'year'
                }
            ],
        }
    },
    methods:{
        remove(index,selection, row){
           
        }
    }
}
</script>
<style lang="less" scoped>
.main-con{
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
        .cmp-date-step-icon{
            display: inline-block;
            vertical-align: bottom;
            .ivu-icon{
                font-size: 22px;
                color: rgb(75, 126, 254);
            }
        }
        .action-btn{
            float: right;
            .dropdown{
                display: inline-block;
            }
            a{
                display: inline-block;
                width: 25px;
                vertical-align: top;
            }
            .ivu-icon{
                font-size: 25px;
                vertical-align: top;
            }
            .c-icon-export{     
                display: inline-block;
                background: url('../../../assets/images/split_icon.png') no-repeat -4px -42px;
                width: 25px;
                height: 25px;
            }
            .c-icon-dline{
                display: inline-block;
                background: url('../../../assets/images/split_icon.png') no-repeat -5px -7px;
                width: 25px;
                height: 25px;
            }
            .c-icon-table{
                display: inline-block;
                background: url('../../../assets/images/table.png') no-repeat 0 2px;
                width: 25px;
                height: 25px;
            }
        }
    }
}


</style>