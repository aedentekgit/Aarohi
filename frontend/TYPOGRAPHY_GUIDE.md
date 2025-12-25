# AAROHI Typography System - Quick Reference Guide

## 📚 Font Families

```css
--font-primary: 'Inter'      /* Body text, UI elements */
--font-heading: 'Playfair Display'  /* Headings, titles */
--font-display: 'Urbanist'   /* Display text, special elements */
```

---

## 🎯 Usage Examples

### **Display Headings** (Hero Sections)
```html
<h1 className="display-1">Exquisite Stone Masterpieces</h1>
<h2 className="display-2">Premium Collection</h2>
```

### **Page Headings**
```html
<h1 className="heading-1">System Overview</h1>
<h2 className="heading-2">Stone Collections</h2>
<h3 className="heading-3">Product Catalog</h3>
<h4 className="heading-4">Recent Activity</h4>
<h5 className="heading-5">Settings</h5>
<h6 className="heading-6">Details</h6>
```

### **Body Text**
```html
<p className="body-xl">Large paragraph text</p>
<p className="body-lg">Medium paragraph text</p>
<p className="body-base">Default paragraph text</p>
<p className="body-sm">Small paragraph text</p>
<p className="body-xs">Extra small text</p>
```

### **Labels & UI Elements**
```html
<label className="label-lg">FORM LABEL</label>
<label className="label-base">BUTTON TEXT</label>
<span className="label-sm">BADGE TEXT</span>
```

### **Special Text Types**
```html
<p className="subtitle">Section subtitle or description</p>
<p className="caption">Image caption or helper text</p>
<span className="overline">SECTION TAG</span>
<blockquote className="quote">Customer testimonial</blockquote>
<code className="code">console.log('Hello')</code>
```

---

## 🎨 Utility Classes

### **Font Weights**
```html
<p className="font-light">Light text (300)</p>
<p className="font-regular">Regular text (400)</p>
<p className="font-medium">Medium text (500)</p>
<p className="font-semibold">Semibold text (600)</p>
<p className="font-bold">Bold text (700)</p>
<p className="font-extrabold">Extra bold (800)</p>
<p className="font-black">Black text (900)</p>
```

### **Text Colors**
```html
<p className="text-primary">#0F0F0F - Main text</p>
<p className="text-secondary">#64748b - Secondary text</p>
<p className="text-muted">#94a3b8 - Muted text</p>
<p className="text-accent">#fae606 - Accent/Yellow</p>
<p className="text-white">#FAFAFA - White text</p>
```

### **Text Alignment**
```html
<p className="text-left">Left aligned</p>
<p className="text-center">Center aligned</p>
<p className="text-right">Right aligned</p>
```

### **Text Transform**
```html
<p className="uppercase">UPPERCASE TEXT</p>
<p className="lowercase">lowercase text</p>
<p className="capitalize">Capitalize Text</p>
```

### **Line Clamp** (Truncate text)
```html
<p className="line-clamp-1">Single line truncated...</p>
<p className="line-clamp-2">Two lines truncated...</p>
<p className="line-clamp-3">Three lines truncated...</p>
```

---

## 📱 Responsive Behavior

The typography system automatically adjusts font sizes for different screen sizes:

- **Desktop (>1024px)**: Full sizes
- **Tablet (768px-1024px)**: Slightly reduced
- **Mobile (<768px)**: Optimized for small screens

---

## 💡 Best Practices

### ✅ **DO:**
- Use `heading-1` to `heading-6` for page structure
- Use `display-1` and `display-2` for hero sections
- Use `body-base` for main content
- Use `label-base` for form labels and buttons
- Combine classes: `<h1 className="heading-1 text-accent">Title</h1>`

### ❌ **DON'T:**
- Mix display headings with regular content
- Use multiple heading classes on same element
- Override font families unless absolutely necessary

---

## 🔧 Customization

To customize, edit `/frontend/src/styles/typography.css`:

```css
:root {
  --font-primary: 'YourFont', sans-serif;
  --text-base: 1.125rem; /* Change base size */
  /* ... other variables */
}
```

---

## 📋 Complete Class Reference

| Category | Classes |
|----------|---------|
| **Display** | `display-1`, `display-2` |
| **Headings** | `heading-1`, `heading-2`, `heading-3`, `heading-4`, `heading-5`, `heading-6` |
| **Body** | `body-xl`, `body-lg`, `body-base`, `body-sm`, `body-xs` |
| **Labels** | `label-lg`, `label-base`, `label-sm` |
| **Special** | `subtitle`, `caption`, `overline`, `quote`, `code` |
| **Weights** | `font-light`, `font-regular`, `font-medium`, `font-semibold`, `font-bold`, `font-extrabold`, `font-black` |
| **Colors** | `text-primary`, `text-secondary`, `text-muted`, `text-accent`, `text-white` |
| **Alignment** | `text-left`, `text-center`, `text-right` |
| **Transform** | `uppercase`, `lowercase`, `capitalize` |
| **Truncate** | `line-clamp-1`, `line-clamp-2`, `line-clamp-3` |

---

## 🎯 Example Component

```jsx
const ProductCard = () => (
  <div>
    <span className="overline text-accent">NEW ARRIVAL</span>
    <h3 className="heading-4 font-bold">Italian Marble</h3>
    <p className="body-sm text-secondary line-clamp-2">
      Premium quality marble from Italy with exquisite patterns
    </p>
    <button className="label-base uppercase">View Details</button>
  </div>
);
```

---

**Last Updated:** December 2024  
**Version:** 1.0.0
