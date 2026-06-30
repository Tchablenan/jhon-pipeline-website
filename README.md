# JHON PIPELINE — Site Vitrine

Site institutionnel one-page pour **JHON PIPELINE**, entreprise spécialisée en soudure, tuyauterie industrielle et pose de pipelines à Abidjan, Côte d'Ivoire.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** + shadcn/ui
- **framer-motion** — animations
- **next-themes** — dark / light mode
- **React Context** — système bilingue FR / EN (sans lib i18n externe)
- **react-hook-form + zod** — validation du formulaire de contact
- **nodemailer** — envoi email SMTP via API Route

## Sections

Hero → Certifications → Indicateurs → À Propos → Valeurs → Services → Galerie → Témoignages → FAQ → CTA → Contact → Footer

## Installation

```bash
npm install
```

## Configuration

Copier `.env.local.example` en `.env.local` et renseigner les variables SMTP :

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=yourpassword
CONTACT_EMAIL=infos@jhonpipeline.com
```

## Développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```
