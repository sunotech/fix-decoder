
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Sparkles } from 'lucide-react'

export function KeyFeatures() {
    return (
        <Card className="overflow-hidden flex flex-col h-full">
            <CardHeader className="bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Key Features
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 flex-1">
                <div className="flex flex-wrap gap-2">
                    {[
                        'Instant Decoding',
                        'Multiple Messages',
                        'Field Validation',
                        'Checksum Verification',
                        'In-place Search',
                        'Custom FIX tags',
                        'Dark Mode',
                        'Mobile Friendly',
                        'No Server Required',
                        'Privacy First',
                    ].map((feature) => (
                        <Badge key={feature} variant="outline" className="py-1.5 px-3">
                            {feature}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="bg-muted/10 p-4">
                <div className="w-full p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        All processing happens in your browser. Your FIX messages are never sent to any server.
                    </p>
                </div>
            </CardFooter>
        </Card>
    )
}
