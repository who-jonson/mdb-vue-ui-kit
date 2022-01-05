import type { Ref, ComputedRef } from 'vue';
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
        }
        namespace dark {
            const type_2: BooleanConstructor;
            export { type_2 as type };
            const _default_1: boolean;
            export { _default_1 as default };
        }
        namespace light {
            const type_3: BooleanConstructor;
            export { type_3 as type };
            const _default_2: boolean;
            export { _default_2 as default };
        }
        namespace double {
            const type_4: BooleanConstructor;
            export { type_4 as type };
            const _default_3: boolean;
            export { _default_3 as default };
        }
        namespace expand {
            const type_5: StringConstructor;
            export { type_5 as type };
        }
        namespace position {
            const type_6: StringConstructor;
            export { type_6 as type };
        }
        namespace transparent {
            const type_7: BooleanConstructor;
            export { type_7 as type };
            const _default_4: boolean;
            export { _default_4 as default };
        }
        namespace scrolling {
            const type_8: BooleanConstructor;
            export { type_8 as type };
            const _default_5: boolean;
            export { _default_5 as default };
        }
        namespace scrollingOffset {
            const type_9: NumberConstructor;
            export { type_9 as type };
            const _default_6: number;
            export { _default_6 as default };
        }
        namespace center {
            const type_10: BooleanConstructor;
            export { type_10 as type };
            const _default_7: boolean;
            export { _default_7 as default };
        }
        namespace container {
            const type_11: (StringConstructor | BooleanConstructor)[];
            export { type_11 as type };
            const _default_8: boolean;
            export { _default_8 as default };
        }
        namespace classContainer {
            const type_12: StringConstructor;
            export { type_12 as type };
        }
        const classNavbar: StringConstructor;
    }
    function setup(props: any): {
        navbar: Ref<null>;
        navClass: ComputedRef<any[]>;
        containerClass: ComputedRef<false | any[]>;
        props: any;
    };
    function setup(props: any): {
        navbar: Ref<null>;
        navClass: ComputedRef<any[]>;
        containerClass: ComputedRef<false | any[]>;
        props: any;
    };
}
export default _default;
