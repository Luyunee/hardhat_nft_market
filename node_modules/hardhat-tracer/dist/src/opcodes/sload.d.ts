import { InterpreterStep } from "@nomicfoundation/ethereumjs-evm";
import { AwaitedItem, Item } from "../types";
export interface SLOAD {
    key: string;
    value: string;
}
declare function parse(step: InterpreterStep): AwaitedItem<SLOAD>;
declare function format(item: Item<SLOAD>): string;
declare const _default: {
    parse: typeof parse;
    format: typeof format;
};
export default _default;
//# sourceMappingURL=sload.d.ts.map