import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      className="relative"
    >
      <Sun
        className={cn(
          'h-5 w-5 transition-all',
          theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
        )}
      />
      <Moon
        className={cn(
          'absolute h-5 w-5 transition-all',
          theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
        )}
      />
      <Monitor
        className={cn(
          'absolute h-5 w-5 transition-all',
          theme === 'system' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
