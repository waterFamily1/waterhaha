<template>
    <div class="video-wrap" :style="{height: height+'px'}">
        <div class="video-main">
            <div class="video-left">
                <h3>区域位置</h3>
                <div class="tree-box">
                    <Tree :data="treeData"></Tree>
                </div>
            </div>
            <div class="video-right">
                <div class="c-plain-bg-h">
                    <h3>视频抓拍</h3> 
                </div>
                <div class="capture-event">
                    <Calendar v-model="nowData" hide-type>
                        <template slot-scope="{ date, data }" slot="month">
                            <Badge status="warning" text="看苹果发布会" v-if="data.day === '2019-09-11'" />
                        </template>
                    </Calendar>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'videoCapture',
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
            nowData: '2020-8-22'
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
.video-wrap {
    margin: 5px;
    background: #fff;
    .video-main {
        width: 100%;
        height: 100%;
        display: flex;
        .video-left {
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
        .video-right {
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
            }
            .capture-event {
                margin-top: 10px;
                /deep/.ivu-calendar-header {
                    padding: 0px;
                    /deep/.ivu-calendar-header-title {
                        font-size: 14px;
                        color: #495060;
                    }
                }
                /deep/.ivu-calendar-table thead th {
                    padding: 0;
                    text-align: center;
                    background-color: #f7f7f7;
                }
                /deep/.ivu-calendar-table-day {
                    height: 40px;
                    padding: 0;
                }
                /deep/.ivu-calendar-table-day-title {
                    text-align: right;
                }
            }
        }
    }
}
</style>