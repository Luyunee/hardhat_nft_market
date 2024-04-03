import { InterpreterStep } from "@nomicfoundation/ethereumjs-evm";
import { AwaitedItem, Item } from "../types";
export interface EXTCODEHASH {
    address: string;
    hash: string;
}
declare function parse(step: InterpreterStep): AwaitedItem<EXTCODEHASH>;
declare function format(item: Item<EXTCODEHASH>): string;
declare const _default: {
    parse: typeof parse;
    format: typeof format;
};
export default _default;
//# sourceMappingURL=extcodehash.d.ts.map