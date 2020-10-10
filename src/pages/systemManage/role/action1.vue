<template>
    <div class="action1-box">
        <Tabs :animated="false" @on-click="handleChangeData">
            <TabPane label="区域视角" name="area"></TabPane>
            <TabPane label="仓库权限" name="warehouse"></TabPane>
        </Tabs>
        <div class="action1-tab">
            <div class="area-box" v-if="area">
                 <Tree :data="processTree" show-checkbox multiple class="demo-tree-render" empty-text="暂无数据"></Tree>
            </div>
            <div class="warehouse-box" v-if="warehouse">
                 <Tree :data="warehouseTree" show-checkbox multiple class="demo-tree-render" empty-text="暂无数据"></Tree>
            </div>
        </div>
    </div>
</template>
<script>
import createTree from '@/libs/public-util'
import { getJurisdiction} from '@api/system/role';
export default {
    name: 'actionOne',
    data() {
        return {
            area: true,
            warehouse: false,
            processTree:[],
            warehouseTree:[]
        }
    },
    methods: {
        handleChangeData(name) {
            if(name == 'area') {
                this.area = true
                this.warehouse = false
            } else if (name == 'warehouse') {
                this.warehouse = true
                this.area = false
            }
        },
        getData(){
            let roleId = JSON.parse(sessionStorage.getItem('roleId'))
            console.log(roleId)
            this.getRole(roleId)
           
        },
         getRole(roleId){
            getJurisdiction(roleId).then(res=>{
                console.log(res)
                if(res.data){
                     // 区域视角
                     let data = res.data
                    let processDTOs=[]
                    let trees= data.processDTOs
                    for(let i = 0; i < trees.length; i ++) {
                        trees[i].title = trees[i].name
                        trees[i].checked = trees[i].checkState==1?true:false
                        processDTOs.push(trees[i])
                    }
                    this.processTree = createTree(processDTOs)
                    // console.log(this.processTree)
                    // 仓库
                    let warehouseDTOs = data.warehouseDTOs
                    let wareArr=[]
                    for(let j = 0; j < warehouseDTOs.length; j ++) {
                        warehouseDTOs[j].title = warehouseDTOs[j].name
                        warehouseDTOs[j].checked = warehouseDTOs[j].checkState==1?true:false
                        wareArr.push(warehouseDTOs[j])
                    }
                    this.warehouseTree = wareArr
                }
            })
        },
       
    },
    
}
</script>
<style lang="less" scoped>
.action1-box {
    border: 1px solid #e6e6e6;
    /deep/.ivu-tabs-nav-scroll {
        background: #F4F4F4;
        border-bottom: 1px solid #e6e6e6;
    }
}
</style>