<template>
    <div class="index-box" :style="{height: height+'px'}">
        <Tabs :value="value">
            <TabPane label="我的下载" name="name1">
                <div class="c-left-border-blue">
                   <div>
                       <Input v-model="value" placeholder="文档名称或文档标签" style="width: 200px;margin-right:5px" size="small"  />
                       <Button type="primary" size="small" style="font-size:12px">搜索</Button>
                   </div>
                </div>
                <div class="c-top-border-gray">
                    <Table stripe :columns="downloadList" size="small">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                            <Button class="action" size="small">查看</Button>
                        </template>
                    </Table>
                    <Page :total="100" show-elevator class="page" />
                </div>
            </TabPane>
            <TabPane label="我的上传" name="name2">
                <div class="c-left-border-blue">
                   <div>
                       <Input v-model="value" placeholder="文档名称或文档标签" style="width: 200px;margin-right:5px" size="small"  />
                       <Button type="primary" size="small" style="font-size:12px">搜索</Button>
                   </div>
                </div>
                <div class="c-top-border-gray">
                    <Table stripe :columns="uploadList" size="small">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                            <Button class="action" size="small">查看</Button>
                        </template>
                    </Table>
                    <Page :total="100" show-elevator class="page" />
                </div>
            </TabPane>
            <TabPane label="我的收藏" name="name3">
                 <div class="c-left-border-blue">
                   <div>
                       <Input v-model="value" placeholder="文档名称或文档标签" style="width: 200px;margin-right:5px" size="small"  />
                       <Button type="primary" size="small" style="font-size:12px">搜索</Button>
                   </div>
                </div>
                <div class="c-top-border-gray">
                    <Table stripe :columns="collectList" size="small">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                            <Button class="action" size="small">查看</Button>
                        </template>
                    </Table>
                    <Page :total="100" show-elevator class="page" />
                </div>
            </TabPane>
            <TabPane label="推荐我的" name="name4">
                <div class="c-left-border-blue">
                   <div>
                       <Input v-model="value" placeholder="文档名称或文档标签" style="width: 200px;margin-right:5px" size="small"  />
                       <Button type="primary" size="small" style="font-size:12px">搜索</Button>
                   </div>
                </div>
                <div class="c-top-border-gray">
                    <Table stripe :columns="recommendList" size="small">
                        <template slot-scope="{ row }" slot="name">
                            <strong>{{ row.name }}</strong>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <!-- <Button class="action" size="small" style="margin-right: 5px;">配置</Button> -->
                            <Button class="action" size="small">查看</Button>
                        </template>
                    </Table>
                    <Page :total="100" show-elevator class="page" />
                </div>
            </TabPane>
            <TabPane label="我的标签" name="name5">
                <div class="my-label-content">
                    <div class="label-div">
                        <h3>已选标签</h3>
                        <ul>
                            <li v-for="(item,index) in showList" :key="index" @mouseenter="showClose(index)" @mouseleave="hideColse(index)">
                                <span>{{ item.label }}</span>
                                <!-- -->
                                <Icon type="ios-close-circle-outline"  class="icon-label" v-if="item.show" />
                            </li>
                            
                        </ul>
                    </div>
                    <div class="label-div">
                        <h3>更多标签</h3>
                        <div class="dropdown">
                            <Collapse simple accordion>
                                <Panel name="1" >
                                    设备运维
                                    <div slot="content" class="cmp-tab">
                                        <a href="javascript:;" v-for="(item, index) in typeList" 
                                        :key="index" @click="typeCheck(item.id,index)" 
                                        :class="{checked:typeBox.includes(item.id)}">{{ item.label }}</a>
                                    </div>
                                </Panel>
                                <Panel name="2" >
                                    生产运营
                                <div slot="content" class="cmp-tab">
                                        <a href="javascript:;" v-for="(item, index) in produceList" 
                                        :key="index" @click="typeSelect(item.id,index)" 
                                        :class="{checked:produceBox.includes(item.id)}">{{ item.label }}</a>
                                    </div>
                                </Panel>
                                <Panel name="3" >
                                    管理制度
                                    <div slot="content" class="cmp-tab">
                                        <a href="javascript:;" v-for="(item, index) in manageList" 
                                        :key="index" @click="typeSelectM(item.id,index)" 
                                        :class="{checked:manageBox.includes(item.id)}">{{ item.label }}</a>
                                    </div>
                                </Panel>
                            </Collapse>
                            <div class="finish-btn" >
                                <button @click="finish()">完成</button>
                            </div>
                        </div>
                    </div>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            height:'',
            value:'name1',
            downloadList: [
                {
                    title: '文档名称',
                    key: 'name'
                },
                {
                    title: '文档标签',
                    key: 'tag'
                },
                {
                    title: '文档大小',
                    key: 'size'
                },
                {
                    title: '上传人员',
                    key: 'person'
                },
                {
                    title: '下载时间',
                    key: 'time'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            uploadList: [
                {
                    title: '文档名称',
                    key: 'name'
                },
                {
                    title: '文档标签',
                    key: 'tag'
                },
                {
                    title: '文档大小',
                    key: 'size'
                },
                {
                    title: '下载次数',
                    key: 'times'
                },
                {
                    title: '推荐次数',
                    key: 'recommendTimes'
                },
                {
                    title: '上传时间',
                    key: 'upladTime'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            collectList: [
                {
                    title: '文档名称',
                    key: 'name'
                },
                {
                    title: '文档标签',
                    key: 'tag'
                },
                {
                    title: '文档大小',
                    key: 'size'
                },
                {
                    title: '上传人员',
                    key: 'person'
                },
                {
                    title: '收藏时间',
                    key: 'collectTime'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            recommendList :[
                {
                    title: '文档名称',
                    key: 'name'
                },
                {
                    title: '文档标签',
                    key: 'tag'
                },
                {
                    title: '文档大小',
                    key: 'size'
                },
                {
                    title: '推荐人',
                    key: 'person'
                },
                {
                    title: '推荐时间',
                    key: 'recommendTime'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            selectedList:[],
            typeBox:[],
            produceBox:[],
            manageBox:[],
            typeList:[
                {id:1,label:'设备管理制度',show:false},
                {id:2,label:'巡检管理',show:false},
                {id:3,label:'维修管理',show:false},
                {id:4,label:'养护管理',show:false}
            ],
            produceList:[
                {id:5,label:'生产指标',show:false},
                {id:6,label:'安全制度',show:false},
                {id:7,label:'报警预案',show:false},
                {id:8,label:'工艺流程',show:false}
            ],
            manageList:[
                {id:9,label:'人事制度',show:false},
                {id:10,label:'财务制度',show:false}
            ],
            showList:[],
            tempList:[]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-46
    },
    created() {
        this.value=this.$route.query.name
    },
    methods: {
        typeCheck(i,index) {
            console.log(i)
            if(this.typeBox.includes(i)) {
                this.typeBox = this.typeBox.filter((ele) => {
                    return ele != i
                });
            } else {
                this.typeBox.push(i);
                this.selectedList.push(this.typeList[index])
            }
        },
        typeSelect(i,index) {
            if(this.produceBox.includes(i)) {
                this.produceBox = this.produceBox.filter((ele) => {
                    return ele != i
                });
            } else {
                this.produceBox.push(i);
                this.selectedList.push(this.produceList[index])
            }
        },
        typeSelectM(i,index) {
             if(this.manageBox.includes(i)) {
                this.manageBox = this.manageBox.filter((ele) => {
                    return ele != i
                });
            } else {
                this.manageBox.push(i);
                this.selectedList.push(this.manageList[index])
            }
        },
        finish(){
            console.log(this.typeBox)
            this.showList=this.selectedList
        },
        showClose(index){
            this.showList[index].show=true
        },
        hideColse(index){
            this.showList[index].show=false
        }
    }
}
</script>
<style lang="less" scoped>
.index-box{
    border-top: 5px solid #f0f0f0;
    background: #fff;
    .c-left-border-blue{
        padding: 5px;
        border-radius: 3px;
        div{
            height: 33px;
            display: flex;
            align-items:  center;
            font-size: 13px;
            margin-left: 3px;
        }
    }
    .c-top-border-gray{
        padding: 10px;
        border-top: 5px solid #f0f0f0;
        .page{
            text-align: right;
            margin-top: 10px;
        }
    }
    .my-label-content{
        display: flex;
        padding: 5px 10px;
        .label-div{
            width: 50%;
            padding: 10px;
            h3{
                margin-bottom: 15px;
            }
            li{
                position: relative;
                z-index: 1;
                float: left;
                padding: 0 10px;
                margin: 5px;
                height: 26px;
                line-height: 26px;
                list-style: none;
                color: #8190a5;
                border-radius: 4px;
                background-color: #eef1f7;
                cursor: pointer;
                font-size: 13px;
                .icon-label{
                    position: absolute;
                    top: 0;
                    right: 0;
                    color: #8190a5;
                    font-size: 18px;
                    transform: translate(40%, -40%);
                }
            }
            .dropdown{
               width: 100%;
                // border: 1px solid #ededed;
                background: #fff;
                margin-top: 5px;
                padding: 5px 10px;
                border-radius: 4px;
                .cmp-tab {
                    display: inline-block;
                    a {
                        margin-right: 20px;
                        color: #8190a5;
                        background: #eef1f7;
                        padding: 0 10px;
                        height: 26px;
                        line-height: 26px;
                        font-size: 10px;
                        display: inline-block;
                        border-radius: 4px;
                    }
                    .checked {
                        color: #184fd8;
                        background-color: #e8effd;
                    }
                }
                .finish-btn{
                    text-align: center;
                    margin: 20px 0;
                    button{
                        min-width: 130px;
                        margin: 0 15px;
                        color: #fff;
                        background-color: #4b7efe;
                        border: 0;
                    }
                }
            }
        }
        .label-div:first-child{
            border-right:2px solid #ededed
        }
    }
}
</style>