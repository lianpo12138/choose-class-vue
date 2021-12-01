import request from '@/utils/request'


//获取数据
const login = (req) => {
  return request({
    url: '/user/login',//接口url
    method: 'post',
    req: req
  })
}

export default {
  login,
}
