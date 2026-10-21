import { createRoot } from 'react-dom/client'
import { createApp } from './index.tsx'

const root = createRoot(document.getElementById('root'))
root.render(createApp())