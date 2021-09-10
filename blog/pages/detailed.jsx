import React,{useState} from 'react'
import Head from 'next/head'
import {Row, Col , Affix,Icon ,Breadcrumb  } from 'antd'

import Header from '../components/Header/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
// import ReactMarkdown from 'react-markdown'
// import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import  servicePath  from '../config/apiUrl'
import Bg from '../components/Bg';
import Category from '../components/Category'

const Detailed = (props) => {

  let articleContent=props.article_content
  const tocify = new Tocify()
  const renderer = new marked.Renderer();
  renderer.heading = function(text, level, raw) {
      const anchor = tocify.add(text, level);
      return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };

  marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }
  }); 

  let html = marked(props.article_content) 


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
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                  <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

             <div>
                <div className="detailed-title">
                {props.title}
                </div>

                <div className="list-icon center">
                  <span><Icon type="calendar" /> {props.addTime}</span>
                  <span><Icon type="folder" /> {props.typeName}</span>
                  <span><Icon type="fire" /> {props.view_count}人</span>
                </div>

                <div className="detailed-content" 
                dangerouslySetInnerHTML={{__html:html}}
                >
                 
                </div>

             </div>

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={8} lg={7} xl={5}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title"><h3>文章目录</h3></div>
                <div className="toc-list">
                  {tocify && tocify.render()}
                </div>
            </div>
            <Category/>
          </Affix>
          
        </Col>
      </Row>
      <Footer/>

   </>
  )
}

Detailed.getInitialProps = async(context)=>{

  // console.log(context.query.id)
  let id =context.query.id
  // console.log(id);
  const promise = new Promise((resolve)=>{

    axios(servicePath.getArticleById+id).then(
      (res)=>{
        // console.log(res);
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detailed