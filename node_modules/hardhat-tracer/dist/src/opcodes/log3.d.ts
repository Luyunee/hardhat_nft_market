import { InterpreterStep } from "@nomicfoundation/ethereumjs-evm";
import { Item } from "../types";
import { LOG } from "./log";
export interface LOG3 extends LOG {
    topics: [string, string, string];
}
declare function parse(step: InterpreterStep, currentAddress?: string): Item<LOG3>;
declare const _default: {
    parse: typeof parse;
};
export default _default;
//# sourceMappingURL=log3.d.ts.map