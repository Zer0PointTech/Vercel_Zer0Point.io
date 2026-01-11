import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
}

export default function SEO({ title, description, keywords, canonicalUrl }: SEOProps) {
  const siteTitle = "Zer0Point Tech Ltd";
  const fullTitle = `${title} | ${siteTitle}`;
  const defaultKeywords = "GCC Market Entry, Digital Transformation, Strategic Consultancy, Business Development, AI, Digital Twins, UAE, KSA, Saudi Arabia, Dubai";
  const allKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
  const baseUrl = "https://www.zer0point.io";
  const url = canonicalUrl ? canonicalUrl : baseUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${baseUrl}/og-image.jpg`} />
    </Helmet>
  );
}
