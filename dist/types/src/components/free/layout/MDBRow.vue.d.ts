import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace start {
            const type_1: BooleanConstructor;
            export { type_1 as type };
            const _default_1: boolean;
            export { _default_1 as default };
        }
        namespace end {
            const type_2: BooleanConstructor;
            export { type_2 as type };
            const _default_2: boolean;
            export { _default_2 as default };
        }
        namespace center {
            const type_3: BooleanConstructor;
            export { type_3 as type };
            const _default_3: boolean;
            export { _default_3 as default };
        }
        namespace between {
            const type_4: BooleanConstructor;
            export { type_4 as type };
            const _default_4: boolean;
            export { _default_4 as default };
        }
        namespace around {
            const type_5: BooleanConstructor;
            export { type_5 as type };
            const _default_5: boolean;
            export { _default_5 as default };
        }
        namespace cols {
            const type_6: (StringConstructor | ArrayConstructor)[];
            export { type_6 as type };
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
