
import { useState } from 'react'
import s from './App.module.scss'
import {Link, Outlet} from 'react-router-dom'

import  icon from '@/assets/1Blocker.png'

import IconSvg from '@/assets/cloud-rain-alt.svg'

const App = () => {

  const [value, setValue] = useState<number>(0)

  const handleClick = () => {
    setValue(value+1)
  }


  // if (__PLATFORM === 'desktop'){
  //   return  <div>Desktop</div>
  // }

  // if (__PLATFORM === 'modile'){
  //   return <div>mobile</div>
  // }


  return (
    <div>
      <h1>Platfrom - {__PLATFORM}</h1>
      <Link to={'about'}>About</Link>
      <br/>
      <Link to={'shop'}>Shop</Link>
      <br/>
      <Link to={'/'}>Main</Link>
      <img  style={{width: '40px'}} src={icon}/>
      <IconSvg  width={40} height={40}/>
      <div className={s.title}>{value}</div>
      <button className={s.button} onClick={handleClick}>Click</button>
      <br/>
      <Outlet/>
    </div>
  )
}

export default App