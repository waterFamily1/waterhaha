<template>
    <div class="rt-wrap" :style="{height: height+'px'}">
        <div class="rt-main">
            <div class="rt-left" id="J_CURVES_SIDEBAR">
                <h3>区域位置</h3>
                <div class="tree-box">
                    <Tree :data="treeData" :render="renderContent"></Tree>
                </div>
            </div>
            <div class="rt-right" id="J_CURVES_CHART">
                <div class="c-plain-bg-h">
                    <h3>视频监控</h3> 
                    <div class="c-btns-right" style="margin-right: 30px;">
                        <a href="javascript:;" class="c-title-fullscreen" @click="fullscreenChart">
                            <Icon type="ios-expand" size="25" color="#9baeb3"></Icon>
                        </a>
                    </div>
                </div>
                <fullscreen ref="fullscreen" @change="fullscreenChange" background="#FFF">
                    <div class="c-capture-main" id="C_CAPTURE_MAIN">
                        <div :style="{'padding-left':selectedData.length == 1?'':'15px',height: '100%', 'position':'relative'}" id="home-dax-monitor" v-bind:class="[homeMonitorFlexClass]">
                            <div 
                                v-bind:id="item.id" 
                                v-for="(item, index) in selectedData" 
                                :key="index" 
                                class="home-monitor-win"
                            >   
                            </div>
                        </div>
                    </div>
                </fullscreen>
            </div>
        </div>
    </div>
</template>
<script>
import { siteMethod } from '@/api/videoM/rtv'
import createTree from '@/libs/public-util'
import util from '@/libs/public_js'

import fullscreen from 'vue-fullscreen'
import Vue from 'vue'
Vue.use(fullscreen)

import Chimee from 'chimee-player'
import hls from 'chimee-kernel-hls'
import chimeePluginControlbar from 'chimee-plugin-controlbar'
Chimee.install(chimeePluginControlbar)

var chimeePlayerItems = []

function chimeePlayer(wrapper, src) {
    return new Chimee({
        wrapper: wrapper,
        src: src,
        controls: true,
        autoplay: true,
        muted: true,
        isLive: true,
        box: 'hls',
        kernels: {
            hls
        },
        plugin: [{
            name: chimeePluginControlbar.name,
            majorColor: '#EEEEEE',
            hoverColor: '#FFFFFF',
            hideBarTime: 1000,
            barShowByMouse: 'move',
            children: {
                play: {
                },
                progressTime: false,
                progressBar: false,
                screen: {

                }
            }
        }]
    });
}

function stopAllLoad() {
    chimeePlayerItems.forEach((item)=>{
        item.stopLoad();
    })
}

