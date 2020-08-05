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
                        <Tree :data="treeData"></Tree>
                    </div>
                </div>
            </div>
            <div class="report-iframe" style="overflow: auto;width: 1048px;height: 668px;">
                <i-frame src="https://www.iviewui.com" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'reportBrowse',
    data() {
        return {
            height: '',
            formName: '',
            formData: [],
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
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1'
                                },
                                {
                                    title: 'leaf 1-2-1'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
    methods: {
        handleSearch (value) {
            this.formData = !value ? [] : [
                value,
                value + value,
                value + value + value
            ];
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
    }
}
</style>