import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Split, CheckCircle2 } from 'lucide-react'

export function DelimiterTable() {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                    <Split className="h-5 w-5" />
                    Supported Delimiters
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-muted/20">
                                <th className="text-left p-2 font-medium text-muted-foreground text-sm">Delimiter</th>
                                <th className="text-left p-2 font-medium text-muted-foreground text-sm">Description</th>
                                <th className="text-right p-2 font-medium text-muted-foreground text-sm">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { char: '\\x01 / \\u0001', desc: 'SOH (official FIX delimiter)' },
                                { char: '|', desc: 'Pipe' },
                                { char: ';', desc: 'Semicolon' },
                                { char: '^', desc: 'Caret' },
                                { char: '^A', desc: 'Text representation of SOH' },
                                { char: '\\t', desc: 'Tab' },
                            ].map((item, index) => (
                                <tr key={index} className="border-b last:border-0 hover:bg-muted/10 transition-colors">
                                    <td className="p-2 font-mono text-sm">{item.char}</td>
                                    <td className="p-2 text-sm">{item.desc}</td>
                                    <td className="p-2 text-right">
                                        <span className="inline-flex items-center justify-center text-green-500">
                                            <CheckCircle2 className="h-5 w-5" />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}
