import AppRouter from 'router/AppRouter.tsx'
import { useAuthRedirect } from 'hooks/useAuthRedirect.ts'

const App = () => {
  useAuthRedirect()

  return (
    <div>
      <AppRouter />
    </div>
  )
}

export default App
