1- Configured shadcn/ui components for consistent UI.

2- Updated MSW worker to start only in development.

3- Installed Axios and TanStack Query for data fetching (useQuery).

4- Implemented pagination, search, sorting, category filtering, and reset functionality using shadcn components.

5- Determined that useQuery is not ideal in a micro-frontend context because the host needs direct access to the QueryClient.

6- Identified and currently resolving an issue where the host cannot access MSW HTTP requests.

7- Converted table layout to card components for improved visual presentation.

8- Adjusted MSW configuration to work on the host side as well.

9- Resolved Tailwind CSS issues by creating a remote bundle so the host can use it plug-and-play.

10- Removed all styling and component dependencies from the host, since it doesn’t make sense to create a remote component that requires installing extra dependencies. Instead, I adopted a bundling strategy to share all styling with the host.