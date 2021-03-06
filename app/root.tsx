import * as React from "react";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLocation
} from "remix";
import type { LinksFunction } from "remix";

import deleteMeRemixStyles from "~/styles/demos/remix.css";
import globalStylesUrl from "~/styles/global.css";
import darkStylesUrl from "~/styles/dark.css";

/**
 * The `links` export is a function that returns an array of objects that map to
 * the attributes for an HTML `<link>` element. These will load `<link>` tags on
 * every route in the app, but individual routes can include their own links
 * that are automatically unloaded when a user navigates away from the route.
 *
 * https://remix.run/api/app#links
 */
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesUrl },
    {
      rel: "stylesheet",
      href: darkStylesUrl,
      media: "(prefers-color-scheme: dark)"
    },
    { rel: "stylesheet", href: deleteMeRemixStyles }
  ];
};

/**
 * The root module's default export is a component that renders the current
 * route via the `<Outlet />` component. Think of this as the global layout
 * component for your app.
 */
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <RouteChangeAnnouncement />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="remix-app">
      <header className="remix-app__header">
        <div className="container remix-app__header-content">
          <Link to="/" title="Remix" className="remix-app__header-home-link">
            <Logo />
          </Link>
          <nav aria-label="Main navigation" className="remix-app__header-nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="https://blog.tubone-project24.xyz">Blog</a>
              </li>
              <li>
                <a href="https://portfolio.tubone-project24.xyz">Portfolio</a>
              </li>
              <li>
                <a href="https://tubone24.github.io/">GitHub Stats</a>
              </li>
              <li>
                <a href="https://note.tubone-project24.xyz/">Note</a>
              </li>
              <li>
                <a href="https://tubone24.github.io/resume/">Resume</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="remix-app__main">
        <div className="container remix-app__main-content">{children}</div>
      </div>
      <footer className="remix-app__footer">
        <div className="container remix-app__footer-content">
          <p>&copy; tubone24</p>
        </div>
      </footer>
    </div>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

