import qs from "qs";
function buildURL(url, params) {
  if (params == null) return url;
  const serializedParams = qs.stringify(params);
  if (!serializedParams) return url;
  return `${url}${url.indexOf("?") < 0 ? "?" : "&"}${serializedParams}`;
}
const useOauth = ({
  isAuthenticated,
  location,
  authorizeUrl,
  clientId,
  redirectUri,
  state,
  args
}) => {
  const url = buildURL(authorizeUrl, {
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    state: state ? JSON.stringify(state) : undefined,
    ...(args || {})
  });
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
