@@ .. @@
 import React from "react";
 import { useSessionState } from "../../context/SessionContext_dep.jsx";
 import ChatWindow from "./ChatWindow";

 export default function MainContent() {
   const { activeSessionId } = useSessionState();
   return (
   )
 }
-    <main className="min-h-[85vh] bg-white rounded-lg shadow p-4">
+    <main className="min-h-[85vh] bg-gradient-to-b from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-2xl shadow-2xl p-6 animate-slide-in-right">
       {activeSessionId ? <ChatWindow sessionId={activeSessionId} /> : <Welcome />}
     </main>
   );
 }

 function Welcome() {
   return (
   )
}
-    <div className="h-full flex flex-col items-center justify-center text-center text-slate-600">
-      <h1 className="text-2xl font-semibold mb-2">Welcome to the Chat App</h1>
-      <p className="max-w-lg">Create a new chat from a GitHub repo or open an existing session from the left. The assistant will analyze the repository and answer questions.</p>
+    <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in-up">
+      <div className="mb-8 animate-bounce-slow">
+        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6 mx-auto shadow-2xl">
+          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
+            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
+          </svg>
+        </div>
+      </div>
+      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
+        Welcome to Synapse
+      </h1>
+      <p className="max-w-lg text-gray-300 text-lg leading-relaxed">
+        Create a new chat from a GitHub repository or open an existing session from the sidebar. 
+        Our AI assistant will analyze your code and answer questions with precision.
+      </p>
+      <div className="mt-8 flex items-center gap-2 text-sm text-gray-400 animate-pulse">
+        <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
+        <span>Ready to assist you</span>
+      </div>
     </div>
   );
 }