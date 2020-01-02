import React, { useState } from 'react'
import './index.scss'

/**
 * tab排序组件，支持单个或多个tab的独立增序降序
 * initial data like:
 * [
     {
       sort: 0,
       sortName: '综合'
     },
     {
       sort: 1,
         sortName: '销量'
     },
     {
       sort: {
         asc: 3,
         desc: 2
       },
       sortName: '价格',
       toggle: true
     },
   ]
 * sortName最好唯一
 * 可以添加自定义数据，change的第三个参数会返回当前点击的tab数据，其中包括组件里定义的新字段，如currentSort
 *
 * */
const SortTab = ({change, config = [], containerBg, defaultAsc = true}) => {
  /**
   * 初始化组件数据配置，默认降序，定义特有字段
   * */
  const [tabs, setTabs] = useState(() => {
    return config.map(d => {
      d.currentSort = d.toggle ? d.sort[defaultAsc ? 'asc' : 'desc'] : d.sort
      return d
    })
  })

  const [activeIndex, setActiveIndex] = useState(0);

  const [toggleTabClickName, setToggleTabClickName] = useState('');

  function tabChange(index, tab) {
    /** 减少重复请求 */
    if(!tab.toggle && activeIndex === index) return

    setActiveIndex(index);

    let sort = tab.currentSort;

    let newTab = Object.assign({}, tab),
      copyTabs = [].concat(tabs);

    if (tab.toggle) {

      /** 如果tab支持toggle切换 重新进来时 保持初始或切出时的排序 */
      if (toggleTabClickName !== tab.sortName) {

        setToggleTabClickName(tab.sortName)

      } else {

        /** 重复点击切换排序 */
        sort = tab.currentSort === tab.sort.desc ? tab.sort.asc : tab.sort.desc;

        newTab.currentSort = sort

        copyTabs.splice(index, 1, newTab)

        setTabs(copyTabs)
      }
    } else {

      setToggleTabClickName('')

    }

    change && change(index, sort, newTab)
  }

  if (!tabs.length) {
    console.warn('Got empty initial data')
    return null
  }

  return (
    <div className='tab-container' style={{background: containerBg}}>
      {
        tabs.map((tab, index) => {
          const isToggleTab = tab.toggle
          return (
            <div
              className={activeIndex === index ? `tab-item active` : 'tab-item'}
              key={tab.sortName + index}
              onClick={() => tabChange(index, tab)}>
              {tab.sortName}
              {
                isToggleTab ?
                  <>
                    <span className={`triangle top ${activeIndex === index && tab.currentSort === tab.sort.asc ? 'top-active' : ''}`}/>
                    <span className={`triangle bottom ${activeIndex === index && tab.currentSort === tab.sort.desc ? 'bottom-active' : ''}`}/>
                  </>
                : null
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default SortTab;
