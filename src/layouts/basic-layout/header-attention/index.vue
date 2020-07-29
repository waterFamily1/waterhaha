<template>
    <span class="i-layout-header-trigger i-layout-header-trigger-min" @click="toggleFullscreen">
        <Icon type="ios-star"></Icon>
    </span>
</template>
<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'iHeaderAttention',
        methods: {
            toggleFullscreen() {
                console.log('我的关注')
            }
        }
    }
</script>
