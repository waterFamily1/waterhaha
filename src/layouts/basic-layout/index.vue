<template>
    <Layout class="i-layout">
        <Sider v-if="!isMobile && !hideSider" class="i-layout-sider" :class="siderClasses" :width="menuSideWidth">
            <i-menu-side :hide-logo="isHeaderStick && headerFix && showHeader" />
        </Sider>
        <Layout class="i-layout-inside" :class="insideClasses">
            <transition name="fade-quick">
                <Header class="i-layout-header" :class="headerClasses" :style="headerStyle" v-show="showHeader" v-resize="handleHeaderWidthChange">
                    <i-header-logo v-if="isMobile && showMobileLogo" />
                    <i-header-logo v-if="!isMobile && isHeaderStick && headerFix" />
                    <i-header-collapse v-if="(isMobile || showSiderCollapse) && !hideSider" @on-toggle-drawer="handleToggleDrawer" />
                    <!-- <i-header-reload v-if="!isMobile && showReload" @on-reload="handleReload" /> -->
                    <i-menu-head v-if="headerMenu && !isMobile" ref="menuHead" />
                    <i-header-breadcrumb v-if="showBreadcrumb && !headerMenu && !isMobile" ref="breadcrumb" />
                    <i-header-search v-if="showSearch && !headerMenu && !isMobile && !showBreadcrumb" />

                    <div class="header-tips" v-if="bullShow">
                        <div>
                            <div class="announcement-wrap">
                                <marquee scrollamount="3" v-for="(item, index) in bullItem" :key="index">
                                    <Icon type="md-alert" />
                                    <span>{{ item.content }}</span>
                                </marquee>
                                <Icon type="md-close" @click="closeBulltS" />
                            </div>
                        </div>
                    </div>

                    <div class="i-layout-header-right">
                        <span class="i-layout-header-trigger i-layout-header-trigger-min">
                            <i-link to="/myAttention">
                                <Icon type="ios-star"></Icon>
                            </i-link>
                        </span>
                        <span class="i-layout-header-trigger i-layout-header-trigger-min">
                            <i-link to="/taskBoard">
                                <Icon type="ios-paper-outline"></Icon>
                            </i-link>
                        </span>
                        <span class="i-layout-header-trigger i-layout-header-trigger-min">
                            <Dropdown trigger="click" class="news-drop">
                                <i-link>
                                    <Badge :count="unreadCount">
                                        <Icon type="md-notifications" />
                                    </Badge>
                                    <!-- to="/newsCenter" -->
                                </i-link>
                                <DropdownMenu slot="list">
                                    <div v-show="newsList.length > 0">
                                        <DropdownItem v-for="(item, index) in newsList" :key="index">
                                            <div class="news-item" @click="goNewsDetail(item.id)">
                                                <div class="news-title">
                                                    <Icon type="ios-mail" />
                                                    {{ item.title }}
                                                </div>
                                                <div class="news-con">{{ item.content }}</div>
                                            </div>
                                        </DropdownItem>
                                    </div>
                                    <div v-show="newsList.length == 0">
                                        <DropdownItem>
                                            <div class="news-item">
                                                <div class="news-con" style="text-align:center">暂无新消息</div>
                                            </div>
                                        </DropdownItem>
                                    </div>
                                    <a href="javascript:;" class="new-all">
                                        <i-link to="/newsCenter">查看全部</i-link>
                                    </a>
                                </DropdownMenu>
                            </Dropdown>
                        </span>
                        <i-header-user />
                    </div>
                </Header>
            </transition>
            <Content class="i-layout-content" :class="contentClasses">
                <transition name="fade-quick">
                    <i-tabs v-if="tabs" v-show="showHeader" @on-reload="handleReload" />
                </transition>
                <div class="i-layout-content-main lay">
                    <keep-alive :include="keepAlive">
                        <router-view v-if="loadRouter" />
                    </keep-alive>
                </div>
            </Content>
        </Layout>
        <div v-if="isMobile && !hideSider">
            <Drawer v-model="showDrawer" placement="left" :closable="false" :class-name="drawerClasses">
                <i-menu-side />
            </Drawer>
        </div>

        <!-- 公告 -->
        <Modal
            v-model="bulltModal"
            :closable="false"
            title="">
            <p slot="header" style="height: 0"></p>
            <div class="bullt-title">{{ bullItem[0].title }}</div>
            <div class="bullt-content" v-html="bullItem[0].content"></div>
            <div slot="footer">
                <a href="javascript:;" class="confirm-btn" @click="closeBullt">确定</a>
            </div>
        </Modal>
    </Layout>
