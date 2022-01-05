import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace subtitle {
            const type_1: BooleanConstructor;
            export { type_1 as type };
            const _default_1: boolean;
            export { _default_1 as default };
        }
    }
    function setup(props: any): {
        className: ComputedRef<string[]>;
        tagName: ComputedRef<any>;
        props: any;
    };
    function setup(props: any): {
        className: ComputedRef<string[]>;
        tagName: ComputedRef<any>;
        props: any;
    };
}
export default _default;
