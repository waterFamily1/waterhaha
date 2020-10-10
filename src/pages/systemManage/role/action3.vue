<template>
    <div class="action3-box">
        <Tabs :animated="false" @on-click="handleChangeData">
            <TabPane label="首页模板" name="index"></TabPane>
            <TabPane label="数据曲线模版" name="information"></TabPane>
        </Tabs>
        <div class="action3-tab">
            <div class="index-box" v-if="index">
                 <div v-if="homepage.length==0">暂无数据</div>
                 <Radio v-else  :checked="item.checkState==1?true:false" v-for="(item,index) in homepage" :key="index">{{item.name }}</Radio>
            </div>
            <div class="information-box" v-if="information">
                 <div v-if="curve.length==0">暂无数据</div>
                <Radio v-else :checked="item.checkState==1?true:false" v-for="(item,index) in curve" :key="index">{{item.name }}</Radio>
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
                   this.homepage = data.homepage 
                   this.curve = data.curve
                }
            })
        },
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