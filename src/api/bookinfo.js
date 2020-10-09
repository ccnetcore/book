import myaxios from '@/utils/myaxios'
export default{
    getBookInfoList(){
        return myaxios({
            url:'/bookinfo/list',
            method:'get'
        })
    },

    search(page,size,searchWhere)
    {
        return myaxios({
            url:`/bookinfo/list/search/${page}/${size}`,
            method:'post',
            data:searchWhere
        })
    },
    add(bookform)
    {
        return myaxios({
            url:'/addbookinfo',
            method:'post',
            data:bookform
        })
    },
    getBookById(id){
        return myaxios({
            url:`/bookinfo/${id}`,
            method:'get'
        })
    },
    updateBook(bookObj){
        return myaxios({
            url:`/bookinfo/${bookObj.id}`,
            method:'put',
            data:bookObj
            
        })
    },
    deleteBookById(id){
        return myaxios({
            url:`/bookinfo/${id}`,
            method:'delete'
        })
    },
    getTypeSum(){
        return myaxios({
            url:'/book/getTypeSum',
            method:'get'
        })
    }

}