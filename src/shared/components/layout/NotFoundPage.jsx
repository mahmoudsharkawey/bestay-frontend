import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      <Link to="/" className="text-sm underline hover:text-primary transition-colors">
        Go back home
      </Link>
    </div>
  )
}
