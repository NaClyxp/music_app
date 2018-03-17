<template>
  <transition name="slide">
    <music-list :bgImage="bgImage" :title="title" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getPlayList} from 'api/recommend'
import {createSong} from 'common/js/song'
import {ERR_OK} from 'api/config'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    bgImage() {
      return this.disc.imgurl
    },
    title() {
      return this.disc.dissname
    },
    ...mapGetters([
      'disc'
    ])
  },
  created() {
    this.getPlayList()
  },
  methods: {
    getPlayList() {
      if (!this.disc.dissid) {
        this.$router.push({
          path: '/recommend'
        })
        return
      }

      getPlayList(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicList) => {
        if (musicList.songid && musicList.albumid) {
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
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
