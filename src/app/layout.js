
import { InterText } from "@/lib/fonts/Inter";


export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className={InterText.className}>
          {children}
        </body>
      </html>
    );
  }