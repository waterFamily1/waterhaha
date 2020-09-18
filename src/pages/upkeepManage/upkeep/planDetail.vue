<template>
    <div class="detail-wrap" :style="{height: height+'px'}">
        <div class="c-left-border-blue">
            <h3>保养计划详情</h3> 
            <div class="c-btns-right">
                <Button type="primary" @click="saveHandle()">保存</Button>
                <Button type="primary" class="c-btn-back" @click="goBack()">取消</Button>
            </div>
        </div>
        <div class="c-top-border-gray">
            <div class="repair-search-box" style="width: 940px;">
                <Row>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>计划名称：</label>
                            <Input v-model="planName" style="width: 200px" />
                            <span class="label-required">*</span>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="c-form-item">
                            <label>节假日：</label>
                            <RadioGroup v-model="execute">
                                <Radio label="执行"></Radio>
                                <Radio label="不执行"></Radio>
                            </RadioGroup>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <div class="c-top-border-gray"></div>
    </div>
</template>
<script>
export default {
    name: 'planDetail',
    data() {
        return {
            height: '',
            planName: '',
            execute: ''
        }
    },
    mounted() {
        this.height = document.body.clientHeight-80
    },
}
</script>
<style lang="less" scoped>
.detail-wrap {
    margin: 5px;
    background: #fff;
    .c-left-border-blue {
        border-radius: 3px;
        padding: 5px;
        h3 {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-indent: 10px;
        }
        .c-btns-right {
            float: right;
            margin-top: 2px;
            button {
                min-width: 70px;
                margin: 0 5px;
                border: none;
                height: 28px;
                background-color: #576374;
            }
            .c-btn-back {
                background: #c8c8c8;
            }
        }
    }
    .c-top-border-gray {
        border-top: 5px solid #f0f0f0;
        padding: 10px;
        .c-form-item {
            display: inline-block;
            min-height: 33px;
            label {
                display: inline-block;
                width: 104px;
                text-align: right;
            }
            .label-required {
                color: red;
                font-size: 16px;
                margin-left: 5px;
            }
        }
        /deep/.ivu-row {
            margin: 0 -8px; 
            /deep/.ivu-col-span-12 {
                padding: 0 8px;
            }
        }
    }
}
</style>