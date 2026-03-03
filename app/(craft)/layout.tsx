export default function CraftLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full" style={{ backgroundColor: "#EAE0D5" }}>
      {children}
    </div>
  );
}
