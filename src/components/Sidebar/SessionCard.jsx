@@ .. @@
 import React from "react";
 import { useSessionDispatch } from "../../context/SessionContext_dep.jsx";
 import { snippet } from "../../utils/format";
 import { Card } from "../ui/card";

 export default function SessionCard({ session, active }) {
   const dispatch = useSessionDispatch();
   if (!session) return null;
   const last = (session.messages && session.messages[session.messages.length - 1]) || null;

   return (
     <div
-      className={`cursor-pointer p-3 rounded-md hover:bg-slate-50 ${active ? "bg-slate-50 border" : ""}`}
+      className={`cursor-pointer p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] group ${
+        active 
+          ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 shadow-lg" 
+          : "bg-gray-800/30 hover:bg-gray-700/40 border border-gray-700/20 hover:border-gray-600/40"
+      }`}
       onClick={() => dispatch({ type: "OPEN_SESSION", payload: session.session_id })}
     >
-      <div className="font-medium text-sm">{session.title}</div>
-      <div className="text-xs text-slate-500 mt-1">{last ? snippet(last.content, 80) : "No messages yet"}</div>
+      <div className={`font-semibold text-sm mb-2 transition-colors duration-200 ${
+        active ? "text-blue-300" : "text-white group-hover:text-blue-200"
+      }`}>
+        {session.title}
+      </div>
+      <div className={`text-xs mt-1 transition-colors duration-200 ${
+        active ? "text-gray-300" : "text-gray-400 group-hover:text-gray-300"
+      }`}>
+        {last ? snippet(last.content, 80) : "No messages yet"}
+      </div>
     </div>
   );
 }