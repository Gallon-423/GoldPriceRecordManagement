
import axios from 'axios'

// 创建一个单例（实例）
const instance = axios.create({
  // baseURL: 'http://localhost:8080',
  // baseURL: 'http://127.0.0.1:4523/m1/2032248-0-default',
  baseURL:'http://192.168.0.101:8080',
  timeout: 4000,
  responseType: 'json'
})


// 整体导出
export default instance
