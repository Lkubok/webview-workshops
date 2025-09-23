# WebView Workshop Presentation

A comprehensive Next.js 15 presentation app for the React Native WebView Integration Workshop.

## Features

- 📱 Responsive design optimized for both desktop and mobile viewing
- 🎨 Clean, professional presentation layout with smooth animations
- 💻 Syntax-highlighted code blocks with copy functionality
- 🧭 Intuitive navigation with progress tracking
- 📝 Interactive content based on the workshop agenda
- ⚡ Built with Next.js 15 for optimal performance

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The presentation will be available at `http://localhost:3020`

## Presentation Structure

The presentation is organized into 6 main sections:

### 1. Introduction & Topic Overview (20 min)
- Welcome and interactive discussion
- WebView fundamentals and use cases
- When to use WebView vs alternatives

### 2. Our Approach to Loyalty App Integration (10 min)
- Real-world case study from Vaillant
- Authentication flow demonstration
- Challenges and solutions

### 3. Tools & Architecture Overview (10 min)
- Monorepo setup with pnpm and Turborepo
- Keycloak configuration and security
- PKCE implementation for mobile apps

### 4. WebView Deep Dive & Communication Bridges (20 min)
- Essential WebView configuration
- Security considerations and best practices
- Two-way communication patterns

### 5. Hands-on Coding Session (90 min)
- 5 progressive exercises with code examples
- From basic setup to advanced token management
- Interactive code blocks with copy functionality

### 6. Advanced WebView Topics & Troubleshooting (20 min)
- Common production issues and solutions
- Advanced integration patterns
- Debugging techniques and tools

## Technical Features

### Code Highlighting
- Syntax highlighting for TypeScript, JavaScript, and other languages
- Line numbers for easy reference
- One-click copy functionality
- Responsive code blocks that work on all screen sizes

### Navigation
- Progress indicator showing current section
- Previous/Next navigation with keyboard shortcuts
- Mobile-optimized navigation menu
- Direct section jumping

### Responsive Design
- Optimized for presentation screens, laptops, tablets, and phones
- Smooth animations and transitions
- Professional typography and spacing
- Accessible color scheme and contrast

## Development

### Project Structure

```
apps/presentation/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── CodeBlock.tsx   # Syntax highlighting component
│   │   ├── Navigation.tsx  # Navigation bar and progress
│   │   └── PresentationLayout.tsx
│   ├── approach/           # Section 2: Loyalty app approach
│   ├── architecture/       # Section 3: Tools & architecture
│   ├── webview-deep-dive/ # Section 4: WebView deep dive
│   ├── hands-on/          # Section 5: Hands-on exercises
│   ├── advanced/          # Section 6: Advanced topics
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Section 1: Introduction
│   └── types.ts           # TypeScript definitions
├── tailwind.config.js     # Tailwind CSS configuration
├── next.config.js         # Next.js configuration
└── package.json
```

### Customization

#### Adding New Sections
1. Create a new page component in the appropriate directory
2. Update the navigation configuration in `components/Navigation.tsx`
3. Add the route to the sections array

#### Modifying Code Examples
Code examples are embedded directly in the page components using the `CodeBlock` component:

```tsx
<CodeBlock
  code={yourCodeExample}
  title="Example Title"
  language="typescript"
  showLineNumbers={true}
/>
```

#### Styling
The presentation uses Tailwind CSS for styling. Key design tokens:

- **Primary colors**: Blue tones (`primary-*` classes)
- **Code syntax**: VS Code dark theme colors
- **Typography**: System fonts with monospace for code
- **Animations**: Fade-in and slide-in animations for smooth presentation

### Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## Workshop Integration

This presentation is designed to complement the hands-on workshop exercises. It includes:

- **Code examples** from the actual workshop exercises
- **Interactive elements** that engage the audience
- **Progressive disclosure** of complexity
- **Real-world context** from production implementations

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Optimized for presentation displays and projectors

## Contributing

When updating the presentation:

1. Follow the existing code style and structure
2. Test on multiple screen sizes and browsers
3. Ensure code examples are accurate and functional
4. Update this README if adding new features

## License

This presentation is part of the WebView Workshop materials and is intended for educational use.