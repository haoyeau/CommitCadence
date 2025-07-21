import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect } from "react";
import { Button } from "react-native";
import { useDispatch } from "react-redux";
import { setToken } from "./store/authSlice";

const CLIENT_ID = "Ov23liVbQmkBAiSIuewZ";
const EXCHANGE_API = "https://commit-cadence.vercel.app/api/exchange";


const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
};

export default function GitHubAuthScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'commitcadence',
        path: 'github/callback',
      }),
      usePKCE: false, // PKCE is not supported by GitHub OAuth
    },
    discovery
  );
  
  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      fetch(EXCHANGE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setToken(data.accessToken));
          SecureStore.setItemAsync('accessToken', data.accessToken);
          router.replace('./home');
        })
        .catch(console.error);
    }
  }, [response, dispatch, router]);

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
