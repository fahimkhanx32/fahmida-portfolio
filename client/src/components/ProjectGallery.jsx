import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

/**
 * Responsive image gallery with an accessible lightbox (Esc to close, arrow
 * keys to navigate, focus returns to the thumbnail that opened it).
 * images: [{ id, src, alt, caption? }]
 */
export default function ProjectGallery({ images }) {
  const [index, setIndex] = useState(null)
  const opener = useRef(null)
  const closeBtn = useRef(null)
  const isOpen = index !== null

  const close = useCallback(() => {
    setIndex(null)
    opener.current?.focus()
  }, [])
  const step = useCallback(
    (d) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  )

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    closeBtn.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, close, step])

  const current = isOpen ? images[index] : null

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {images.map((img, i) => (
          <li key={img.id} className="break-inside-avoid">
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget
                setIndex(i)
              }}
              className="group block w-full overflow-hidden rounded-2xl border border-line bg-surface text-left"
              aria-label={`Open image: ${img.caption || img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              {img.caption && <span className="block px-4 py-3 text-sm text-ink-soft">{img.caption}</span>}
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-bg/95 p-4 backdrop-blur"
          onClick={close}
        >
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(-1) }}
                aria-label="Previous image"
                className="absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(1) }}
                aria-label="Next image"
                className="absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}
          <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={current.alt} className="max-h-[78vh] w-auto rounded-xl object-contain" />
            {current.caption && <figcaption className="mt-3 text-center text-sm text-ink-soft">{current.caption}</figcaption>}
          </figure>
        </div>
      )}
    </>
  )
}
