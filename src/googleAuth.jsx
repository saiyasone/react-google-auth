import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { GoogleLogout, GoogleLogin } from "react-google-login";
// import {google} from "googleapis";

export default function GoogleAuth() {
  const clientId =
    "1082232868915-2i631rlglf8afl8b0ov12bnku6tpbf8t.apps.googleusercontent.com";

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  function onSuccess(res) {
    console.log("success ", res);
    setProfile(res?.profileObj);
  }

  function onError(err) {
    console.log("error ", err);
  }

  function Logout() {
    setProfile(null);
  }

  return (
    <>
      <h2>Google Authentication</h2>

      {!!profile ? (
        <div className="w-50 m-auto">
          <div className="my-3">
            <h2>Hello {profile.name} </h2>
            <img
              width={50}
              height={50}
              src={profile.imageUrl}
              alt={profile.name}
            />
          </div>
          <GoogleLogout
            clientId={clientId}
            onFailure={onError}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            buttonText="Sign out"
            onLogoutSuccess={Logout}
          />
        </div>
      ) : (
        <div>
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with google"
            onSuccess={onSuccess}
            onFailure={onError}
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            redirectUri="https://www.facebook.com"
          />
        </div>
      )}
    </>
  );
}
