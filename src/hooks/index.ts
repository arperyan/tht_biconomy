import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { ADAPTER_EVENTS, CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";

import { Web3AuthReturn, Web3UserData } from "@/types";

export const useWeb3Auth = (clientId: string, network: string): Web3AuthReturn => {
    const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
    const [loading, setLoading] = useState(true);
    const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
    const [chainId, setChainId] = useState<string>("0x1");

    useEffect(() => {
        if (!clientId) return;

        const subscribeAuthEvents = (web3auth: Web3Auth) => {
            web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: Web3UserData) => {
                console.log("Logged in: ", data);
            });

            web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
                console.log("Connecting...");
            });

            web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
                console.log("Disconnected");
            });

            web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
                console.error("There is an error: ", error);
            });
        };

        const getWeb3Auth = async () => {
            try {
                setLoading(true);
                const web3authInstance = new Web3Auth({
                    clientId,
                    chainConfig: {
                        chainNamespace: CHAIN_NAMESPACES.EIP155,
                        chainId: "0x1",
                        rpcTarget: "https://rpc.ankr.com/eth",
                    },
                });
                const adapter = new OpenloginAdapter({ adapterSettings: { network, clientId } });
                web3authInstance.configureAdapter(adapter);

                setWeb3auth(web3authInstance);
                subscribeAuthEvents(web3authInstance);

                await web3authInstance.initModal();

                if (web3authInstance.provider) {
                    setProvider(web3authInstance.provider);
                    web3authInstance.provider?.on("chainChanged", (data) => {
                        setChainId(data);
                    });
                }
            } catch (error) {
                console.log("There is an error: ", error);
            } finally {
                setLoading(false);
            }
        };

        getWeb3Auth();
    }, [clientId]);

    return { web3auth, loading, chainId, provider, setProvider };
};
