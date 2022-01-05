import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace pills {
            const type_1: BooleanConstructor;
            export { type_1 as type };
        }
        namespace justify {
            const type_2: BooleanConstructor;
            export { type_2 as type };
        }
        namespace fill {
            const type_3: BooleanConstructor;
            export { type_3 as type };
        }
        namespace col {
            const type_4: StringConstructor;
            export { type_4 as type };
            const _default_1: string;
            export { _default_1 as default };
        }
        const tabsClasses: StringConstructor;
    }
    function setup(props: any): {
        className: ComputedRef<any[]>;
        columnClassName: ComputedRef<string[]>;
        isVertical: boolean;
        props: any;
    };
    function setup(props: any): {
        className: ComputedRef<any[]>;
        columnClassName: ComputedRef<string[]>;
        isVertical: boolean;
        props: any;
    };
}
export default _default;
