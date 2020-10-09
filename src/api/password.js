import myaxios from '@/utils/myaxios'
export default{
    checkPwd(userId,oldPassword){
        return myaxios({
            url:'/user/pwd',
            method:'post',
            data:{
                userId,
                oldPassword
            }
        })
    },
    updatePwd(userId,newPassword)
    {
        return myaxios({
            url:'/user/pwd',
            method:'put',
            data:{
                userId,
                newPassword
            }
        })
    }
}