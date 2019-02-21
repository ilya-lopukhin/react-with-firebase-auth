import * as React from 'react';
import * as firebase from 'firebase';

import getErrorMessageForProvider from './get-error-message-for-provider';

export type WrappedComponentProps = {
  signInWithEmailAndPassword: (email: string, password: string) => void;
  createUserWithEmailAndPassword: (email: string, password: string) => void;
  signInWithGoogle: () => void;
  signInWithFacebook: () => void;
  signInWithGithub: () => void;
  signInWithTwitter: () => void;
  signInAnonymously: () => void;
  signOut: () => void;
  setError: (error: any) => void;
  user?: firebase.User;
  error?: firebase.FirebaseError;
};

export type PossibleProviders =
  'googleProvider'
  | 'facebookProvider'
  | 'twitterProvider'
  | 'githubProvider';

export type ProvidersMapper = {
  googleProvider?: firebase.auth.GithubAuthProvider_Instance;
  facebookProvider?: firebase.auth.FacebookAuthProvider_Instance;
  twitterProvider?: firebase.auth.TwitterAuthProvider_Instance;
  githubProvider?:  firebase.auth.GithubAuthProvider_Instance;
};

export type EventHooks = {
  onSignOut?: () => void;
  onAuthStateChange?: (user: firebase.User) => void;
  onProviderSignIn?: (result: firebase.auth.UserCredential, provider: PossibleProviders) => void;
};

export type HocParameters = {
  firebaseAppAuth: firebase.auth.Auth,
  providers?: ProvidersMapper,
  hooks?: EventHooks,
};

const withFirebaseAuth = ({
  firebaseAppAuth,
  providers = {},
  hooks = {}
}: HocParameters) =>
  (WrappedComponent: React.SFC<WrappedComponentProps>) => {
    return class FirebaseAuthProvider extends React.PureComponent {
      public unregisterAuthStateObserver: () => void;

      static displayName = `withFirebaseAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

      state = {
        user: undefined,
        error: undefined,
      }

      componentDidMount() {
        this.unregisterAuthStateObserver = firebaseAppAuth.onAuthStateChanged((user: firebase.User) => {
          this.setState({ user }, () => {
            hooks.onAuthStateChange && hooks.onAuthStateChange(user);
          });
        });
      }

      componentWillUnmount() {
        this.unregisterAuthStateObserver();
      }

      setError = (error: any) => this.setState({ error });

      tryTo = async (operation: () => void) => {
        try {
          await operation();
        } catch(error) {
          this.setError(error.message);
        }
      }

      tryToSignInWithProvider = (provider: PossibleProviders) =>
        this.tryTo(async () => {
          const providerInstance = providers[provider];

          if (!providerInstance) {
            throw new Error(getErrorMessageForProvider(provider));
          }

          const result = await firebaseAppAuth.signInWithPopup(providerInstance);

          hooks.onProviderSignIn && hooks.onProviderSignIn(result, provider);
        });

      signOut = () => this.tryTo(async () => {
        await firebaseAppAuth.signOut();
        hooks.onSignOut && hooks.onSignOut();
      });

      signInAnonymously = () => this.tryTo(() => firebaseAppAuth.signInAnonymously());
      signInWithGithub = () => this.tryToSignInWithProvider('githubProvider');
      signInWithTwitter = () => this.tryToSignInWithProvider('twitterProvider')
      signInWithGoogle = () => this.tryToSignInWithProvider('googleProvider')
      signInWithFacebook = () => this.tryToSignInWithProvider('facebookProvider')

      signInWithEmailAndPassword = (email: string, password: string) =>
        this.tryTo(() => firebaseAppAuth.signInWithEmailAndPassword(email, password));

      createUserWithEmailAndPassword = (email: string, password: string) =>
        this.tryTo(() => firebaseAppAuth.createUserWithEmailAndPassword(email, password));

      render() {
        const props = {
          ...this.props,
          signInWithEmailAndPassword: this.signInWithEmailAndPassword,
          createUserWithEmailAndPassword: this.createUserWithEmailAndPassword,
          signInWithGithub: this.signInWithGithub,
          signInWithTwitter: this.signInWithTwitter,
          signInWithGoogle: this.signInWithGoogle,
          signInWithFacebook: this.signInWithFacebook,
          setError: this.setError,
          signInAnonymously: this.signInAnonymously,
          signOut: this.signOut,
          user: this.state.user,
          error: this.state.error,
        };

        return <WrappedComponent {...props} />;
      }
    }
  };

export default withFirebaseAuth;
