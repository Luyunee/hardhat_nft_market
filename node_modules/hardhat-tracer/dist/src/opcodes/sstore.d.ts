import { InterpreterStep } from "@nomicfoundation/ethereumjs-evm";
import { Item } from "../types";
export interface SSTORE {
    key: string;
    value: string;
}
declare function parse(step: InterpreterStep): Item<SSTORE>;
declare function format(item: Item<SSTORE>): string;
declare const _default: {
    parse: typeof parse;
    format: typeof format;
};
export default _default;
//# sourceMappingURL=sstore.d.ts.map