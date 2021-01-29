<template>
    <div class="report-box" :style="{height: height+'px'}">
        <div class="report-main">
            <div class="report-tree-main">
                <div class="tree-select">
                    <AutoComplete
                        v-model="formName"
                        :data="formData"
                        :clearable="true"
                        @on-search="handleSearch"
                        placeholder="输入报表名称以检索"
                        size="small">
                    </AutoComplete>
                    <div class="tree-box">
                        <Tree :data="treeData" @on-select-change="selectNode" :render="renderContent"></Tree>
                    </div>
                </div>
            </div>
            <div class="report-iframe" style="overflow: auto;width: 1048px;height: 668px;">
                <!-- <i-frame src="https://www.iviewui.com" /> -->
                <div class="table-detail" v-if="show">
                    <div class="date" style="margin:2px 5px">
                        <DatePicker type="date" size="small" v-model="date" placeholder="Select date" style="width: 200px" @on-change="changeTime"></DatePicker>
                        <Button type="primary" size="small" style="font-size:12px;background:#576374;border-color:#576374;margin-left:8px" @click="exportTable()">导出</Button>
                    </div>
                    <table border="1px solid #eee" cellPadding="0" cellSpacing="0" width="100%" style="background:#2E457A;color:#fff"> 
                        <thead>
                            <tr>
                                <th style="font-weight:normal" rowspan="2">时间</th>
                                <th style="font-weight:normal" :colspan="item.con.length"  v-for="(item,index) in tableTile" :key="index">{{item.title}}</th>
                                <!-- <th style="font-weight:normal" colspan="2"></th> -->
                            </tr>
                            <tr>
                                <th style="font-weight:normal" class="report-group-th" v-for="(item,index) in mpoints" :key="index">{{item.mpointname}}</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getTree,getDetail,exportT} from '@api/productReport/report';
export default {
    name: 'reportBrowse',
    data() {
        return {
            height: '',
            formName: '',
            formData: [],
            treeData: [ ],
            id :{},
            date:'',
            mpoints:[],
            tableTile :[],
            show:false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getOrg()
        let now  = new Date()
        let year = now.getFullYear()
        let month = now.getMonth()+1
        month=month<10?'0'+month:month
        let day = now.getDate()
        day = day<10?'0'+day:day
        this.date = year+"-"+month+"-"+day
        if(this.$route.query.siteId){
            this.show = true
            this.id = this.$route.query.siteId
             this.geTempDetail()
        }
    },
    methods: {
         renderContent (h, { root, node, data }) {
            console.log(data)
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('span',{
                            // style:{
                            //    display: data.children.length==0?'none':'inline-block'
                            // }
                        }, data.title)
                    ])
                ]);
            },
        handleSearch (value) {
            this.formData = !value ? [] : [
                value,
                value + value,
                value + value + value
            ];
        },
        getOrg(){
            getTree().then(res=>{
                console.log(res)
                let arr = []
                arr = res.data.filter(item=>  !(item.id.includes('folder')))
                let trees = arr

                let tree=[]
                for(let i = 0; i < trees.length; i ++) {
                    if(trees[i].id == this.id){
                        trees[i].selected = true
                    }
                    trees[i].title = trees[i].name
                    trees[i].expand = true
                    tree.push(trees[i])
                }
                this.treeData=this.drawTree(tree)
            })
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
        geTempDetail(){
            let id = this.id.split('_')[1]
            let date =this.$moment(this.date).utc().format()
            getDetail(id,date).then(res=>{
                console.log(res)
                if(res.data){
                    this.mpoints = res.data.mpoints
                    let arr = res.data.mpoints
                    let temp = []
                    arr.forEach(item=>{
                        temp.push(item.groupname )
                    })
                    temp = new Set(temp)
                    let ary = []
                    temp.forEach(ele=>{
                        ary.push({
                            title:ele,
                            con:[]
                        })
                        
                    })
                    ary.forEach(ele=>{
                        this.mpoints.map(item=>{
                            if(item.groupname == ele.title){
                                ele.con.push(item)
                            }
                        })
                    })
                     this.tableTile = ary
                }
            })
        },
        selectNode(node){
            this.show = true
            this.id = node[0].id
            this.geTempDetail()
        },
        changeTime(time){
            this.date = time
            this.geTempDetail()
        },
        exportTable(){
            let id = this.id.split('_')[1]
            let date =this.$moment(this.date).utc().format()
            exportT(id,date).then(res=>{
                
            })
        }
    }
}
</script>
<style lang="less" scoped>
.report-box {
    margin: 5px;
    background: #fff;
    .report-main {
        display: flex;
        height: 100%;
        .report-tree-main {
            width: 300px;
            height: 100%;
            .tree-select {
                width: 100%;
                /deep/.ivu-select {
                    padding: 3px;
                }
                .tree-box {
                    border-top: 1px solid rgb(230, 230, 230);
                    width: 100%;
                }
            }
        }
        .report-iframe {
            width: 100%;
            border-left: 5px solid #f0f0f0;
            /deep/.i-frame {
                left: 310px;
            }
        }
        .report-group-th{
            background: #333!important;
        }
    }
}
</style>