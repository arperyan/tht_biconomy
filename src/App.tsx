import { useEffect, useState } from "react";

import { useWeb3Auth } from "@/hooks";
import { Button, Spinner } from "@/ui";
import { Layout } from "@/components/Layout";

import "./App.css";

const App = () => {
    const [providerUpdate, setProviderUpdate] = useState(false);
    const { web3auth, loading, chainId, provider, setProvider } = useWeb3Auth(
        import.meta.env.VITE_CLIENT_ID,
        "mainnet"
    );

    const login = async () => {
        if (!web3auth) return;

        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
    };

    const logout = async () => {
        if (!web3auth) return;

        await web3auth.logout();
        setProvider(null);
    };

    useEffect(() => {
        console.log("Web3Auth", web3auth);
        setProviderUpdate((prev) => !prev);
    }, [chainId]);

    if (loading) return <Spinner />;

    return (
        <div className="container">
            {!provider ? (
                <div className="card">
                    <h1 className="title">Welcome to Biconomy</h1>
                    <Button label="Login" onPress={login} size="large" />
                </div>
            ) : (
                <Layout provider={provider} providerUpdate={providerUpdate}>
                    <Button label="Logout" onPress={logout} />
                </Layout>
            )}
        </div>
    );
};

export { App };
