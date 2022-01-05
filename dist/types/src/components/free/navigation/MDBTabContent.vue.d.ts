import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    const inheritAttrs: boolean;
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace col {
            const type_1: StringConstructor;
            export { type_1 as type };
            const _default_1: string;
            export { _default_1 as default };
        }
        const contentClasses: StringConstructor;
    }
    function setup(props: any): {
        isVertical: boolean;
        className: ComputedRef<any[]>;
        columnClassName: ComputedRef<string[]>;
        props: any;
    };
    function setup(props: any): {
        isVertical: boolean;
        className: ComputedRef<any[]>;
        columnClassName: ComputedRef<string[]>;
        props: any;
    };
}
export default _default;
