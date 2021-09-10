'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api hi' 
  }

  //首页列表接口，得到文章简介等信息
  async getArticleList(){

    let sql = 'SELECT article.id as id,'+
              'article.title as title,'+
              'article.introduce as introduce,'+
              //主要代码----------start
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d ' ) as addTime,"+
              //主要代码----------end
              'article.view_count as view_count ,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id'+
              ' '+
              'ORDER BY article.addTime DESC '
 
     const results = await this.app.mysql.query(sql)
 
     this.ctx.body={
         data:results
     }
  }

  //详情页接口，得到文章内容等信息
  async getArticleById(){
  //先配置路由的动态传值，然后再接收值
  let id = this.ctx.params.id

  let sql = 'SELECT article.id as id,'+
  'article.title as title,'+
  'article.introduce as introduce,'+
  'article.article_content as article_content,'+
  "FROM_UNIXTIME(article.addTime,'%Y-%m-%d ' ) as addTime,"+
  'article.view_count as view_count ,'+
  'type.typeName as typeName ,'+
  'type.id as typeId '+
  'FROM article LEFT JOIN type ON article.type_id = type.Id '+
  'WHERE article.id='+id

  const result = await this.app.mysql.query(sql)

  this.ctx.body={data:result}

  }

   //得到类别名称和编号，menu的接口
  async getTypeInfo(){

    const result = await this.app.mysql.select('type')
    this.ctx.body = {data:result}
    

  }

  
  //根据类别ID获得文章列表，list页的接口
  async getListById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d ' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    
    // 'WHERE type_id='+ id 
    'WHERE type_id='+ 
    id + 
    ' '+
   'ORDER BY article.addTime DESC '
    

    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}

  }

  //获取分类的名称和编号，类别组件的接口
  async getCategoriesInfo(){
    const result = await this.app.mysql.select('categories')
    this.ctx.body = {data:result}
    // console.log('daodiduibudui',result);

  }

  //获取分类的名称和编号得到文章列表，分类页的接口
  async getCategoriesById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d ' ) as addTime,"+
    'article.view_count as view_count ,'+
    'categories.categoriesName as categoriesName ,'+
    'type.typeName as typeName '+
    'FROM article'+' LEFT JOIN type ON article.type_id = type.Id ' + 
        'LEFT JOIN categories ON article.categories_id = categories.Id '+ 
    'WHERE categories_id ='+
     id+
     ' '+
     'ORDER BY article.addTime DESC '
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
  }
  


}

 //

module.exports = HomeController;
