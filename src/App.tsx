import { ThemeProvider } from '@/context/ThemeContext'
import { SidebarProvider } from '@/context/SidebarContext'
import { Layout } from '@/components/layout/Layout'
import { DecoderPage } from '@/components/pages/DecoderPage'

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Layout>
          <DecoderPage />
        </Layout>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
