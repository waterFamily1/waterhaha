<template>
    <div class="tab-main">
        <Tabs :animated="false" type="line" @on-click="handleChangeData">
            <TabPane label="数据权限" name="action1"></TabPane>
            <TabPane label="操作权限" name="action2"></TabPane>
            <TabPane label="个性配置" name="action3"></TabPane>
        </Tabs>
        <div class="tab-content">
            <action-one v-if="action1"></action-one>
            <action-two v-if="action2"></action-two>
            <action-three v-if="action3"></action-three>
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
            if(name == 'action1') {
                this.action1 = true
                this.action2 = false
                this.action3 = false
            } else if (name == 'action2') {
                this.action2 = true
                this.action1 = false
                this.action3 = false
            } else if (name == 'action3') {
                this.action3 = true
                this.action1 = false
                this.action2 = false
            }
        }
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