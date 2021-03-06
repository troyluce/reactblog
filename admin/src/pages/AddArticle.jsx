import React,{useState,useEffect} from 'react';

import { Route, Redirect ,withRouter} from "react-router-dom";
import marked  from 'marked'
import '../static/css/AddArticle.css'
import { Row, Col ,Input, Select ,Button ,DatePicker,message } from 'antd'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'



const { Option } = Select;
const { TextArea } = Input


function AddArticle(props){

    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState('选择类型') //选择的文章类别  

    const [categoryList, setCategoryList] = useState([])
    const [cateSelectedList, setCateSelectedList] = useState([])

    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
      }); 

    const changeContent = (e)=>{
        setArticleContent(e.target.value)
        let html=marked(e.target.value)
        setMarkdownContent(html)
    }
 
    const changeIntroduce = (e)=>{
        setIntroducemd(e.target.value)
        let html=marked(e.target.value)
        setIntroducehtml(html)
    }

    const getTypeInfo =(props)=>{

        axios({
            method:'get',
            url:servicePath.getTypeInfo,
            header:{ 'Access-Control-Allow-Origin':'*' },
            withCredentials: true
        }).then(
           res=>{
               if(res.data.data == "没有登录"){
                 localStorage.removeItem('openId')
                 props.history.push('/') 
               }else{
                setTypeInfo(res.data.data)                
               }
            }
        )
    }

    //选择类别后的方法
    const selectTypeHandler =(value)=>{
        setSelectType(value)
    }

    //从标签表格得到具体内容


    const getCategoryList =(props)=>{

        axios({
            method:'get',
            url:servicePath.getCategoryList,
            header:{ 'Access-Control-Allow-Origin':'*' },
            withCredentials: true
        }).then(
           res=>{
               if(res.data.data == "没有登录"){
                 localStorage.removeItem('openId')
                 props.history.push('/') 
               }else{
                setCategoryList(res.data.data)                
               }
            }
        )
    }

    //选择标签后的方法
 
 
    const setCateSelectedListHandler =(value)=>{
        setCateSelectedList(value)
    }

    //保存文章的方法
    const saveArticle = ()=>{

        // markedContent()  //先进行转换


        if(!selectedType){
            message.error('必须选择文章类别')
            return false
        }else if(!articleTitle){
            message.error('文章名称不能为空')
            return false
        }else if(!articleContent){
            message.error('文章内容不能为空')
            return false
        }else if(!introducemd){
            message.error('简介不能为空')
            return false
        }else if(!showDate){
            message.error('发布日期不能为空')
            return false
        }







        let dataProps={}
        console.log(selectedType)
        dataProps.type_id = selectedType 
        dataProps.title = articleTitle
        dataProps.article_content =articleContent
        dataProps.introduce =introducemd
        let datetext= showDate.replace('-','/') //把字符串转换成时间戳(横杠转斜杠)
        dataProps.addTime =(new Date(datetext).getTime())/1000
        dataProps.categories_id=cateSelectedList
        
        


        // dataProps.part_count = partCount
        // dataProps.article_content_html = markdownContent
        // dataProps.introduce_html = introducehtml

        if(articleId===0){
            console.log('articleId=:'+articleId)
            dataProps.view_count =Math.ceil(Math.random()*100)+1000//随便给个浏览量
            // dataProps.view_count =0
            axios({
                method:'post',
                url:servicePath.addArticle,
                header:{ 'Access-Control-Allow-Origin':'*' },
                data:dataProps,
                withCredentials: true
            }).then(
               res=>{
                setArticleId(res.data.insertId)
                if(res.data.isSuccess){
                    message.success('文章发布成功')
                    console.log(res);
                }else{
                    message.error('文章发布失败');
                }

               }
               
            ).catch(error=>{
                console.log(error)      
              })
        }else{
            console.log('articleId:'+articleId)
            dataProps.id = articleId 
            axios({
                method:'post',
                url:servicePath.updateArticle,
                header:{ 'Access-Control-Allow-Origin':'*' },
                data:dataProps,
                withCredentials: true
            }).then(
               res=>{

                if(res.data.isSuccess){
                    message.success('文章保存成功')
                }else{
                    message.error('保存失败');
                }


               }
            )
        }


    } 

    //修改文章的方法
    const getArticleById = (id)=>{
        axios(servicePath.getArticleById+id,{ 
            withCredentials: true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(
            res=>{
                // let articleInfo= res.data.data[0]
                console.log(res);
                setArticleTitle(res.data.data[0].title)
                setArticleContent(res.data.data[0].article_content)
                let html=marked(res.data.data[0].article_content)
                setMarkdownContent(html)
                setIntroducemd(res.data.data[0].introduce)
                let tmpInt = marked(res.data.data[0].introduce)
                setIntroducehtml(tmpInt)
                setShowDate(res.data.data[0].addTime)
                setSelectType(res.data.data[0].typeId)
                setCateSelectedList(res.data.data[0].categoriesId)
            }
        ).catch(error=>{
            console.log(error)      
          })
    }

    const [category,setCategory] = useState('')
    const [categoriesId,setCategoriesId]=useState(0)

    //添加标签的方法
    const saveCategories = () => {
        if(!category){
            message.error('标签名不能为空')
            return false
        }
        let dataProps = {}
        dataProps.id = categoriesId  
        dataProps.categoriesName = category 
        axios({
            method:'post',
            url:servicePath.addCategory,
            header:{ 'Access-Control-Allow-Origin':'*' },
            data:dataProps,
            withCredentials: true
        }).then(
            res=>{
                setCategoriesId(res.data.insertId)
                console.log(res);
             if(res.data.isSuccess){
                 message.success('标签添加成功');
                 getCategoryList();
             }else{
                 message.error('保存失败');
             }
    })

    }

    useEffect(()=>{
        getTypeInfo() 
        getCategoryList() 
        //获得文章ID
        let tmpId = props.match.params.id
        if(tmpId){
            
            setArticleId(tmpId)
            getArticleById(tmpId)
            console.log(props.match.params.id);
            
            
        } 
       },[])


    return (
    
    <div>
        <Row gutter={25}>
            <Col span={18}>
                <Row gutter={10} >
                    <Col span={20}>
                        <Input 
                            value={articleTitle}
                            placeholder="博客标题" 
                            onChange={e=>{

                            setArticleTitle(e.target.value)
                            }}
                            size="large" />
                    </Col>
                    <Col span={4}>
                        &nbsp;
                        <Select  value={selectedType} size="large" onChange={selectTypeHandler}>
                            {
                                typeInfo.map((item,index)=>{
                                    return (<Option key={item.id} value={item.id}>{item.typeName}</Option>)
                                })
                            }
                            {/* <Option value="Sign Up">视频教程</Option> */}
                        </Select>
                    </Col>
                </Row>
                <br/>
                <Row gutter={8}>
         
                 <Col span={6}>
                        <Select  value={cateSelectedList}   style={{ width: '100%' }} placeholder="请选择标签" size="large" onChange={setCateSelectedListHandler}>
                            {
                                // value={cateSelectedList}  
                                categoryList.map((item,index)=>{
                                    return (<Option key={item.id} value={item.id}>{item.categoriesName}</Option>)
                                })
                            }
                           
                        </Select>
                 </Col >   
                 <Col span={6}>
                 <Input placeholder="请添加标签" size="large" onChange={(e)=>{setCategory(e.target.value)}}/>
                 </Col>
                 <Col span={4}><Button type="primary" size="large" onClick={saveCategories}>确认</Button></Col>
                 
                 {/* onClick={saveCategories} */}
                 
                </Row>
                <br/>
                <Row gutter={10} >
                    <Col span={12}>
                        <TextArea 
                            value={articleContent} 
                            className="markdown-content" 
                            rows={35}  
                            onChange={changeContent} 
                            onPressEnter={changeContent}
                            placeholder="文章内容"
                        />
                    </Col>
                    <Col span={12}>
                        <div 
                            className="show-html"
                            dangerouslySetInnerHTML = {{__html:markdownContent}}>

                        </div>

                    </Col>
                </Row>  
            </Col>

            <Col span={6}>
                <Row>
                    <Col span={24}>
                            <Button  size="large">暂存文章</Button>&nbsp;
                            <Button type="primary" size="large" onClick={saveArticle} >发布文章</Button>
                            <br/>
                    </Col>
                    <Col span={24}>
                        <br/>
                        <TextArea 
                            rows={4} 
                            value={introducemd}  
                            onChange={changeIntroduce} 
                            onPressEnter={changeIntroduce}
                            placeholder="文章简介"
                        />
                        <br/><br/>
                        <div  
                        className="introduce-html"
                        dangerouslySetInnerHTML = {{__html:'文章简介：'+introducehtml}}>

                        </div>
                    </Col>
                    <br/><br/>
                    <Col span={24}>
                        <div className="date-select">
                            <DatePicker
                                onChange={(date,dateString)=>setShowDate(dateString)} 
                                placeholder="发布日期"
                                size="large"  
                            />
                        </div>
                    </Col>                
                </Row>                
            </Col>
        </Row>
    </div>
    )
}
export default AddArticle