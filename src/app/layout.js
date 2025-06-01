import { RootCalendarProvider } from "@/lib/context";
import { InterText } from "@/lib/fonts/Inter";

import { RootContextProvider } from "@/lib/context/RootContext";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={InterText.className}>
				<RootContextProvider>
					<RootCalendarProvider>{children}</RootCalendarProvider>
				</RootContextProvider>
			</body>
		</html>
	);
}
