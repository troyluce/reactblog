import React ,{useState,useEffect} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import  servicePath  from '../../config/apiUrl'
import {Row,Col, Menu, Icon,Input} from 'antd'
import UserInfo from './UserInfo'


const Header = () => {

    
    const [navArray , setNavArray] = useState([])


    useEffect(()=>{

        const fetchData = async ()=>{
            const result= await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    setNavArray(res.data.data)
                    return res.data.data
                }
            )
            setNavArray(result)
        }

        fetchData()

    },[])

    //跳转到列表页
    // const handleClick = (e)=>{
    //     if(e.key==0){
    //         Router.push('/')
    //     }else{
    //         Router.push(
    //         '/list?id='+e.key  
    //     )

    // }
    // }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                {/* <Col  > */}
                <Col  xs={24} sm={7} md={7} lg={8} xl={8} xxl={4}>
                        <span className="header-logo">
                            <Link href={{pathname:'/'}}>
                                <a>乌达仁和他的朋友们</a>
                            </Link>
                        </span>
                    <span className="header-txt">没什么好说的,我就是yyds。</span>
                </Col>
        
                {/* <Col className="memu-div"  >  */}
                <Col className="memu-div"  xs={0} sm={15} md={15} lg={15} xl={15} xxl={20}> 
                    <div id='search-box'>
                        <Icon type='search' className='search-icon'  />
                        <Input
                            type='text'
                            className='search-input'
                            placeholder='搜索文章'
                        />
                    </div>
                    <div id='menu-box'>
                    <Menu  mode="horizontal" >
                    {/* <Menu  mode="horizontal" onClick={handleClick} > */}
                        <Menu.Item key="0">
                            <Icon type="home" />
                            <Link href={{pathname:'/'}}>
                            <span>首页</span>
                            </Link>
                        </Menu.Item>
                        {
                            navArray.map((item)=>{
                                return(
                                    
                                    <Menu.Item key={item.id}>
                                        
                                        <Icon type={item.icon}/>
                                        <Link href={{pathname:'/list/',query:{id:item.id}}}>
                                        <span>{item.typeName}</span>
                                        </Link>
                                    </Menu.Item>
                                   
                                )
                            }) 
                        }
                    </Menu>
                    </div>
                    <UserInfo/>
                </Col>
            </Row>
        </div>
    )
}




export default Header