import Web3 from "web3";
import { SafeEventEmitterProvider } from "@web3auth/base";

export const getWeb3 = (provider: SafeEventEmitterProvider): Web3 => new Web3(provider as any);
