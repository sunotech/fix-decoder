import { cn } from '@/lib/utils'

interface LogoProps {
  collapsed?: boolean
}

export function Logo({ collapsed }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={`${import.meta.env.BASE_URL}sun_fix_decoder_icon.png`}
        alt="FIX Decoder"
        className="h-8 w-8"
      />
      <span
        className={cn(
          'font-semibold text-sidebar-foreground transition-opacity',
          collapsed && 'hidden'
        )}
      >
        Sun's FIX Decoder
      </span>
    </div>
  )
}
