import React, { useState } from "react";

import { Button } from "@/ui";
import { sendWeb3Transaction } from "./helpers";
import { ChainDetails } from "@/types";

import s from "./table.module.css";

const HEADER_DATA = [
    { title: "Chain ID", width: "30%" },
    { title: "Balance", width: "40%" },
    { title: "Action", width: "30%" },
];

interface TableProps {
    web3Data: ChainDetails;
}

const Table: React.FC<TableProps> = ({ web3Data }) => {
    const [loading, setLoading] = useState(false);

    const sendTransaction = async () => {
        setLoading(true);
        await sendWeb3Transaction(web3Data.provider, web3Data.chainAddress);
        setLoading(false);
    };

    return (
        <table className={s.container}>
            <thead>
                <tr>
                    {HEADER_DATA.map((headerItem) => (
                        <th
                            key={`header_${headerItem.title}`}
                            title={headerItem.title}
                            scope="col"
                            aria-label={headerItem.title}
                            style={{ width: headerItem.width }}>
                            {headerItem.title}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>
                        <div className={s.row}>
                            <div className={s.grow}>
                                <div className={s.row_name}>{web3Data.chainId}</div>
                            </div>
                        </div>
                    </td>

                    <td>
                        <div className={s.row}>
                            <div className={s.grow}>
                                <div className={s.row_name}>{web3Data.chainBalance}</div>
                            </div>
                        </div>
                    </td>

                    <td className={s.button}>
                        {!!loading ? (
                            "Sending Transaction..."
                        ) : (
                            <Button label="Send" onPress={sendTransaction}></Button>
                        )}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export { Table };
