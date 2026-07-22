"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="page-shell" id="main">
      <p className="kicker">Error</p>
      <h1>Something went wrong.</h1>
      <p>The page could not be loaded. Try again or return to the homepage.</p>
      <button className="ui-button" onClick={reset} type="button">
        Try again
      </button>
    </main>
  );
}
