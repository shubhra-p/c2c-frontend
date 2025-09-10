@@ .. @@
 import React from "react";
 import Sidebar from "./components/Sidebar/Sidebar";
 import MainContent from "./components/Chat/MainContent";
 import { Toaster } from "react-hot-toast";

 /**
  * Root layout: left sidebar + right main area
  */
 export default function App() {
   return (
-    <div className="min-h-screen bg-slate-50 text-slate-900">
-      <div className="max-w-[1400px] mx-auto grid grid-cols-[320px_1fr] gap-6 p-6">
+    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
+      <div className="max-w-[1400px] mx-auto grid grid-cols-[320px_1fr] gap-6 p-6 animate-fade-in">
         <Sidebar />
         <MainContent />
       </div>
-      <Toaster position="top-right" />
+      <Toaster 
+        position="top-right" 
+        toastOptions={{
+          style: {
+            background: 'rgba(17, 24, 39, 0.9)',
+            color: '#fff',
+            border: '1px solid rgba(75, 85, 99, 0.3)',
+            backdropFilter: 'blur(10px)',
+          },
+        }}
+      />
     </div>
   );
 }