export default Page

import { StrictMode } from 'react'
import App from '../src/App.jsx'
import '../src/index.css'

function Page() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}
