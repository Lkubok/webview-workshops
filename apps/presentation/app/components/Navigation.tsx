'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, Home, Clock } from 'lucide-react'
import classNames from 'classnames'

const sections = [
  { id: 'introduction', title: 'Introduction & Overview', duration: '20 min', path: '/' },
  { id: 'approach', title: 'Our Loyalty App Approach', duration: '10 min', path: '/approach' },
  { id: 'architecture', title: 'Tools & Architecture', duration: '10 min', path: '/architecture' },
  { id: 'webview-deep-dive', title: 'WebView Deep Dive', duration: '20 min', path: '/webview-deep-dive' },
  { id: 'hands-on', title: 'Hands-on Coding', duration: '90 min', path: '/hands-on' },
  { id: 'advanced', title: 'Advanced Topics', duration: '20 min', path: '/advanced' },
]

export default function Navigation() {
  const pathname = usePathname()

  const currentIndex = sections.findIndex(section => section.path === pathname)
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-primary-700 hover:text-primary-900">
            <Home size={20} />
            <span className="font-semibold">WebView Workshop</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {sections.map((section, index) => (
              <Link
                key={section.id}
                href={section.path}
                className={classNames(
                  'flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors',
                  pathname === section.path
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
                <span className="hidden lg:block">{section.title}</span>
                <Clock size={14} className="text-gray-400" />
                <span className="text-xs text-gray-500">{section.duration}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {prevSection && (
              <Link
                href={prevSection.path}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:block">Previous</span>
              </Link>
            )}
            {nextSection && (
              <Link
                href={nextSection.path}
                className="flex items-center space-x-1 px-3 py-2 text-sm bg-primary-600 text-white hover:bg-primary-700 rounded-md"
              >
                <span className="hidden sm:block">Next</span>
                <ChevronRight size={16} />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile section indicator */}
        <div className="md:hidden mt-3 flex justify-center">
          <div className="flex space-x-2">
            {sections.map((section, index) => (
              <Link
                key={section.id}
                href={section.path}
                className={classNames(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium',
                  pathname === section.path
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                )}
              >
                {index + 1}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Section Progress */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Section {currentIndex + 1} of {sections.length}
            </span>
            <span>
              {sections[currentIndex]?.duration}
            </span>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </>
  )
}