'use server';

const fs = require('fs');
const path = require('path');

export async function crawlRoutes(appDir = './src/app') {
    const routes = {};

    function buildRouteStructure(dirPath, currentRoute = '') {
        try {
            const items = fs.readdirSync(dirPath, { withFileTypes: true });
            
            // Check if current directory has a page.js file
            const hasPageFile = items.some(item => 
                item.isFile() && (item.name === 'page.js' || item.name === 'page.jsx' || item.name === 'page.ts' || item.name === 'page.tsx')
            );

            if (hasPageFile) {
                const routePath = currentRoute || '/';
                
                // Create nested structure
                const pathParts = routePath === '/' ? [] : routePath.split('/').filter(Boolean);
                let current = routes;
                
                // Navigate to the correct nested position
                for (let i = 0; i < pathParts.length; i++) {
                    const partialPath = '/' + pathParts.slice(0, i + 1).join('/');
                    if (!current[partialPath]) {
                        current[partialPath] = {
                            title: partialPath,
                            subRoutes: {}
                        };
                    }
                    current = current[partialPath].subRoutes;
                }
                
                // Add the current route if it doesn't exist
                if (!routes[routePath]) {
                    if (routePath === '/') {
                        routes[routePath] = {
                            title: routePath,
                            subRoutes: {}
                        };
                    } else {
                        // Ensure parent routes exist
                        const pathParts = routePath.split('/').filter(Boolean);
                        let current = routes;
                        
                        for (let i = 0; i < pathParts.length; i++) {
                            const partialPath = '/' + pathParts.slice(0, i + 1).join('/');
                            if (i === pathParts.length - 1) {
                                // This is the final route
                                current[partialPath] = {
                                    title: partialPath,
                                    subRoutes: {}
                                };
                            } else {
                                // This is a parent route
                                if (!current[partialPath]) {
                                    current[partialPath] = {
                                        title: partialPath,
                                        subRoutes: {}
                                    };
                                }
                                current = current[partialPath].subRoutes;
                            }
                        }
                    }
                }
            }

            // Process subdirectories (but skip certain Next.js special directories)
            const skipDirs = new Set(['api', '_components', '_lib', '_utils', 'globals.css']);
            
            items.forEach(item => {
                if (item.isDirectory() && !item.name.startsWith('.') && !skipDirs.has(item.name)) {
                    // Skip route groups (directories wrapped in parentheses)
                    if (item.name.startsWith('(') && item.name.endsWith(')')) {
                        // Process route group contents but don't add to path
                        buildRouteStructure(path.join(dirPath, item.name), currentRoute);
                    } else {
                        // Regular directory - add to route path
                        const newRoute = currentRoute === '' ? `/${item.name}` : `${currentRoute}/${item.name}`;
                        buildRouteStructure(path.join(dirPath, item.name), newRoute);
                    }
                }
            });

        } catch (error) {
            console.error(`Error reading directory ${dirPath}:`, error.message);
        }
    }

    // Start crawling from the app directory
    if (fs.existsSync(appDir)) {
        buildRouteStructure(appDir);
    } else {
        console.error(`App directory not found: ${appDir}`);
        return {};
    }

    // Clean up empty subRoutes
    function cleanupEmptySubRoutes(obj) {
        Object.keys(obj).forEach(key => {
            if (obj[key].subRoutes) {
                cleanupEmptySubRoutes(obj[key].subRoutes);
                if (Object.keys(obj[key].subRoutes).length === 0) {
                    delete obj[key].subRoutes;
                }
            }
        });
    }

    cleanupEmptySubRoutes(routes);
    
    return JSON.stringify(routes);
}

export default crawlRoutes;