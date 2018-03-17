import {playMode} from 'common/js/config'
import {getLoadSearchHistory, getLoadPlayHistory, getLoadFavoriteHistory} from 'common/js/cache'

const state = {
  // 歌手
  singer: {},
  // 播放和暂停
  playing: false,
  // 播放器全屏?
  fullScreen: false,
  // 播放列表
  playlist: [],
  // 播放列表(顺序)
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 播放索引
  currentIndex: -1,
  // 推荐歌曲
  disc: {},
  // 排行歌曲
  topList: {},
  // 搜索历史
  searchHistory: getLoadSearchHistory(),
  // 播放历史
  playHistory: getLoadPlayHistory(),
  // 我喜欢的
  favoriteHistory: getLoadFavoriteHistory()
}

export default state