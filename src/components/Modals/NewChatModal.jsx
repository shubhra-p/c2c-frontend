@@ .. @@
 import React, { useState } from "react";
 import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
 import { Input } from "../ui/input";
 import { Button } from "../ui/button";
 import { useSessionDispatch } from "../../context/SessionContext_dep.jsx";
 import * as api from "../../lib/api";
 import toast from "react-hot-toast";

 export default function NewChatModal({ isOpen, onClose }) {
   const [repo, setRepo] = useState("");
   const [loading, setLoading] = useState(false);
   const dispatch = useSessionDispatch();

   async function handleCreate(e) {
     e.preventDefault();
     if (!repo.trim()) return toast.error("Provide a repo URL");
     setLoading(true);
     dispatch({ type: "CREATE_SESSION_INIT" });

     try {
         const data = await api.createSession(repo.trim());

         // Normalize backend response safely
         const payload = {
         session_id: data.session_id || data.sessionId || data.session?.session_id,
         repo_url: data.repo_url || repo.trim(),
         title: data.title || `Repo: ${repo.trim()}`,
         messages:
             Array.isArray(data.messages) && data.messages.length > 0
             ? data.messages
             : data.initial_message
             ? [data.initial_message]
             : [],
         };

         dispatch({
         type: "CREATE_SESSION_SUCCESS",
         payload,
         });

         toast.success("Session created");
         setRepo("");
         onClose();
     } catch (err) {
         console.error(err);
         dispatch({ type: "CREATE_SESSION_FAILURE", payload: err.message });
         toast.error("Failed to create session");
     } finally {
         setLoading(false);
     }
     }

   return (
     <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
-      <DialogContent>
+      <DialogContent className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 text-white animate-scale-in">
         <DialogHeader>
-          <DialogTitle>Start new chat from GitHub repo</DialogTitle>
+          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
+            Start New Chat from GitHub Repository
+          </DialogTitle>
         </DialogHeader>
-        <form className="space-y-4" onSubmit={handleCreate}>
+        <form className="space-y-6 mt-6" onSubmit={handleCreate}>
           <Input
-            placeholder="https://github.com/user/repo"
+            placeholder="https://github.com/username/repository"
             value={repo}
             onChange={(e) => setRepo(e.target.value)}
             disabled={loading}
+            className="bg-gray-800/50 border-gray-600/30 focus:border-blue-500/50 focus:ring-blue-500/50 text-white placeholder-gray-400 h-12"
           />
-          <div className="flex justify-end gap-2">
-            <Button variant="ghost" onClick={onClose}>Cancel</Button>
-            <Button type="submit" disabled={loading}>
-            {loading ? (
-                <span className="flex items-center gap-2">
-                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
-                Creating...
-                </span>
-            ) : (
-                "Create"
-            )}
-      </Button>
+          <div className="flex justify-end gap-3 pt-4">
+            <Button 
+              variant="ghost" 
+              onClick={onClose}
+              className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300"
+            >
+              Cancel
+            </Button>
+            <Button 
+              type="submit" 
+              disabled={loading}
+              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
+            >
+              {loading ? (
+                <span className="flex items-center gap-2">
+                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
+                  Creating...
+                </span>
+              ) : (
+                <span className="flex items-center gap-2">
+                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
+                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
+                  </svg>
+                  Create Chat
+                </span>
+              )}
+            </Button>
           </div>
         </form>
       </DialogContent>
     </Dialog>
   );
 }