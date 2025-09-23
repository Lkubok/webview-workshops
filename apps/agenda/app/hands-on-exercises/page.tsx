"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  Clock,
  Target,
  MessageSquare,
  Cookie,
  Key,
  Navigation,
  ArrowRight,
  CheckCircle,
  Code,
  Globe,
  GitBranch,
  PlayCircle,
  Book,
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

const exercises = [
  {
    number: 1,
    title: "Basic WebView Setup",
    duration: "15 min",
    difficulty: "Beginner",
    color: "blue",
    icon: Globe,
    description: "Learn fundamentals of React Native WebView integration",
    goals: [
      "Load a Next.js app in WebView",
      "Understand minimal requirements",
      "Replace existing WebView components",
      "Verify basic functionality",
    ],
    technologies: ["React Native WebView", "Next.js", "Basic Configuration"],
  },
  {
    number: 2,
    title: "Two-Way Communication Bridge",
    duration: "20 min",
    difficulty: "Intermediate",
    color: "green",
    icon: MessageSquare,
    description:
      "Create bidirectional communication between React Native and Next.js",
    goals: [
      "Implement native button for WebView counter",
      "Send confirmation messages back",
      "Use JSON message format",
      "Handle onMessage events",
    ],
    technologies: ["postMessage", "injectJavaScript", "JSON Communication"],
  },
  {
    number: 3,
    title: "Cookie Handling and Communication",
    duration: "20 min",
    difficulty: "Intermediate",
    color: "purple",
    icon: Cookie,
    description: "Implement cookie management and synchronization",
    goals: [
      "Add cookie detection in Next.js",
      "Create cookie management interface",
      "Enable manual cookie synchronization",
      "Display cookie information",
    ],
    technologies: ["Cookies", "CookieManager", "Storage Sync"],
  },
  {
    number: 4,
    title: "Token Exchange and Update",
    duration: "20 min",
    difficulty: "Advanced",
    color: "orange",
    icon: Key,
    description: "Implement authentication token management",
    goals: [
      "Parse token resource_access section",
      "Add refresh token functionality",
      "Display token expiration countdown",
      "Handle role-based access control",
    ],
    technologies: ["JWT Tokens", "Role-based Access", "Token Refresh"],
  },
  {
    number: 5,
    title: "Navigation and State Management",
    duration: "15 min",
    difficulty: "Intermediate",
    color: "red",
    icon: Navigation,
    description: "Handle navigation and shared state across multiple pages",
    goals: [
      "Implement navigation controls",
      "Create multi-page Next.js application",
      "Synchronize navigation state",
      "Handle deep linking",
    ],
    technologies: ["React Navigation", "State Management", "Deep Linking"],
  },
];

