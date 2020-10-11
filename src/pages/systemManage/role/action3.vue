<template>
    <div class="action3-box">
        <Tabs :animated="false" @on-click="handleChangeData">
            <TabPane label="首页模板" name="index"></TabPane>
            <TabPane label="数据曲线模版" name="information"></TabPane>
        </Tabs>
        <div class="action3-tab">
            <div class="index-box" v-if="index">
                 <div v-if="homepage.length==0">暂无数据</div>
                 <Radio v-else  v-model="item.checked" v-for="(item,index) in homepage" :key="index" @on-change="indexChange(item.id)">{{item.name }}</Radio>
            </div>
            <div class="information-box" v-if="information">
                 <div v-if="curve.length==0">暂无数据</div>
                <Radio v-else v-model="item.checked" v-for="(item,index) in curve" :key="index" @on-change="informationChange(item.id)">{{item.name }}</Radio>
            </div>
        </div>
    </div>
</template>
<script>
import { getJurisdiction} from '@api/system/role';
export default {
    name: 'actionThree',
    data() {
        return {
            index: true,
            information: false,
            homepage:[],
            curve:[],
            indexId:'',
            informationId:''
        }
    },
    methods: {
        handleChangeData(name) {
            if(name == 'index') {
                this.index = true
                this.information = false
            } else if (name == 'information') {
                this.information = true
                this.index = false
            }
        },
        getData3(){
           let roleId = JSON.parse(sessionStorage.getItem('roleId'))
            this.getRole(roleId)
        },
        getRole(roleId){
            getJurisdiction(roleId).then(res=>{
                console.log(res)
                if(res.data){
                   let data = res.data.templateDTOs
                   data.homepage.forEach(ele => {
                       ele.checked = ele.checkState==1?true:false
                   });
                   data.curve.forEach(ele => {
                       ele.checked = ele.checkState==1?true:false
                   });
                   this.homepage = data.homepage  
                   this.curve = data.curve
                }
            })
        },
        indexChange(e){
            console.log(e)
            this.indexId = e
            sessionStorage.setItem('templateIndex',e)
        },
        informationChange(e){
            console.log(e)
            this.informationId = e
            sessionStorage.setItem('templateInformation',e)
        }
    }
}
</script>
<style lang="less" scoped>
.action3-box {
    border: 1px solid #e6e6e6;
    /deep/.ivu-tabs-nav-scroll {
        background: #F4F4F4;
        border-bottom: 1px solid #e6e6e6;
    }
    .index-box,.information-box{
        padding:0 20px;
        /deep/.ivu-radio-wrapper{
            height: 30px;
            font-size: 13px;
        }
    }
}
</style>