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
          'fixed left-0 top-0 z-40 hidden h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300 md:block',
          isCollapsed ? 'w-12' : 'w-44'
        )}
      >
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div
        className={cn(
          'flex min-h-screen flex-col transition-all duration-300',
          isCollapsed ? 'md:ml-12' : 'md:ml-44'
        )}
      >
        <Header />
        <main className="flex-1 p-4 md:p-6">{children}</main>
        <footer className="border-t py-4 px-4 md:px-6">
          <p className="text-xs text-muted-foreground text-center">
            © 2025 Sun Yong. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}
