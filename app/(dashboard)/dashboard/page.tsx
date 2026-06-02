"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  Layers,
  TrendingUp,
  Plus,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const stats = [
  { label: "Connected Pages", value: 4, icon: Globe, color: "text-primary", bg: "bg-primary/10" },
  { label: "Scheduled Posts", value: 23, icon: Clock, color: "text-accent", bg: "bg-accent/10" },
  { label: "Published Posts", value: 156, icon: CheckCircle, color: "text-success", bg: "bg-success/10" },
  { label: "Failed Posts", value: 2, icon: AlertCircle, color: "text-error", bg: "bg-error/10" },
  { label: "Queue Size", value: 18, icon: Layers, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Monthly Reach", value: "24.5K", icon: TrendingUp, color: "text-warning", bg: "bg-warning/10" },
];

const publishingData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  posts: Math.floor(Math.random() * 8) + 1,
}));

const engagementData = Array.from({ length: 14 }, (_, i) => ({
  day: `Jun ${i + 1}`,
  reach: Math.floor(Math.random() * 5000) + 1000,
  impressions: Math.floor(Math.random() * 8000) + 2000,
}));

const activities = [
  { type: "published", message: "Post published to Tech Insights page", time: "2 min ago" },
  { type: "scheduled", message: "3 posts scheduled for tomorrow", time: "15 min ago" },
  { type: "failed", message: "Post failed on Marketing Pro page", time: "1 hour ago" },
  { type: "team", message: "Sarah joined the workspace", time: "3 hours ago" },
  { type: "published", message: "Weekly recap published", time: "5 hours ago" },
];

const upcomingPosts = [
  { page: "Tech Insights", time: "Today 3:00 PM", text: "5 AI tools every marketer needs..." },
  { page: "Marketing Pro", time: "Today 6:00 PM", text: "The secret to viral content..." },
  { page: "Brand Hub", time: "Tomorrow 9:00 AM", text: "Monday motivation: Start your week..." },
  { page: "Tech Insights", time: "Tomorrow 12:00 PM", text: "Breaking: New algorithm update..." },
  { page: "Marketing Pro", time: "Tomorrow 3:00 PM", text: "Case study: How we grew 300%..." },
];

const container = {
  animate: { transition: { staggerChildren: 0.05 } },
};

const item = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  return (
    <motion.div initial="initial" animate="animate" variants={container} className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <Card className="hover-lift cursor-default">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-dark-muted">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Publishing Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={publishingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2E" />
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#6B7280" />
                    <YAxis tick={{ fontSize: 10 }} stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111118",
                        border: "1px solid #1E1E2E",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="posts" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Engagement Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2E" />
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#6B7280" />
                    <YAxis tick={{ fontSize: 10 }} stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111118",
                        border: "1px solid #1E1E2E",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Line type="monotone" dataKey="reach" stroke="#6366F1" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="impressions" stroke="#06B6D4" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                        activity.type === "published"
                          ? "bg-success"
                          : activity.type === "failed"
                          ? "bg-error"
                          : activity.type === "scheduled"
                          ? "bg-accent"
                          : "bg-primary"
                      }`}
                    />
                    <div>
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-dark-muted">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Posts */}
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">Upcoming Scheduled Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingPosts.map((post, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <CalendarDays className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{post.text}</p>
                      <p className="text-xs text-dark-muted">
                        {post.page} &middot; {post.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Create Post", icon: Plus, href: "/dashboard/library", color: "bg-primary/10 text-primary" },
                  { label: "Schedule Post", icon: Clock, href: "/dashboard/scheduler", color: "bg-accent/10 text-accent" },
                  { label: "Add Page", icon: Globe, href: "/dashboard/pages", color: "bg-success/10 text-success" },
                  { label: "Generate with AI", icon: Sparkles, href: "/dashboard/ai", color: "bg-warning/10 text-warning" },
                ].map((action) => (
                  <Link key={action.label} href={action.href}>
                    <div className="flex flex-col items-center gap-2 p-4 rounded-card border border-light-border dark:border-dark-border hover:bg-gray-50 dark:hover:bg-white/5 transition-all hover-lift cursor-pointer">
                      <div className={`p-3 rounded-xl ${action.color}`}>
                        <action.icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-medium">{action.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
