import React, { Component } from 'react'

import {Dropdown, Menu,Link} from 'antd'

function UserInfo(props) {

  const MenuOverLay = (
    <Menu>
        <Menu.Item>
          <span >导入文章</span>
        </Menu.Item>
        <Menu.Item>
          <span >后台管理</span>
        </Menu.Item>
      <Menu.Item>
      
        <a  href="127.0.0.1:3001" target="_blank" rel="noopener noreferrer"  >
          
          登录后台
        </a>
        
      </Menu.Item>
    </Menu>
  )
 
  return (
    <div className='header-userInfo'>
         <Dropdown placement='bottomCenter' overlay={MenuOverLay} >
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              用户管理
            </a>
        </Dropdown>
    </div>
  )
}

export default (UserInfo)
