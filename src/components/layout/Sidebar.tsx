import { FileText, Info, ChevronLeft, ChevronRight, Github, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/context/SidebarContext'
import { useNavigation } from '@/context/NavigationContext'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Logo } from './Logo'

interface NavItem {
  label: string
  icon: React.ReactNode
  page?: 'decoder' | 'features' | 'about'
  href?: string
  external?: boolean
}

const navItems: NavItem[] = [
  {
    label: 'Decoder',
    icon: <FileText className="h-5 w-5" />,
    page: 'decoder',
  },
  {
    label: 'Features',
    icon: <Sparkles className="h-5 w-5" />,
    page: 'features',
  },
  {
    label: 'About',
    icon: <Info className="h-5 w-5" />,
    page: 'about',
  },
]

const externalLinks: NavItem[] = [
  {
    label: 'GitHub',
    icon: <Github className="h-5 w-5" />,
    href: 'https://sunotech.github.io/fix-decoder',
    external: true,
  },
]

export function Sidebar() {
  const { isCollapsed, toggleCollapsed } = useSidebar()
  const { currentPage, setCurrentPage } = useNavigation()

  return (
    <div className="flex h-full flex-col">
      {/* Toggle Button - Top */}
      <div className="flex items-center justify-end p-2 border-b border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleCollapsed}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="ml-1 text-xs">Hide</span>
            </>
          )}
        </Button>
      </div>

      {/* Logo */}
      <div
        className={cn(
          'flex h-14 items-center border-b border-sidebar-border px-4',
          isCollapsed && 'justify-center px-2'
        )}
      >
        <Logo collapsed={isCollapsed} />
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => item.page && setCurrentPage(item.page)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                currentPage === item.page
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                isCollapsed && 'justify-center px-2'
              )}
            >
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <Separator className="my-4 bg-sidebar-border" />

        <nav className="space-y-1 px-2">
          {externalLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                isCollapsed && 'justify-center px-2'
              )}
            >
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </ScrollArea>

    </div>
  )
}
