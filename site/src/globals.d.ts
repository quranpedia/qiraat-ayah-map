/// <reference types="vite/client" />

declare global {
  interface Window {
    navgo: import('navgo').Router
  }
}

export {}
