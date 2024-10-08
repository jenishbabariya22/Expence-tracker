
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ExpenseProvider } from './context/ExpenseContext.jsx'

createRoot(document.getElementById('root')).render(
  <ExpenseProvider>
    <App />

  </ExpenseProvider>

)
