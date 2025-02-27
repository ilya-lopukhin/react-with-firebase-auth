import * as React from 'react';
import * as firebase from 'firebase';
export declare type WrappedComponentProps = {
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
export declare type PossibleProviders = 'googleProvider' | 'facebookProvider' | 'twitterProvider' | 'githubProvider';
export declare type ProvidersMapper = {
    googleProvider?: firebase.auth.GithubAuthProvider_Instance;
    facebookProvider?: firebase.auth.FacebookAuthProvider_Instance;
    twitterProvider?: firebase.auth.TwitterAuthProvider_Instance;
    githubProvider?: firebase.auth.GithubAuthProvider_Instance;
};
export declare type HocParameters = {
    firebaseAppAuth: firebase.auth.Auth;
    providers?: ProvidersMapper;
    method?: 'Popup' | 'Redirect';
};
export declare type FirebaseAuthProviderState = {
    user?: firebase.User;
    error?: string;
};
declare const withFirebaseAuth: ({ firebaseAppAuth, providers, method, }: HocParameters) => (WrappedComponent: React.FunctionComponent<WrappedComponentProps>) => {
    new (props: Readonly<{}>): {
        state: {
            user: undefined;
            error: undefined;
        };
        unsubscribeAuthStateListener: firebase.Unsubscribe;
        componentDidMount(): void;
        componentWillUnmount(): void;
        setError: (error: any) => void;
        tryTo: (operation: () => any) => Promise<any>;
        tryToSignInWithProvider: (provider: PossibleProviders) => Promise<any>;
        signOut: () => Promise<any>;
        signInAnonymously: () => Promise<any>;
        signInWithGithub: () => Promise<any>;
        signInWithTwitter: () => Promise<any>;
        signInWithGoogle: () => Promise<any>;
        signInWithFacebook: () => Promise<any>;
        signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
        createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
        sharedHandlers: {
            signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
            createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
            signInWithGithub: () => Promise<any>;
            signInWithTwitter: () => Promise<any>;
            signInWithGoogle: () => Promise<any>;
            signInWithFacebook: () => Promise<any>;
            setError: (error: any) => void;
            signInAnonymously: () => Promise<any>;
            signOut: () => Promise<any>;
        };
        render(): JSX.Element;
        context: any;
        setState<K extends "user" | "error">(state: FirebaseAuthProviderState | ((prevState: Readonly<FirebaseAuthProviderState>, props: Readonly<{}>) => FirebaseAuthProviderState | Pick<FirebaseAuthProviderState, K> | null) | Pick<FirebaseAuthProviderState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<{}> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: {}, context?: any): {
        state: {
            user: undefined;
            error: undefined;
        };
        unsubscribeAuthStateListener: firebase.Unsubscribe;
        componentDidMount(): void;
        componentWillUnmount(): void;
        setError: (error: any) => void;
        tryTo: (operation: () => any) => Promise<any>;
        tryToSignInWithProvider: (provider: PossibleProviders) => Promise<any>;
        signOut: () => Promise<any>;
        signInAnonymously: () => Promise<any>;
        signInWithGithub: () => Promise<any>;
        signInWithTwitter: () => Promise<any>;
        signInWithGoogle: () => Promise<any>;
        signInWithFacebook: () => Promise<any>;
        signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
        createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
        sharedHandlers: {
            signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
            createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
            signInWithGithub: () => Promise<any>;
            signInWithTwitter: () => Promise<any>;
            signInWithGoogle: () => Promise<any>;
            signInWithFacebook: () => Promise<any>;
            setError: (error: any) => void;
            signInAnonymously: () => Promise<any>;
            signOut: () => Promise<any>;
        };
        render(): JSX.Element;
        context: any;
        setState<K extends "user" | "error">(state: FirebaseAuthProviderState | ((prevState: Readonly<FirebaseAuthProviderState>, props: Readonly<{}>) => FirebaseAuthProviderState | Pick<FirebaseAuthProviderState, K> | null) | Pick<FirebaseAuthProviderState, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<{}> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    displayName: string;
    contextType?: React.Context<any> | undefined;
};
export default withFirebaseAuth;
