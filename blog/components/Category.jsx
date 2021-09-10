import React, {useState,useEffect } from 'react'
import { Badge, Tag ,Menu,Row,Pagination} from 'antd'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import { Link } from 'next/link'
import Router from 'next/router'

const Category =() => {


  
  const [categoriesArray , setCategoriesArray] = useState([])


  useEffect(()=>{

    const fetchData = async ()=>{
        const result= await axios(servicePath.getCategoriesInfo).then(
            (res)=>{
                setCategoriesArray(res.data.data)
                return res.data.data
            }
        )
        setCategoriesArray(result)
    }

    fetchData()

},[])

   // 跳转到列表页
    const handleClick = (e)=>{
            Router.push(
            '/categories?id='+e.key  
        )}


    const [page, setPage] = useState(1)

    function onPageChange(page) {
      setPage(page)
      window.location.hash = `#${page}`;
  }
      
    const categoryList = categoriesArray.filter((u, index) => index < 6 * page && index >= 6 * (page - 1))

  return (

    <div className="app-categories comm-box">

      {/* <h2 className='title'>文章标签</h2> */}
      <div className="bread-div"><h3>文章标签</h3></div>
      {/* <p className='category-all-title'>{`一共有${categoriesArray.length} 个标签`}</p> */}

      <Menu className='categories-list' onClick={handleClick}>
        {
        categoryList.map((item, i) => {
          return(
          
            <Menu.Item  key={item.id} >
              
                <span>{item.categoriesName} </span>
               
            </Menu.Item>
          
        )
          }
        )
        }
      </Menu>
    
      <Row  type="flex" justify="center">
                <Pagination defaultCurrent={page} current={page} onChange={onPageChange} total={categoriesArray.length} pageSize={6}
                />
      </Row>    

    </div>
  )
      
}



export default Category
