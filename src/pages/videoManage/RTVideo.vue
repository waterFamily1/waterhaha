<template>
    <div class="rt-wrap" :style="{height: height+'px'}">
        <div class="rt-main">
            <div class="rt-left">
                <h3>区域位置</h3>
                <div class="tree-box">
                    <Tree :data="treeData"></Tree>
                </div>
            </div>
            <div class="rt-right">
                <div class="c-plain-bg-h">
                    <h3>视频监控</h3> 
                    <div class="c-btns-right" style="margin-right: 30px;">
                        <a href="javascript:;">
                            <Icon type="ios-expand" />
                        </a>
                    </div>
                </div>
                <div class="monitor-single">
                    <div class="monitor-win">
                        <div>
                            <video width="100%" autoplay="autoplay" muted="muted" src=""></video>
                        </div>
                        <div style="text-align: center; background-color: rgb(254, 254, 254); color: rgb(0, 0, 0); line-height: 20px;">
                            测试设备1
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'RTVideo',
    data() {
        return {
            height: '',
            treeData: [
                {
                    title: 'parent 1',
                    expand: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1'
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        }
                    ]
                }
            ],
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {
        
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
            width: 300px;
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
            .monitor-single {

            }
        }
    }
}
</style>