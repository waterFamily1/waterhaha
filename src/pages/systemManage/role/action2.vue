<template>
    <div class="action2-box">
        <div class="action2-left">
            <h4 class="role-autho-h4">模块权限</h4>
            <div class="role-autho-tab">
                <Tabs :animated="false" @on-click="handleChangeData">
                    <TabPane label="平台" name="web">
                         <Tree :data="webbaseData" show-checkbox multiple class="demo-tree-render" @on-check-change="getWebCheck"></Tree>
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
                        <CheckboxGroup  @on-change="checkChange">
                            <!-- 回显有问题 -->
                           <Checkbox  :label="action.id" v-for="(action,idx) in item.menuOperDTOs"  :key="idx">{{indicate[action.operation]}}</Checkbox>
                        </CheckboxGroup> 
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { getJurisdiction,appCheck,webCheck} from '@api/system/role';
import indicate from '@/libs/indicate_str'
export default {
    name: 'actionTwo',
    data (){
      return {
          webbaseData:[],
          appbaseData:[],
          webOperDTOs:[],
          currentOperDTOs:[],
          appOperDTOs:[],
          name:'web',
          operation:'',
          roleId:'',
          tempArr:[],
          indicate:{},
          appmenuIds:'',
          webmenuIds:'',
          appoperIds:'',
          weboperIds:[]
      }
    },
    methods:{
        getData2(){
            this.indicate= indicate
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
                    let tree=[],webIds=[],webOperIds=[]
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
                    let apptree=[],appIds=[]
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
                         this.webOperDTOs.forEach(ele=>{
                            ele.menuOperDTOs.forEach(item=>{
                                item.checked = item.state==1?true:false
                            })
                        })
                        console.log(this.webOperDTOs)
                        this.currentOperDTOs = this.webOperDTOs
                    } else if (this.name == 'app') {
                       this.currentOperDTOs = this.appOperDTOs
                    }
                }
            })
        },
        checkChange(data){
           console.log(data)
           if(this.name =="web"){
               this.weboperIds .push(data[0])
                sessionStorage.setItem('weboperIds',this.weboperIds.join(','))
           }else{
               this.appoperIds += data[0]
               sessionStorage.setItem('appoperIds','')
           }
        },
        getAppCheck(data,item){
            let arr=[]
            data.forEach(element => {
                arr.push(element.id)
            });
            this.appmenuIds = arr.join(',')
            console.log(this.appmenuIds)
            sessionStorage.setItem('appmenuIds',this.appmenuIds)
            if(item.checked){
                appCheck(item.id,this.roleId).then(res=>{
                    if(res.data){
                        if(this.appOperDTOs.length!=0){
                            this.appOperDTOs.filter(item => item.menuId== item.id)
                            this.appOperDTOs.push(res.data[0]) 
                        }else{
                             this.appOperDTOs.push(res.data[0])
                        }
                    }
                
                })
            }else{
                this.appOperDTOs.forEach((ele,index)=>{
                    if(ele.menuId == item.id) {
                         this.appOperDTOs.splice(index,1)
                    }
                })
            }
            
        },
        getWebCheck(data,item){
            let arr=[]
            data.forEach(element => {
                arr.push(element.id)
            });
            this.webmenuIds = arr.join(',')
            console.log(this.webmenuIds)
            sessionStorage.setItem('webmenuIds',this.webmenuIds)
            if(item.checked){
                let menuId;
                if(!item.children){
                   menuId = item.id
                }else{
                    let arr=[]
                    item.children.forEach(ele=>{
                        arr.push(ele.id)
                    })
                    menuId=arr.join(",")
                }
                webCheck(menuId,this.roleId).then(res=>{
                    console.log(res)
                    if(res.data){
                        let result = res.data
                    
                        if(this.webOperDTOs.length!=0){
                            result.forEach(ele=>{
                                this.webOperDTOs.filter(node=> node.menuId == ele.id)

                                this.webOperDTOs.push(ele)
                            })
                            
                        }else{
                            result.forEach(ele=>{
                                this.webOperDTOs.push(ele)
                            })
                        }
                        console.log(this.webOperDTOs)
                        this.currentOperDTOs = this.webOperDTOs
                    }
                })
            }else{
               if(!item.children){
                    this.webOperDTOs.forEach((ele,index)=>{
                        if(ele.menuId == item.id) {
                            this.webOperDTOs.splice(index,1)
                        }
                   })
               }else{
                    item.children.forEach(node=>{
                        this.webOperDTOs.forEach((ele,index)=>{
                            if(ele.menuId == node.id) {
                                this.webOperDTOs.splice(index,1)
                            }
                        })
                    })
               }
            }
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
        padding:0 5px;
        font-size: 12px;
    }
    /deep/.ivu-checkbox-group{
        margin-top: 10px;
    }
}
</style>