</template>
<script>
    import iMenuHead from './menu-head';
    import iMenuSide from './menu-side';
    import iHeaderLogo from './header-logo';
    import iHeaderCollapse from './header-collapse';
    import iHeaderReload from './header-reload';
    import iHeaderBreadcrumb from './header-breadcrumb';
    import iHeaderSearch from './header-search';
    import iHeaderLog from './header-log';
    import iHeaderFullscreen from './header-fullscreen';
    import iHeaderNotice from './header-notice';
    import iHeaderUser from './header-user';
    import iHeaderSetting from './header-setting';
    import iTabs from './tabs';
    import iHeaderAttention from './header-attention';
    import iHeaderBoard from './header-board';

    import { mapState, mapGetters, mapMutations } from 'vuex';
    import Setting from '@/setting';

    import { requestAnimation } from '@/libs/util';

    import { newsCenterMethod } from '@/api/public/head'

    import { bullet, closeDialog } from '@/api/home/index'

    export default {
        name: 'BasicLayout',
        components: { iMenuHead, iMenuSide, iHeaderLogo, iHeaderCollapse, iHeaderReload, iHeaderBreadcrumb, iHeaderSearch, iHeaderUser, iHeaderLog, iHeaderFullscreen, iHeaderSetting, iHeaderNotice, iTabs, iHeaderAttention, iHeaderBoard},
        data () {
            return {
                showDrawer: false,
                ticking: false,
                headerVisible: true,
                oldScrollTop: 0,
                isDelayHideSider: false, // hack，当从隐藏侧边栏的 header 切换到正常 header 时，防止 Logo 抖动
                loadRouter: true,

                unreadCount: 0,
                newsList: [],

                bullShow: false,
                bullItem: [],
                bulltModal: false
            }
        },
        computed: {
            ...mapState('admin/layout', [
                'siderTheme',
                'headerTheme',
                'headerStick',
                'tabs',
                'tabsFix',
                'siderFix',
                'headerFix',
                'headerHide',
                'headerMenu',
                'isMobile',
                'isTablet',
                'isDesktop',
                'menuCollapse',
                'showMobileLogo',
                'showSearch',
                'showNotice',
                'showSiderCollapse',
                'showBreadcrumb',
                'showLog',
                'enableSetting'
            ]),
            ...mapState('admin/page', [
                'keepAlive'
            ]),
            ...mapGetters('admin/menu', [
                'hideSider'
            ]),
            // 如果开启 headerMenu，且当前 header 的 hideSider 为 true，则将顶部按 headerStick 处理
            // 这时，即使没有开启 headerStick，仍然按开启处理
            isHeaderStick () {
                let state = this.headerStick;
                if (this.hideSider) state = true;
                return state;
            },
            showHeader () {
                let visible = true;
                if (this.headerFix && this.headerHide && !this.headerVisible) visible = false;
                return visible;
            },
            headerClasses () {
                return [
                    `i-layout-header-color-${this.headerTheme}`,
                    {
                        'i-layout-header-fix': this.headerFix,
                        'i-layout-header-fix-collapse': this.headerFix && this.menuCollapse,
                        'i-layout-header-mobile': this.isMobile,
                        'i-layout-header-stick': this.isHeaderStick && !this.isMobile,
                        'i-layout-header-with-menu': this.headerMenu,
                        'i-layout-header-with-hide-sider': this.hideSider || this.isDelayHideSider
                    }
                ];
            },
            headerStyle () {
                const menuWidth = this.isHeaderStick ? 0 : this.menuCollapse ? 80 : Setting.menuSideWidth;
                return this.isMobile || !this.headerFix ? {} : {
                    width: `calc(100% - ${menuWidth}px)`
                };
            },
            siderClasses () {
                return {
                    'i-layout-sider-fix': this.siderFix,
                    'i-layout-sider-dark': this.siderTheme === 'dark'
                };
            },
            contentClasses () {
                return {
                    'i-layout-content-fix-with-header': this.headerFix,
                    'i-layout-content-with-tabs': this.tabs,
                    'i-layout-content-with-tabs-fix': this.tabs && this.tabsFix
                };
            },
            insideClasses () {
                return {
                    'i-layout-inside-fix-with-sider': this.siderFix,
                    'i-layout-inside-fix-with-sider-collapse': this.siderFix && this.menuCollapse,
                    'i-layout-inside-with-hide-sider': this.hideSider,
                    'i-layout-inside-mobile': this.isMobile
                };
            },
            drawerClasses () {
                let className = 'i-layout-drawer';
                if (this.siderTheme === 'dark') className += ' i-layout-drawer-dark';
                return className;
            },
            menuSideWidth () {
                return this.menuCollapse ? 80 : Setting.menuSideWidth;
            }
        },
        watch: {
            hideSider () {
                this.isDelayHideSider = true;
                setTimeout(() => {
                    this.isDelayHideSider = false;
                }, 0);
            },
            '$route' (to, from) {
                if (to.name === from.name) {
                    // 相同路由，不同参数，跳转时，重载页面
                    if (Setting.sameRouteForceUpdate) {
                        this.handleReload();
                    }
                }
            }
        },
        methods: {
            ...mapMutations('admin/layout', [
                'updateMenuCollapse'
            ]),
            ...mapMutations('admin/page', [
                'keepAlivePush',
                'keepAliveRemove'
            ]),
            handleToggleDrawer (state) {
                if (typeof state === 'boolean') {
                    this.showDrawer = state;
                } else {
                    this.showDrawer = !this.showDrawer;
                }
            },
            handleScroll () {
                if (!this.headerHide) return;

                const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

                if (!this.ticking) {
                    this.ticking = true;
                    requestAnimation(() => {
                        if (this.oldScrollTop > scrollTop) {
                            this.headerVisible = true;
                        } else if (scrollTop > 300 && this.headerVisible) {
                            this.headerVisible = false;
                        } else if (scrollTop < 300 && !this.headerVisible) {
                            this.headerVisible = true;
                        }
                        this.oldScrollTop = scrollTop;
                        this.ticking = false;
                    });
                }
            },
            handleHeaderWidthChange () {
                const $breadcrumb = this.$refs.breadcrumb;
                if ($breadcrumb) {
                    $breadcrumb.handleGetWidth();
                    $breadcrumb.handleCheckWidth();
                }
                const $menuHead = this.$refs.menuHead;
                if ($menuHead) {
                    // todo $menuHead.handleGetMenuHeight();
                }
            },
            handleReload () {
                // 针对缓存的页面也生效
                const isCurrentPageCache = this.keepAlive.indexOf(this.$route.name) > -1;
                const pageName = this.$route.name;
                if (isCurrentPageCache) {
                    this.keepAliveRemove(pageName);
                }
                this.loadRouter = false;
                this.$nextTick(() => {
                    this.loadRouter = true;
                    if (isCurrentPageCache) {
                        this.keepAlivePush(pageName);
                    }
                });
            },
            getNews() {
                newsCenterMethod().then(res=> {
                    this.unreadCount = res.data.unreadCount
                    this.newsList = res.data.latestUnreadMessage
                })
            },
            goNewsDetail(id) {
                this.getNews()
                this.$router.push({
                    path: '/newsDetail',
                    query: {
                        id: id
                    }
                })
            },
            getBullet() {
                bullet().then(res=> {
                    if(res.data.length == 0) {
                        this.bullShow = false
                        this.bullItem = [{
                            title: '1',
                            content: '1'
                        }]
                    } else {
                        this.bullShow = true
                        this.bullItem = res.data
                        if(this.bullItem[0].dialog == 1) {
                            this.bulltModal = true
                        } else {
                            this.bulltModal = false
                        }
                    }
                })
            },
            closeBullt() {
                closeDialog({
                    id: this.bullItem[0].id,
                    type: "dialog"
                }).then(res=> {
                    if(res.data.count) {
                        this.bulltModal = false
                    }
                })
            },
            closeBulltS() {
                closeDialog({
                    id: this.bullItem[0].id,
                    type: "scroll"
                }).then(res=> {
                    if(res.data.count) {
                        this.bullShow = false
                    }
                })
            }
        },
        mounted () {
            document.addEventListener('scroll', this.handleScroll, { passive: true });
            this.getNews()
            this.getBullet()
        },
        beforeDestroy () {
            document.removeEventListener('scroll', this.handleScroll);
        },
        created () {
            if (this.isTablet && this.showSiderCollapse) this.updateMenuCollapse(true);
        }
    }