function Logo(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 659 165"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-labelledby="logo-title"
      role="img"
      width="106"
      height="30"
      fill="currentColor"
      {...props}
    >
      <title id="ogo-title">tubone Logo</title>
      <path
          d="M241.7 54.35q-1.05 5.85-1.64 10.38-.59 4.52-.59 9.25t.92 6.76q-5.05-1.31-6.96-4.04-1.9-2.72-1.9-7.71 0-4.4 1.38-12.04 1.37-7.65 1.77-10.34-3.41.59-7.29 2.3-.13-1.45-.13-2.17 0-3.48 2.1-4.76 2.1-1.28 6.04-1.34.46-4.93.46-7.09 0-2.17-.03-3.61-.04-1.45-.04-2.17 4.34.46 6.31 2.59 1.96 2.14 1.96 6.08 0 1.57-.32 4.39 5.51-.13 8.07-2.16.13 1.31.13 1.97 0 3.15-1.11 4.36-1.12 1.22-3.75 1.22-2.62 0-4-.07-.33 2.36-1.38 8.2zM278.85 39q3.42 0 5.19 1.24 1.77 1.25 1.77 4.6 0 1.05-1.25 9.22-1.24 8.17-1.24 14.01t1.24 10.31q-4.92-1.58-6.82-4.47-1.91-2.88-1.91-7.15 0-1.64.73-7.42-2.04 7.49-6.21 12.57-4.16 5.09-7.84 5.09-7.55 0-7.55-10.9 0-3.61 1.08-10.07 1.09-6.47 1.09-9.81 0-3.35-.92-6.77 5.45 0 7.91 1.42 2.46 1.41 2.46 5.61 0 2.23-1.38 8.86-1.38 6.63-1.38 9.98 0 4.85 2.63 4.85 1.31 0 3.02-1.8 1.7-1.81 3.28-4.79 1.57-2.99 2.66-7.49 1.08-4.49 1.08-9.12 0-4.63-.39-7.84 1.97-.13 2.75-.13zm20.68-24.82q4.66 1.25 6.4 4.5 1.74 3.25 1.74 7.19 0 3.94-1.25 13.42-1.25 9.49-1.71 15.13 1.97-7.02 5.62-11.16 3.64-4.13 7.84-4.13 4.2 0 7.25 4 3.06 4 3.06 10.24 0 9.65-5.16 16.64Q318.17 77 311.54 77q-2.3 0-4.59-1.05 2.82-.79 5.12-3.22 2.29-2.43 3.74-5.58 2.95-6.56 2.95-13.12 0-3.22-1.21-5.65-1.22-2.43-3.25-2.43-3.28 0-6.66 6.7-3.38 6.69-3.58 16.67v1.25q.13 2.29 1.11 7.61-9.45-2.16-9.45-13.59 0-4.66 2.2-18.77t2.2-20.61q0-6.5-.59-11.03zm56.32 29.94q-4.27 0-7.62 5.74-3.34 5.74-3.34 11.45 0 11.95 6.17 11.95 4.39 0 7.15-5.74 2.76-5.75 2.76-12.9 0-10.5-5.12-10.5zm4.07-4.8q3.94 0 6.69 3.88 2.76 3.87 2.76 10.37 0 7.28-2.95 13.39-3.29 6.89-9.33 9.51-3.41 1.51-7.48 1.51-5.71 0-9.94-4.43-4.24-4.43-4.24-12.73t4.07-14.64q4.07-6.33 10.77-7.97.72 0 1.34.42.63.43.63.89-6.63 4.6-7.95 12.8 1.38-3.68 3.39-6.37 2-2.69 4.16-4.07 4.14-2.56 8.08-2.56zm42.14-.19q3.87 0 5.54 2.39 1.68 2.4 1.68 6.5T408 59.54q-1.28 7.42-1.28 10.8 0 3.38.85 4.92t2.89 2.66q-.85.06-2.43.06-5.51 0-7.84-1.7-2.33-1.71-2.33-5.98 0-2.42 1.31-9.48 1.31-7.06 1.31-10.53 0-4.34-2.62-4.34-1.51 0-3.42 1.78-1.9 1.77-3.67 4.82-1.78 3.05-2.96 7.84-1.18 4.8-1.18 9.55 0 4.76.4 7.06-2.1.13-2.76.13-3.74 0-5.38-1.31-1.64-1.31-1.64-4.33 0-1.32 1.37-10.11 1.38-8.8 1.38-14.02 0-5.21-1.11-9.61 4.79 1.51 6.69 4.3 1.91 2.79 1.91 6.36 0 3.58-.79 8.31 2.16-7.35 6.82-12.47 4.66-5.12 8.54-5.12zm30.78 21.72q-3.15 0-6.17-.72-.06.66-.06 2.04 0 5.44 2.03 8.2 2.04 2.76 4.86 2.76 2.82 0 5.38-1.71t4.46-4.73q2.37.53 2.37 2.43-5.78 8.86-14.9 8.86-5.52 0-9.65-4.23-4.14-4.23-4.14-11.78 0-5.65 2.17-10.73 2.16-5.09 6.89-8.6 4.73-3.51 10.47-3.51t8.43 2.62q2.7 2.63 2.7 6.89 0 6.17-4.3 9.19-4.3 3.02-10.54 3.02zm2.76-17.65q-3.35 0-5.65 4.13-2.29 4.14-3.02 10.04h.99q5.71 0 8.43-2.95 2.73-2.95 2.73-7.09 0-1.71-.89-2.92t-2.59-1.21zm-278.23 90.32q1.38-9.22 2.13-17.75.76-8.53.76-15.49 0-6.96-.92-9.13 7.02 1.84 8.79 5.78 5.06-2.82 10.7-2.82 5.65 0 9.22 3.18 3.58 3.18 3.58 7.75 0 4.56-3.28 8.46-3.28 3.91-8.99 5.81 4.59.99 8.43 4.43 3.84 3.45 3.84 8.5 0 7.75-5.74 11.92-5.75 4.17-14.51 4.17t-15.46-5.06q.07-.52 1.45-9.75zm25.01-26.94q0-2.95-1.84-4.96-1.84-2-5.19-2-3.35 0-6.43 1.38 0 4-1.74 20.15t-1.74 20.68q2.89 1.18 5.58 1.18 4.66 0 7.68-3.09 3.02-3.08 3.02-7.74t-3.15-7.78q-3.15-3.12-8.8-3.38l-.19-2.36q6.03-.86 9.41-4.43 3.39-3.58 3.39-7.65zm52.64 10.63q0-9.19-2.53-13.32-2.53-4.14-6.89-4.14-4.37 0-8.27 3.84-3.91 3.84-6.11 9.68-2.2 5.85-2.2 11.82 0 8.2 2.73 13.46 2.72 5.25 8.24 5.25 4.59 0 8.1-4.04t5.22-10.01q1.71-5.97 1.71-12.54zm1.18 23.99q-2.95 3.25-7.39 5.22-4.43 1.97-9.68 1.97t-9.22-2.36q-3.97-2.37-6.33-6.3-4.73-7.88-4.73-18.38t5.22-18.71q5.22-8.2 13.95-10.37.52.13 1.01.53.5.39.56.85-8.47 6.17-10.24 16.8 2.76-7.74 8.31-12.11 5.54-4.36 11.91-4.36t10.86 5.48q4.5 5.48 4.5 15.85 0 10.17-3.81 18.31-1.97 4.33-4.92 7.58zm33.47-13.03q-1.05 8.87-1.05 13.66 0 4.79.92 6.95-5.58-1.44-7.61-3.84-2.04-2.39-2.04-6.03 0-3.65.99-10.41-7.02-25.07-12.14-32.75 2.69-1.71 5.64-1.71 1.58 0 2.66.3 1.08.29 2.13 1.34 1.05 1.05 1.81 2.69.75 1.65 1.67 4.8 1.58 4.98 4 17.06l.46 2.56q6.04-9.38 9.82-17.72 3.77-8.34 4.43-13 4.92 2.76 4.92 7.45 0 4.7-16.61 28.65zm14.31 15.69q0-1.25 3.81-9.32t8.63-18.34q4.83-10.28 6.53-14.94l1.18-3.21q-.52-.92-2.56-3.35 2.37-.79 4.11-.79 1.74 0 2.89.26 1.14.27 2.03.89.89.62 1.58 1.28.68.66 1.28 1.94.59 1.28.98 2.29.39 1.02.89 2.86.49 1.84.78 3.18.3 1.35.79 3.74.49 2.4 1.02 4.63.52 2.23 1.84 8.5 1.31 6.27 2.06 9.39.76 3.12 2.17 6.99t2.99 6.1q-3.81 1.84-6.17 1.84-2.37 0-3.48-1.21-1.12-1.22-1.91-3.68-.78-2.46-3.08-13.23-1.51 1.32-4.92 1.45l-11.23.39q-4 9.78-5.91 17.4-6.3-2.24-6.3-5.06zm23.17-37.08q-.92 2.1-4.03 8.96-3.12 6.86-4.83 10.92h13.46q-3.09-14.17-4.6-19.88zm37.75-9.49q.52 1.08.62 2 .1.92.1 3.35t-1.64 13.65l-.59 3.81q8.86-7.29 14.96-14.14 6.11-6.86 8.6-11.66 2.17 3.81 2.17 7.45 0 3.65-3.71 7.45-3.71 3.81-11.19 9.33 4.59 14.5 10.3 22.44 2.43 3.35 6.17 7.29-2.43.66-4.86.66-2.42 0-4.98-1.51-2.56-1.51-4.43-3.68-1.88-2.17-3.84-5.78-2.83-5.31-6.11-13.98-1.84 1.38-4 2.83-1.18 9.78-1.18 14.8 0 5.02.91 7.18-5.57-1.44-7.61-3.84-2.03-2.39-2.03-6.66 0-2.49 1.37-12.67 2.43-16.86 2.43-26.12 0-1.97-.26-5.38 4.99.26 7.29 1.57.98.53 1.51 1.61zm44.04 0q.52 1.08.62 2 .1.92.1 3.35t-2.16 17.26q-2.17 14.84-2.17 20.78 0 5.94.92 8.1-5.58-1.44-7.62-3.84-2.03-2.39-2.03-6.66 0-2.49 1.38-12.67 2.43-16.86 2.43-26.12 0-1.97-.27-5.38 4.99.26 7.29 1.57.98.53 1.51 1.61z"
          fill="#1bd77f"/>
      <path
          d="M212.914 54.488l6.977-27.91a3.617 3.617 0 00-5.863-3.616l-24.109 20.666-74.803-8.984V7.617A3.617 3.617 0 00111.5 4c-16.566.024-30.478 12.472-32.337 28.933H6.617A3.617 3.617 0 003 36.55c0 36 19.66 66.723 47.082 78.279.944.432 1.91.814 2.893 1.146a61.508 61.508 0 0021.154 3.758h18.025a36.304 36.304 0 0014.069-2.915l16.817 23.125a3.617 3.617 0 005.606.298 3.617 3.617 0 00.915-2.787l-3.28-31.533 64.998-36.413 23.678 10.149a3.617 3.617 0 004.857-4.467zM107.883 11.49v22.286l-6.803-.817a3.397 3.397 0 00-.43-.026H86.469a25.356 25.356 0 0121.414-21.443zm-55.588 96.355a75.913 75.913 0 01-15.208-9.812h30.575l-14.34 10.246a51.355 51.355 0 01-1.027-.434zm51.841-6.195h14.438l.275 2.654 2.13 20.489zm83.313-38.286l-61.978 34.72-.04-.413a3.617 3.617 0 00-3.599-3.255h-24.8a3.617 3.617 0 00-2.925 5.744l7.75 10.654a29.122 29.122 0 01-9.703 1.686H74.13a54.102 54.102 0 01-12.297-1.422L81.04 97.36a3.617 3.617 0 00-2.09-6.56H29.492a82.71 82.71 0 01-19.168-50.633h90.109l87.016 10.44zm7.234-.264V49.063l15.439-13.236-4.481 17.927a3.617 3.617 0 00.076 2.022l4.702 14.062zm-130.2 6v-7.234h7.233V69.1zM89.8 65.483a3.617 3.617 0 00-3.617 3.617v7.233a3.617 3.617 0 007.233 0V69.1a3.617 3.617 0 00-3.616-3.617zm14.466 21.7a3.617 3.617 0 003.617-3.617V65.483a3.617 3.617 0 00-7.233 0v18.083a3.617 3.617 0 003.616 3.617zm14.467 0a3.617 3.617 0 003.617-3.617V65.483a3.617 3.617 0 00-7.234 0v18.083a3.617 3.617 0 003.617 3.617z"
          fill="#1bd77f" className="fill c1"/>
    </svg>
  );
}

/**
 * Provides an alert for screen reader users when the route changes.
 */
const RouteChangeAnnouncement = React.memo(() => {
  let [hydrated, setHydrated] = React.useState(false);
  let [innerHtml, setInnerHtml] = React.useState("");
  let location = useLocation();

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  let firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    // Skip the first render because we don't want an announcement on the
    // initial page load.
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    let pageTitle = location.pathname === "/" ? "Home page" : document.title;
    setInnerHtml(`Navigated to ${pageTitle}`);
  }, [location.pathname]);

  // Render nothing on the server. The live region provides no value unless
  // scripts are loaded and the browser takes over normal routing.
  if (!hydrated) {
    return null;
  }

  return (
    <div
      aria-live="assertive"
      aria-atomic
      id="route-change-region"
      style={{
        border: "0",
        clipPath: "inset(100%)",
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: "0",
        position: "absolute",
        width: "1px",
        whiteSpace: "nowrap",
        wordWrap: "normal"
      }}
    >
      {innerHtml}
    </div>
  );
});
