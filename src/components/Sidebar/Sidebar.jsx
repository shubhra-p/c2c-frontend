@@ .. @@
 import React, { useState } from "react";
 import { useSessionState, useSessionDispatch } from "../../context/SessionContext_dep.jsx";
 import SessionCard from "./SessionCard";
 import NewChatModal from "../Modals/NewChatModal";
 import { Button } from "../ui/button";
 import { Plus } from "lucide-react";

 export default function Sidebar() {
   const { sessionOrder, sessions, activeSessionId } = useSessionState();
   const dispatch = useSessionDispatch();
   const [open, setOpen] = useState(false);

   return (
-    <aside className="h-[85vh] bg-white rounded-lg shadow p-4 sticky top-6 overflow-y-auto">
+    <aside className="h-[85vh] bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/30 rounded-2xl shadow-2xl p-6 sticky top-6 overflow-y-auto animate-slide-in-left">
       <div className="flex items-center justify-between mb-6">
-        <h2 className="text-lg font-semibold">Chats</h2>
-        <Button size="sm" onClick={() => setOpen(true)} variant="secondary" className="flex items-center gap-2">
+        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Chats</h2>
+        <Button 
+          size="sm" 
+          onClick={() => setOpen(true)} 
+          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
+        >
           <Plus size={14} /> New
         </Button>
       </div>

       <div className="space-y-3">
-        {sessionOrder.length === 0 && <div className="text-sm text-slate-500">No chats yet. Create one.</div>}
+        {sessionOrder.length === 0 && (
+          <div className="text-sm text-gray-400 text-center py-8 animate-pulse">
+            No chats yet. Create one to get started.
+          </div>
+        )}
         {sessionOrder.map((id) => (
           <SessionCard key={id} session={sessions[id]} active={activeSessionId === id} />
         ))}
       </div>

       <NewChatModal isOpen={open} onClose={() => setOpen(false)} />
     </aside>
   );
 }