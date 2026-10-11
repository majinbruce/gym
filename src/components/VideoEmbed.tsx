import { useEffect, useState } from 'react'

function useOnline(): boolean {
  const [online, setOnline] = useState(navigator.onLine)
  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])
  return online
}

// The YouTube player is only loaded after a tap, so the page stays fast and works offline.
export function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  const online = useOnline()
  const [open, setOpen] = useState(false)

  if (!online) {
    return <p className="note">The full video needs internet. The pictures above still show the movement.</p>
  }

  if (!open) {
    return (
      <button className="btn btn-secondary" onClick={() => setOpen(true)}>
        ▶ Watch full video
      </button>
    )
  }

  return (
    <div className="video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?playsinline=1&rel=0&autoplay=1`}
        title={`${title} video`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <a className="video-link" href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noreferrer">
        Video not playing? Open in YouTube
      </a>
    </div>
  )
}
