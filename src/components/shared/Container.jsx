function Container({ children, className = '' }) {
  return <div className={`w-full px-4 py-4 ${className}`}>{children}</div>
}

export default Container
