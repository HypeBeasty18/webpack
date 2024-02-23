
import { useState } from 'react'
import s from './App.module.scss'

type Props = {}

const App = (props: Props) => {

  const [value, setValue] = useState<number>(0)

  const handleClick = () => {
    setValue(value+1)
  }

  return (
    <div>
      <div className={s.title}>{value}</div>
      <button className={s.button} onClick={handleClick}>Click</button>
    </div>
  )
}

export default App