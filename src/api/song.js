import {commonParams} from './config'
import axios from 'axios'

export function getLyric(singerId) {
  const url = '/api/getLyric'

  const data = Object.assign({}, commonParams, {
    pcachetime: new Date(),
    songmid: singerId,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
