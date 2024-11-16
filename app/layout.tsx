import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}

export const metadata = {
  title: 'Logistique KSM',
  description: 'Application de gestion des étagères',
}
