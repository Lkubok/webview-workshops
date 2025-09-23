"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import {
  BookOpen,
  Code,
  Settings,
  MessageSquare,
  Wrench,
  Target,
  Users,
  Clock,
} from "lucide-react";

const navigationItems = [
  {
    href: "/",
    label: "Introduction",
    icon: BookOpen,
    time: "9:00-9:20",
  },
  {
    href: "/loyalty-integration",
    label: "Loyalty App Integration",
    icon: Target,
    time: "9:20-9:30",
  },
  {
    href: "/tools-architecture",
    label: "Tools & Architecture",
    icon: Settings,
    time: "9:30-9:40",
  },
  {
    href: "/webview-deepdive",
    label: "WebView Deep Dive",
    icon: Code,
    time: "9:40-10:00",
  },
  {
    href: "/hands-on-exercises",
    label: "Hands-on Exercises",
    icon: Wrench,
    time: "10:00-11:30",
  },
  {
    href: "/advanced-topics",
    label: "Advanced Topics",
    icon: MessageSquare,
    time: "11:30-11:50",
  },
  {
    href: "/wrap-up",
    label: "Wrap-up & Discussion",
    icon: Users,
    time: "11:50-12:30",
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl border-r border-slate-200 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900">WebView Workshop</h1>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              4 hours
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={clsx(
                    "block p-3 rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-blue-50 border-blue-200 border"
                      : "hover:bg-slate-50 border border-transparent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={clsx(
                        "w-5 h-5 transition-colors",
                        isActive
                          ? "text-blue-600"
                          : "text-slate-400 group-hover:text-slate-600"
                      )}
                    />
                    <div className="flex-1">
                      <div
                        className={clsx(
                          "font-medium text-sm",
                          isActive ? "text-blue-900" : "text-slate-700"
                        )}
                      >
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {item.time}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-sm text-blue-900 mb-2">
            Workshop Overview
          </h3>
          <p className="text-xs text-blue-700 leading-relaxed">
            Learn React Native WebView integration patterns, authentication flows,
            and communication bridges through hands-on exercises.
          </p>
        </div>
      </div>
    </nav>
  );
}