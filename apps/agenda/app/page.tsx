"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Code,
  Shield,
  Zap,
  Users,
  ArrowRight,
  CheckCircle,
  Clock,
  Target
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Introduction() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="space-y-12"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              React Native WebView Integration Workshop
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-600 mb-4">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Duration: 4 hours</span>
            <span className="text-slate-400">|</span>
            <span>9:00 AM - 12:30 PM</span>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Master the art of integrating web content into mobile applications using React Native WebView.
            Learn authentication flows, communication patterns, and best practices through hands-on exercises.
          </p>
        </motion.div>

        {/* Welcome Section */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">Welcome & Introduction</h2>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              20 minutes
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg text-slate-700 mb-3">Quick Discussion</h3>
              <p className="text-slate-600 mb-4">
                "Who has worked with React Native WebView before?"
              </p>
              <p className="text-slate-600">
                We'll start by understanding your current experience and setting expectations for the workshop.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <Target className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-blue-900 mb-2">Workshop Goals</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Understand WebView fundamentals</li>
                <li>• Master communication patterns</li>
                <li>• Implement secure authentication</li>
                <li>• Handle real-world challenges</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* WebView Fundamentals */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold text-slate-800">WebView Fundamentals</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-emerald-900 mb-3">What is a WebView?</h3>
              <p className="text-emerald-800 leading-relaxed">
                A WebView is a system component that allows mobile applications to display web content
                within the app itself. Think of it as an embedded browser that can render HTML, CSS,
                and JavaScript while maintaining integration with the native app environment.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <Smartphone className="w-8 h-8 text-slate-600 mb-3" />
                <h4 className="font-semibold text-slate-800 mb-2">Native WebView</h4>
                <p className="text-sm text-slate-600">
                  Platform-specific component (WKWebView on iOS, WebView on Android) that renders web content.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <Code className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-semibold text-blue-800 mb-2">React Native WebView</h4>
                <p className="text-sm text-blue-700">
                  Cross-platform wrapper that provides a consistent API for both iOS and Android WebViews.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <Globe className="w-8 h-8 text-purple-600 mb-3" />
                <h4 className="font-semibold text-purple-800 mb-2">Web Browser</h4>
                <p className="text-sm text-purple-700">
                  External browser app that opens URLs outside your application context.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                When to Use Each Approach
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-yellow-900 mb-2">Use WebView when:</h5>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• Seamless integration needed</li>
                    <li>• Custom authentication flows</li>
                    <li>• Shared data between web/native</li>
                    <li>• Controlled navigation</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-900 mb-2">Use Native Components when:</h5>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• Performance is critical</li>
                    <li>• Complex animations needed</li>
                    <li>• Platform-specific UI required</li>
                    <li>• Offline functionality essential</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-900 mb-2">Use External Browser when:</h5>
                  <ul className="text-yellow-800 space-y-1">
                    <li>• Simple link navigation</li>
                    <li>• User prefers browser features</li>
                    <li>• No integration required</li>
                    <li>• Privacy concerns</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Common Use Cases */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-slate-800">Common Use Cases</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-semibold text-indigo-900">Embedding Web Content</h4>
                </div>
                <p className="text-indigo-800 text-sm">
                  Display existing web applications or content within your mobile app for seamless user experience.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-900">Hybrid Authentication Flows</h4>
                </div>
                <p className="text-green-800 text-sm">
                  Implement secure login flows using OAuth, SAML, or custom authentication providers.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-purple-900">Legacy Web App Integration</h4>
                </div>
                <p className="text-purple-800 text-sm">
                  Modernize existing web applications by wrapping them in mobile apps without full rewrites.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <h4 className="font-semibold text-orange-900">Dynamic Content</h4>
                </div>
                <p className="text-orange-800 text-sm">
                  Display content that changes frequently without requiring app store updates.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-red-900">Third-party Widgets</h4>
                </div>
                <p className="text-red-800 text-sm">
                  Integrate external services like payment processors, chat widgets, or analytics dashboards.
                </p>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                  <h4 className="font-semibold text-teal-900">Cross-platform Development</h4>
                </div>
                <p className="text-teal-800 text-sm">
                  Share web development resources between web and mobile platforms efficiently.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div variants={fadeInUp} className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to dive deeper?</h2>
              <p className="text-blue-100 mb-4">
                Let's explore our specific loyalty app integration approach and the challenges we solved.
              </p>
            </div>
            <ArrowRight className="w-8 h-8 text-blue-200" />
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-sm text-blue-100">
              <strong>Up Next:</strong> Our Approach to Loyalty App Integration (10 minutes)
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}