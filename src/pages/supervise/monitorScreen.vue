<template>
    <div class="mon-box" :style="{height: height+'px'}">
        <div class="c-tree-left" style="width:250px;">
			<Row style="height: 65%; overflow: auto; border-bottom: 5px solid #f0f0f0">
				<div class="padding10">
					<Tree :data="treeData" @on-select-change="nodeSelected"></Tree>
				</div>
			</Row>
			<Row class="display-images">
				<ul>
					<li v-for="(img, index) in displayImages" :key="index">
						<div class="img-box" :class="{active: img.active}" @click="showImgDisplay(img)">
							<img :src="img.src" :alt="img.name">
						</div>
					 	<span :title="img.fileName">{{img.fileName}}</span>
					</li>
				</ul>
			</Row>
		</div>
        <div class="c-main-border c-tree-right">
	    	<div style="height: 100%;text-align: center;display: flex;align-items: center;justify-content:center;">
				<fullscreen v-if="imgDisplayPath" ref="fullscreen" @change="fullscreenChange" :fullscreen.sync="fullscreen" :warp="false" style="height:100%; width: 100%; background: white; overflow-y: hidden;">
					<iframe v-if="imgDisplayPath" :src="imgDisplayPath" style="background: #FFF" frameborder=0 name="showHere" scrolling="auto" width="100%" height="100%"></iframe>
					<Button class="btn-map-fullscreen" :icon="fullscreen ? 'arrow-shrink' : 'arrow-expand'" @click="toggleFullScreen"></Button>
				</fullscreen>
				<p v-if="!imgDisplayPath" style="text-align: center;">请先在工艺位置下选择图纸</p>
	    	</div>
    	</div>
    </div>
</template>

<script>
import { getSid, treeMethod } from '@/api/supervise/2d'
import util from '@/libs/public_js'


import Fullscreen from "vue-fullscreen"
import Vue from "vue"
Vue.use(Fullscreen)

/**
 * 循环
 */
function loop(fn,vm) {
    return function loopBy(interval) {
        vm.timer = setTimeout(function task() {
            if (vm.timer ) {
                vm.timer  = clearTimeout(vm.timer )
            }
            fn(vm)
            vm.timer  = setTimeout(task, interval)
        },interval)
    }
}
// 获取HT服务的权限——sid
function getSid1() {
    getSid().then(res=> {
        console.log(res)
        sessionStorage.setItem('htEditor.sid', res.data);
    })
}
/**
 * 转换树的各项节点属性
 */
function transTree(tree, vm) {
    (function eachList(array, parentPath = "") {
        array.forEach((item, index) => {
            // 拼接父级id，合成后台路径
            var path = ''
            if (item.type == 9) {
                path = parentPath + "/" + item.name
                if (!vm.screenList[item.parentId]) {
                vm.screenList[item.parentId] = []
                }
                vm.screenList[item.parentId].push(item)
            } else {
                path = parentPath + "/" + item.id
            }
            item.fullPath = path
            if (item.hasOwnProperty("children") && item.children.length) {
                eachList(item.children, path)
            }
        })
    })(tree)
}
function addScript(src) {
    let script = document.createElement("script")
    script.type = "text/javascript"
    script.src = src
    let head = document.getElementsByTagName("head")
    if (head.length) {
        head[0].appendChild(script)
    } else {
        document.documentElement.appendChild(script)
    }
    return script
}
const scripts = [
    // "custom/configs/htconfig.js"
    '../../ht/custom/configs/htconfig.js'
];

