import AppRouter from 'router/AppRouter.tsx'
import { Navbar } from 'layouts/index.ts'
import s from './App.module.scss'
const App = () => {
  return (
    <div className={s.container}>
      <Navbar />
      <AppRouter />
    </div>
  )
}

export default App
