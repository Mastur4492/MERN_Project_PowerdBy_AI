
const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} AI Code Explainer</span>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="link">Source</a>
      </div>
    </footer>
  )
}

export default Footer