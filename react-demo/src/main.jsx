import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ContentList from './ContentList/ContentList'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='body-div'>
          {/* <App /> */}
    <h1>Stream wave demo</h1>
    <ContentList />
    </div>
  </StrictMode>,
)
