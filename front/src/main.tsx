import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Providers from '~/core/providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
)
