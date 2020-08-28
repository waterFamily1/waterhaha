<template>
    <div class="plan-box" :style="{height: height+'px'}">
        <div class="index-search" :class="{searchTrans:searchShow, searchPack:!searchShow}">
            <div class="search-main">
                <div class="form-item">
                    <label>关键字：</label>
                    <Input v-model="keyword" placeholder="名称" style="width: 200px" size="small" />
                </div>
                <div class="form-item">
                    <label>所属组织：</label> 
                    <Select v-model="model1" style="width:200px" size="small">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="form-search-btn">
                    <a href="javascript:;" @click="higherSearch()">
                        <Icon type="ios-arrow-down" v-if="searchShow" />
                        <Icon type="ios-arrow-up" v-else />
                        高级搜索
                    </a>
                    <button type="button">搜索</button>
                    <button type="button" class="reset">重置</button>
                </div>
            </div>
            <div class="c-adv-search">
                 <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>创建时间：</label>
                        <div class="cmp-tab">
                           <DatePicker type="date" placeholder="开始日期" style="width: 200px" size="small"></DatePicker> - 
                           <DatePicker type="date" placeholder="结束日期" style="width: 200px" size="small"></DatePicker>
                        </div>
                    </div>
                </div>
                <div class="c-adv-search-row">
                    <div class="form-item">
                        <label>巡检状态：</label>
                        <div class="cmp-tab">
                            <a href="javascript:;" @click="typeCheckAll()" :class="{checked:typeCheckedAll}">全部</a>
                            <a href="javascript:;" v-for="(item, index) in stateList" 
                            :key="index" @click="typeCheck(item.id)" 
                            :class="{checked:typeBox.includes(item.id)}">{{ item.label }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="plan-content" :style="{height: (height-45)+'px'}">
           <div class="btn-add"><button @click="modal = true">新增计划</button></div>
           <div class="c-top-border-gray">
               <div>
                    <h3 class="plan-title">地图巡检</h3>
                    <div class="plan-cards">
                        <Card v-for="(item , index) in cardList" class="plan-card">
                            <h5 slot="title">
                                {{ item.title }}
                            </h5>
                            <a href="javascript:;" slot="extra" class="icon">
                            <Icon type="ios-trash-outline"  style="margin-right:8px"/>
                            <Icon type="ios-copy-outline" />
                            </a>
                            <div class="plan-card-info">
                                <p>状态：新建</p> 
                                <p title="联泰潮英智慧水务" class="ell">所属组织：{{ item.tissue }}</p>
                                <p>起止日期：{{ item.date }}</p>
                                <p title="每1天" class="ell">巡检周期：{{ item.duration }}</p> 
                                <p>创建时间：{{ item.createTime }}</p>
                            </div>
                        </Card>
                    </div>
               </div>
                <div>
                    <h3 class="plan-title">普通巡检</h3>
                    <div class="plan-cards">
                            <Card class="plan-card">
                                <h5 slot="title">
                                    测试两英镇
                                </h5>
                                <a href="javascript:;" slot="extra" class="icon">
                                <Icon type="ios-trash-outline"  style="margin-right:8px"/>
                                <Icon type="ios-copy-outline" />
                                </a>
                                <div class="plan-card-info">
                                    <p>状态：执行中</p> 
                                    <p title="联泰潮英智慧水务" class="ell">所属组织：联泰潮英智慧水务</p> 
                                    <p>起止日期：2020-08-08 - 2020-08-30</p> 
                                    <p title="每1天" class="ell">巡检周期：每1天</p> 
                                    <p>创建时间：2020-08-08 14:53</p>
                                </div>
                            </Card>
                    </div>
                </div>
              
           </div>
        </div>
        <Modal v-model="modal" width="442" class="modal" footer-hide :closable="false">
            <div style="text-align:center">
                <Row>
                    <Col span="12" style="border:solid 2px #eee;padding:10px;margin-right:20px;width:195px" > 
                       <div @click="mapClick()">
                            <Icon type="ios-copy-outline"  style="font-size:50px;padding-bottom:10px"/>
                            <p style="font-size:12px">使用GPS地图功能巡检</p>
                            <p style="font-size:12px">对巡检过程轨迹进行记录和跟踪 </p>
                            <h2 style="font-size:16px;margin-top:15px">地图巡检</h2>
                       </div>
                    </Col>
                    <Col span="12" style="border:solid 2px #eee;padding:10px;">
                       <div  @click="customClick()">
                            <Icon type="ios-copy-outline" style="font-size:50px;padding-bottom:10px;width:195px" />
                            <p style="font-size:12px">不记录GPS定位信息，只要求对巡检点考察进行记录</p>
                            <h2 style="font-size:16px;margin-top:15px">普通巡检</h2>
                       </div>
                       
                    </Col>
                </Row>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    name:"pollingPlan",
    data(){
        return {
            searchShow: false,
            height:"",
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                }
            ],
            stateList: [
                {label: '新建',id: 1},
                {label: '执行中',id: 2},
                {label: '已终止',id: 3},
                {label: '已完成',id: 4}
            ],
            typeCheckedAll: false,
            typeBox: [],
            cardList:[
                {
                    title:'7777',
                    tissue:'联泰潮英智慧水务',
                    date:'2020-08-19 - 2020-08-30',
                    duration:'每1天',
                    createTime:'2020-08-19 15:31'
                },
                {
                    title:'7777',
                    tissue:'联泰潮英智慧水务',
                    date:'2020-08-19 - 2020-08-30',
                    duration:'每1天',
                    createTime:'2020-08-19 15:31'
                },
                {
                    title:'7777',
                    tissue:'联泰潮英智慧水务',
                    date:'2020-08-19 - 2020-08-30',
                    duration:'每1天',
                    createTime:'2020-08-19 15:31'
                },
                {
                    title:'7777',
                    tissue:'联泰潮英智慧水务',
                    date:'2020-08-19 - 2020-08-30',
                    duration:'每1天',
                    createTime:'2020-08-19 15:31'
                },
                {
                    title:'7777',
                    tissue:'联泰潮英智慧水务',
                    date:'2020-08-19 - 2020-08-30',
                    duration:'每1天',
                    createTime:'2020-08-19 15:31'
                },
                {
                    title:'7777',
                    tissue:'联泰潮英智慧水务',
                    date:'2020-08-19 - 2020-08-30',
                    duration:'每1天',
                    createTime:'2020-08-19 15:31'
                }
            ],
            modal:false
        }
    },
    methods :{
        higherSearch() {
            this.searchShow = !this.searchShow
        },
         higherSearch() {
            this.searchShow = !this.searchShow
        },
        typeCheckAll() {
            this.typeBox = []
            this.typeCheckedAll = true
        },
        typeCheck(i) {
            this.typeCheckedAll = false
            if(this.typeBox.includes(i)) {
                this.typeBox = this.typeBox.filter((ele) => {
                    return ele != i
                });
            } else {
                this.typeBox.push(i);
            }
        },
        mapClick(){
            console.log("1111")
            this.$router.push({
                path:'/pollingManage/plan/add',
                query: {
                    type: 'map'
                }
            })
        },
        customClick(){
            this.$router.push({
                path:'/pollingManage/plan/add',
                query: {
                    type: 'normal'
                }
            })
        }
    },
    mounted() {
        this.height = document.body.clientHeight-130
    }
}
</script>
<style lang="less" scoped>
/deep/.ivu-col-span-12{
    width: 47%;
}
.plan-box{
    margin: 5px;
    background: #fff;
    overflow: auto;
    .index-search {
        padding: 5px;
        height: 43px;
        .search-main {
            height: 33px;
            .form-item {
                display: inline-block;
                min-height: 33px;
                label {
                    display: inline-block;
                    width: 100px;
                    line-height: 35px;
                    text-align: right;
                    color: #576374;
                }
            }
            .form-search-btn {
                float: right;
                margin-top: 4px;
                a {
                    margin: 0 10px 0 0;
                    color: #576374;
                    font-size: 12px;
                }
                button{
                    background: #4b7efe;
                    font-size: 12px;
                    padding: 4px 12px;
                    color: #fff;
                    border: 0;
                    border-radius: 3px;
                    margin: 0 5px;
                }
                .reset{
                    background: #495566;
                }
            }
        }
        .c-adv-search {
            margin-top: 10px;
            padding-top: 5px;
            border-top: 1px solid #ececec;
            .c-adv-search-row {
                margin: 5px 0;
                .form-item {
                    display: inline-block;
                    height: 33px;
                    label {
                        display: inline-block;
                        width: 100px;
                        line-height: 35px;
                        text-align: right;
                        color: #576374;
                    }
                }
                .cmp-tab {
                    display: inline-block;
                    a {
                        margin-right: 20px;
                        color: #576374;
                    }
                    .checked {
                        color: #4B7EFE;
                    }
                }
            }
        }
    }
    .searchTrans {
        height: 160px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .searchPack {
        height: 43px;
        overflow: hidden;
        transition: 0.5s height;
    }
    .plan-content{
        .btn-add{
            border-top: 5px solid #f0f0f0;
            padding: 10px;
            button{
               width:100px;
               text-align: center;
               background: #576374;
               font-size: 12px;
               color: #fff;
               border: 0;
               padding: 4px 12px;
               border-radius: 3px;
            }
        }
        .c-top-border-gray{
            border-top: 1px solid rgb(240, 240, 240);
            padding: 10px;
            .plan-title{
                height: 35px;
                background-color: #f4f4f4;
                text-indent: 10px;
                line-height: 35px;
                font-size: 13px;
                font-weight: bold;
            }
            .plan-card{
                display: inline-block;
                width: 24%;
                margin: 10px 0.5% 0;
                overflow: hidden;
                border: 1px solid #b4b4b4;
                border-radius: 3px;
                position: relative;
                /deep/.ivu-card-head{
                    padding: 0;
                }
                /deep/.ivu-card-extra{
                    top: 0;
                }
                h5{
                    height: 30px;
                    line-height: 30px;
                    background-color: #4b7efe;
                    color: #fff;
                    text-indent: 10px;
                }
                .icon{
                    font-size: 20px;
                    color: #fff;
                }
                /deep/.ivu-card-body {
                    padding:10px 10px 10px 20px;
                    p{
                        line-height: 25px;
                        color: #333;
                    }
                    
                }
            }
        }
    }
}
</style>