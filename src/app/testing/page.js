
import Link from "next/link";

import getRoutes from "@/lib/getRoutes";

export default function TestingPage() {
    return (
        <div>
        <h1>Testing Page</h1>
        <p>This is a placeholder for testing purposes.</p>
        <RootDir />
        </div>
    );
}

const RootDir = async () => {

    const routesObject = JSON.parse(await getRoutes());

	return (
		<ul>
			{Object.entries(routesObject).map(([key, value]) => (
				<RouteDir dirObject={value} key={key} />
			))}
		</ul>
	);
};


export const RouteDir = ({ dirObject }) => {
	if (!dirObject || !dirObject.title ) {
		return null;
	}
	return (
		<>
			<li>
				<Link href={dirObject.title+''.includes('[') ? '/testing' : dirObject.title}>{dirObject.title}</Link>
			</li>
			<ul>
				{dirObject.subRoutes
					? Object.keys(dirObject.subRoutes).map((subRoute) => {
                        return (
							<RouteDir
								dirObject={dirObject.subRoutes[subRoute]}
								key={dirObject.subRoutes[subRoute].title}
							/>
					  )})
					: ""}
			</ul>
		</>
	);
};
