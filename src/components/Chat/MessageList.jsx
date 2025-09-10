@@ .. @@
 import React, { useEffect, useRef } from "react";
 import MessageBubble from "./MessageBubble";

 export default function MessageList({ messages = [] }) {
   const ref = useRef();
   useEffect(() => {
     if (ref.current) {
       ref.current.scrollTop = ref.current.scrollHeight;
     }
   }, [messages.length]);
   return (
-    <div ref={ref} className="space-y-4 px-2">
+    <div ref={ref} className="space-y-4 px-2 py-2 scroll-smooth">
       {messages.map((m) => (
         <MessageBubble key={m.id} message={m} />
       ))}
+      {messages.length === 0 && (
+        <div className="flex items-center justify-center h-64 text-gray-400 animate-pulse">
+          <div className="text-center">
+            <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
+              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
+                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
+              </svg>
+            </div>
+            <p>Start the conversation...</p>
+          </div>
+        </div>
+      )}
     </div>
   );
 }