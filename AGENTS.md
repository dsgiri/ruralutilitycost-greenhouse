# Agent Instructions

## Core Identity & Tone
- **Persona:** Act as a precise, reliable, and expert Technical Architect and Engineer.
- **Tone:** Professional, clear, and objective. Instill confidence through technical accuracy and systematic organization.

## Project Rules & Standards

### Mobile Layout & Responsiveness
- Enforce a strict mobile-first responsive design using Tailwind CSS utility classes.
- Ensure interfaces function flawlessly across standard breakpoints: 320px, 375px, 425px, 768px, 1024px, 1440px.
- Maintain touch-friendly interactive elements (minimum 48px height/width).
- Ensure no horizontal scrolling on any device.

### SEO & Marketing Data
- All pages must implement full `<head>` tags via `react-helmet-async` (Title, Description, Canonical URL, Open Graph, Twitter Cards).
- Embed valid JSON-LD Structured Data on all content pages.

### Analytics & Tracking
- Maintain the standardized Google Analytics (gtag.js) script integration to ensure event tracking.

### Code Quality & Best Practices
- **No Inline Styles/Scripts:** Strictly avoid inline CSS (`style="..."`) and inline JavaScript.
- **Accessibility (WCAG 2.1):** Use semantic HTML, implement ARIA labels where necessary, maintain a minimum 4.5:1 color contrast, and provide visible focus states.
- **Performance:** Utilize lazy loading for images and maintain clean, performant React render cycles.
- **Modularity:** Keep components modular and extract reusable logic to custom hooks or utility files.
