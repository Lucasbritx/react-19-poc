import { renderToString } from 'react-dom/server'
import { StrictMode } from 'react'
import App from './App.jsx'

export function render() {
  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  )
  return html
}
