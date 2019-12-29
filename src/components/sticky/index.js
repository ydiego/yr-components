import React, {useState, useEffect, useRef} from 'react'
import './index'

// todo distanceFromTop distanceFromBottom

const Sticky = ({sticky,className, nav, children, style}) => {

  const [isSticky, setIsSticky] = useState(false)

  const [wrapStyle, setWrapStyle] = useState(() => {
    return {}
  })

  const stickyRef = useRef(true)

  const ref = useRef()

  useEffect(() => {
    if (!sticky) return
    const shouldNavFixed = () => {
      const container = ref.current
      const tab = stickyRef.current
      const containerClientRect = container.getBoundingClientRect()
      let distanceReady = tab.getBoundingClientRect().top < 0 && containerClientRect.bottom > tab.clientHeight
      setIsSticky(distanceReady)
      setWrapStyle({
        position: distanceReady ? 'fixed' : 'relative',
        top: 0,
        zIndex: 10,
        width: '10rem',
        overflow: 'scroll',
        ...style
      })
    }

    window.addEventListener('scroll', shouldNavFixed, false)
    return () => {
      window.removeEventListener('scroll', shouldNavFixed, false)
    }
  }, [sticky])

  return (
    <div className={className} ref={ref}>
      <div className={`sticky-container`} ref={stickyRef} style={{overflow: 'hidden'}}>
        <div className="sticky-wrap" style={wrapStyle}>
          {nav}
        </div>
        <div className="fill" style={{opacity: 0, display: isSticky ? 'block' : 'none'}}>{nav}</div>
      </div>
      {children}
    </div>
  )
}

export default Sticky
