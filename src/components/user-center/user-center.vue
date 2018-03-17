<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches :switches="switches" :currentIndex="tagIndex" @switch="selectSwitch"></switches>
      </div>
      <div ref="playBtn" class="play-btn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll
                class="list-scroll"
                :data="favoriteHistory"
                v-if="tagIndex === 0"
                ref="favoriteListScroll">
          <div class="list-inner">
            <song-list @select="selectItem" :songs="favoriteHistory"></song-list>
          </div>
        </scroll>
        <scroll
                class="list-scroll"
                :data="playHistory"
                v-if="tagIndex === 1"
                ref="playListScroll">
          <div class="list-inner">
            <song-list @select="selectItem" :songs="playHistory"></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-show="NoResultShow">
        <no-result :title="noResultTitle"></no-result>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import Switches from 'base/switches/switches'
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import {mapGetters, mapActions} from 'vuex'
import Song from 'common/js/song'
import {playListMixin} from 'common/js/mixin'
import NoResult from 'base/no-result/no-result'

export default {
  mixins: [
    playListMixin
  ],
  data() {
    return {
      switches: [
        {name: '我喜欢的'},
        {name: '最近听的'}
      ],
      tagIndex: 0
    }
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    selectSwitch(index) {
      this.tagIndex = index
    },
    selectItem(item, index) {
      this.insertSong(new Song(item))
    },
    random() {
      let list = this.tagIndex === 0 ? this.favoriteHistory : this.playHistory
      if (list.length === 0) {
        return
      }
      list = list.map((song) => {
        return new Song(song)
      })
      this.randomPlay({
        list
      })
    },
    handlePlayList(playlist) {
      const height = playlist.length > 0 ? '60px' : ''
      this.$refs.listWrapper.style.bottom = height
      this.$refs.favoriteListScroll && this.$refs.favoriteListScroll.refresh()
      this.$refs.playListScroll && this.$refs.playListScroll.refresh()
    },
    ...mapActions([
      'randomPlay',
      'insertSong'
    ])
  },
  computed: {
    NoResultShow() {
      if (this.tagIndex === 0) {
        return !this.favoriteHistory.length
      } else {
        return !this.playHistory.length
      }
    },
    noResultTitle() {
      if (this.tagIndex === 0) {
        return '暂无喜欢的歌曲'
      } else {
        return '最近未听过歌曲'
      }
    },
    ...mapGetters([
      'favoriteHistory',
      'playHistory'
    ])
  },
  components: {
    Switches,
    Scroll,
    SongList,
    NoResult
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .switches-wrapper
      margin: 10px 0 30px 0
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto
      text-align: center
      border: 1px solid  $color-text-l
      color: $color-text-l
      border-radius: 100px
      font-size: 0
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        font-size: $font-size-medium-x
      .text
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small
    .list-wrapper
      position: absolute
      top: 110px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>