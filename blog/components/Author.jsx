import {Avatar,Divider} from 'antd'


const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="https://img0.baidu.com/it/u=3311900507,1448170316&fm=26&fmt=auto&gp=0.jpg"  /></div>
            <div className="author-introduction">
            乌达仁，字鬼逼，一世之杰也。观其为人，学富五车，才高七步，力能扛鼎，勇可屠龙，步履遍天下，谈笑皆王公。翩翩乎若潘安之仪容，浩浩乎有霸王之材雄，日散千金，如弃腐土，通人隐忧，如历亲目。世人所谓多情者有五，潘、驴、邓、小、贤是也，鬼逼兼此五者，可谓情圣也夫！
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account" title="troyluce" />
                <Avatar size={28} icon="qq"  className="account" title="850686112"/>
                <Avatar size={28} icon="wechat"  className="account" title="troy_lv" />

            </div>
        </div>
    )

}

export default Author