module.exports = app =>{
    const { router, controller } = app;
    router.get('/default/index',controller.default.home.index)
    router.get('/default/getArticleList',controller.default.home.getArticleList)
    router.get('/default/getArticleById/:id',controller.default.home.getArticleById)
    router.get('/default/getTypeInfo',controller.default.home.getTypeInfo)
    router.get('/default/getCategoriesInfo',controller.default.home.getCategoriesInfo)
    router.get('/default/getListById/:id',controller.default.home.getListById)
    router.get('/default/getCategoriesById/:id',controller.default.home.getCategoriesById)
}