import { Button } from '@/components/ui/button'

interface SampleMessagesProps {
  onSelect: (message: string) => void
}

const SAMPLE_MESSAGES = [
  {
    label: 'New Order Single',
    message:
      '8=FIX.4.2|9=130|35=D|34=659|49=BROKER04|52=20070123-19:09:43|56=REUTERS|1=ABCTEST1|11=123456|21=1|38=1000|40=2|44=100|54=1|55=IBM|59=0|60=20070123-19:01:17|10=081|',
  },
  {
    label: 'Execution Report',
    message:
      '8=FIX.4.2|9=235|35=8|34=127|49=REUTERS|52=20070123-19:09:44|56=BROKER04|1=ABCTEST1|6=100|11=123456|14=1000|17=200007|20=0|31=100|32=1000|37=200007|38=1000|39=2|40=2|44=100|54=1|55=IBM|59=0|60=20070123-19:01:17|150=2|151=0|10=023|',
  },
  {
    label: 'Heartbeat',
    message:
      '8=FIX.4.2|9=49|35=0|34=3|49=BANZAI|52=20121105-23:24:06|56=EXEC|10=228|',
  },
]

export function SampleMessages({ onSelect }: SampleMessagesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <span className="text-xs text-orange-100 self-center">
        Try a sample:
      </span>
      {SAMPLE_MESSAGES.map((sample) => (
        <Button
          key={sample.label}
          variant="outline"
          size="sm"
          onClick={() => onSelect(sample.message)}
          className="text-xs bg-orange-600 border-orange-700 text-white hover:bg-orange-700 hover:text-white"
        >
          {sample.label}
        </Button>
      ))}
    </div>
  )
}
