import { SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { Dispatch, SetStateAction } from "react";

export interface Web3AuthReturn {
    web3auth: Web3Auth | null;
    loading: boolean;
    chainId: string;
    provider: SafeEventEmitterProvider | null;
    setProvider: Dispatch<SetStateAction<SafeEventEmitterProvider | null>>;
}

export interface Web3UserData {
    adapter: string;
    reconnected: boolean;
}

export interface ChainDetails {
    chainId: string;
    chainAddress: string;
    chainBalance: string;
    provider: SafeEventEmitterProvider;
}
