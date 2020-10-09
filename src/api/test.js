import myaxios from '@/utils/myaxios'

const BASE_URL=process.env.VUE_APP_BASE_API
export default{
getList(){
    const promise1=myaxios({
        method:'get',
        url:'/api/home'
    })
    return promise1;
}

}