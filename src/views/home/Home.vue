<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center" >购物车</div>
    </nav-bar>
    <tab-control :titles = "['流行', '新款', '精选']" class="tab-controls"
                 @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            v-bind:probeType="3"
            @scroll="contentScroll"
            :pull-up-load="true" @scrollMore = 'scrollMore'>
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles = "['流行', '新款', '精选']"
                   @tabClick="tabClick" ref="tabControl2" v-show="!isTabFixed"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultiData, getHomeGoods} from 'network/home'

  import {debounce} from "common/utils";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        currentType: 'pop',
        isShow: false,
        isTabFixed: false,
        tabOffsetTop: 650,
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        }
      }
    },
    created() {
      this.getHomeMultiData()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      //事件总线，用on监听
      const refresh = debounce(this.$refs.scroll.refresh)
      this.$bus.$on('imageLoad', () => {
        //refs:获取scroll组件对象，在获取scroll属性，在执行refersh方法
        refresh()
      })
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      // 事件的相关方法


      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        //置顶
        this.isShow = (-position.y) > 1000
        //吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      scrollMore() {
        this.getHomeGoods(this.currentType)
        // console.log('下拉');
      },

      swiperImageLoad() {
        //$el是获取组件的元素
        console.log(this.$refs.tabControl2.$el.offsetTop);
      },
      // 请求的相关方法
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        let page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // finishPullUp:可以下拉多次
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    position: relative;
  }
  .home-nav{
    color: white;
    background-color: var(--color-tint);
  }
  .tab-controls {
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 93px);
    overflow: hidden;
  }
</style>
