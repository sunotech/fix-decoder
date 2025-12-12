import { FileText, Info, ChevronLeft, ChevronRight, Github } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/context/SidebarContext'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Logo } from './Logo'

interface NavItem {
  label: string
  icon: React.ReactNode
  href?: string
  active?: boolean
  external?: boolean
}

const navItems: NavItem[] = [
  {
    label: 'Decoder',
    icon: <FileText className="h-5 w-5" />,
    active: true,
  },
  {
    label: 'About',
    icon: <Info className="h-5 w-5" />,
  },
]

const externalLinks: NavItem[] = [
  {
    label: 'GitHub',
    icon: <Github className="h-5 w-5" />,
    href: 'https://github.com/drewnoakes/fix-decoder',
    external: true,
  },
]

export function Sidebar() {
  const { isCollapsed, toggleCollapsed } = useSidebar()

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div
        className={cn(
          'flex h-16 items-center border-b px-4',
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
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                item.active
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

        <Separator className="my-4" />

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

      {/* Collapse Toggle */}
      <div className="border-t p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapsed}
          className={cn(
            'w-full text-sidebar-foreground hover:bg-sidebar-accent',
            isCollapsed && 'justify-center'
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  )
}