</script>
<style lang="less" scoped>
.i-layout-header-right {
    margin-right: 30px;
}
/deep/.i-layout-header-trigger-min i {
    font-size: 28px;
    color: rgb(143, 162, 189);
}
/deep/.news-drop {
    .ivu-select-dropdown {
        top: 60px!important;
        left: 940px!important;
        width: 320px;
        text-align: left;
        .news-item {
            border-bottom: 1px solid #e6e6e6;
            cursor: pointer;
            padding: 10px 0;
        }
        .news-title {
            font-size: 13px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 24px;
        }
        .news-con {
            overflow: hidden;
            white-space: initial;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            line-height: 24px;
            font-size: 13px;
        }
        .ivu-icon {
            font-size: 24px;
            color: #2d8cf0;
        }
        .new-all {
            display: block;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #999;
            font-size: 14px;
        }
    }   
    .ivu-badge-count {
        top: 6px;
        left: 12px;
        height: 16px;
        min-width: 16px;
        padding: 0 3px;
        line-height: 16px;
    }
}
/deep/.header-tips {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 450px;
    height: 44px;
    line-height: 44px;
    .announcement-wrap {
        width: 100%;
        display: inline-block;
        padding: 0 30px 0 2px;
        height: 20px;
        line-height: 20px;
        position: relative;
        vertical-align: middle;
        background: #FFF8DE;
        marquee {
            font-size: 12px;
            height: 20px;
            line-height: 20px;
            color: #F9A10F;
            .ivu-icon-md-alert {
                display: inline-block;
                width: 18px;
                height: 18px;
                color: #f90;
                font-size: 16px;
                vertical-align: middle;
            }
        }
        .ivu-icon-md-close {
            color: #F9A10F;
            position: absolute;
            right: 12px;
            top: 3px;
            font-size: 14px;
            font-weight: bold;
            vertical-align: middle;
            cursor: pointer;
        }
    }
}
/deep/.ivu-modal-header {
    border: none;
    padding: 0;
    display: none;
}
/deep/.ivu-modal-body {
    padding: 0;
}
.bullt-title {
    background-size: auto 50%;
    font-size: 14px;
    font-weight: bold;
    color: #2A384B;
    padding: 12px 16px;
    border-bottom: 1px solid #f0f0f0;
}
/deep/.bullt-content {
    width: 100%;
    background: url('../../images/bullt.png') no-repeat 32px 12px;
    padding: 16px 16px 16px 78px;
    font-size: 12px;
    color: #576374;
    line-height: 24px;
}
.confirm-btn {
    cursor: pointer;
    height: 20px;
    display: block;
    line-height: 20px;
    text-align: center;
    color: #4B7EFE;
    font-size: 14px;
    font-weight: bold;
}
</style>