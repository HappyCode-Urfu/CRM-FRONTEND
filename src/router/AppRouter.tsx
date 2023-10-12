import { Route, Routes, useLocation } from 'react-router-dom'
import { authRoutes, publicRoutes } from 'router/routes.ts'

const AppRouter = () => {
  const location = useLocation()
  return (
    <Routes location={location}>
      {authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  )
}

export default AppRouter
