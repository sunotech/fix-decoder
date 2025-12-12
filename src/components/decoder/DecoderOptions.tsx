import { Switch } from '@/components/ui/switch'

interface DecoderOptionsProps {
  showDataType: boolean
  onShowDataTypeChange: (value: boolean) => void
}

export function DecoderOptions({
  showDataType,
  onShowDataTypeChange,
}: DecoderOptionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Switch
        id="show-data-type"
        checked={showDataType}
        onCheckedChange={onShowDataTypeChange}
      />
      <label
        htmlFor="show-data-type"
        className="text-sm text-muted-foreground cursor-pointer"
      >
        Show data types
      </label>
    </div>
  )
}
