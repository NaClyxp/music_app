<template>
  <transition name="slide">
    <music-list :bgImage="bgImage" :title="title" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getMusicList} from 'api/rank'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'

export default {
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  created() {
    this._getMusicList()
    console.log(this.topList)
  },
  computed: {
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    },
    title() {
      return this.topList.topTitle
    },
    ...mapGetters([
      'topList'
    ])
  },
  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }

      getMusicList(this.topList.id).then((res) => {
        console.log(res)
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSong(res.songlist)
        }
      })
    },
    _normalizeSong(list) {
      let ret = []
      list.forEach((item) => {
        const musicList = item.data
        if (musicList.songid && musicList.albummid) {
          ret.push(createSong(musicList))
        }
      })

      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>