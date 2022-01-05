import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        const bg: StringConstructor;
        namespace striped {
            const type_1: BooleanConstructor;
            export { type_1 as type };
            const _default_1: boolean;
            export { _default_1 as default };
        }
        namespace animated {
            const type_2: BooleanConstructor;
            export { type_2 as type };
            const _default_2: boolean;
            export { _default_2 as default };
        }
        namespace value {
            const type_3: NumberConstructor;
            export { type_3 as type };
            const _default_3: number;
            export { _default_3 as default };
        }
        namespace min {
            const type_4: NumberConstructor;
            export { type_4 as type };
            const _default_4: number;
            export { _default_4 as default };
        }
        namespace max {
            const type_5: NumberConstructor;
            export { type_5 as type };
            const _default_5: number;
            export { _default_5 as default };
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
