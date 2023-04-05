import { useEffect, useState } from "react";
import { SafeEventEmitterProvider } from "@web3auth/base";

import { getWeb3 } from "@/util";
import { Table } from "@/components/Table";
import { ChainDetails } from "@/types";

import s from "./layout.module.css";

interface LayoutProps {
    provider: SafeEventEmitterProvider;
    children: React.ReactNode;
    providerUpdate: boolean;
}

const Layout: React.FC<LayoutProps> = ({ provider, providerUpdate, children }) => {
    const [chainDetails, setChainDetails] = useState<ChainDetails>({
        chainId: "",
        chainAddress: "",
        chainBalance: "",
        provider: provider,
    });

    useEffect(() => {
        const getWeb3Info = async () => {
            const getChainId = getWeb3(provider).eth.getChainId();
            const getChainAddress = getWeb3(provider).eth.getAccounts();

            try {
                const [address, chainId] = await Promise.all([getChainAddress, getChainId]);

                const getChainBalance = await getWeb3(provider).eth.getBalance(address[0]);

                setChainDetails({
                    chainId: chainId.toString(),
                    chainAddress: address[0],
                    chainBalance: getChainBalance,
                    provider: provider,
                });
            } catch (error) {
                console.log("There is an error", error);
            }
        };

        getWeb3Info();
    }, [provider, providerUpdate]);

    return (
        <div className={s.container}>
            <h3 className={s.header}>Web3 Wallet</h3>
            <div className={s.infoBar}>
                <div className={s.infoHeader}>
                    <div className={s.title_heading}>Address</div>
                    <div className={s.title_subheading}>{chainDetails.chainAddress}</div>
                </div>
                {children}
            </div>

            <Table web3Data={chainDetails} />
        </div>
    );
};

export { Layout };
