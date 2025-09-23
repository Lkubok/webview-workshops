import Navigation from './Navigation'

interface PresentationLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export default function PresentationLayout({ children, title, subtitle }: PresentationLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
          {subtitle && (
            <p className="text-xl text-gray-600">{subtitle}</p>
          )}
        </header>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {children}
        </div>
      </main>
    </div>
  )
}