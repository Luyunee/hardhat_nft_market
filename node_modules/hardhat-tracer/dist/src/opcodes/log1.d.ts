import { InterpreterStep } from "@nomicfoundation/ethereumjs-evm";
import { Item } from "../types";
import { LOG } from "./log";
export interface LOG1 extends LOG {
    topics: [string];
}
declare function parse(step: InterpreterStep, currentAddress?: string): Item<LOG1>;
declare const _default: {
    parse: typeof parse;
};
export default _default;
//# sourceMappingURL=log1.d.ts.map