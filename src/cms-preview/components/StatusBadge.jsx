export default function StatusBadge({ children }) {
  return (
    <p className="status" role="status">
      {children}
    </p>
  );
}
