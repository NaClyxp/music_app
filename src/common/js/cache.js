import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200

const insertArray = (arr, query, compare, maxLen) => {
  const queryIndex = arr.findIndex(compare)

  if (queryIndex === 0) {
    return false
  }
  if (queryIndex > 0) {
    arr.splice(queryIndex, 1)
  }
  if (maxLen && arr.length >= maxLen) {
    arr.pop()
  }
  arr.unshift(query)
}

const deleteFromArray = (arr, compare) => {
  const index = arr.findIndex(compare)

  if (index > -1) {
    arr.splice(index, 1)
  }
}

// searchHistory 操作
export const getLoadSearchHistory = () => {
  return storage.get(SEARCH_KEY, [])
}

export const saveSearch = (query) => {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (value) => {
    return value === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export const deleteSearch = (query) => {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (val) => {
    return val === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export const clearSearch = () => {
  storage.remove(SEARCH_KEY)
  return []
}

// playHistory 操作
export const getLoadPlayHistory = () => {
  return storage.get(PLAY_KEY, [])
}

export const savePlay = (song) => {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}

export const deletePlay = (song) => {
  let songs = storage.get(PLAY_KEY, [])
  deleteFromArray(songs, (item) => {
    return song.id === item.id
  })
  storage.set(PLAY_KEY, songs)
  return songs
}

export const clearPlay = () => {
  storage.remove(PLAY_KEY)
  return []
}

// favoriteHistory 操作
export const getLoadFavoriteHistory = () => {
  return storage.get(FAVORITE_KEY, [])
}

export const saveFavorite = (song) => {
  let favorite = storage.get(FAVORITE_KEY, [])
  insertArray(favorite, song, (item) => {
    return item.id === song.id
  }, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, favorite)
  return favorite
}

export const deleteFavorite = (song) => {
  let favorite = storage.get(FAVORITE_KEY, [])
  deleteFromArray(favorite, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, favorite)
  return favorite
}

export const clearFavorite = () => {
  storage.set(FAVORITE_KEY, [])
  return []
}
