import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/context/SidebarContext'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { MobileNav } from './MobileNav'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation Drawer */}
      <MobileNav />

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 hidden h-screen border-r bg-sidebar transition-all duration-300 md:block',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div
        className={cn(
          'flex min-h-screen flex-col transition-all duration-300',
          isCollapsed ? 'md:ml-16' : 'md:ml-64'
        )}
      >
        <Header />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
