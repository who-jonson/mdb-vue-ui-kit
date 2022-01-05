import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace flush {
            export const type: BooleanConstructor;
            const _default: boolean;
            export { _default as default };
        }
        namespace horizontal {
            const type_1: (StringConstructor | BooleanConstructor)[];
            export { type_1 as type };
            const _default_1: boolean;
            export { _default_1 as default };
        }
        const numbered: BooleanConstructor;
        namespace tag {
            const type_2: StringConstructor;
            export { type_2 as type };
            const _default_2: string;
            export { _default_2 as default };
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