export default function HandsOnExercises() {
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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600">
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <h1 className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-4xl font-bold text-transparent">
              Hands-on Coding Session
            </h1>
          </div>
          <div className="mb-4 flex items-center justify-center gap-2 text-slate-600">
            <Clock className="h-5 w-5" />
            <span className="font-medium">Duration: 90 minutes</span>
            <span className="text-slate-400">|</span>
            <span>10:00 AM - 11:30 AM</span>
          </div>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-600">
            Apply your WebView knowledge through 5 progressive exercises that
            build from basic setup to advanced authentication and navigation
            patterns.
          </p>
        </motion.div>

        {/* Exercise Structure */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Book className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Exercise Structure
            </h2>
          </div>

          <div className="mb-6 rounded-xl border border-indigo-200 bg-indigo-50 p-6">
            <h3 className="mb-3 text-lg font-semibold text-indigo-900">
              Workshop Organization
            </h3>
            <p className="mb-4 leading-relaxed text-indigo-800">
              Each exercise is located in the{" "}
              <code className="rounded bg-indigo-200 px-2 py-1">
                exercises/
              </code>{" "}
              folder and contains both React Native WebView components and
              Next.js page components with initial and final versions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Code className="h-6 w-6 text-blue-600" />
                <h4 className="font-semibold text-blue-900">Initial Files</h4>
              </div>
              <p className="mb-3 text-sm text-blue-800">
                Start from{" "}
                <code className="rounded bg-blue-200 px-1">*-initial.tsx</code>{" "}
                files with TODOs and build solutions step-by-step.
              </p>
              <div className="rounded-lg bg-blue-100 p-3">
                <code className="text-xs text-blue-800">
                  mobile-app/*-initial.tsx
                  <br />
                  nextjs-page/*-initial.tsx
                </code>
              </div>
            </div>

            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h4 className="font-semibold text-green-900">
                  Final Solutions
                </h4>
              </div>
              <p className="mb-3 text-sm text-green-800">
                Reference{" "}
                <code className="rounded bg-green-200 px-1">*-final.tsx</code>{" "}
                files for complete implementations and compare solutions.
              </p>
              <div className="rounded-lg bg-green-100 p-3">
                <code className="text-xs text-green-800">
                  mobile-app/*-final.tsx
                  <br />
                  nextjs-page/*-final.tsx
                </code>
              </div>
            </div>

            <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
              <div className="mb-3 flex items-center gap-2">
                <GitBranch className="h-6 w-6 text-purple-600" />
                <h4 className="font-semibold text-purple-900">Git Branches</h4>
              </div>
              <p className="mb-3 text-sm text-purple-800">
                Switch to exercise-specific branches for working examples and
                complete implementations.
              </p>
              <div className="rounded-lg bg-purple-100 p-3">
                <code className="text-xs text-purple-800">
                  git checkout exercise-1
                  <br />
                  git checkout exercise-2
                  <br />
                  etc.
                </code>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Exercises */}
        <div className="space-y-8">
          {exercises.map(exercise => {
            const Icon = exercise.icon;
            const colorClasses = {
              blue: {
                gradient: "from-blue-600 to-cyan-600",
                bg: "bg-blue-50",
                border: "border-blue-200",
                text: "text-blue-900",
                badge: "bg-blue-100 text-blue-700",
              },
              green: {
                gradient: "from-green-600 to-emerald-600",
                bg: "bg-green-50",
                border: "border-green-200",
                text: "text-green-900",
                badge: "bg-green-100 text-green-700",
              },
              purple: {
                gradient: "from-purple-600 to-indigo-600",
                bg: "bg-purple-50",
                border: "border-purple-200",
                text: "text-purple-900",
                badge: "bg-purple-100 text-purple-700",
              },
              orange: {
                gradient: "from-orange-600 to-red-600",
                bg: "bg-orange-50",
                border: "border-orange-200",
                text: "text-orange-900",
                badge: "bg-orange-100 text-orange-700",
              },
              red: {
                gradient: "from-red-600 to-pink-600",
                bg: "bg-red-50",
                border: "border-red-200",
                text: "text-red-900",
                badge: "bg-red-100 text-red-700",
              },
            }[exercise.color] || {
              gradient: "from-slate-600 to-gray-600",
              bg: "bg-slate-50",
              border: "border-slate-200",
              text: "text-slate-900",
              badge: "bg-slate-100 text-slate-700",
            };

            return (
              <motion.div
                key={exercise.number}
                variants={fadeInUp}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
              >
                <div className="flex items-start gap-6">
                  <div
                    className={`h-16 w-16 bg-gradient-to-r ${colorClasses.gradient} flex items-center justify-center rounded-xl`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-4 flex items-center gap-4">
                      <h3 className="text-2xl font-bold text-slate-800">
                        Exercise {exercise.number} – {exercise.title}
                      </h3>
                      <div className="flex gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-medium ${colorClasses.badge}`}
                        >
                          {exercise.duration}
                        </span>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                          {exercise.difficulty}
                        </span>
                      </div>
                    </div>

                    <p className="mb-6 leading-relaxed text-slate-600">
                      {exercise.description}
                    </p>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div
                        className={`${colorClasses.bg} ${colorClasses.border} rounded-xl border p-6`}
                      >
                        <div className="mb-3 flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          <h4 className={`font-semibold ${colorClasses.text}`}>
                            Learning Goals
                          </h4>
                        </div>
                        <ul className="space-y-2">
                          {exercise.goals.map((goal, i) => (
                            <li
                              key={i}
                              className={`flex items-start gap-2 text-sm ${colorClasses.text}`}
                            >
                              <CheckCircle className="mt-0.5 h-4 w-4" />
                              <span>{goal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                        <div className="mb-3 flex items-center gap-2">
                          <Code className="h-5 w-5 text-slate-600" />
                          <h4 className="font-semibold text-slate-800">
                            Technologies
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exercise.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Implementation Tips */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <PlayCircle className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Implementation Tips
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-green-200 bg-green-50 p-6">
              <h4 className="mb-3 font-semibold text-green-900">
                Getting Started
              </h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                  <span>Clone the workshop repository</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                  <span>
                    Install dependencies with{" "}
                    <code className="rounded bg-green-200 px-1">
                      pnpm install
                    </code>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                  <span>Start development servers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                  <span>
                    Choose your starting point (initial files or branches)
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
              <h4 className="mb-3 font-semibold text-blue-900">
                Best Practices
              </h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-blue-600" />
                  <span>Test on both iOS and Android platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-blue-600" />
                  <span>Use browser developer tools for WebView debugging</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-blue-600" />
                  <span>Implement proper error handling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-blue-600" />
                  <span>Follow security best practices</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-2xl font-bold">
                Ready to tackle advanced challenges?
              </h2>
              <p className="mb-4 text-emerald-100">
                After completing the exercises, we'll explore advanced topics
                and troubleshooting techniques.
              </p>
            </div>
            <ArrowRight className="h-8 w-8 text-emerald-200" />
          </div>
          <div className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-sm text-emerald-100">
              <strong>Up Next:</strong> Advanced WebView Topics &
              Troubleshooting (20 minutes)
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
