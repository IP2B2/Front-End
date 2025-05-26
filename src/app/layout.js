
import { RootCalendarProvider } from "@/lib/context";
import { InterText } from "@/lib/fonts/Inter";


export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className={InterText.className}>
          <RootCalendarProvider>{children}</RootCalendarProvider>
        </body>
      </html>
    );
  }