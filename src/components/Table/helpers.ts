import { SafeEventEmitterProvider } from "@web3auth/base";
import Web3 from "web3";

export const sendWeb3Transaction = async (provider: SafeEventEmitterProvider, address: string): Promise<any> => {
    try {
        const web3 = new Web3(provider as any);
        const amount = web3.utils.toWei("0.001");

        const result = await web3.eth.sendTransaction({
            from: address,
            to: address,
            value: amount,
            maxPriorityFeePerGas: "5000000000",
            maxFeePerGas: "6000000000000",
        });

        return result;
    } catch (error) {
        console.log("There was an error: ", error);
        return error as string;
    }
};
