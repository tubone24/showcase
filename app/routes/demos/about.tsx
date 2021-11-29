import { Outlet } from "remix";
import type { MetaFunction, LinksFunction } from "remix";

import stylesUrl from "~/styles/demos/about.css";

export let meta: MetaFunction = () => {
  return {
    title: "About tubone24"
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
  return (
    <div className="about">
      <div className="about__intro">
        <h2>About tubone24</h2>
        <p>
          I'm a Software and Infrastructure developer with over 5+ years, and I've been leading some engineering teams in recent years.
        </p>
        <p>
          Expert at AWS by using Server-less architecture. Also a master of Server-side API and Batch with Python.
        </p>
        <p>
          Additionally, experienced data science with Python and AWS.
        </p>
        <p>
          I have lectured at AWS Summit Tokyo 19 with company booth. I have AWS Certified Solution Architect – Professional.
        </p>
        <hr />
        <Outlet />
      </div>
    </div>
  );
}
