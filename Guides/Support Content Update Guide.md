# Support Content Update Guide

This guide explains how to update the resource tiles and support links that
appear on the **Find Support** and **Caregiver Resources** experiences in the
Caregiver Digital Access Hub frontend (Vite + React). Follow these steps
whenever you need to refresh partner links, featured services, or supporting
copy.

## 1. Locate the resource data

The resource cards shown in the screenshot are defined in two React screens:

| Area | File | Description |
| --- | --- | --- |
| Caregiver Resources page (`/find-support`) | `CDNC-frontend/src/pages/Resources.tsx` | Tabs for Caregiving Guides, Financial Support, and Community Resources. Each `ResourceCard` entry controls a tile title, category label, description, and CTA link. |
| Home page resource preview | `CDNC-frontend/src/components/Home/ResourcesSection.tsx` | Highlights a subset of resources with quick links from the landing page. |

Open the relevant file(s) in your editor to make content updates.

## 2. Update a resource tile

1. Search for the existing organization title inside the file (for example,
   `Ontario Caregiver Organization`).
2. Modify the props passed to the `ResourceCard` component:
   - `title`: text that appears as the card heading.
   - `category`: pill label displayed above the description.
   - `description`: short summary rendered under the heading.
   - `linkText`: button text (usually "Learn More" or similar).
   - `linkUrl`: destination URL. Always include `https://` and append tracking
     parameters if required.
3. Save the file. Vite’s dev server will automatically hot-reload the page.

## 3. Add a new resource tile

1. Duplicate an existing `<ResourceCard ... />` block within the correct tab
   section.
2. Update the props as described above.
3. For long lists, keep a maximum of six cards per tab so the grid remains
   balanced on desktop. If you need more, consider adding pagination or a new
   tab.

## 4. Remove a resource tile

1. Delete the `<ResourceCard ... />` block from the JSX.
2. Confirm the surrounding grid container (e.g., `<div className="grid ...">`)
   still renders valid JSX (matching opening/closing tags).

## 5. Refresh the home page preview

If the new resource should also appear on the landing page:

1. Edit `CDNC-frontend/src/components/Home/ResourcesSection.tsx`.
2. Update the `resources` array defined near the top of the file with the new
   title, summary, and link.
3. Ensure the `href` points to the detailed page (e.g., `/find-support#guides`)
   or an external URL.

## 6. QA checklist before deploying

- [ ] Run `npm install` (if you have not already) inside `CDNC-frontend`.
- [ ] Start the dev server with `npm run dev` and navigate to the updated pages.
- [ ] Test each link to verify it opens in a new tab when `external` is true, or
      routes internally when linking to another screen.
- [ ] Check the layout at both mobile (≤ 640px) and desktop (≥ 1024px)
      breakpoints.
- [ ] Commit your changes and push the branch for review.

Following this workflow keeps the resource directory accurate while avoiding
unexpected layout regressions.
