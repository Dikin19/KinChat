export interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  attachments?: {
    type: "image" | "document" | "audio";
    name: string;
    size: number;
    url?: string;
  }[];
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse {
  output: string;
  error?: string;
}

export interface FileUpload {
  file: File;
  type: "image" | "document" | "audio";
}
