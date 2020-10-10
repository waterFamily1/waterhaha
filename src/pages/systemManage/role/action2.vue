<template>
    <div class="action2-box">
        <div class="action2-left">
            <h4 class="role-autho-h4">模块权限</h4>
            <div class="role-autho-tab">
                <Tabs :animated="false" @on-click="handleChangeData">
                    <TabPane label="平台" name="web">
                         <Tree :data="webbaseData" show-checkbox multiple class="demo-tree-render"></Tree>
                    </TabPane>
                    <TabPane label="APP" name="app">
                         <Tree :data="appbaseData" show-checkbox ref="tree" class="demo-tree-render"  @on-check-change="getAppCheck"></Tree>
                    </TabPane>
                </Tabs>
            </div>
        </div>
        <div class="action2-right">
            <h4 class="role-autho-h4">操作权限</h4>
            <ul>
                <li v-for="(item,index) in currentOperDTOs" :key="index" >
                    <div class="role-autho-oper-h5">{{ item.menuName }}</div>
                    <div class="role-autho-opers" v-if="item.menuOperDTOs.length!=0">
                        <CheckboxGroup v-model="operation" @on-change="checkChange">
                           <Checkbox :label="action.operation" v-for="(action,idx) in item.menuOperDTOs" :key="idx"></Checkbox>
                            <!-- <Checkbox label="谢谢"></Checkbox> -->
                        </CheckboxGroup> 
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { getJurisdiction,appCheck,webCheck} from '@api/system/role';
export default {
    name: 'actionTwo',
    data (){
      return {
          webbaseData:[],
          appbaseData:[],
          webOperDTOs:[],
          currentOperDTOs:[],
          appOperDTOs:[],
          name:'',
          operation:'',
          roleId:'',
          tempArr:[]
      }
    },
    methods:{
        getData2(){
            let roleId = JSON.parse(sessionStorage.getItem('roleId'))
            console.log(roleId)
            this.roleId = roleId
            this.getRole(roleId)
           
        },
        drawTree(treeItem){
            let  parent=treeItem.filter(item => item.parentId == 0)
            treeItem.forEach(element => {
                 if (element.parentId == 0) return
                 this.draw(element,parent)
            });
            return parent;
        },
        draw(item,arr){
            for(var i=0;i<arr.length;i++) {
                if(item.parentId==arr[i].id){
                    if( !(arr[i].children &&  arr[i].children.length>0)){
                        arr[i].children = []
                    }
                    arr[i].children.push(item)

                }else if(arr[i].children && arr[i].children.length>0){
                    this.draw(item,arr[i].children)
                }
            }
        },
        handleChangeData(name){
            this.name = name
            if(name == 'web') {
                this.currentOperDTOs = this.webOperDTOs
            } else if (name == 'app') {
               this.currentOperDTOs = this.appOperDTOs
            }

        },
        getRole(roleId){
            getJurisdiction(roleId).then(res=>{
                console.log(res)
                if(res.data){
                     // 模块权限
                    // 平台
                    let data = res.data
                    let trees = data.webMenuDTOs
                    let tree=[]
                    for(let i = 0; i < trees.length; i ++) {
                        trees[i].title = trees[i].name
                        if(trees[i].state == -1){
                            trees[i].disabled = true
                        }else{
                            trees[i].checked = trees[i].state==1?'true':false
                        }
                    
                        tree.push(trees[i])
                    }
                    this.webbaseData=this.drawTree(tree)
                    // app
                    let apptrees = data.appMenuDTOs
                    let apptree=[]
                    for(let i = 0; i < apptrees.length; i ++) {
                        apptrees[i].title = apptrees[i].name
                        if(apptrees[i].state == -1){
                            apptrees[i].disabled = true
                        }else{
                            apptrees[i].checked = apptrees[i].state==1?'true':false
                        }
                    
                        apptree.push(apptrees[i])
                    }
                    this.appbaseData=this.drawTree(apptree)

                    // 操作权限
                    this.webOperDTOs = data.webOperDTOs
                    this.appOperDTOs = data.appOperDTOs
                    if(this.name == 'web') {
                        this.currentOperDTOs = this.webOperDTOs
                    } else if (this.name == 'app') {
                    this.currentOperDTOs = this.appOperDTOs
                    }
                }
            })
        },
        checkChange(data){
           console.log(data)
        },
        getAppCheck(data){
            let tempArr=[]
            appCheck(data[data.length-1].id,this.roleId).then(res=>{
                if(res.data){
                    tempArr.push(res.data[0])
                    if(this.appOperDTOs.length==0){
                        this.appOperDTOs=this.appOperDTOs.concat(tempArr)
                    }else{

                    }
                }
               
            })
        }
    }
}
</script>
<style lang="less" scoped>
.action2-box {
    li{
        list-style: none;
    }
    li:not(:first-child){
        margin-top: 10px;
    }
    .action2-left {
        float: left;
        width: 48%;
        border: 1px solid #e6e6e6;
    }
    .action2-right {
        float: right;
        width: 48%;
        border: 1px solid #e6e6e6;
        color: #495060;
        font-size: 13px;
    }
    .role-autho-h4 {
        height: 35px;
        line-height: 35px;
        border-bottom: 1px solid #e6e6e6;
        background-color: #F4F4F4;
        text-indent: 10px;
    }
    .role-autho-oper-h5{
        background-color: #E5E8E9;
        height: 24px;
        line-height: 24px;
        padding-left: 5px;
    }
    .role-autho-opers{
        padding:5px 0 5px 5px;
        font-size: 12px;
    }
}
</style>