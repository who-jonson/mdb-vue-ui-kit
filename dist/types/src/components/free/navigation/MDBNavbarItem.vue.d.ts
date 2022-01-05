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
        }
        namespace exact {
            const type_3: BooleanConstructor;
            export { type_3 as type };
            const _default_2: boolean;
            export { _default_2 as default };
        }
        namespace newTab {
            const type_4: BooleanConstructor;
            export { type_4 as type };
            const _default_3: boolean;
            export { _default_3 as default };
        }
        const to: (StringConstructor | ObjectConstructor)[];
        namespace href {
            const type_5: StringConstructor;
            export { type_5 as type };
        }
        namespace linkClass {
            const type_6: StringConstructor;
            export { type_6 as type };
        }
    }
    function setup(props: any): {
        props: any;
        className: ComputedRef<any[]>;
        linkClassName: ComputedRef<any[]>;
        tab: ComputedRef<false | "_blank">;
    };
    function setup(props: any): {
        props: any;
        className: ComputedRef<any[]>;
        linkClassName: ComputedRef<any[]>;
        tab: ComputedRef<false | "_blank">;
    };
}
export default _default;
