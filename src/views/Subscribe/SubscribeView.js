import React from "react";

function SubscribeView({ location }) {
  const title = location?.state?.page;
  console.log(">>>>", location);
  return <div>Subscribe to {title}</div>;
}

export default SubscribeView;
