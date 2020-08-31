<template>
    <div class="site-box" :style="{height: height+'px'}">
       <div class="search-box">
          <div class="form-item">
              <span>时间：</span>
              <DatePicker type="date"  placeholder="开始时间" style="width: 120px"></DatePicker>-
              <DatePicker type="date"  placeholder="结束时间" style="width: 120px"></DatePicker>
          </div>
          <div class="form-item">
              <span>状态：</span>
              <Select  style="width:auto;min-width:200px;max-width:450px" placeholder="请选择">
                <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.name }}</Option>
              </Select>
          </div>
          <div class="form-search-btn">
              <button type="button">搜索</button>
              <button type="button" class="reset">重置</button>
          </div>
       </div>
       <div class="site-content">
         <div class="c-table-top-btns">
            <button type="button" @click="fileUpload()">文件上传 </button>
            <button type="button" style="margin-left:10px" @click="templateDownload()">模版下载</button>
         </div>
         <div class="table-wrapper" :style="{height: (height-45)+'px'}">
            <Table stripe size="small" :columns="siteTableList" :data="siteTableData">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button class="action" size="small" style="margin-right: 5px;">配置</Button>
                    <Button class="action" size="small">测试</Button>
                </template>
            </Table>
                <Page :total="100" show-elevator show-total class="page" />
        </div>
       </div>
    </div>
</template>
<script>
export default {  
    name:'siteDataImport',  
    data(){
      return {
          height:'',
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
          siteTableList: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '状态',
                    key: 'state'
                },
                {
                    title: '时间',
                    key: 'time'
                },
                {
                    title: '时长',
                    key: 'duration'
                },
                {
                    title: '备注',
                    key: 'remark'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            siteTableData: [],
            startTime:''
      }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods:{
        fileUpload(){

        },
        templateDownload(){

        }
    }
}
</script>
<style lang="less" scoped>
.site-box{
    margin: 5px;
    background: #fff;
    /deep/.ivu-input{
      font-size: 13px;
    }
    .search-box{
      padding:5px;
      border-radius: 3px;
        .form-item{
            display: inline-block;
            span{
                display: inline-block;
                width: 100px;
                text-align: right;
            }
        }
        .form-search-btn {
            margin-top: 4px;
            display: inline-block;
            float: right;
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
    .site-content{
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