export default {
    name: 'RTVideo',
    data() {
        return {
            height: '',
            treeData: [],
            homeMonitorFlexClass: 'home-monitor-single',
            mainHeight: '',
            activeTreeIds: [],
            selectedData: [],
            selectList: [],
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
        this.getSite()
        var h = document.querySelector('.lay').offsetHeight,
            C = document.querySelector('#J_CURVES_CHART'),
            B = document.querySelector('#J_CURVES_SIDEBAR'),
            M = document.querySelector('#C_CAPTURE_MAIN'),
            V = document.querySelector('.home-monitor-win')
        // B.style.height = h - 10 + 'px';
        C.style.height = this.height + 'px';
        M.style.height = this.height + 'px';
        V.style.height = this.height- 100 + 'px';
        this.mainHeight = h - 51 - 20 + 'px';
    },
    methods: {
        fullscreenChart() {
            this.$refs['fullscreen'].toggle()
        },
        fullscreenChange(fullscreen) {
            var h = document.querySelector('.lay').offsetHeight,
                M = document.querySelector('#C_CAPTURE_MAIN')
            
            if(fullscreen) {
                M.style.height = '100%'
            } else {
                M.style.height = h - 51 - 20 + 'px'
            }
        },
        getSite() {
            siteMethod().then(res=> {
                var data = res.data.items
                var newdata = []
                data.forEach((item, i)=> {
                    item._index = i
                })
                for(var i = 0, len = data.length; i < len; i ++) {
                    if(data[i].type == 9) {
                        newdata.push(data[i])
                        pushData(data[i].parentId)
                    }
                }
                function pushData(id) {
                    var isExist = false
                    for(var i = 0, len = newdata.length; i < len; i ++) {
                        if(newdata[i].id == id) {
                            isExist = true
                            break
                        }
                    }
                    if(!isExist) 
                    for(var i = 0, len = data.length; i < len; i ++) {
                        if(data[i].id == id) {
                            newdata.push(data[i])
                            pushData(data[i].parentId)
                            break
                        }
                    }
                }
                newdata.sort(function(a, b) {
                    return a._index - b._index
                });
                this.treeData = res.data.items.length == 0 ? [] : util.transDataToTree(newdata.map(item=>{item.expand = true; return item;}))
            })
        },
        renderContent(h, { root, node, data }) {
            var Info
            if(data.type == 9) {
                Info = h('Icon', {style:{color:this.activeTreeIds == data.id ? '#999' : '#0bb1df',fontSize:'19px'}, props: {type:'videocamera'}}, [])
            }
            return h("div", { class: { "c-tree-row": true } }, [
                Info ? Info : '',
                h("span", {
                    class: {
                        'ivu-tree-title': data.type == "9" ? true : false,
                        'ivu-tree-title-selected': this.activeTreeIds.indexOf(data.id.replace('video_','')) == -1 ? false : true
                    },
                    attrs:{
                        title: data.name
                    },
                    on: {
                        click: () => {
                            if(data.type == 9) {
                                if(this.activeTreeIds.length == 9 && this.activeTreeIds.indexOf(data.id.replace('video_','')) == -1) {
                                    this.$Notice.info({title:'最多选择9个画面'})
                                    return
                                }
                                if(this.activeTreeIds.indexOf(data.id.replace('video_','')) == -1) {
                                    this.activeTreeIds.push(data.id.replace('video_',''))
                                } else {
                                    var index = this.activeTreeIds.indexOf(data.id.replace('video_',''))
                                    this.activeTreeIds.splice(index, 1)
                                }
                                if(this.activeTreeIds.length == 0) {
                                    this.selectedData = []
                                } else {
                                    this.getSelectedData(data)
                                }
                            }
                        }
                    }
                }, [data.title])
            ])
        },
        getSelectedData(data) {
            this.selectList.push(data)
            let result = []
            var obj = {}
            for(var i = 0; i < this.selectList.length; i ++) {
                if(!obj[this.selectList[i].id]) {
                    result.push(this.selectList[i])
                    obj[this.selectList[i].id] = true;
                } else {
                    // console.log(result.length)
                    // console.log(this.selectList[i])
                    result.map((item, index)=> {
                        if(item.id == this.selectList[i].id) {
                            result.splice(index, 1)
                        }
                    })
                }
            }
            this.selectedData = result
            console.log(result.length)
            // let id = data.id
            // if(data.selected == false) {
            //     this.selectedData.remove(data)
            // } else {
            //     console.log(11)
            //     this.selectedData.push(data)
            // }
            // console.log(this.selectedData.length)
            
            
            // this.selectedData.push(data)

            // console.log(this.selectedData)

            this.$nextTick(()=> {
                stopAllLoad()
                chimeePlayerItems = []
                this.selectedData.forEach((item, index)=> {
                    document.querySelector('#'+item.id).innerHTML = ''
                    var _chimeePlayer = chimeePlayer('#'+item.id, item.url)
                    _chimeePlayer.play()
                    chimeePlayerItems.push(_chimeePlayer)

                    var newchild = document.createElement("p")
                    newchild.innerHTML = item.name
                    newchild.style.textAlign = 'center'
                    document.querySelector('#'+item.id).appendChild(newchild)
                })

                this.renderFlex();
            })
        },
        renderFlex() {
            const selection = this.selectedData,
                  count = selection.length
            var className = ''
            if(count <= 1) {
                className = 'home-monitor-single'
            } else if(count > 1 && count < 5) {
                console.log('1=5')
                className = 'home-monitor-2-2'
            } else if(count >= 5 && count <= 6 ) {
                console.log('5=6')
                className = 'home-monitor-3-2'
            } else {
                console.log('>6')
                className = 'home-monitor-3-3'
            }
            this.homeMonitorFlexClass = className
        },
    },
    beforeDestroy() {
        stopAllLoad()
    }
}
</script>
<style lang="less" scoped>
.rt-wrap {
    margin: 5px;
    background: #fff;
    .rt-main {
        width: 100%;
        height: 100%;
        display: flex;
        .rt-left {
            width: 400px;
            height: 100%;
            h3 {
                border-bottom: 1px solid #f0f0f0;
                height: 40px;
                line-height: 40px;
                text-indent: 10px;
            }
            .tree-box {
                width: 100%;
                padding: 0 10px;
            }
        }
        .rt-right {
            width: 100%;
            border-left: 5px solid #f0f0f0;
            .c-plain-bg-h {
                border-bottom: 1px solid #f0f0f0;
                height: 40px;
                padding: 10px 0 10px 10px;
                h3 {
                    display: inline-block;
                    font-size: 14px;
                    line-height: 20px;
                }
                .c-btns-right {
                    float: right;
                    margin-top: 2px;
                    /deep/.ivu-icon {
                        font-size: 25px;
                        color: rgb(155, 174, 179);
                    }
                }
            }
        }
    }
}
.c-capture-main{
    padding-top: 20px;
    overflow: hidden;
}
.c-capture-default-icon{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -80px;
    margin-left: -60px;
}
.home-monitor-win container {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    font-size: 0;
    background: url('../../assets/images/camera.png') no-repeat center center;
}
video {
    width: 100%;
    height: 100%;
    display: block;
    font-size: 0;
    object-fit:fill;
    background: transparent;
}
video:focus,
video:active {
    outline: none;
}
.c-capture-main .home-monitor-single .home-monitor-win {
    width: 100%;
    height: calc(100% - 20px);
    /* margin-right: 1%; */
    float: none;
}
.c-capture-main .home-monitor-2-2 .home-monitor-win {
    width: calc(45%);
    height: calc(50% - 10px);
    margin-right: 15px;
    margin-bottom: 32px;
}
.c-capture-main .home-monitor-3-2 .home-monitor-win {
    width: calc(33.3% - 15px);
    height: calc(32% - 20px);
    margin-right: 15px;
    margin-bottom: 32px;
}
.c-capture-main .home-monitor-3-3 .home-monitor-win {
    width: calc(33.3% - 15px);
    height: calc(32% - 20px);
    margin-right: 15px;
    margin-bottom: 32px;

}
.home-monitor-win {
    float: left;
}
.c-capture-main .home-monitor-win p{
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: #333;
    font-weight: bold;
    font-size: 12px;
}
</style>