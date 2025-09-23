"use client";

import { motion } from "framer-motion";
import {
  Users,
  Clock,
  MessageCircle,
  Star,
  Lightbulb,
  Target,
  Heart,
  Coffee,
  BookOpen,
  Rocket,
  Award,
  Github,
  Mail,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const achievements = [
  {
    title: "WebView Fundamentals",
    description:
      "Mastered the core concepts and when to use WebView vs native components",
    icon: BookOpen,
    color: "blue",
  },
  {
    title: "Secure Authentication",
    description: "Implemented token exchange flows and hash parameter security",
    icon: Target,
    color: "green",
  },
  {
    title: "Communication Bridges",
    description:
      "Built bidirectional communication between React Native and web content",
    icon: MessageCircle,
    color: "purple",
  },
  {
    title: "Real-world Integration",
    description:
      "Applied knowledge through hands-on exercises and practical examples",
    icon: Rocket,
    color: "orange",
  },
];

const nextSteps = [
  {
    title: "Implement in Your Projects",
    description:
      "Apply WebView integration patterns to your Vaillant applications",
    priority: "High",
    timeframe: "Next 2 weeks",
  },
  {
    title: "Security Review",
    description: "Conduct security audit of existing WebView implementations",
    priority: "High",
    timeframe: "Next month",
  },
  {
    title: "Performance Optimization",
    description:
      "Implement caching strategies and memory management best practices",
    priority: "Medium",
    timeframe: "Next quarter",
  },
  {
    title: "Team Knowledge Sharing",
    description:
      "Share learnings with your development teams and create internal guidelines",
    priority: "Medium",
    timeframe: "Ongoing",
  },
];

export default function WrapUp() {
  return (
    <div className="mx-auto max-w-6xl p-8">
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="space-y-12"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent">
              Wrap-Up & Discussion
            </h1>
          </div>
          <div className="mb-4 flex items-center justify-center gap-2 text-slate-600">
            <Clock className="h-5 w-5" />
            <span className="font-medium">Duration: 40 minutes</span>
            <span className="text-slate-400">|</span>
            <span>11:50 AM - 12:30 PM</span>
          </div>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600">
            Celebrate your learning journey, reflect on key insights, and plan
            your next steps for implementing WebView integrations in your
            projects.
          </p>
        </motion.div>

        {/* Congratulations */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 p-8 text-white"
        >
          <div className="text-center">
            <Award className="mx-auto mb-4 h-16 w-16 text-teal-200" />
            <h2 className="mb-4 text-3xl font-bold">Congratulations! 🎉</h2>
            <p className="mb-6 text-xl text-teal-100">
              You've successfully completed the React Native WebView Integration
              Workshop!
            </p>
            <div className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <p className="leading-relaxed text-teal-100">
                Over the past 4 hours, you've gained comprehensive knowledge of
                WebView integration patterns, security best practices, and
                hands-on experience with real-world implementation challenges.
                This knowledge will serve you well in building robust mobile
                applications.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Achievements */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Star className="h-6 w-6 text-yellow-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              What You've Accomplished
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              const colorClasses = {
                blue: "from-blue-600 to-cyan-600",
                green: "from-green-600 to-emerald-600",
                purple: "from-purple-600 to-indigo-600",
                orange: "from-orange-600 to-red-600",
              }[achievement.color];

              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-12 w-12 bg-gradient-to-r ${colorClasses} flex items-center justify-center rounded-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-slate-800">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Reflection Questions */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Reflection & Discussion
            </h2>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-indigo-900">
                Discussion Questions
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="rounded-lg border border-indigo-200 bg-white p-4">
                    <h4 className="mb-2 font-semibold text-indigo-900">
                      Technical Insights
                    </h4>
                    <ul className="space-y-2 text-sm text-indigo-800">
                      <li>• Which WebView concept surprised you the most?</li>
                      <li>
                        • What security consideration will you prioritize?
                      </li>
                      <li>• Which exercise challenged you the most?</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-indigo-200 bg-white p-4">
                    <h4 className="mb-2 font-semibold text-indigo-900">
                      Practical Applications
                    </h4>
                    <ul className="space-y-2 text-sm text-indigo-800">
                      <li>
                        • How will you apply this in your current projects?
                      </li>
                      <li>
                        • What legacy systems could benefit from this approach?
                      </li>
                      <li>• Which team members need this knowledge?</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg border border-indigo-200 bg-white p-4">
                    <h4 className="mb-2 font-semibold text-indigo-900">
                      Challenges & Solutions
                    </h4>
                    <ul className="space-y-2 text-sm text-indigo-800">
                      <li>
                        • What implementation challenges do you anticipate?
                      </li>
                      <li>• How will you handle performance optimization?</li>
                      <li>• What debugging strategies will you use?</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-indigo-200 bg-white p-4">
                    <h4 className="mb-2 font-semibold text-indigo-900">
                      Future Learning
                    </h4>
                    <ul className="space-y-2 text-sm text-indigo-800">
                      <li>• What topics need deeper exploration?</li>
                      <li>• Which advanced patterns interest you most?</li>
                      <li>
                        • How will you stay updated on WebView developments?
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps for Vaillant */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Rocket className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Next Steps for Vaillant Implementation
            </h2>
          </div>

          <div className="space-y-6">
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-green-900">
                Immediate Action Items
              </h3>
              <p className="leading-relaxed text-green-800">
                Here's a strategic roadmap for implementing WebView integrations
                in your Vaillant projects, prioritized by impact and complexity.
              </p>
            </div>

            <div className="grid gap-4">
              {nextSteps.map((step, index) => {
                const priorityColors: Record<string, string> = {
                  High: "bg-red-100 text-red-700 border-red-200",
                  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
                  Low: "bg-green-100 text-green-700 border-green-200",
                };

                return (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-6"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <h4 className="font-semibold text-slate-800">
                        {step.title}
                      </h4>
                      <div className="flex gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${priorityColors[step.priority] || "border-slate-200 bg-slate-100 text-slate-700"}`}
                        >
                          {step.priority} Priority
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                          {step.timeframe}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Feedback */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Heart className="h-6 w-6 text-pink-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Workshop Feedback
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-pink-200 bg-pink-50 p-6">
              <h3 className="mb-3 font-semibold text-pink-900">
                We'd Love Your Feedback!
              </h3>
              <p className="mb-4 text-sm text-pink-800">
                Your feedback helps us improve future workshops and ensures
                we're delivering the most valuable content for your development
                needs.
              </p>
              <div className="space-y-3">
                <div className="rounded-lg border border-pink-200 bg-white p-3">
                  <h4 className="mb-1 text-sm font-medium text-pink-900">
                    What worked well?
                  </h4>
                  <p className="text-xs text-pink-700">
                    Exercises, explanations, pace, examples
                  </p>
                </div>
                <div className="rounded-lg border border-pink-200 bg-white p-3">
                  <h4 className="mb-1 text-sm font-medium text-pink-900">
                    What could be improved?
                  </h4>
                  <p className="text-xs text-pink-700">
                    Content depth, additional topics, format
                  </p>
                </div>
                <div className="rounded-lg border border-pink-200 bg-white p-3">
                  <h4 className="mb-1 text-sm font-medium text-pink-900">
                    Future workshop topics?
                  </h4>
                  <p className="text-xs text-pink-700">
                    Advanced React Native, performance optimization
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-3 font-semibold text-blue-900">
                Stay Connected
              </h3>
              <p className="mb-4 text-sm text-blue-800">
                Continue your learning journey and connect with the community
                for ongoing support.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-white p-3">
                  <Github className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">
                      Workshop Repository
                    </h4>
                    <p className="text-xs text-blue-700">
                      Access all code examples and exercises
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-white p-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">
                      Follow-up Support
                    </h4>
                    <p className="text-xs text-blue-700">
                      Questions? Reach out for additional guidance
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-white p-3">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">
                      Additional Resources
                    </h4>
                    <p className="text-xs text-blue-700">
                      Documentation, guides, and best practices
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Thank You */}
        <motion.div variants={fadeInUp} className="text-center">
          <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 p-12 text-white">
            <Coffee className="mx-auto mb-6 h-20 w-20 text-teal-200" />
            <h2 className="mb-4 text-4xl font-bold">Thank You!</h2>
            <p className="mx-auto mb-6 max-w-2xl text-xl text-teal-100">
              Thank you for your enthusiasm, engagement, and dedication to
              learning. You're now equipped to build amazing WebView
              integrations!
            </p>
            <div className="mx-auto max-w-md rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-sm text-teal-100">
                <strong>Remember:</strong> The best way to master these concepts
                is through practice. Start implementing these patterns in your
                projects and don't hesitate to reach out if you need support
                along the way.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