export default {
    data() {
        return {
            height: '',
            timer: null,
            // 树都数据
            treeData: [],
            screenList: {},
            // 监视画面缩略图集
            displayImages: [],
            // 监视画面路径
            imgDisplayPath: '',
            // 全屏开关
            fullscreen: false
        }
    },
    mounted() {
        this.height = document.body.clientHeight-50
        let src = 'http://web.tjdeht.cn:8801/custom/configs/htconfig.js'
        addScript(src)
        this.init()
    },
    methods: {
        init() {
            var vm = this
            getSid().then(res=> {
                // 定义循环函数
                var loopHand = loop(getSid,vm)
                // 10分钟执行一次
                loopHand(10*60*1000)
                sessionStorage.setItem("htEditor.sid", res.data)
                treeMethod().then(res=> {
                    var data = res.data.items
                    var newdata = [],
                        treeList = []
                    for (var i = 0, len = data.length; i < len; i++) {
                        if (data[i].type == 9) {
                            newdata.push(Object.assign({}, data[i]))
                            pushData(data[i].parentId)
                        }
                        data[i].indexNum=i
                    }
                    function pushData(id) {
                        var isExist = false
                        for (var i = 0, len = newdata.length; i < len; i++) {
                            if (newdata[i].id == id) {
                                isExist = true
                                break
                            }
                        }
                        if (!isExist)
                        for (var i = 0, len = data.length; i < len; i++) {
                            if (data[i].id == id) {
                                newdata.push(Object.assign({}, data[i]))
                                treeList.push(data[i])
                                pushData(data[i].parentId)
                                break
                            }
                        }
                    }
                    // 将数组中的对象按照id排序
                    vm.treeData = util.transDataToTree(
                        treeList.sort(function(a, b) {
                         return a.indexNum - b.indexNum;
                        })
                    )
                    transTree(
                        util.transDataToTree(
                            newdata.sort(function(a, b) {
                                return a.indexNum - b.indexNum;
                            })
                        ),
                        vm
                    )
                    // if (vm.treeData && vm.treeData.length > 0) {
                    //     vm.$set(vm.treeData[0].children[0], 'selected', true)
                    //     vm.nodeSelected([vm.treeData[0].children[0]])
                    // }
                    // 当从其他页面进入到工艺画面监视时，带入区域或者位置下的工艺画面的展示状态
                    // var parentId = this.$route.params.parentId
                    // var id = this.$route.params.id
                    // if (parentId) {
                    //     for (var i = 0; i < vm.treeData.length; i++) {
                    //         if (vm.treeData[i].id == parentId) {
                    //             vm.$set(vm.treeData[i], "expand", true)
                    //             if (id) {
                    //                 for (var j = 0; j < vm.treeData[i].children.length; j++) {
                    //                     if (vm.treeData[i].children[j].id == id) {
                    //                         vm.$set(vm.treeData[i].children[j], "selected", true)
                    //                         vm.$set(vm.treeData[i].children[j], "expand", true)
                    //                         vm.nodeSelected([vm.treeData[i].children[j]])
                    //                         return false
                    //                     }
                    //                 }
                    //             } else {
                    //                 vm.$set(vm.treeData[i], "selected", true)
                    //                 vm.nodeSelected([vm.treeData[i]])
                    //                 return false
                    //             }
                    //         }
                    //     }
                    // }
                });
            });
        },
        nodeSelected(v) {
            const node = v[0]
            if (!node) {
                return
            }
            var vm = this
            vm.displayImages = []
            vm.screenList[node.id] &&
                vm.screenList[node.id].forEach(item => {
                vm.displayImages.push(Object.assign({}, item))
            });
            if (vm.displayImages.length != 0) {
                // 如果点击的是目录
                var index = 0
                vm.displayImages.forEach((ele, index) => {
                    var fullPath = ''
                    if (ele.screenType == '1') {
                        fullPath = '/displays' + ele.fullPath
                    } else {
                        fullPath = '/scene' + ele.fullPath
                    }
                    Object.assign(ele, {
                        fullPath: fullPath,
                        fileName: ele.name,
                        name: ele.name + '.png',
                        src:
                        `${htconfig.Default.protocol}//${htconfig.Default.host}:${htconfig.Default.port}` +
                        fullPath +
                        `.png?ts=` +
                        Date.now() +
                        '&sid=' +
                        sessionStorage.getItem('htEditor.sid')
                    })
                    var previewURL = 'displays.html'
                    if (ele.screenType == 2) {
                        previewURL = 'scene.html'
                    }
                    ele.url = previewURL + '?tag=' + ele.fullPath + '.json'
                    if (ele.uploadPath) {
                        ele.url = ele.uploadPath
                    }
                    if (index == 0) {
                        index++
                        ele.active = true
                        vm.showImgDisplay(ele)
                    }
                });
            }
        },
        showImgDisplay(v) {
            console.log(v)
            const vm = this
            vm.imgDisplayPath = v.url+"&ts="+ Date.now()
            vm.displayImages.forEach(function(element) {
                element.active = false
            });
            console.log(vm.displayImages)
            v.active = true
        },
        toggleFullScreen() {
            this.$refs['fullscreen'].toggle()
        },
        fullscreenChange(fullscreen) {
            this.fullscreen = fullscreen
        }
    },
    destroyed() {
	    clearTimeout(this.timer)
    }
}
</script>

<style lang="less" scoped>
.mon-box {
    margin: 5px;
    background: #fff;
    display: flex;
    .c-tree-left {
        height: 100%;
        background-color: #FFF;
        .display-images {
            height: 35%;
            overflow-y: scroll;
            li {
                list-style: none;
                display: inline-block;
            }
            .img-box {
                margin: 5px;
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: 0;
                border: 1px solid transparent;
                box-sizing: content-box;
                img {
                    max-width: 50px;
                    max-height: 50px;
                    vertical-align: middle;
                }
            }
            span {
                display: inline-block;
                width: 50px;
                text-align: center;
                margin: 0 6px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .img-box.active {
                border: 1px solid #32d3eb;
            }
        }
    }
    .c-main-border {
        border: 5px solid #f0f0f0;
        border-top: none;
        min-height: 100%;
        width: 100%;
        flex: 1;
    }
}
</style>
