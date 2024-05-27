export default function useIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  const observerOptions = options || {
    rootMargin: '100px',
    threshold: 1.0
  }

  return new IntersectionObserver(callback, observerOptions)
}
