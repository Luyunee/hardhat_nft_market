import { InterpreterStep } from "@nomicfoundation/ethereumjs-evm";
import { Item, TracerDependencies } from "../types";
export interface REVERT {
    data: string;
}
declare function parse(step: InterpreterStep): Item<REVERT>;
declare function format(item: Item<REVERT>, dependencies: TracerDependencies): Promise<string>;
declare const _default: {
    parse: typeof parse;
    format: typeof format;
};
export default _default;
//# sourceMappingURL=revert.d.ts.map