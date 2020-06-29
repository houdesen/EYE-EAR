import React from 'react';
import { TabBar } from 'antd-mobile';
import Hometab from './Hometab/Hometab';
import Shoptab from './Shoptab/Shoptab';
import Mytab from './Mytab/Mytab';



export default class Apphome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      hidden: false,
      fullScreen: false,
      
    };
    
  }

  render() {
    return (
        <div style={{position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="black" //未选中颜色
          tintColor="white"  //选中颜色
          barTintColor='#8794a8' //背景颜色
          hidden={this.state.hidden}
          style={{height: '100px%', width: '100%'}}
        >
          <TabBar.Item
            title="首页"
            key="1"
            icon={
              <i style={{fontSize:28,lineHeight:'28px'}} className='iconfont icon-zimuE'></i>
            }
            selectedIcon={<i style={{fontSize:28,lineHeight:'28px'}} className='iconfont icon-zimuE'></i>
            }
            selected={this.state.selectedTab === 'home'}

            // badge={1}
            onPress={() => {
              this.setState({
                selectedTab: 'home',

              });
            }}
            // data-seed="logId"
          >
            {/* {this.renderContent('Life')} */}
            <Hometab/>
          </TabBar.Item>
          
          <TabBar.Item
            
            icon={
              <i style={{fontSize:28,lineHeight:'28px'}} className='iconfont icon-shop2'></i>
            }
            selectedIcon={<i style={{fontSize:28,lineHeight:'28px'}} className='iconfont icon-shop2'></i>
            }
            title="商城"
            key="3"
            selected={this.state.selectedTab === 'shop'}
            onPress={() => {
              this.setState({
                selectedTab: 'shop',
              });
            }}
          >
              {/* <Hometab/> */}
              <Shoptab/>
            {/* {this.renderContent('Friend')} */}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <i style={{fontSize:28,lineHeight:'28px'}} className='iconfont icon-wode'></i>
            }
            selectedIcon={<i style={{fontSize:28,lineHeight:'28px'}} className='iconfont icon-wode'></i>
            }
            title="我的"
            key="4"
            selected={this.state.selectedTab === 'my'}
            onPress={() => {
              this.setState({
                selectedTab: 'my',
              });
            }}
          >
            <Mytab/>
            {/* {this.renderContent('My')} */}
          </TabBar.Item>
        </TabBar>
      </div>
    
    );
  }
}