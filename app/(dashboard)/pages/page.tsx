"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe, Plus, Search, Grid3X3, List, RefreshCw,
  BarChart3, ExternalLink, AlertTriangle, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { cn, formatNumber } from "@/lib/utils";

const demoPages = [
  { id: "1", name: "Tech Insights", category: "Technology", followers: 18500, status: "active", lastPost: "2 hours ago", image: null, connectedAt: "2024-01-15" },
  { id: "2", name: "Marketing Pro", category: "Marketing", followers: 9200, status: "active", lastPost: "5 hours ago", image: null, connectedAt: "2024-02-01" },
  { id: "3", name: "Brand Hub", category: "Business", followers: 5400, status: "token_expired", lastPost: "2 days ago", image: null, connectedAt: "2024-01-20" },
  { id: "4", name: "Creative Studio", category: "Design", followers: 12300, status: "active", lastPost: "1 hour ago", image: null, connectedAt: "2024-03-10" },
];

export default function PagesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  const filtered = demoPages.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Facebook Pages</h2>
          <p className="text-sm text-dark-muted">{demoPages.length} pages connected</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Connect Facebook Page
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-muted" />
          <Input
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex border border-light-border dark:border-dark-border rounded-input overflow-hidden">
          <button
            onClick={() => setView("grid")}
            className={cn("p-2 transition-colors", view === "grid" ? "bg-primary/10 text-primary" : "hover:bg-gray-100 dark:hover:bg-white/5")}
          >
            <Grid3X3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={cn("p-2 transition-colors", view === "list" ? "bg-primary/10 text-primary" : "hover:bg-gray-100 dark:hover:bg-white/5")}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Globe className="h-12 w-12" />}
          title="No pages found"
          description="Connect your Facebook pages to start managing content."
          action={{ label: "Connect Page", onClick: () => {} }}
        />
      ) : (
        <div className={cn(view === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3")}>
          {filtered.map((page) => (
            <motion.div key={page.id} layout>
              <Card className="hover-lift">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate">{page.name}</h3>
                        {page.status === "active" && <CheckCircle2 className="h-4 w-4 text-success shrink-0" />}
                        {page.status === "token_expired" && <AlertTriangle className="h-4 w-4 text-warning shrink-0" />}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px]">{page.category}</Badge>
                        <span className="text-xs text-dark-muted">{formatNumber(page.followers)} followers</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-dark-muted">
                    <span>Last post: {page.lastPost}</span>
                    <Badge variant={page.status === "active" ? "success" : "warning"}>
                      {page.status === "active" ? "Active" : "Token Expired"}
                    </Badge>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Button size="sm" variant="outline" className="flex-1 gap-1 text-xs">
                      <BarChart3 className="h-3 w-3" /> Analytics
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-1 text-xs">
                      <ExternalLink className="h-3 w-3" /> Manage
                    </Button>
                    {page.status === "token_expired" && (
                      <Button size="sm" variant="outline" className="gap-1 text-xs text-warning">
                        <RefreshCw className="h-3 w-3" /> Reconnect
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
