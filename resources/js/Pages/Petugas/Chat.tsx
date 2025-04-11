"use client"

import React, { useState, useEffect, useRef } from "react"
import Layout from "@/Layouts/Petugas"

// Types
type Message = {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  attachments?: Attachment[]
  isDeleted: boolean
}

type Attachment = {
  id: string
  type: "image" | "file"
  url: string
  name: string
  size?: number
}

type ChatThread = {
  id: string
  name: string
  avatar?: string
  lastMessage?: string
  lastMessageTime?: Date
  unreadCount: number
  isOnline?: boolean
  isTyping?: boolean
}

// Main Component
const ChatInterface: React.FC = () => {
  // State
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [showThreads, setShowThreads] = useState(true)
  const [swipedMessageId, setSwipedMessageId] = useState<string | null>(null)
  const [attachments, setAttachments] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set())
  const [isMobile, setIsMobile] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Mock user ID (in a real app, this would come from authentication)
  const currentUserId = "user-123"

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Initialize chat data (no mock data; can be replaced with API call)
  useEffect(() => {
    // In a real app, fetch chat threads and messages from an API here
    // Example:
    /*
    const fetchChatData = async () => {
      try {
        const threadsResponse = await fetch('/api/chat/threads');
        const threadsData = await threadsResponse.json();
        setChatThreads(threadsData);

        if (threadsData.length > 0 && !isMobile) {
          setCurrentChatId(threadsData[0].id);
          setShowThreads(false);

          const messagesResponse = await fetch(`/api/chat/messages/${threadsData[0].id}`);
          const messagesData = await messagesResponse.json();
          setMessages(messagesData);
        }
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };
    fetchChatData();
    */
  }, [isMobile])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Filter messages based on search query
  const filteredMessages = messages.filter((message) =>
    message.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim() === "" && attachments.length === 0) return

    setIsLoading(true)

    // In a real app, you would upload attachments to a server here
    const uploadAttachments = async (): Promise<Attachment[]> => {
      if (attachments.length === 0) return []

      // Simulate upload - in a real app, use fetch or axios to upload files
      return attachments.map((file, index) => ({
        id: `attachment-${Date.now()}-${index}`,
        type: file.type.startsWith("image/") ? "image" : "file",
        url: URL.createObjectURL(file), // In a real app, this would be the URL from your server
        name: file.name,
        size: file.size,
      }))
    }

    // Simulate sending a message
    setTimeout(async () => {
      const uploadedAttachments = await uploadAttachments()

      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: currentUserId,
        senderName: "You",
        content: inputMessage,
        timestamp: new Date(),
        attachments: uploadedAttachments,
        isDeleted: false,
      }

      setMessages((prevMessages) => [...prevMessages, newMessage])
      setInputMessage("")
      setAttachments([])
      setIsLoading(false)

      // Update the last message in chat threads
      setChatThreads((prevThreads) =>
        prevThreads.map((thread) =>
          thread.id === currentChatId
            ? {
                ...thread,
                lastMessage: inputMessage,
                lastMessageTime: new Date(),
                unreadCount: 0,
              }
            : thread,
        ),
      )
    }, 500)
  }

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files || [])])
    }
  }

  // Handle message deletion
  const handleDeleteMessage = (messageId: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, isDeleted: true, content: "This message was deleted" } : msg,
      ),
    )
    setSwipedMessageId(null)
  }

  // Handle swipe gesture
  const handleSwipeStart = (e: React.TouchEvent | React.MouseEvent, messageId: string) => {
    const startX = "touches" in e ? e.touches[0].clientX : e.clientX

    const handleMove = (moveEvent: TouchEvent | MouseEvent) => {
      const currentX = "touches" in moveEvent ? moveEvent.touches[0].clientX : (moveEvent as MouseEvent).clientX
      const diff = currentX - startX

      if (diff > 50) {
        setSwipedMessageId(messageId)
      } else {
        setSwipedMessageId(null)
      }
    }

    const handleEnd = () => {
      document.removeEventListener("mousemove", handleMove)
      document.removeEventListener("mouseup", handleEnd)
      document.removeEventListener("touchmove", handleMove)
      document.removeEventListener("touchend", handleEnd)
    }

    document.addEventListener("mousemove", handleMove)
    document.addEventListener("mouseup", handleEnd)
    document.addEventListener("touchmove", handleMove)
    document.addEventListener("touchend", handleEnd)
  }

  // Toggle message expansion
  const toggleMessageExpansion = (messageId: string) => {
    setExpandedMessages((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(messageId)) {
        newSet.delete(messageId)
      } else {
        newSet.add(messageId)
      }
      return newSet
    })
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Format date for chat list
  const formatMessageDate = (date: Date) => {
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return formatTime(date)
    } else if (diffInDays === 1) {
      return "Yesterday"
    } else if (diffInDays < 7) {
      return date.toLocaleDateString(undefined, { weekday: "short" })
    } else {
      return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
    }
  }

  // Format file size
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ""
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  // Truncate message content
  const truncateMessage = (content: string, messageId: string) => {
    const isExpanded = expandedMessages.has(messageId)
    const maxLength = 150

    if (content.length <= maxLength || isExpanded) {
      return (
        <div>
          {content}
          {content.length > maxLength && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleMessageExpansion(messageId)
              }}
              className="text-xs font-medium ml-1 text-blue-400 hover:text-blue-500 focus:outline-none"
            >
              Show less
            </button>
          )}
        </div>
      )
    }

    return (
      <div>
        {content.substring(0, maxLength)}...
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleMessageExpansion(messageId)
          }}
          className="text-xs font-medium ml-1 text-blue-400 hover:text-blue-500 focus:outline-none"
        >
          Read more
        </button>
      </div>
    )
  }

  // Render conversation list view
  const renderConversationList = () => {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Conversations</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chatThreads.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>No conversations available</p>
            </div>
          ) : (
            chatThreads.map((thread) => (
              <div
                key={thread.id}
                onClick={() => {
                  setCurrentChatId(thread.id)
                  setShowThreads(false)
                  // Optionally fetch messages for the selected thread
                  /*
                  const fetchMessages = async () => {
                    const response = await fetch(`/api/chat/messages/${thread.id}`);
                    const messagesData = await response.json();
                    setMessages(messagesData);
                  };
                  fetchMessages();
                  */
                }}
                className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
                    {thread.name.charAt(0)}
                  </div>
                  {thread.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{thread.name}</span>
                    <span className="text-xs text-gray-500">
                      {thread.lastMessageTime && formatMessageDate(thread.lastMessageTime)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {thread.isTyping ? "Typing..." : thread.lastMessage || ""}
                  </div>
                  <div className="flex justify-end mt-1">
                    {thread.unreadCount > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  // Render chat view
  const renderChatView = () => {
    const currentChat = chatThreads.find((thread) => thread.id === currentChatId)

    if (!currentChat) return null

    return (
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center">
            {isMobile && (
              <button
                onClick={() => setShowThreads(true)}
                className="mr-3 text-gray-600 focus:outline-none"
                aria-label="Back to conversations"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
                  {currentChat.name.charAt(0)}
                </div>
                {currentChat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3">
                <div className="font-semibold text-gray-800">{currentChat.name}</div>
                <div className="text-xs text-gray-500">{currentChat.isOnline ? "Online" : "Offline"}</div>
              </div>
            </div>
          </div>
          {!isMobile && (
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 w-40 md:w-auto"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {filteredMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-2 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p>No messages yet</p>
            </div>
          ) : (
            <>
              {filteredMessages.map((message, index) => {
                const isFirstMessageOfDay =
                  index === 0 ||
                  new Date(message.timestamp).toDateString() !==
                    new Date(filteredMessages[index - 1].timestamp).toDateString()

                return (
                  <React.Fragment key={message.id}>
                    {isFirstMessageOfDay && (
                      <div className="flex justify-center my-4">
                        <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                          {new Date(message.timestamp).toLocaleDateString(undefined, {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    )}
                    <div
                      className="relative mb-4 group"
                      onTouchStart={(e) => handleSwipeStart(e, message.id)}
                      onMouseDown={(e) => handleSwipeStart(e, message.id)}
                    >
                      <div className={`flex ${message.senderId === currentUserId ? "justify-end" : "justify-start"}`}>
                        {message.senderId !== currentUserId && (
                          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold mr-2 flex-shrink-0 self-end mb-1">
                            {message.senderName.charAt(0)}
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm ${
                            message.senderId === currentUserId
                              ? "bg-blue-500 text-white rounded-br-none"
                              : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                          } ${message.isDeleted ? "italic opacity-70 bg-gray-100 text-gray-500 border-none" : ""}`}
                        >
                          {message.senderId !== currentUserId && !message.isDeleted && (
                            <div className="font-semibold text-xs mb-1 text-gray-600">{message.senderName}</div>
                          )}
                          <div className="text-sm">
                            {message.isDeleted ? message.content : truncateMessage(message.content, message.id)}
                          </div>

                          {/* Attachments */}
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment) => (
                                <div key={attachment.id}>
                                  {attachment.type === "image" ? (
                                    <div className="relative group">
                                      <img
                                        src={attachment.url}
                                        alt={attachment.name}
                                        className="max-w-full rounded-lg max-h-60 object-contain border border-gray-200"
                                      />
                                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <button className="bg-white rounded-full p-2 shadow-md">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-700"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex items-center bg-gray-50 rounded-lg p-2 text-sm border border-gray-200">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 mr-2 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                      </svg>
                                      <div className="flex-1 overflow-hidden">
                                        <div className="truncate font-medium">{attachment.name}</div>
                                        <div className="text-xs text-gray-500">{formatFileSize(attachment.size)}</div>
                                      </div>
                                      <button className="ml-2 text-blue-500 hover:text-blue-600">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                          />
                                        </svg>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          <div
                            className={`text-xs mt-1 ${
                              message.senderId === currentUserId ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>

                      {/* Swipe actions */}
                      {swipedMessageId === message.id && message.senderId === currentUserId && !message.isDeleted && (
                        <div className="absolute top-0 right-0 h-full flex items-center -mr-16 z-10">
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-colors duration-200"
                            aria-label="Delete message"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                )
              })}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Attachment Preview */}
        {attachments.length > 0 && (
          <div className="bg-white p-3 border-t border-gray-200 flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div key={index} className="relative">
                {file.type.startsWith("image/") ? (
                  <div className="relative w-20 h-20 group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors duration-200"
                      aria-label="Remove attachment"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 flex items-center group relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="truncate max-w-[100px] text-xs">{file.name}</span>
                    <button
                      onClick={() => setAttachments((prev) => prev.filter((_, i) => i !== index))}
                      className="ml-2 text-red-500 hover:text-red-600"
                      aria-label="Remove attachment"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-500 hover:text-gray-700 mr-3 transition-colors duration-200"
              aria-label="Attach file"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              multiple
              aria-label="Upload file"
            />
            <div className="relative flex-1">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full border border-gray-300 rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Add emoji"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className={`ml-3 bg-blue-500 text-white rounded-full p-2 focus:outline-none transition-all duration-200 ${
                isLoading ? "opacity-50" : "hover:bg-blue-600 hover:shadow-md"
              }`}
              aria-label="Send message"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="lg:pl-8 lg:pt-5 p-1 h-[925px] sm:ml-64 lg:mt-12 mt-8 md:mt-14">
        <div className="">
          <div className="flex flex-col h-[925px] bg-white rounded-lg shadow-sm border border-gray-100">
            {/* Mobile: Show either conversation list or chat */}
            {isMobile ? (
              showThreads ? (
                renderConversationList()
              ) : (
                renderChatView()
              )
            ) : (
              /* Desktop: Show sidebar and chat side by side */
              <div className="flex h-full">
                <div className={`w-80 border-r border-gray-200 ${showThreads ? "block" : "hidden"} md:block`}>
                  {renderConversationList()}
                </div>
                <div className="flex-1">
                  {currentChatId ? (
                    renderChatView()
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <p>Select a conversation to start chatting</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ChatInterface