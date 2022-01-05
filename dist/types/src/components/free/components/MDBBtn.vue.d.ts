import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace directives {
        export { mdbRipple };
    }
    namespace props {
        export const color: StringConstructor;
        export const size: StringConstructor;
        export const outline: StringConstructor;
        export const rounded: BooleanConstructor;
        export const floating: BooleanConstructor;
        export const toggler: BooleanConstructor;
        export const toggle: BooleanConstructor;
        export namespace role {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        export namespace type_1 {
            const type_2: StringConstructor;
            export { type_2 as type };
            const _default_1: string;
            export { _default_1 as default };
        }
        export { type_1 as type };
        export namespace tag {
            const type_3: StringConstructor;
            export { type_3 as type };
            const _default_2: string;
            export { _default_2 as default };
        }
        export namespace block {
            const type_4: BooleanConstructor;
            export { type_4 as type };
            const _default_3: boolean;
            export { _default_3 as default };
        }
        export namespace ripple {
            const type_5: (BooleanConstructor | ObjectConstructor)[];
            export { type_5 as type };
            function _default_4(props: any): true | {
                color: string;
            };
            export { _default_4 as default };
        }
        export const picker: BooleanConstructor;
    }
    const emits: string[];
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        className: ComputedRef<any[]>;
        props: any;
        handleClick: () => void;
    };
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        className: ComputedRef<any[]>;
        props: any;
        handleClick: () => void;
    };
}
export default _default;
import mdbRipple from "../../../directives/free/mdbRipple";
