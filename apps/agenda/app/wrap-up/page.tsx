"use client";

import { motion } from "framer-motion";
import {
  Users,
  Clock,
  MessageCircle,
  Star,
  Lightbulb,
  Target,
  CheckCircle,
  Heart,
  Coffee,
  BookOpen,
  Rocket,
  Award,
  Github,
  ExternalLink,
  Mail
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

const achievements = [
  {
    title: "WebView Fundamentals",
    description: "Mastered the core concepts and when to use WebView vs native components",
    icon: BookOpen,
    color: "blue"
  },
  {
    title: "Secure Authentication",
    description: "Implemented token exchange flows and hash parameter security",
    icon: Target,
    color: "green"
  },
  {
    title: "Communication Bridges",
    description: "Built bidirectional communication between React Native and web content",
    icon: MessageCircle,
    color: "purple"
  },
  {
    title: "Real-world Integration",
    description: "Applied knowledge through hands-on exercises and practical examples",
    icon: Rocket,
    color: "orange"
  }
];

const nextSteps = [
  {
    title: "Implement in Your Projects",
    description: "Apply WebView integration patterns to your Vaillant applications",
    priority: "High",
    timeframe: "Next 2 weeks"
  },
  {
    title: "Security Review",
    description: "Conduct security audit of existing WebView implementations",
    priority: "High",
    timeframe: "Next month"
  },
  {
    title: "Performance Optimization",
    description: "Implement caching strategies and memory management best practices",
    priority: "Medium",
    timeframe: "Next quarter"
  },
  {
    title: "Team Knowledge Sharing",
    description: "Share learnings with your development teams and create internal guidelines",
    priority: "Medium",
    timeframe: "Ongoing"
  }
];

export default function WrapUp() {
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
            <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Wrap-Up & Discussion
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-600 mb-4">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Duration: 40 minutes</span>
            <span className="text-slate-400">|</span>
            <span>11:50 AM - 12:30 PM</span>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Celebrate your learning journey, reflect on key insights, and plan your next steps
            for implementing WebView integrations in your projects.
          </p>
        </motion.div>

        {/* Congratulations */}
        <motion.div variants={fadeInUp} className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <Award className="w-16 h-16 mx-auto mb-4 text-teal-200" />
            <h2 className="text-3xl font-bold mb-4">Congratulations! 🎉</h2>
            <p className="text-xl text-teal-100 mb-6">
              You've successfully completed the React Native WebView Integration Workshop!
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <p className="text-teal-100 leading-relaxed">
                Over the past 4 hours, you've gained comprehensive knowledge of WebView integration patterns,
                security best practices, and hands-on experience with real-world implementation challenges.
                This knowledge will serve you well in building robust mobile applications.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Achievements */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-yellow-600" />
            <h2 className="text-2xl font-bold text-slate-800">What You've Accomplished</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              const colorClasses = {
                blue: "from-blue-600 to-cyan-600",
                green: "from-green-600 to-emerald-600",
                purple: "from-purple-600 to-indigo-600",
                orange: "from-orange-600 to-red-600"
              }[achievement.color];

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2">{achievement.title}</h3>
                      <p className="text-slate-600 text-sm">{achievement.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Reflection Questions */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-slate-800">Reflection & Discussion</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-indigo-900 mb-4">Discussion Questions</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-900 mb-2">Technical Insights</h4>
                    <ul className="text-indigo-800 text-sm space-y-2">
                      <li>• Which WebView concept surprised you the most?</li>
                      <li>• What security consideration will you prioritize?</li>
                      <li>• Which exercise challenged you the most?</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-900 mb-2">Practical Applications</h4>
                    <ul className="text-indigo-800 text-sm space-y-2">
                      <li>• How will you apply this in your current projects?</li>
                      <li>• What legacy systems could benefit from this approach?</li>
                      <li>• Which team members need this knowledge?</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-900 mb-2">Challenges & Solutions</h4>
                    <ul className="text-indigo-800 text-sm space-y-2">
                      <li>• What implementation challenges do you anticipate?</li>
                      <li>• How will you handle performance optimization?</li>
                      <li>• What debugging strategies will you use?</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-900 mb-2">Future Learning</h4>
                    <ul className="text-indigo-800 text-sm space-y-2">
                      <li>• What topics need deeper exploration?</li>
                      <li>• Which advanced patterns interest you most?</li>
                      <li>• How will you stay updated on WebView developments?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps for Vaillant */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Rocket className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-slate-800">Next Steps for Vaillant Implementation</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-lg text-green-900 mb-3">Immediate Action Items</h3>
              <p className="text-green-800 leading-relaxed">
                Here's a strategic roadmap for implementing WebView integrations in your Vaillant projects,
                prioritized by impact and complexity.
              </p>
            </div>

            <div className="grid gap-4">
              {nextSteps.map((step, index) => {
                const priorityColors = {
                  High: "bg-red-100 text-red-700 border-red-200",
                  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
                  Low: "bg-green-100 text-green-700 border-green-200"
                };

                return (
                  <div key={index} className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-slate-800">{step.title}</h4>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[step.priority]}`}>
                          {step.priority} Priority
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {step.timeframe}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Feedback */}
        <motion.div variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-pink-600" />
            <h2 className="text-2xl font-bold text-slate-800">Workshop Feedback</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-6">
              <h3 className="font-semibold text-pink-900 mb-3">We'd Love Your Feedback!</h3>
              <p className="text-pink-800 text-sm mb-4">
                Your feedback helps us improve future workshops and ensures we're delivering
                the most valuable content for your development needs.
              </p>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-pink-200">
                  <h4 className="font-medium text-pink-900 text-sm mb-1">What worked well?</h4>
                  <p className="text-pink-700 text-xs">Exercises, explanations, pace, examples</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-pink-200">
                  <h4 className="font-medium text-pink-900 text-sm mb-1">What could be improved?</h4>
                  <p className="text-pink-700 text-xs">Content depth, additional topics, format</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-pink-200">
                  <h4 className="font-medium text-pink-900 text-sm mb-1">Future workshop topics?</h4>
                  <p className="text-pink-700 text-xs">Advanced React Native, performance optimization</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Stay Connected</h3>
              <p className="text-blue-800 text-sm mb-4">
                Continue your learning journey and connect with the community for ongoing support.
              </p>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-blue-200 flex items-center gap-3">
                  <Github className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-900 text-sm">Workshop Repository</h4>
                    <p className="text-blue-700 text-xs">Access all code examples and exercises</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-900 text-sm">Follow-up Support</h4>
                    <p className="text-blue-700 text-xs">Questions? Reach out for additional guidance</p>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-200 flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-900 text-sm">Additional Resources</h4>
                    <p className="text-blue-700 text-xs">Documentation, guides, and best practices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Thank You */}
        <motion.div variants={fadeInUp} className="text-center">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-12 text-white">
            <Coffee className="w-20 h-20 mx-auto mb-6 text-teal-200" />
            <h2 className="text-4xl font-bold mb-4">Thank You!</h2>
            <p className="text-xl text-teal-100 mb-6 max-w-2xl mx-auto">
              Thank you for your enthusiasm, engagement, and dedication to learning.
              You're now equipped to build amazing WebView integrations!
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 max-w-md mx-auto">
              <p className="text-teal-100 text-sm">
                <strong>Remember:</strong> The best way to master these concepts is through practice.
                Start implementing these patterns in your projects and don't hesitate to reach out
                if you need support along the way.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}