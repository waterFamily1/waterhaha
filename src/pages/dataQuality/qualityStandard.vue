<template>
    <div class="quality-wrap" :style="{height: height+'px'}">
        <div class="log-content">
            <div class="c-table-top-btns">
                <Button @click="edit()" v-if="!isEdit">编辑</Button>
                <Button @click="save()" v-else>保存</Button>
                <Button @click="recoverDefault()">默认恢复</Button>
            </div>
            <div class="table-wrapper">
                <Table stripe :columns="tableList" :data="tableData">
                    <!-- <template slot-scope="{ row, index }" slot="level">
                        <Input type="text" v-model="editName" v-if="editIndex === index" />
                        <InputNumber :max="10" :min="1" v-model="value1"></InputNumber>
                        <span v-else>{{ row.name }}</span>
                    </template> -->
                </Table>
            </div>
        </div>
    </div>
</template>
<script>
import { getData,recover,saveEdit} from '@api/dataQuality/standard';
export default {
    name: 'qualityStandard',
    data() {
        return {
            height: '',
            tableList: [
                {
                    title: ' ',
                    key: 'level',
                    width: '80',
                    render: (h, params) => {
                        let row = params.row
                        let text = row.level==4?'优':row.level == 3?'良':row.level == 2 ?'中':'差'
                        return h('div',text);
                    }
                },
                {
                    title: '准确性',
                    key: 'accuracy',
                    render: (h, params) => {
                        let row = params.row
                        // console.log(row)
                        let text = row.level!=1?'>='+row.accuracy+'%':'< '+row.accuracy+'%'
                        if(!this.isEdit){
                            return h('div', text);
                        }else{
                            return h('span', [
                                h('span', row.level!=1?'>=':'< '),
                                h('InputNumber',{
                                    props :{
                                        value : row.accuracy,  
                                        size: 'small',
                                        max:100,
                                        min:0
                                    },
                                    style: {
                                        width:'70px',
                                        fontSize:'12px'
                                    },
                                    on:{
                                        'on-change':(e) => {
                                            console.log(e)
                                            params.row.accuracy = e
                                            this.tableData[params.index] = params.row
                                        }
                                    }
                                }),
                                h('span','%')
                                ],
                            );
                        }                        
                    }
                },
                {
                    title: '完整性',
                    key: 'completeness',
                    render: (h, params) => {
                        let row = params.row
                        let text = row.level!=1?'>='+row.completeness+'%':'< '+row.completeness+'%'
                        if(!this.isEdit){
                            return h('div', text);
                        }else{
                            return h('span', [
                                h('span', row.level!=1?'>=':'< '),
                                h('InputNumber',{
                                    props :{
                                        value : row.completeness,  
                                        size: 'small',
                                        max:100,
                                        min:0
                                    },
                                    style: {
                                        width:'70px',
                                        fontSize:'12px'
                                    },
                                    on:{
                                        'on-change':(e) => {
                                            console.log(e)
                                            params.row.completeness = e
                                            this.tableData[params.index] = params.row
                                        }
                                    }
                                }),
                                h('span','%')
                                ],
                            );
                        }
                    }
                },
                {
                    title: '及时性',
                    key: 'timeliness',
                    render: (h, params) => {
                        let row = params.row
                        let text = row.level!=1?'<='+row.timeliness+'s':'> '+row.timeliness+'s'
                        if(!this.isEdit){
                            return h('div', text);
                        }else{
                            return h('span', [
                                h('span', row.level!=1?'<=':'> '),
                                h('InputNumber',{
                                    props :{
                                        value : row.timeliness,  
                                        size: 'small',
                                        min:0
                                    },
                                    style: {
                                        width:'70px',
                                        fontSize:'12px'
                                    },
                                    on:{
                                        'on-change':(e) => {
                                            // console.log(e)
                                            params.row.timeliness = e
                                            this.tableData[params.index] = params.row
                                        }
                                    }
                                }),
                                h('span','s')
                                ],
                            );
                        }
                    }
                },
                {
                    title: '一致性',
                    key: 'consistency',
                    render: (h, params) => {
                        // console.log(params)
                        let row = params.row
                        let text = row.level!=1?'>='+row.consistency+'%':'< '+row.consistency+'%'
                        if(!this.isEdit){
                            return h('div', text);
                        }else{
                            return h('span', [
                                h('span', row.level!=1?'>=':'< '),
                                h('InputNumber',{
                                    props :{
                                        value : row.consistency,  
                                        size: 'small',
                                        max:100,
                                        min:0
                                    },
                                    style: {
                                        width:'70px',
                                        fontSize:'12px'
                                    },
                                    on:{
                                        'on-change':(e) => {
                                            params.row.consistency = e
                                            this.tableData[params.index] = params.row
                                        }
                                    }
                                }),
                                h('span','%')
                                ],
                            );
                        }
                    }
                },
            ],
            tableData: [],
            isEdit:false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getTable()
    },
    methods: {
        getTable(){
            getData().then(res=>{
                console.log(res)
                if(res.data){
                    this.tableData = res.data
                }
            })
        },
        edit(){
           this.isEdit = true
        },
        recoverDefault(){
            this.isEdit = false
            recover().then(res=>{
                console.log(res)
                if(res.data.count){
                    this.getTable()
                    this.$Message.success('数据保持成功');
                }
            })
        },
        save(){
            console.log(this.tableData)
            let data = this.tableData
            let accuracy1 = Number(data[0].accuracy),accuracy2 = Number(data[1].accuracy),accuracy3 = Number(data[2].accuracy),
            accuracy4 = Number(data[3].accuracy)
            if(!((accuracy1>accuracy2)&&(accuracy2>accuracy3)&&(accuracy3>=accuracy4))){
              this.$Message.warning('准确性标准填写有误');
              return
            }
            let completeness1 = Number(data[0].completeness),completeness2 = Number(data[1].completeness),completeness3 = Number(data[2].completeness),
            completeness4 = Number(data[3].completeness)
            if(!((completeness1>completeness2)&&(completeness2>completeness3)&&(completeness3>=completeness4))){
              this.$Message.warning('完整性标准填写有误');
              return
            }
            let consistency1 = Number(data[0].consistency),consistency2 = Number(data[1].consistency),consistency3 = Number(data[2].consistency),
            consistency4 = Number(data[3].consistency)
            if(!((consistency1>consistency2)&&(consistency2>consistency3)&&(consistency3>=consistency4))){
              this.$Message.warning('一致性标准填写有误');
              return
            }
             let timeliness1 = Number(data[0].timeliness),timeliness2 = Number(data[1].timeliness),timeliness3 = Number(data[2].timeliness),
            timeliness4 = Number(data[3].timeliness)
            if(!((timeliness1<timeliness2)&&(timeliness2<timeliness3)&&(timeliness3<=timeliness4))){
              this.$Message.warning('及时性标准填写有误');
              return
            }
            saveEdit(this.tableData).then(res=>{
                if(res.data.count){
                    this.isEdit = false
                    this.$Message.success('数据保持成功');
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.quality-wrap {
    margin: 5px;
    background: #fff;
    .log-content {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-table-top-btns {
            height: 36px;
            border-bottom: 1px solid #EEE;
            .ivu-btn {
                height: auto;
                min-width: 50px;
                background: #576374;
                font-size: 12px;
                padding: 4px 12px;
                color: #fff;
                border: 0;
                border-radius: 3px;
                margin-right: 10px;
            }
        }
        .table-wrapper {
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