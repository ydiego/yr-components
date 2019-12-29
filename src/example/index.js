import React from 'react'
import ReactDOM from 'react-dom'

import Sticky from '../components/Sticky'

function StickyNav() {
  return (
    <div className="sticky-nav" style={{height: '30px', width: '100%'}}>
      this is nav
    </div>
  )
}

function StickyContent() {
  return (
    <div className='sticky-content' style={{height: '1000px'}} />
  )
}

class App extends React.Component {

  render() {
    return (
      <>
        <Sticky nav={<StickyNav />} sticky={true}>
          <StickyContent/>
        </Sticky>
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))