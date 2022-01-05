import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace active {
            const type_1: BooleanConstructor;
            export { type_1 as type };
            const _default_1: boolean;
            export { _default_1 as default };
        }
        namespace disabled {
            const type_2: BooleanConstructor;
            export { type_2 as type };
            const _default_2: boolean;
            export { _default_2 as default };
        }
        namespace href {
            const type_3: StringConstructor;
            export { type_3 as type };
        }
        namespace icon {
            const type_4: BooleanConstructor;
            export { type_4 as type };
            export const defaul: boolean;
        }
        namespace label {
            const type_5: StringConstructor;
            export { type_5 as type };
        }
    }
    function setup(props: any): {
        className: ComputedRef<any[]>;
        labelValue: ComputedRef<any>;
        disabledTabindex: ComputedRef<"-1" | " false">;
        props: any;
    };
    function setup(props: any): {
        className: ComputedRef<any[]>;
        labelValue: ComputedRef<any>;
        disabledTabindex: ComputedRef<"-1" | " false">;
        props: any;
    };
}
export default _default;
