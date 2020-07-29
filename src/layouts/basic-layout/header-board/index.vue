<template>
    <span class="i-layout-header-trigger i-layout-header-trigger-min" @click="toggleFullscreen">
        <Icon type="ios-paper-outline"></Icon>
    </span>
</template>
<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'iHeaderBoard',
        methods: {
            toggleFullscreen() {
                console.log('任务看板')
            }
        }
    }
</script>
