import { useState, useEffect } from "react";
import qs from "qs";
const useOauth = ({
  isAuthenticated,
  location,
  authorizeUrl,
  clientId,
  redirectUri,
  state,
  args
}) => {
  const base = {
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    state: state ? state : undefined
  };
  const url = buildURL(
    authorizeUrl,
    args
      ? Object.entries(args).reduce((o, [k, v]) => {
          o[k] = v;
          return o;
        }, base)
      : base
  );
  const [code, setCode] = useState();
  const [status, setStatus] = useState();
  const [returnedState, setReturnedState] = useState();
  useEffect(() => {
    const search = location ? location.search : window.location.search;
    const q = qs.parse(search, { ignoreQueryPrefix: true });
    if (q && q.code) {
      setCode(q.code);
      setStatus("complete");
    } else {
      setStatus("notstarted");
    }
    if (q && q.state) {
      setReturnedState(returnedState);
    }
  }, []);
  return {
    state: returnedState,
    url,
    code,
    status: isAuthenticated ? "authenticated" : status
  };
};
function buildURL(url, params) {
  if (params == null) return url;
  const serializedParams = qs.stringify(params);
  if (!serializedParams) return url;
  return `${url}${url.indexOf("?") < 0 ? "?" : "&"}${serializedParams}`;
}
export default useOauth;
