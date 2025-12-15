
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Shield,
    ArrowRightLeft,
    Search,
    Server,
    Tags,
    Users,
    Briefcase,
    Zap,
    TrendingUp,
    BookOpen,
    Code2
} from 'lucide-react'
import { DelimiterTable } from '@/components/decoder/DelimiterTable'

import { SEO } from '@/components/common/SEO'

export function FeaturesPage() {
    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-8">
            <SEO
                title="Features"
                description="Explore the capabilities of Sun's FIX Decoder: client-side processing, visual message flow, instant search, and custom tag support."
                keywords={['fix capabilities', 'fix tools', 'client side fix parser', 'fix visualization']}
            />
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-xl">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src={`${import.meta.env.BASE_URL}sun_fix_decoder_icon.png`}
                            alt="Sun's FIX Decoder"
                            className="h-12 w-12"
                        />
                        <h1 className="text-3xl font-bold">Features</h1>
                    </div>
                    <p className="text-lg text-blue-100 max-w-2xl">
                        A modern, open-source tool for decoding and visualizing FIX protocol messages.
                        Built for traders, developers, and anyone working with electronic trading systems.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                        <Badge className="bg-white/20 hover:bg-white/30 text-white border-0">
                            <Shield className="h-3 w-3 mr-1" /> Privacy First
                        </Badge>
                        <Badge className="bg-white/20 hover:bg-white/30 text-white border-0">
                            <Zap className="h-3 w-3 mr-1" /> Instant Decoding
                        </Badge>
                        <Badge className="bg-white/20 hover:bg-white/30 text-white border-0">
                            <Code2 className="h-3 w-3 mr-1" /> Open Source
                        </Badge>
                    </div>
                </div>
            </div>



            {/* Feature Highlights */}
            <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                            <Zap className="h-5 w-5 text-blue-500" />
                        </div>
                        Key Capabilities
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Everything you need to analyze FIX messages effectively:
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            {
                                icon: Shield,
                                color: 'emerald',
                                title: 'Privacy & Security',
                                desc: 'All processing happens locally. Your data never leaves your browser.',
                            },
                            {
                                icon: ArrowRightLeft,
                                color: 'blue',
                                title: 'Visual Message Flow',
                                desc: 'Reconstruct conversation flows with clear sender/receiver alignment.',
                            },
                            {
                                icon: Search,
                                color: 'purple',
                                title: 'Instant Search',
                                desc: 'Real-time filtering by tag number or value description.',
                            },
                            {
                                icon: Tags,
                                color: 'orange',
                                title: 'Custom Tags',
                                desc: 'Extend the dictionary with your own custom tag definitions.',
                            },
                            {
                                icon: Server,
                                color: 'slate',
                                title: 'Self-Host Capable',
                                desc: 'Deploy as a static site on your own infrastructure. No backend required.',
                            },
                        ].map((feature) => (
                            <div key={feature.title} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                <div className={`rounded-lg bg-${feature.color}-100 dark:bg-${feature.color}-900/30 p-2`}>
                                    <feature.icon className={`h-4 w-4 text-${feature.color}-500`} />
                                </div>
                                <div>
                                    <h4 className="font-medium">{feature.title}</h4>
                                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Target Users */}
            <Card className="border-l-4 border-l-emerald-500 hover:shadow-lg transition-shadow">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                            <Users className="h-5 w-5 text-emerald-500" />
                        </div>
                        Who Is This For?
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Sun's FIX Decoder is designed to be easy to use for anyone working with FIX protocol messages:
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            {
                                icon: Briefcase,
                                color: 'blue',
                                title: 'FIX Professionals',
                                desc: 'Developers, analysts, and architects working with FIX-based trading systems',
                            },
                            {
                                icon: Zap,
                                color: 'orange',
                                title: 'Front Office Tech Support',
                                desc: 'Technical support teams troubleshooting trading connectivity issues',
                            },
                            {
                                icon: TrendingUp,
                                color: 'emerald',
                                title: 'Stock Traders',
                                desc: 'Traders who want to inspect FIX messages for their live trades and order executions',
                            },
                            {
                                icon: BookOpen,
                                color: 'green',
                                title: 'Students & Learners',
                                desc: 'Anyone learning about the FIX protocol and electronic trading',
                            },
                            {
                                icon: Users,
                                color: 'purple',
                                title: 'Curious Minds',
                                desc: 'Anyone interested in understanding FIX messages and financial protocols',
                            },
                        ].map((user) => (
                            <div key={user.title} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                <div className={`rounded - lg bg - ${user.color} -100 dark: bg - ${user.color} -900 / 30 p - 2`}>
                                    <user.icon className={`h - 4 w - 4 text - ${user.color} -500`} />
                                </div>
                                <div>
                                    <h4 className="font-medium">{user.title}</h4>
                                    <p className="text-sm text-muted-foreground">{user.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Delimiter Table */}
            <DelimiterTable />
        </div>
    )
}
