import { InterpreterStep } from "@nomicfoundation/ethereumjs-evm";
import { AwaitedItem, Item, TracerDependencies } from "../types";
export declare function parse(step: InterpreterStep, currentAddress: string): Item<any> | AwaitedItem<any> | undefined;
export declare function format(item: Item<any>, dependencies: TracerDependencies): Promise<string>;
//# sourceMappingURL=index.d.ts.map