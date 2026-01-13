# Zer0Point Tech Ltd - Corporate Website 

A modern, responsive corporate website for Zer0Point Tech Ltd, a consulting firm specializing in GCC market entry and technology solutions.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: tRPC (Vercel Serverless Functions)
- **Email**: Nodemailer with Gmail SMTP
- **Security**: Google reCAPTCHA Enterprise

## Features

- Responsive design optimized for all devices
- Contact form with email notifications
- reCAPTCHA Enterprise spam protection
- SEO-optimized pages
- GDPR/UAE compliant privacy policy

## Deployment to Vercel

### Prerequisites

1. A Vercel account
2. A GitHub repository (optional, but recommended)

### Environment Variables

Configure these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Description |
|----------|-------------|
| `SMTP_USER` | Gmail address for sending emails |
| `SMTP_PASS` | Gmail App Password (not regular password) |
| `RECAPTCHA_API_KEY` | Google Cloud reCAPTCHA Enterprise API Key |

### Deploy Steps

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Custom Domain Setup

1. Go to Vercel Dashboard → Domains
2. Add your domain (e.g., zer0point.io)
3. Configure DNS records as instructed by Vercel

## Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build:vercel
```

## License

MIT


## Version

Deployed: January 13, 2026
# Deployment 1768292811
