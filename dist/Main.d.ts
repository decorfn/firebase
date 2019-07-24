interface fni {
    [key: string]: any;
}
export declare class FunctionsIndex implements fni {
    [key: string]: any;
}
declare class Controller extends FunctionsIndex {
}
export declare type IController = Controller;
export declare function start(controllers: IController[], middleClass?: any): void;
export {};
