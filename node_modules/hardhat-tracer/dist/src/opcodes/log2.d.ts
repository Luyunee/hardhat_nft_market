import { InterpreterStep } from "@nomicfoundation/ethereumjs-evm";
import { Item } from "../types";
import { LOG } from "./log";
export interface LOG2 extends LOG {
    topics: [string, string];
}
declare function parse(step: InterpreterStep, currentAddress?: string): Item<LOG2>;
declare const _default: {
    parse: typeof parse;
};
export default _default;
//# sourceMappingURL=log2.d.ts.map