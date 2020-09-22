<template>
    <div class="index-box" :style="{height: height+'px'}">
        <div class="view-content">
            <div class="view-content-search">
                <div>
                    <Button v-for="(item,index) in tabList" :key="item.id" :class="{active:num==index}" @click="swiperChange(index)">{{ item }}</Button>  
                </div> 
                <div  class="search-box">
                    <Input v-model="value" placeholder="文档名称或文档标签" size="small"/>  
                    <Icon type="ios-search-outline" />   
                </div>
                <div class="dropdown" v-if="dropdownShow">
                     <Collapse simple accordion>
                        <Panel name="1" >
                            设备运维
                            <div slot="content" class="cmp-tab">
                                <a href="javascript:;" v-for="(item, index) in typeList" 
                                :key="index" @click="typeCheck(item.id)" 
                                :class="{checked:typeBox.includes(item.id)}">{{ item.label }}</a>
                            </div>
                        </Panel>
                        <Panel name="2" >
                            生产运营
                           <div slot="content" class="cmp-tab">
                                <a href="javascript:;" v-for="(item, index) in produceList" 
                                :key="index" @click="typeSelect(item.id)" 
                                :class="{checked:produceBox.includes(item.id)}">{{ item.label }}</a>
                            </div>
                        </Panel>
                        <Panel name="3" >
                            管理制度
                             <div slot="content" class="cmp-tab">
                                <a href="javascript:;" v-for="(item, index) in manageList" 
                                :key="index" @click="typeSelectM(item.id)" 
                                :class="{checked:manageBox.includes(item.id)}">{{ item.label }}</a>
                            </div>
                        </Panel>
                    </Collapse>
                    <div class="finish-btn" >
                        <button @click="finish()">完成</button>
                    </div>
                </div>
            </div>
            <div class="view-list" >
                <div v-for='(itemCon,index) in tabContent' :key="index" v-show="index == num">{{itemCon}}</div>
            </div>
        </div>
        <div class="view-side">
            <div class="view-side-box">
                <h3>知识统计</h3>
                <div class="detail">
                    <span class="view-side-num">
                       <label for="">文档总数：</label>
                       <em>0</em>
                    </span>
                    <span class="view-side-num">
                       <label for="">当月新增数：</label>
                       <em style="color:#00ae27">0</em>
                    </span>
                    <ul class="view-side-sta">
                        <li>
                            <label for="">上传文档最多用户</label>
                            <em>0</em>
                        </li>
                        <li>
                            <label for="">下载次数最多文档</label>
                            <em>0</em>
                        </li>
                        <li>
                            <label for="">收藏次数最多文档</label>
                            <em>0</em>
                        </li>
                        <li>
                            <label for="">推荐次数最多文档</label>
                            <em>0</em>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="view-side-box">
                <h3>我的知识</h3>
                <div class="detail">
                    <ul class="view-side-mine">
                        <li @click="gotoMine('name2')">
                           <i class="upload"></i>
                            <span>
                                <em>0</em>
                                <label for="">我的上传</label>
                            </span>
                        </li>
                        <li @click="gotoMine('name1')">
                            <i class="download"></i>
                            <span>
                                 <em>0</em>
                                <label for="">我的下载</label>
                            </span>
                        </li>
                        <li @click="gotoMine('name3')">
                            <i class="collection"></i>
                            <span>
                                <em>0</em>
                                <label for="">我的收藏</label>                               
                            </span>
                        </li>
                        <li @click="gotoMine('name4')">
                            <i class="appreciate"></i>
                            <span>
                                <em>0</em>
                                <label for="">推荐我的</label>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="view-side-box">
                <h3>最新上传</h3>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'knowledgeOverview',
    data (){
        return {
            height:'',
            tabList:['推荐','最热','全部'],
            tabContent:[
                1,2,3
            ],
            num:0,
            value:'',
            dropdownShow:false,
            typeBox:[],
            produceBox:[],
            manageBox:[],
            typeList:[
                {id:1,label:'设备管理制度'},
                {id:2,label:'巡检管理'},
                {id:3,label:'维修管理'},
                {id:4,label:'养护管理'}
            ],
            produceList:[
                {id:1,label:'生产指标'},
                {id:2,label:'安全制度'},
                {id:3,label:'报警预案'},
                {id:4,label:'工艺流程'}
            ],
            manageList:[
                {id:1,label:'人事制度'},
                {id:2,label:'财务制度'}
            ]
        }
    },
    methods:{
        swiperChange(index){
            this.num = index;
            if(index==2){
                this.dropdownShow=!this.dropdownShow
            }
        },
        typeCheck(i) {
            if(this.typeBox.includes(i)) {
                this.typeBox = this.typeBox.filter((ele) => {
                    return ele != i
                });
            } else {
                this.typeBox.push(i);
            }
        },
        typeSelect(i) {
            if(this.produceBox.includes(i)) {
                this.produceBox = this.produceBox.filter((ele) => {
                    return ele != i
                });
            } else {
                this.produceBox.push(i);
            }
        },
        typeSelectM(i) {
             if(this.manageBox.includes(i)) {
                this.manageBox = this.manageBox.filter((ele) => {
                    return ele != i
                });
            } else {
                this.manageBox.push(i);
            }
        },
        finish(){
            this.dropdownShow=false
        },
        gotoMine(params){
            this.$router.push({
                path:'/knowledgeManage/myKnowledge',
                query: {
                    name:params
                }
            })
        },
    },
    mounted() {
        this.height = document.body.clientHeight-46
    },
}
</script>
<style lang="less" scoped>
.index-box{
    border-top: 5px solid #f0f0f0;
    display: flex;
    .view-content{
        position: relative;
        flex-grow: 1;
        margin-right: 5px;
        border-radius: 2px;
        background-color: #fff;
        height: 100%;
        .view-content-search{
            height: 40px;
            padding: 5px 10px;
            border-bottom: 1px solid #ededed;
            display: flex;
            justify-content: space-between;
            button{
                height: 25px;
                margin-right: 5px;
                font-size: 12px;
                border: 0;
                color: #fff;
                background: #c8c8c8;
            }
            .active{
                background: #4b7efe;
            }
            .search-box{
                width: 200px;
                position: relative;
                .ivu-icon{
                    position: absolute;
                    right: 0;
                    font-size: 18px;
                    top: 3px;
                }
            }
            .dropdown{
                position: absolute;
                top: 30px;
                left: 1%;
                width: 98%;
                border: 1px solid #ededed;
                background: #fff;
                z-index: 9;
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
                    }
                }
            }
        }
    }
    .view-side{
        flex-grow: 0;
        flex-shrink: 0;
        width: 350px;
        position: relative;
        z-index: 1;
        .view-side-box{
            position: relative;
            width: 100%;
            height: 33%;
            padding-top: 40px;
            margin-bottom: 5px;
            border-radius: 2px;
            background-color: #fff;
            h3{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                padding-left: 10px;
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #ededed;
                color: #333;
            }
            .detail{
                display: flex;
                flex-wrap: wrap;
                padding: 0 10px 10px 10px;
                height: 100%;
                .view-side-num{
                    display: inline-block;
                    width: 49%;
                    height: 40px;
                    line-height: 40px;
                    label{
                        font-size: 12px;
                        color: #838A95;
                    }
                    em{
                        font-style: normal;
                        font-size: 16px;
                        font-weight: 700;
                        color: #4b7efe;
                    }

                }
                .view-side-sta{
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    li{
                        width: 50%;
                        margin-bottom: 10px;
                        list-style: none;
                        label{
                            display: block;
                            height: 20px;
                            line-height: 20px;
                            font-size: 12px;
                        }
                        em{
                            display: block;
                            height: 30px;
                            line-height: 30px;
                            font-style: normal;
                            font-size: 14px;
                            color: #787878;
                            font-weight: 700;
                        }
                    }
                }
                .view-side-mine{
                    display: flex;
                    flex-wrap: wrap;
                    width: 100%;
                    align-items: center;
                    li{
                        width: 50%;
                        margin-bottom: 5px;
                        margin-top: 5px;
                        text-align: center;
                        list-style: none;
                        cursor: pointer;
                        i{
                            display: inline-block;
                            width: 50px;
                            height: 50px;
                            margin-right: 10px;
                            font-size: 50px;
                            vertical-align: bottom;
                        }
                        .upload{
                            background: url('../../assets/images/upload.png') center no-repeat;
                        }
                        .download{
                            background: url('../../assets/images/download.png') center no-repeat;
                        }
                        .collection{
                            background: url('../../assets/images/collection.png') center no-repeat;
                        }
                        .appreciate{
                            background: url('../../assets/images/appreciate.png') center no-repeat;
                        }
                        span{
                            display: inline-block;
                             text-align: left;
                            label{
                                display: block;
                                height: 20px;
                                line-height: 20px;
                                font-size: 12px;
                                cursor: pointer;
                            }
                            em{
                                height: 30px;
                                line-height: 30px;
                                font-style: normal;
                                font-size: 16px;
                                font-weight: 700;
                                color: #4b7efe;
                            }
                        }
                    }
                }
            }
           
        }
    }
}
/deep/.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header{
    color: #4b7efe;
}
</style>