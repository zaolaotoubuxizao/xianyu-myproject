// 自定义错误拦截  --  拦截页面的所有请求错误，并弹出对应的提示。

// 引入elementUi框架的提示组件
import {Message} from "element-ui"
// 有一个默认参数。nuxt对象
export default ({$axios}) => {
//   console.log(nuxt)
    $axios.onError(err=>{
        // console.log(err.response)
        const {message,statusCode}=err.response.data
        if(statusCode===400){
            Message({
                type:'error',
                message
            })
        }
    })
}