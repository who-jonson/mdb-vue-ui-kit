import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace disabled {
            const type_1: BooleanConstructor;
            export { type_1 as type };
            const _default_1: boolean;
            export { _default_1 as default };
        }
        namespace href {
            const type_2: StringConstructor;
            export { type_2 as type };
            const _default_2: string;
            export { _default_2 as default };
        }
        namespace prev {
            const type_3: BooleanConstructor;
            export { type_3 as type };
            const _default_3: boolean;
            export { _default_3 as default };
        }
        namespace next {
            const type_4: BooleanConstructor;
            export { type_4 as type };
            const _default_4: boolean;
            export { _default_4 as default };
        }
        namespace icon {
            const type_5: BooleanConstructor;
            export { type_5 as type };
            const _default_5: boolean;
            export { _default_5 as default };
        }
    }
    function setup(props: any): {
        className: ComputedRef<any[]>;
        prevValue: ComputedRef<"«" | "Previous">;
        nextValue: ComputedRef<"»" | "Next">;
        disabledTabindex: ComputedRef<"-1" | " false">;
        props: any;
    };
    function setup(props: any): {
        className: ComputedRef<any[]>;
        prevValue: ComputedRef<"«" | "Previous">;
        nextValue: ComputedRef<"»" | "Next">;
        disabledTabindex: ComputedRef<"-1" | " false">;
        props: any;
    };
}
export default _default;
