import * as types from './mutation-type'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import * as cache from 'common/js/cache'

// 在列表中寻找song，并返回对应的索引
const findIndex = (list, song) => {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const selectPlay = ({commit, state}, {list, index}) => {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    // 在随机列表寻找当前点击的序号
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = ({commit}, {list}) => {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, shuffle(list))
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = ({commit, state}, song) => {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 当前歌曲在sequenceList的索引
  let currentSIndex = findIndex(sequenceList, currentSong)

  // 记录列表 是否有当前歌曲索引
  let fpIndex = findIndex(playlist, song)
  let fsIndex = findIndex(sequenceList, song)
  // 插入当前歌曲
  currentIndex++
  currentSIndex++
  playlist.splice(currentIndex, 0, song)
  sequenceList.splice(currentSIndex, 0, song)

  // 清除playlist中原本已有的歌
  if (fpIndex > -1) {
    if (fpIndex < currentIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  // 清除sequenceList中原本已有的歌
  if (fsIndex > -1) {
    if (fsIndex < currentSIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const deleteSong = ({commit, state}, song) => {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  const fpIndex = findIndex(playlist, song)
  const fsIndex = findIndex(sequenceList, song)

  if (fpIndex > -1) {
    playlist.splice(fpIndex, 1)
    if (currentIndex > fpIndex || currentIndex === playlist.length) {
      currentIndex--
    }
  }
  if (fsIndex > -1) {
    sequenceList.splice(fsIndex, 1)
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  }
}

export const clearSong = ({commit}) => {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}

export const saveSearchHistory = ({commit}, query) => {
  commit(types.SET_SEARCH_HISTORY, cache.saveSearch(query))
}

export const deleteSearchHistory = ({commit}, query) => {
  commit(types.SET_SEARCH_HISTORY, cache.deleteSearch(query))
}

export const clearSearchHistory = ({commit}) => {
  commit(types.SET_SEARCH_HISTORY, cache.clearSearch())
}

export const savePlayHistory = ({commit}, song) => {
  commit(types.SET_PLAY_HISTORY, cache.savePlay(song))
}

export const deletePlayHistory = ({commit}, song) => {
  commit(types.SET_PLAY_HISTORY, cache.deletePlay(song))
}

export const clearPlayHistory = ({commit}) => {
  commit(types.SET_PLAY_HISTORY, cache.clearPlay())
}

export const saveFavoriteHistory = ({commit}, song) => {
  commit(types.SET_FAVORITE_HISTORY, cache.saveFavorite(song))
}

export const deleteFavoriteHistory = ({commit}, song) => {
  commit(types.SET_FAVORITE_HISTORY, cache.deleteFavorite(song))
}

export const clearFavoriteHistory = ({commit}) => {
  commit(types.SET_FAVORITE_HISTORY, cache.clearFavorite())
}