
import { ThemeProvider } from '@/context/ThemeContext'
import { SidebarProvider } from '@/context/SidebarContext'
import { NavigationProvider, useNavigation } from '@/context/NavigationContext'
import { SearchProvider } from '@/context/SearchContext'
import { CustomTagsProvider } from '@/context/CustomTagsContext'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from '@/components/layout/Layout'
import { FeaturesPage } from '@/components/pages/FeaturesPage'
import { AboutPage } from '@/components/pages/AboutPage'
import { DecoderPage } from '@/components/pages/DecoderPage'

function AppContent() {
  const { currentPage } = useNavigation()

  return (
    <Layout>
      {currentPage === 'features' && <FeaturesPage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'decoder' && <DecoderPage />}
    </Layout>
  )
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <SidebarProvider>
          <NavigationProvider>
            <CustomTagsProvider>
              <SearchProvider>
                <AppContent />
              </SearchProvider>
            </CustomTagsProvider>
          </NavigationProvider>
        </SidebarProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App
