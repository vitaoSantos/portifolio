import { useEffect } from 'react'

const BASE = 'Victor Soares · Engenheiro de Software'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · Victor Soares` : BASE
  }, [title])
}
