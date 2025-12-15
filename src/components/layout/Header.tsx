import { Menu, Search, X } from 'lucide-react'
import { useSidebar } from '@/context/SidebarContext'
import { useSearch } from '@/context/SearchContext'
import { useNavigation } from '@/context/NavigationContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from './ThemeToggle'

export function Header() {
  const { toggleMobile } = useSidebar()
  const { searchQuery, setSearchQuery, clearSearch } = useSearch()
  const { currentPage } = useNavigation()

  const showSearch = currentPage === 'decoder'

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card shadow-sm px-4 md:px-6">
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
        {showSearch && (
          <div className="relative max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search fields..."
              className="pl-8 pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
                onClick={clearSearch}
              >
                <X className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Mobile Title */}
      <div className="flex-1 md:hidden">
        <h1 className="text-lg font-semibold">Sun's FIX Decoder</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  )
}
