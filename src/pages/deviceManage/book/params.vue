<template>
    <div class="equ-params">
        <!-- 设备参数 -->
        <h3 class="c-gray-bg-h">设备参数</h3>
        <div v-show="!isEdit" v-html="paramsDatas.param" class="equ-params-input"></div>
        <textarea 
            :value="paramsDatas.param" 
            class="equ-params-input" 
            @change="changeParam" 
            v-show="isEdit"
        ></textarea>
        <h3 class="c-gray-bg-h">养护要求</h3>
        <div v-show="!isEdit" v-html="paramsDatas.mtRequirements" class="equ-params-input"></div>
        <textarea 
            :value="paramsDatas.mtRequirements" 
            class="equ-params-input" 
            @change="changeReqir"             
            v-show="isEdit"
        ></textarea>
    </div>
</template>

<script>
export default {
    name: 'equParams',
    props: {
        paramsData: {
            type: Object,
            default: function() {
                return { param: '', mtRequirements: '' }
            }
        },
        isEdit: {
            type: Boolean
        }
    },
    computed: {
        paramsDatas() {
            if (this.isEdit) {
                return {
                    param: this.paramsData.param,
                    mtRequirements: this.paramsData.mtRequirements
                };
            } else {
                return {
                    param:
                        this.paramsData.param &&
                        this.paramsData.param.replace(/[\n\r]/g, '<br>'),
                    mtRequirements:
                        this.paramsData.mtRequirements &&
                        this.paramsData.mtRequirements.replace(
                            /[\n\r]/g,
                            '<br>'
                        )
                };
            }
        }
    },
    methods: {
        changeParam(e) {
            this.$emit('paramsDataChange', {
                param: e.target.value
            })
        },
        changeReqir(e) {
            this.$emit('paramsDataChange', {
                mtRequirements: e.target.value
            })
        }
    }
}
</script>

<style lang="less" scoped>
.equ-params {
    h3 {
        font-weight:bold !important;
    }
    .c-gray-bg-h {
        background-color: #f4f4f4;
        height: 30px;
        line-height: 30px;
        text-indent: 20px;
        font-weight: 100;
        font-size: 13px;
    }
}
.equ-params-input {
    width: 100%;
    height: 190px;
    border: 1px solid #b4b4b4;
    margin: 5px 0;
    padding: 10px;
    outline: none;
    overflow: auto;
}
</style>
</style>