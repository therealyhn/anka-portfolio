import Container from '../shared/Container'

function SiteShell({ children }) {
  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink">
      <Container>{children}</Container>
    </div>
  )
}

export default SiteShell
