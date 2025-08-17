"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-2xl relative overflow-hidden border border-primary/20">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-glow opacity-20"></div>
          <CardHeader>
            <CardTitle className="text-center text-3xl font-extrabold">
              Welcome to the Admin Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>Manage all sections of your portfolio from one place.</p>
            <p className="text-sm text-muted-foreground">
              Use the sidebar or menu to navigate.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
