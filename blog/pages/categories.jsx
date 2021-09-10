import React,{useState,useEffect} from 'react'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import Link from 'next/link'
import Head from 'next/head'
import {Row, Col , List ,Icon ,Breadcrumb,Pagination  } from 'antd'
import Header from '../components/Header/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Bg from '../components/Bg'
import Category from '../components/Category'





const Categories = (list) =>{

 
  const [ categories , setCategories ] = useState(list.data);
  useEffect(()=>{
    setCategories(list.data)
  })
  // console.log(list);
  
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  }); 


  const [page, setPage] = useState(1)

  function onPageChange(page) {
    setPage(page)
    window.location.hash = `#${page}`;
}

  return (
    
    <>
      <Head>
        <title>不教鬼逼度岐山</title>
        <link rel="icon" href="../static/favicon.ico" />
      </Head>
      <Bg/>
      <Header />
      <Row className="comm-main" type="flex" justify="center" gutter={32}>
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><Link href={{pathname:'/'}}><a>首页</a></Link></Breadcrumb.Item>
                  <Breadcrumb.Item>{list.data[0].typeName}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              
              <List
                itemLayout="vertical"
                dataSource={categories.filter((u, index) => index < 10 * page && index >= 10 * (page - 1))}
                renderItem={item => (
                  <List.Item>
                    <div className="list-title">
                      <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                        <a>{item.title}</a>
                      </Link>
                    </div>
                    <div className="list-icon">
                      <span><Icon type="calendar" /> {item.addTime}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                      <span><Icon type="folder" /> {item.typeName}</span>&nbsp;&nbsp;
                      <span><Icon type="fire" /> {item.view_count}人</span>
                    </div>
                    <div className="list-context"
                      dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                    >
                    </div>    
                  </List.Item>
                )}
              />  

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={8} lg={7} xl={5}>
          <Author />
          <Advert />
          <Category/>
        </Col>
      </Row>

      <Row className="comm-main" type="flex" justify="center">
                <Pagination defaultCurrent={page} current={page} onChange={onPageChange} total={categories.length} pageSize={10}
                />
      </Row>

      <Footer/>

   </>
  )

} 

Categories.getInitialProps = async (context)=>{

  let id =context.query.id
  // console.log('aaa'+context.query.id);
  const promise = new Promise((resolve)=>{
    axios(servicePath.getCategoriesById+id).then(
      (res)=>{
        // console.log(res);
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default Categories