<template>
    <div class="map-box" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>巡检计划线路（{{ obj.name }}）</h3>
            <div class="c-btns-right">
                <button @click="save('formValidate')">保存</button>
                <button class="cancel">取消</button>
            </div>
        </div>
        <div class="map-content" :style="{height: (height-45)+'px'}">
            <div class="c-scrollbar">
               <div class="patrol-map-line-btns">
                   <a href="javascript:;">
                       <Icon type="ios-brush" style="font-size:16px" /> 绘制路线
                   </a>
                   <a href="">
                       <Icon type="md-refresh" style="font-size:16px" />清除路线
                   </a>
               </div>
               <h3>巡检点</h3>
               <div class="patrol-map-point-set" v-for="(item , index) in obj.pointsList" :key="index">
                   <span :title="item.description">{{item.patrolPoint}}</span>
                   <a href="javascript:;" class="patrol-map-locale">
                       <Icon type="ios-locate-outline" style="font-size:16px" />标注
                   </a>
               </div>
            </div>
            <div class="map-show">
                <baidu-map center="天津" :zoom="13" 
                        :scroll-wheel-zoom="true" style="height:100%">
                        <bm-control >
                            <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 1}">
                                <Input suffix="ios-search" placeholder="" style="width: auto" />
                            </bm-auto-complete>
                        </bm-control>
                    <bm-local-search :keyword="keyword" :auto-viewport="true" ></bm-local-search>
                </baidu-map>
            </div>
        </div>
    </div>
</template>
<script>
import { getPath } from '@api/pollingManage/plan';
export default {
    name:'mapPolling',
    data () {
        return {
            height :'',
            id:'',
            obj:''
        }
    },
    methods: {
        patrolPath(){
            getPath(this.id).then(res=>{
                console.log(res)
                if(res.data){
                    this.obj = res.data
                }
            })
        }
    },
    mounted() {
        this.height = document.body.clientHeight-75
        this.id = this.$route.query.id
        this.patrolPath()
    },
    
}
</script>
<style lang="less" scoped>
.map-box{
    margin: 5px;
    background: #fff;
    overflow: auto;
   .c-left-border-blue{
        border-radius: 3px;
        padding: 5px;
        h3{
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
        }
        .map-type-icon{
            margin-left: 10px;
            vertical-align: top;
            display: inline-block;
            width: 64px;
            height: 25px;
            background: url('../../../assets/images/map.png') no-repeat 0 0;
        }
        .c-btns-right{
            float: right;
            margin-top: 2px;
            button{
                background: #4b7efe;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin: 0 5px;
                min-width: 70px;
            }
            .cancel{
                background: #c8c8c8;
            }
        }
    }
    .map-content{
        border-top: 5px solid #f0f0f0;
        padding:10px;
        display: flex;
        .c-scrollbar{
            float: left;
            overflow: auto;
            width: 300px;
            height: 100%;
            margin-right: 20px;
            .patrol-map-line-btns{
                height: 40px;
                a{
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 6px;
                    border: 1px solid #0093ff;
                    color: #0093ff;
                    border-radius: 4px;
                    margin-right: 10px;
                } 
            }
            h3{
                background: #e6e6e6;
                height: 30px;
                line-height: 30px;
                text-indent: 10px;
                font-size: 13px;
                font-weight: 100;
                
            }
            .patrol-map-point-set{
                border-bottom: 1px solid #EFEFEF;
                padding: 10px 0;
                height: 28px;
                line-height: 28px;
                box-sizing: content-box;
                .patrol-map-locale{
                    border: 1px solid #0093ff;
                    height: 28px;
                    line-height: 28px;
                    color: #0093ff;
                    float: right;
                    padding: 0 5px;
                    border-radius: 3px;
                    margin-right: 3px;
                }
            }
        }
        .map-show{
            flex: 1;
            // width: 50%;
            height: 100%;
            float: right;
        }
    }
}
</style>