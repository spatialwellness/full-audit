# Full Spatial Wellness Audit

Live at: **https://full-audit.vercel.app**

A comprehensive spatial wellness audit webapp for House of Return.
Built with Next.js 14, Tailwind CSS, TypeScript. Deployed on Vercel.

## Pages

- `/` - Landing and checkout page (shows Stripe checkout or "coming soon")
- `/intake` - 5-step intake form (company details, space info, photos, experience scores, deeper questions)
- `/results/[id]` - Personalised results page with interactive checklist, colour palettes, layout suggestions

## API Routes

- `POST /api/submit` - Receives intake form data, calculates scores, generates action plan
- `GET /api/results/[id]` - Retrieves result data by ID
- `POST /api/checkout` - Creates Stripe checkout session
- `POST /api/webhooks/stripe` - Handles Stripe payment events

## Storage

Results are stored in:
1. **localStorage** (client-side) - immediately after intake submission, for that browser session
2. **Vercel KV** (server-side) - if `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set
3. **`/tmp`** - fallback within the same warm function instance (not persistent across cold starts)

For production: set up Vercel KV (via Vercel dashboard > Storage > KV) and link it to this project.
The KV env vars (`KV_REST_API_URL`, `KV_REST_API_TOKEN`) are auto-added when you link the store.

## Environment Variables (Vercel Dashboard)

Set these in Vercel > full-audit project > Settings > Environment Variables:

```
# Stripe (payment)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_ID=price_...           # The €197 product price ID
STRIPE_WEBHOOK_SECRET=whsec_...     # From Stripe dashboard > Webhooks

# Email notifications (optional but recommended)
RESEND_API_KEY=re_...               # Get from resend.com

# Base URL
NEXT_PUBLIC_BASE_URL=https://full-audit.vercel.app

# Vercel KV (auto-populated when you link a KV store)
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
```

## Stripe Setup

1. Create Stripe account at stripe.com
2. Create product: "Full Spatial Wellness Audit" - €197
3. Create coupon: LITE30 (€30 off, time-limited, for Lite Audit users)
4. Enable automatic invoicing in Stripe settings
5. Add webhook endpoint: `https://full-audit.vercel.app/api/webhooks/stripe`
   - Events to listen for: `checkout.session.completed`, `payment_intent.payment_failed`
6. Add all env vars to Vercel dashboard
7. Redeploy: `npx vercel --prod --yes --token <your-token>`

## Discount Code

`LITE30` - 30 euros off. Intended for clients who completed the Lite Audit.
Valid for 7 days after Lite results (enforced manually or via Stripe coupon expiry).

## Client Flow

1. Client clicks "Book Full Audit" → Stripe checkout (or intake directly if no Stripe)
2. After payment → redirected to `/intake`
3. Fills 5-step form, uploads minimum 8 photos
4. Submits → receives unique results URL `/results/[id]`
5. Email notification sent to home@houseofreturn.nl
6. Elianne reviews intake data, optionally enriches results
7. Results page sent to client (stays live 1+ year)
8. Client works through interactive checklist

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

```bash
npx vercel --prod --yes --token <vercel-token>
```

## Architecture

```
app/
  page.tsx              - Landing/checkout page
  intake/page.tsx       - 5-step intake form
  results/[id]/page.tsx - Interactive results page
  api/
    submit/             - Process intake, generate results
    results/[id]/       - Retrieve results
    checkout/           - Create Stripe session
    webhooks/stripe/    - Handle payments

lib/
  color-palettes.ts     - 10 Farrow & Ball-referenced colour palettes
  layout-examples.ts    - 5 layout principles with SVG diagrams
  scoring.ts            - Score calculation and action item generation
  storage.ts            - KV/tmp storage abstraction
  types.ts              - TypeScript types
```
