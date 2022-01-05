import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        const size: StringConstructor;
        const vertical: BooleanConstructor;
        namespace role {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace tag {
            const type_1: StringConstructor;
            export { type_1 as type };
            const _default_1: string;
            export { _default_1 as default };
        }
    }
    function setup(props: any): {
        className: ComputedRef<any[]>;
        props: any;
    };
    function setup(props: any): {
        className: ComputedRef<any[]>;
        props: any;
    };
}
export default _default;
