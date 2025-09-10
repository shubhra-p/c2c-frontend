import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import { useSessionDispatch, useSessionState } from "../../context/SessionContext_dep.jsx";
import * as api from "../../lib/api";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

export default function Composer({ sessionId }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);   // 🔹 ref for textarea
  const dispatch = useSessionDispatch();
  const { sessions } = useSessionState();
  const session = sessions[sessionId];
  const isSending = session?.status === "sending";

  async function handleSend() {
    if (!value.trim()) return;
    const tempId = `temp_${uuidv4()}`;
    const optimistic = {
      id: tempId,
      role: "user",
      content: value,
      timestamp: new Date().toISOString(),
      pending: true,
    };

    dispatch({ type: "SEND_MESSAGE_INIT", payload: { sessionId, optimisticMessage: optimistic } });
    setValue(""); 

    // 🔹 refocus input after clearing
    if (inputRef.current) {
      inputRef.current.focus();
    }

    try {
      const data = await api.sendMessage(sessionId, value);
      const serverMessage = data.message || data;
      dispatch({ type: "SEND_MESSAGE_SUCCESS", payload: { sessionId, message: serverMessage, tempId } });
    } catch (err) {
      console.error(err);
      dispatch({ type: "SEND_MESSAGE_FAILURE", payload: { sessionId, tempId, error: err.message } });
      toast.error("Message failed");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex items-end gap-3 p-4 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 animate-slide-up">
      <textarea
        ref={inputRef}   // 🔹 attach ref
        className="flex-1 p-4 bg-gray-900/50 border border-gray-600/30 rounded-xl resize-none min-h-[56px] max-h-32 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm"
        placeholder="Ask something about your repository..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isSending}
      />
      <Button 
        onClick={handleSend} 
        disabled={isSending || !value.trim()}
        className={`px-6 py-4 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
          isSending ? "animate-pulse" : ""
        }`}
      >
        {isSending ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send
          </div>
        )}
      </Button>
    </div>
  );
}