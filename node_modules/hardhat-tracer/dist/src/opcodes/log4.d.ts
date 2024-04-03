import { InterpreterStep } from "@nomicfoundation/ethereumjs-evm";
import { Item } from "../types";
import { LOG } from "./log";
export interface LOG4 extends LOG {
    topics: [string, string, string, string];
}
declare function parse(step: InterpreterStep, currentAddress?: string): Item<LOG4>;
declare const _default: {
    parse: typeof parse;
};
export default _default;
//# sourceMappingURL=log4.d.ts.map