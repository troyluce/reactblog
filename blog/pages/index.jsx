import React,{useState,useRef,useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {Row, Col , List ,Icon, Breadcrumb, Pagination} from 'antd'
import Author from '../components/Author'
import Header from '../components/Header/Header'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Category from '../components/Category'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Bg from '../components/Bg';





//新建一个函数式组件(主页的)
const Home = (list) => {

  const [ mylist , setMylist ] = useState(list.data)

    useEffect(() => {
      setMylist(list.data)
  })

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
          <div className="bread-div">最新日志</div>
          <List
              // header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist.filter((u, index) => index < 10 * page && index >= 10 * (page - 1))}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon ">
                    <span><Icon type="calendar" />&nbsp;{item.addTime}</span>&nbsp;&nbsp;&nbsp;&nbsp;
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
        </Col>
  
        <Col className="comm-right" xs={0} sm={0} md={8} lg={7} xl={5}>
          <Author/>
          <Advert/>
          <Category/>
        </Col>
      </Row>

      <Row className="comm-main" type="flex" justify="center">
                <Pagination defaultCurrent={page} current={page} onChange={onPageChange} total={mylist.length} pageSize={10}
                />
      </Row>

      <Footer/> 
 


   </>
  )
}

//新建getInitialProps方法并获取数据
Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        //console.log('远程获取数据结果:',res.data.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}


export default Home