import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { timestampIsoToLocal } from "../../utils/format";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} animate-slide-up`}>
      <div className={`${
        isUser 
          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25" 
          : "bg-gray-800/60 backdrop-blur-sm text-gray-100 border border-gray-700/30 shadow-lg"
      } max-w-[80%] p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] group`}>
        <div className={`prose prose-sm max-w-none ${isUser ? "prose-invert" : "prose-gray"}`}>
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{message.content}</ReactMarkdown>
        </div>
        <div className={`mt-3 text-xs transition-opacity duration-200 group-hover:opacity-100 ${
          isUser ? "text-blue-100 opacity-70" : "text-gray-400 opacity-70"
        }`}>
          {message.error && (
            <span className="text-red-400 font-medium">Failed • </span>
          )}
          {timestampIsoToLocal(message.timestamp || new Date().toISOString())}
        </div>
      </div>
    </div>
  );
}