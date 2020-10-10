<template>
    <div class="tab-main">
        <Tabs :animated="false" type="line" @on-click="handleChangeData">
            <TabPane label="数据权限" name="action1"></TabPane>
            <TabPane label="操作权限" name="action2"></TabPane>
            <TabPane label="个性配置" name="action3"></TabPane>
        </Tabs>
        <div class="tab-content">
            <action-one v-show="action1" ref="tabOne"></action-one>
            <action-two v-show="action2" ref="tabTwo"></action-two>
            <action-three v-show="action3" ref="tabThree"></action-three>
        </div>
    </div>
</template>
<script>
import actionOne from './action1'
import actionTwo from './action2'
import actionThree from './action3'


export default {
    name: 'tabUser',
    data() {
        return {
            action1: true,
            action2: false,
            action3: false
        }
    },
    components: {
        actionOne,
        actionTwo,
        actionThree
    },
    methods: {
        handleChangeData(name) {
            let roleId = JSON.parse(sessionStorage.getItem('roleId'))
            if(name == 'action1') {
                this.action1 = true
                this.action2 = false
                this.action3 = false
                if(!roleId)return
                this.$refs.tabOne.getData();
            } else if (name == 'action2') {
                this.action2 = true
                this.action1 = false
                this.action3 = false
                if(!roleId)return
                this.$refs.tabTwo.getData2()
            } else if (name == 'action3') {
                this.action3 = true
                this.action1 = false
                this.action2 = false
                if(!roleId)return
                this.$refs.tabThree.getData3()
            }
        },
        dataRole(){
            if(this.action1){
                this.$refs.tabOne.getData();
            }else if(this.action2){
                this.$refs.tabTwo.getData2()
            }else{
                this.$refs.tabThree.getData3()
            }
            
           
        },
    }
}
</script>
<style lang="less" scoped>
.tab-main {
    width: 100%;
    padding-left: 10px;
    /deep/.ivu-tabs-bar {
        /deep/.ivu-tabs-tab {
            font-size: 13px;
        }
    }
}
</style>