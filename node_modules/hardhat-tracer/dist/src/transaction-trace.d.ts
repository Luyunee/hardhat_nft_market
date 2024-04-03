import { EvmError } from "@nomicfoundation/ethereumjs-evm/src/exceptions";
import { CallItem, Item } from "./types";
export declare class TransactionTrace {
    hash?: string;
    top?: CallItem;
    parent?: CallItem;
    insertItem(item: Item<any>, options?: {
        increaseDepth: boolean;
    }): void;
    returnCurrentCall(returnData: string, executionGas: number, exception?: EvmError): void;
}
//# sourceMappingURL=transaction-trace.d.ts.map