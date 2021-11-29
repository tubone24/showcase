import { Link } from "remix";

export default function AboutIndex() {
  return (
    <div>
      <p>
          I'm a Software and Infrastructure developer with over 5+ years, and I've been leading some engineering teams in recent years.
          Expert at AWS by using Server-less architecture.
          Also a master of Server-side API and Batch with Python.
          Additionally, experienced data science with Python and AWS.
          I have lectured at AWS Summit Tokyo 19 with company booth.
          I have AWS Certified Solution Architect – Professional.
      </p>
      <p>
        <strong>
          <Link to="whoa">Check out one of them here.</Link>
        </strong>
      </p>
    </div>
  );
}
