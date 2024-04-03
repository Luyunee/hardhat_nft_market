import { InterpreterStep } from "@nomicfoundation/ethereumjs-evm";
import { Item } from "../types";
import { LOG } from "./log";
export interface LOG0 extends LOG {
    topics: [];
}
declare function parse(step: InterpreterStep, currentAddress?: string): Item<LOG0>;
declare const _default: {
    parse: typeof parse;
};
export default _default;
//# sourceMappingURL=log0.d.ts.map