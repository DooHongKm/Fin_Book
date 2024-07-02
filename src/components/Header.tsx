import React from 'react'
import { HeaderProps } from '../types'

// userId ''면 동작 x

const Header: React.FC<HeaderProps> = ({  }) => {
  return (
    <div className='header-container'>
      <button>Calendar</button>
      <button>Statistics</button>
    </div>
  )
}

export default Header
