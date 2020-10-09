import router from "./router/index.js"
import {getUserInfo} from './api/login.js'
router.beforeEach((to,from,next)=>{
    const token=localStorage.getItem("cc-token");
    if(!token)
    {
        if(to.path!='/login')
        {
            next({path:'/login'});
        }
        else
        {
            next();
        }
    }
    else
    {
        if(to.path=='/login')
        {
            next();
        }
        else
        {
            const userinfo=localStorage.getItem("cc-user");
            if(userinfo)
            {
                next();
            }
            else
            {
                getUserInfo(token).then(res=>
                    {
                        const resp=res.data;
                        if(resp.flag)
                        {
                            localStorage.setItem("cc-user",JSON.stringify(resp.data));
                            next();
                        }
                        else
                        {
                            next({path:'/login'});
                        }
                    })
            }

        }
    }
})


