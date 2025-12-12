import { Menu, Search } from 'lucide-react'
import { useSidebar } from '@/context/SidebarContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const { toggleMobile } = useSidebar()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleMobile}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Search */}
      <div className="hidden flex-1 md:block">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search fields..."
            className="pl-8"
          />
        </div>
      </div>

      {/* Mobile Title */}
      <div className="flex-1 md:hidden">
        <h1 className="text-lg font-semibold">FIX Decoder</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  )
}
