import PresentationLayout from './components/PresentationLayout'
import { Users, MessageSquare, Shield, Code, Smartphone, Globe } from 'lucide-react'

export default function IntroductionPage() {
  return (
    <PresentationLayout
      title="Introduction & Topic Overview"
      subtitle="React Native WebView Integration Workshop • 20 minutes"
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <section className="animate-fade-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="mr-3 text-primary-600" size={24} />
            Welcome & Interactive Discussion
          </h2>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">Quick Discussion</h3>
            <p className="text-blue-700">
              &quot;Who has worked with React Native WebView before?&quot;
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed">
            Welcome to today&apos;s React Native WebView Integration Workshop. Over the next 4 hours,
            we&apos;ll dive deep into one of the most powerful but often misunderstood aspects of React Native development.
          </p>
        </section>

        {/* WebView Fundamentals */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Globe className="mr-3 text-primary-600" size={24} />
            WebView Fundamentals
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">What is a WebView?</h3>
              <p className="text-gray-700 text-sm">
                A mini web browser embedded directly inside your mobile application,
                capable of rendering HTML, CSS, and JavaScript content.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Native vs React Native WebView</h3>
              <p className="text-gray-700 text-sm">
                React Native WebView provides a standardized JavaScript API
                wrapping the underlying native WebView components.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-yellow-900 mb-3">When to Use Each Approach</h3>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-green-700 mb-2">✅ Use WebView when:</h4>
                <ul className="space-y-1 text-green-600">
                  <li>• Displaying existing web content</li>
                  <li>• Integrating third-party services</li>
                  <li>• Rapidly changing content</li>
                  <li>• Hybrid authentication flows</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-blue-700 mb-2">📱 Use native components when:</h4>
                <ul className="space-y-1 text-blue-600">
                  <li>• Building primary app functionality</li>
                  <li>• Performance is critical</li>
                  <li>• Deep platform integration needed</li>
                  <li>• Native feel is required</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-purple-700 mb-2">🌐 Use system browser when:</h4>
                <ul className="space-y-1 text-purple-600">
                  <li>• Users need full browser features</li>
                  <li>• Linking to external websites</li>
                  <li>• Maximum security is paramount</li>
                  <li>• One-time external actions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Common Use Cases */}
        <section className="animate-slide-in">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <MessageSquare className="mr-3 text-primary-600" size={24} />
            Common Use Cases
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-900 mb-2 flex items-center">
                  <Smartphone className="mr-2" size={18} />
                  Embedding Web Content
                </h3>
                <p className="text-blue-700 text-sm">
                  Display responsive web applications, product catalogs, or help documentation
                  directly within your mobile app while maintaining native navigation.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-medium text-green-900 mb-2 flex items-center">
                  <Shield className="mr-2" size={18} />
                  Hybrid Authentication Flows
                </h3>
                <p className="text-green-700 text-sm">
                  Handle complex authentication providers like Keycloak, Auth0, or Azure AD
                  without implementing every protocol natively.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-medium text-purple-900 mb-2 flex items-center">
                  <Code className="mr-2" size={18} />
                  Legacy System Integration
                </h3>
                <p className="text-purple-700 text-sm">
                  Bring existing web applications to mobile users immediately
                  while planning longer-term native development.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h3 className="font-medium text-orange-900 mb-2">Dynamic Content</h3>
                <p className="text-orange-700 text-sm">
                  Display frequently changing content like news feeds, promotional banners,
                  or admin panels without app store approval delays.
                </p>
              </div>

              <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h3 className="font-medium text-pink-900 mb-2">Third-Party Widgets</h3>
                <p className="text-pink-700 text-sm">
                  Integrate embeddable services like payment processors (Stripe),
                  chat systems (Intercom), or analytics dashboards seamlessly.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-900 mb-2">Real-World Example</h3>
                <p className="text-gray-700 text-sm">
                  <strong>Vaillant Use Case:</strong> Our loyalty app integration provides
                  seamless access to reward programs from within the main heating system app.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="bg-gradient-to-r from-primary-50 to-blue-50 p-6 rounded-lg border border-primary-200">
          <h2 className="text-xl font-semibold text-primary-900 mb-4">Key Takeaways</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-primary-800">
              <li>• WebView is a powerful integration tool, not a replacement for native development</li>
              <li>• Choose the right approach based on your specific use case requirements</li>
              <li>• Security and performance considerations are paramount in WebView implementations</li>
            </ul>
            <ul className="space-y-2 text-primary-800">
              <li>• Proper communication bridges enable seamless native-web integration</li>
              <li>• Authentication flows require careful token management and security practices</li>
              <li>• Real-world success depends on understanding both the possibilities and limitations</li>
            </ul>
          </div>
        </section>
      </div>
    </PresentationLayout>
  )
}