import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Github,
  Heart,
  Zap,
  Bot,
  User,
  Shield,
  Sparkles,
  Code2,
  ArrowRight
} from 'lucide-react'

import { SEO } from '@/components/common/SEO'

export function AboutPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-8">
      <SEO
        title="About"
        description="Learn about Sun's FIX Decoder, an open-source project by Drew Noakes. Built with React, Vite, and Tailwind CSS."
        keywords={['about fix decoder', 'open source fix tool', 'drew noakes', 'fix protocol project']}
      />
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/sun_fix_decoder_icon.png"
              alt="Sun's FIX Decoder"
              className="h-12 w-12"
            />
            <h1 className="text-3xl font-bold">About</h1>
          </div>
          <p className="text-lg text-blue-100 max-w-2xl">
            Sun's FIX Decoder is a modern, open-source tool for decoding and visualizing FIX protocol messages.
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

      {/* Original Author Credit */}
      <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
              <Heart className="h-5 w-5 text-red-500" />
            </div>
            Original Author
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This tool was originally created by{' '}
            <a
              href="https://github.com/drewnoakes/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              Drew Noakes
            </a>
            , a talented software developer who built the original FIX Message Decoder
            to help developers and financial professionals decode and visualize FIX protocol messages.
          </p>
          <a
            href="https://github.com/drewnoakes/fix-decoder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground group"
          >
            <Github className="h-4 w-4" />
            Original Repository
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </CardContent>
      </Card>

      {/* About Me */}
      <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <User className="h-5 w-5 text-blue-500" />
            </div>
            About Me
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            I'm a financial technology professional with extensive experience in electronic trading systems
            and the FIX protocol. Over the years, I've worked across various roles in the financial industry,
            from front office technology support to building and maintaining trading infrastructure.
          </p>
          <p className="text-muted-foreground">
            My daily work involves troubleshooting FIX connectivity issues, analyzing trade flows,
            and ensuring seamless communication between trading systems. This hands-on experience
            gave me a deep appreciation for tools that can quickly decode and visualize FIX messages.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">FIX Protocol</Badge>
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">Electronic Trading</Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">Financial Technology</Badge>
            <Badge variant="secondary" className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">Trading Systems</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Why I Modernized It */}
      <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
              <Zap className="h-5 w-5 text-orange-500" />
            </div>
            Why I Modernized It
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            As someone who has worked extensively with the FIX protocol in the financial industry,
            I found Drew's tool incredibly useful for quickly decoding and understanding FIX messages.
            However, the original implementation was built with older technologies (jQuery, Handlebars, RequireJS).
          </p>
          <p className="text-muted-foreground">
            I decided to modernize the tool using modern web technologies to provide a better
            user experience while preserving the core functionality that made the original so valuable.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {[
              { icon: '⚛️', label: 'React 18' },
              { icon: '📘', label: 'TypeScript' },
              { icon: '🎨', label: 'TailwindCSS' },
              { icon: '🌙', label: 'Dark Mode' },
              { icon: '📱', label: 'Mobile Ready' },
              { icon: '⚡', label: 'Fast & Light' },
            ].map((tech) => (
              <div key={tech.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{tech.icon}</span>
                <span>{tech.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Co-authoring */}
      <Card className="border-l-4 border-l-violet-500 hover:shadow-lg transition-shadow bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-900/30">
              <Bot className="h-5 w-5 text-violet-500" />
            </div>
            Co-authored with AI
            <Sparkles className="h-4 w-4 text-violet-400" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            One of my goals with this project was to explore how AI tools can accelerate and enhance
            software development. This modernized version of FIX Decoder was co-authored with AI assistance,
            demonstrating the potential of human-AI collaboration in building real-world applications.
          </p>
          <p className="text-muted-foreground">
            From architecture decisions to component design, styling choices to code optimization,
            AI served as a collaborative partner throughout the development process. This project
            stands as an example of how developers can leverage AI tools to ship quality software
            faster while maintaining full control over the creative direction and technical decisions.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white border-0">
              <Bot className="h-3 w-3 mr-1" />
              Human + AI Collaboration
            </Badge>
          </div>
        </CardContent>
      </Card>




    </div>
  )
}
