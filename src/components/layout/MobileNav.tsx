import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/context/SidebarContext'
import { Button } from '@/components/ui/button'
import { Sidebar } from './Sidebar'

export function MobileNav() {
  const { isMobileOpen, setIsMobileOpen } = useSidebar()

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden',
          isMobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-64 bg-sidebar transition-transform duration-300 md:hidden',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Close Button */}
        <div className="absolute right-2 top-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(false)}
            className="text-sidebar-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Sidebar />
      </div>
    </>
  )
}
