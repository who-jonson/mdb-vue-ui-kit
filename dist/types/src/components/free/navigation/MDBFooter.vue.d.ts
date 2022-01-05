import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace bg {
            const type_1: StringConstructor;
            export { type_1 as type };
            const _default_1: string;
            export { _default_1 as default };
        }
        namespace text {
            const type_2: (StringConstructor | ArrayConstructor)[];
            export { type_2 as type };
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
