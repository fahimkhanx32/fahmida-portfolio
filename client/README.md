# Dr. Fahmida Bristy — Portfolio

A premium personal portfolio for Dr. Fahmida Bristy, Registered Veterinary Doctor
(BVC Registration No. 10592). React + JavaScript (JSX) + Tailwind CSS, built with
Vite. This is the frontend (`client/`). The backend API is in `../server/` (see `server/README.md`); the frontend is not wired to it yet.

## Quick start

```bash
npm install
npm run dev        # development server at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

See `INSTALLATION.md` for requirements and deployment.

## What is published, and what is hidden

The site shows **only confirmed information**. Everything else is built and
ready, but stays hidden until real content is added.

| Visible now | Hidden until content exists |
| --- | --- |
| Hero, About, Professional registration, Education timeline, PSU internship, Career snapshot, FAQ, Contact (Facebook) | Expertise, Services, Experience, Clinical work, Research, Certifications, Achievements, Community, Knowledge/blog, Gallery, Testimonials, How I work, CV section and Download CV buttons |

Section visibility is decided in one place: `src/data/navigation.js`. The navbar,
page and footer all follow it, so a hidden section never leaves a dead link.

## Items to confirm before publishing

1. **Degree title.** "B.Sc. Vet Sci and A.H." was supplied but flagged for checking
   against the certificate. Until `degree.verified` is `true` in `src/data/profile.js`,
   the site states only the academic subject (Animal Science and Veterinary Medicine).
2. **"CT (PSU, Thailand)".** Kept as an unpublished draft in `src/data/more.js`
   (`published: false`). It is not expanded or described as completed.
3. **PSU internship** is shown as *Ongoing*, never as completed. Campus, department,
   modules and outcomes are intentionally not stated.

## Project structure

```
src/
  components/   Navbar, Footer, ThemeToggle, SectionHeading (Section shell),
                Timeline, ProjectGallery (lightbox), ContactForm, Portrait
  sections/     One file per section (Hero, About, Registration, Education, ...)
  data/         All content: profile, education, internship, expertise,
                services, experience, research, gallery, testimonials, faq,
                more (cases, certifications, achievements, welfare, articles),
                navigation (section registry)
  hooks/        useTheme, useActiveSection, useReveal
  styles/       index.css (Tailwind + theme tokens)
public/         favicon.svg; put the CV, photos and certificates here
```

## Editing content

Almost everything is in `src/data/`. Start with **`src/data/profile.js`**.

- **Profile photo.** Copy a photo into `public/images/` (e.g. `portrait.jpg`, about
  800×1000 px) and set `photo: './images/portrait.jpg'` in `profile.js`. Update
  `photoAlt` if needed. Without a photo, an elegant monogram is shown.
- **CV.** Copy the PDF to `public/` and set `cvPath: './Fahmida-Bristy-CV.pdf'`. The
  navbar button and the CV section then appear automatically.
- **Contact details.** Fill `contact.email`, `contact.phone`, `contact.address`,
  `contact.note` in `profile.js`. Blank values are never shown. When an email is
  set, a message form appears; it opens the visitor's own email app with the
  message pre-filled (nothing is sent by the website).
- **Social links.** Add real URLs under `social` in `profile.js`. Facebook is set.
- **Registration certificate.** Set `registration.certificateImage`.
- **Canonical / Open Graph URL.** Set `siteUrl` (e.g. `https://example.com`) once
  deployed. Nothing is added until it is set.

### Adding new content

Each file in `src/data/` documents its item shape at the top.

- **Experience:** add objects to `experience.js`. Section appears automatically.
- **Expertise:** set `confirmed: true` for areas supported by real experience.
- **Services:** write a description and set `confirmed: true` (publish 3–6).
- **Case studies, certificates, achievements, community work, articles:** add items
  to the matching array in `more.js`. For a certificate, also set `published: true`.
- **Research:** add items to `research.js`.
- **Gallery:** put images in `public/images/`, then add `{ id, src, alt, caption }`
  entries in `gallery.js`. PSU photos can go in `internship.photos`.
- **Testimonials:** add only authentic, permission-approved quotes in `testimonials.js`.
- **How I work:** edit the steps in `src/sections/ProfessionalApproach.jsx`, then
  set `visible: true` for `approach` in `navigation.js`.

## Themes

Light and dark are two separately tuned palettes defined as CSS variables at the
top of `src/styles/index.css` (`:root` and `.dark`). Change colours there only.

- The toggle is in the navbar (sun/moon). The choice is saved in `localStorage`.
- On a first visit the operating system's colour scheme is used, and it keeps
  following the system until the visitor chooses.
- A small inline script in `index.html` sets the theme before first paint, so
  there is no flash of the wrong theme.
- Text/background pairs were checked: all are at least 5.6:1 (WCAG AA needs 4.5:1).

## Accessibility and motion

Semantic landmarks, skip link, visible focus rings, keyboard-operable menu (Esc
closes), accessible FAQ and lightbox, alt text support, and
`prefers-reduced-motion` support that disables reveal, timeline and scroll
animations.

## Navbar (floating glass, spotlight sweep)

- Component: `src/components/Navbar.jsx`; styles/tokens at the end of `src/styles/index.css` (separate light and dark designs).
- Links and the **More** dropdown are defined in `src/data/navigation.js` (`primaryNav`, `moreNav`). Each `target` is the section id it scrolls to.
- Sections with no confirmed content yet render a small "being prepared" placeholder so no link is dead. Set `SHOW_PLACEHOLDERS = false` in `navigation.js` to hide them again.
- Spotlight moves on click and scroll-spy only (no hover).
- **Download CV** stays disabled until `profile.cvPath` is set (the dashboard upload should set it).
- **Login** opens a page at `/login` (UI-only form, not connected to a backend yet). Set `profile.contact.loginUrl` to point the button at your real login page instead. Production hosting needs an SPA fallback so `/login` serves `index.html`.
- Phone/email in the top strip come from `profile.contact`.

## Backend wiring, login and dashboard

- Run the API (`server/`, see its README) and the site (`npm run dev`); Vite proxies `/api` to `http://localhost:5000`. For a separate API origin set `VITE_API_URL` (see `.env.example`) and `CLIENT_ORIGIN` on the server.
- Pages: `/login`, `/forgot-password`, `/reset-password?token=...`, `/dashboard` (CV upload, appointments, messages, change password). They load on demand (MUI is not in the public bundle). Static hosting needs an SPA fallback so these paths serve `index.html`.
- Login page background: `public/login-bg.svg` (generated scene). Set `profile.loginBackground` to an image URL to use your own.
- The Download CV button, the appointment form and the contact form all call the API.
