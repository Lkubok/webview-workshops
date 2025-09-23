export interface WebViewMessage {
  type: string
  payload?: any
  timestamp: number
  id?: string
}

export interface TokenInfo {
  token: string
  payload: any
  issuedAt: number
  expiresAt: number
  user: {
    username: string
    email?: string
    name?: string
  }
}

export interface UserRole {
  client: string
  role: string
}

export interface ExerciseData {
  id: number
  title: string
  duration: string
  goals: string[]
  tasks: string[]
  codeExamples?: {
    title: string
    code: string
    language: string
  }[]
}

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void
    }
    updateCounter?: (value: number) => void
    updateToken?: (token: string) => void
    receiveNativeData?: (data: any) => void
    syncCookiesFromNative?: (cookies: Record<string, string>) => void
  }
}