import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { Button } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = "Ov23liVbQmkBAiSIuewZ";

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/' + CLIENT_ID,
};

export default function App() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'commitcadence',
        path: 'github/callback',
      }),
      
    },
    discovery
  );
  
  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      // Handle the authorization code here, e.g., exchange it for an access token
      console.log('Authorization code:', code);
      // TODO exchange code for access token
    }
  }, [response]);

  return (
    <Button
      title="Login with GitHub"
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
