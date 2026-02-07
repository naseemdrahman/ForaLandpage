# Logo Setup Instructions

To complete the logo setup, you need to save your purple microphone image in the following formats and sizes:

## Required Image Files

Save your purple microphone image to the `public/` directory with these names:

1. **`logo.png`** - Main logo (recommended: 1200x1200px or larger, transparent background)
   - Used in the navbar
   - Used for Open Graph and Twitter card previews

2. **`favicon.ico`** - Browser favicon (16x16, 32x32, 48x48px)
   - Shows in browser tabs
   - You can use an online converter to create .ico from PNG

3. **`icon-192.png`** - PWA icon (192x192px)
   - Used for Android homescreen and PWA

4. **`icon-512.png`** - PWA icon (512x512px)
   - Used for Android homescreen and PWA

5. **`apple-icon.png`** - Apple touch icon (180x180px)
   - Used when adding to iOS homescreen

## Quick Setup

1. Take your purple microphone image
2. Resize it to the required sizes (you can use any image editor or online tool)
3. Save each size with the exact filenames listed above
4. Place all files in the `public/` directory

## Image Optimization Tips

- Use PNG format for transparency
- Keep file sizes reasonable (< 500KB for logo, < 100KB for icons)
- Ensure the logo looks good on both light and dark backgrounds (though your site uses dark)

## Testing

After adding the images:
1. Restart your dev server: `npm run dev`
2. Check the navbar - logo should appear instead of "FORA" text
3. Check browser tab - favicon should appear
4. On mobile, try "Add to Home Screen" - should show your icon
