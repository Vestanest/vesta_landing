# PropertyCard Component

A reusable, animated property card component with feature chips and modern design.

## Features

- 🎨 Beautiful gradient backgrounds and hover effects
- 🏠 Property feature chips with icons
- ⭐ Animated rating display
- 💰 Price badge with gradient styling
- 📱 Responsive design
- 🌙 Dark mode support
- ✨ Smooth animations with Framer Motion
- 🔧 Fully customizable

## Usage

### Basic Usage

```tsx
import PropertyCard, { Property } from "./PropertyCard";

const property: Property = {
  title: "Modern Villa",
  description: "Spacious, sunlit, and located in a serene neighborhood.",
  location: "Accra, Ghana",
  rating: 4.8,
  price: "450,000",
  image: "https://example.com/image.jpg",
  gradient: "from-orange-500 to-amber-500",
};

<PropertyCard property={property} />;
```

### With Custom Features

```tsx
import PropertyCard, { Property, PropertyFeature } from "./PropertyCard";
import { BuildingOffice2Icon, SwatchIcon } from "@heroicons/react/24/solid";

const property: Property = {
  title: "Luxury Penthouse",
  description: "Exclusive penthouse with panoramic city views.",
  location: "Accra, Ghana",
  rating: 4.9,
  price: "750,000",
  image: "https://example.com/image.jpg",
  gradient: "from-purple-500 to-pink-500",
  features: [
    {
      name: "Bedrooms",
      value: "3",
      icon: BuildingOffice2Icon,
    },
    {
      name: "Bathrooms",
      value: "3",
      icon: SwatchIcon,
    },
  ],
};

<PropertyCard property={property} />;
```

### With Custom Styling

```tsx
<PropertyCard property={property} className="custom-class" />
```

## Props

### PropertyCardProps

| Prop        | Type       | Required | Description            |
| ----------- | ---------- | -------- | ---------------------- |
| `property`  | `Property` | Yes      | Property data object   |
| `className` | `string`   | No       | Additional CSS classes |

### Property Interface

| Property      | Type                | Required | Description               |
| ------------- | ------------------- | -------- | ------------------------- |
| `title`       | `string`            | Yes      | Property title            |
| `description` | `string`            | Yes      | Property description      |
| `location`    | `string`            | Yes      | Property location         |
| `rating`      | `number`            | Yes      | Property rating (0-5)     |
| `price`       | `string`            | Yes      | Property price            |
| `image`       | `string`            | Yes      | Property image URL        |
| `gradient`    | `string`            | Yes      | Tailwind gradient classes |
| `delay`       | `number`            | No       | Animation delay           |
| `features`    | `PropertyFeature[]` | No       | Custom property features  |

### PropertyFeature Interface

| Property | Type                  | Required | Description         |
| -------- | --------------------- | -------- | ------------------- |
| `name`   | `string`              | Yes      | Feature name        |
| `value`  | `string`              | Yes      | Feature value       |
| `icon`   | `React.ComponentType` | Yes      | Heroicons component |

## Default Features

If no custom features are provided, the component will display these default features:

- **Bedrooms**: 3
- **Bathrooms**: 2
- **Area**: 2,500 sq ft
- **Parking**: 2 cars
- **WiFi**: Included
- **Security**: 24/7

All feature chips use the primary orange color theme for consistency.

## Styling

The component uses Tailwind CSS classes and supports:

- **Gradients**: Use any Tailwind gradient classes
- **Colors**: All Tailwind color classes for feature chips
- **Dark Mode**: Automatic dark mode support
- **Responsive**: Mobile-first responsive design
- **Animations**: Smooth hover and scroll animations

## Examples

See `PropertyCardExample.tsx` for a complete usage example.

## Dependencies

- `framer-motion` - For animations
- `@heroicons/react` - For icons
- `tailwindcss` - For styling
