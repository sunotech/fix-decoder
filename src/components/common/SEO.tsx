import { Helmet } from 'react-helmet-async'

interface SEOProps {
    title: string
    description?: string
    keywords?: string[]
    canonicalUrl?: string
}

export function SEO({ title, description, keywords, canonicalUrl }: SEOProps) {
    const siteTitle = "Sun's FIX Decoder"
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="application-name" content={siteTitle} />
            <meta name="apple-mobile-web-app-title" content={siteTitle} />
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords.join(', ')} />}
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            {description && <meta name="twitter:description" content={description} />}
        </Helmet>
    )
}
