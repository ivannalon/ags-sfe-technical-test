1- Configured shadcn/ui.

2- Fixed the MSW worker so it only starts in the development environment.

3- Installed Axios and TanStack Query to use useQuery.

4- Added shadcn components and functions for pagination, search, sorting, category filtering, and reset.

5- Realized that using useQuery is not ideal in a micro frontend context, since the host needs access to the QueryClient.

6- Faced an issue where the host cannot access the MSW HTTP, and I’m currently working on a solution.

I spent too much time implementing TanStack’s useQuery to better manage requests with performance in mind, and ended up losing the time I should have used to export the MSW handles so the mock could also work properly in the host.

useQuery doesn’t really make sense in this context, since it cannot be managed from both the host and the remote. Instead, I should have created a wrapper to keep the isolation, but that ended up consuming most of my time.

Here are the next steps I would move forward with:

1- Solve the MSW HTTP issue (although this doesn’t happen when working with external APIs).

2- Improve the design.

3- Create unit tests.

4- Implement better error handling.

