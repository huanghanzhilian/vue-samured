import http from './public'








//首页列表
export const recomMend = (params) => {
  return http.fetchGet('/api/recommend/index')
}
//浏览频道接口
export const channelWatch = (params) => {
  return http.fetchGet('/api/channel/index')
}

//游戏分类接口
export const getGameList = (params) => {
  return http.fetchPost('/api/game/filtrate',params)
}

//登入接口
export const goLogin = (params) => {
  return http.fetchPost('/api/login/into',params)
}

//登入接口
export const userInfo = (params) => {
  return http.fetchPost('/api/login/check',params)
}

//退出登入接口
export const logout = (params) => {
  return http.fetchPost('/api/login/logout',params)
}

//获取视频播放信息接口
export const getvideo = (params) => {
  return http.fetchPost('/api/video/play',params)
}

//订阅接口
export const subsCribe = (params) => {
  return http.fetchPost('/api/channel/sub',params)
}

//频道详情页
export const channelDetails = (params) => {
  return http.fetchPost('/api/channel/info',params)
}