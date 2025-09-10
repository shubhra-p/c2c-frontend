@@ .. @@
 import React from "react";
 import { Button } from "../ui/button";

 export default function ChatHeader({ session }) {
   if (!session) return null;
   console.log(session);
   return (
-    <header className="flex items-center justify-between border-b pb-3">
+    <header className="flex items-center justify-between border-b border-gray-700/50 pb-4 mb-6 animate-slide-down">
       <div>
-        <div className="text-lg font-semibold">{session.title}</div>
-        {session.repo_url && <div className="text-xs text-slate-500">{session.repo_url}</div>}
+        <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
+          {session.title}
+        </div>
+        {session.repo_url && (
+          <div className="text-sm text-gray-400 mt-1 font-mono bg-gray-800/50 px-2 py-1 rounded-md inline-block">
+            {session.repo_url}
+          </div>
+        )}
       </div>
       <div className="flex items-center gap-2">
-        <Button variant="ghost" size="sm" onClick={() => window.open(session.repo_url || "#", "_blank")}>Open Repo</Button>
+        <Button 
+          variant="ghost" 
+          size="sm" 
+          onClick={() => window.open(session.repo_url || "#", "_blank")}
+          className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 hover:scale-105"
+        >
+          Open Repo
+        </Button>
       </div>
     </header>
   );
 }