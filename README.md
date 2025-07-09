# Napkins Everywhere

A modern, responsive digital magazine platform for Minerva University's premier student-run arts and literary publication. This application provides an engaging, interactive experience for showcasing creative works, articles, and multimedia content.

## Overview

Napkins is an independent, student-run arts organization at Minerva University, established in 2022. Originally launched as a literary and art magazine, it has evolved into a dynamic platform that combines digital publishing with interactive events and exhibitions.

## Architecture

This project consists of two main components:

### Frontend (Client)

- **Framework**: Next.js 15.3.2
- **Styling**: Tailwind CSS with custom design system
- **Typography**: Premium font stack (Inter, Playfair Display, JetBrains Mono)
- **Features**:
  - Responsive design optimized for all devices
  - Interactive animations and hover effects
  - Magazine browsing with pagination
  - Entry detail pages with related content
  - Slideshow galleries for image content
  - Download links for PDF/EPUB versions
  - Mouse-tracking parallax effects

### Backend (Strapi CMS)

- **Framework**: Strapi 4.x
- **Database**: SQLite (development)
- **Content Types**:

  - Magazines (issues with cover images, metadata, download links)
  - Entries (articles, stories, artwork within magazines)
  - Media management for images and files

  ## Project Structure

```
napkins-everywhere/
├── client/                     # Next.js frontend application
│   ├── app/                   # Next.js 13+ app router
│   │   ├── magazines/         # Magazine listing and detail pages
│   │   ├── about-us/          # About page
│   │   ├── contact/           # Contact page
│   │   ├── events/            # Events page
│   │   └── fractal/           # Interactive exhibition
│   ├── components/            # Reusable React components
│   │   ├── content-renderers/ # Dynamic content display components
│   │   └── context/           # React context providers
│   ├── hooks/                 # Custom React hooks
│   ├── public/                # Static assets
│   └── utils/                 # Utility functions and components
└── strapi-backend/            # Strapi CMS backend
    ├── src/
    │   ├── api/              # API endpoints and content types
    │   └── extensions/       # Strapi extensions
    └── config/               # Strapi configuration
```

# Napkins Everywhere - Frontend

This directory contains the Next.js frontend application for the Napkins digital magazine platform.

## Quick Start

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:3000`

## Technology Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Styling**: Tailwind CSS
- **Typography**: Inter, Playfair Display, JetBrains Mono
- **Backend Integration**: Strapi CMS via REST API

## Key Features

- Responsive magazine browsing and reading experience
- Interactive animations and parallax effects
- Dynamic content rendering based on content type
- Slideshow galleries and image stacking layouts
- PDF/EPUB download integration

## Contributing

This project is maintained by the Napkins editorial team at Minerva University. For contributions or questions, please contact the editorial team.

## Credits

- **Original Design & Development**: Yuya Htet, Zhi Zhi
- **Current Development**: Andrea Garcia, Fortune Declan
- **Organization**: Napkins Editorial Team, Minerva University

## License

This project is maintained by Minerva University's Napkins organization. All rights reserved.
