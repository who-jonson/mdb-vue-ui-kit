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
        const to: (StringConstructor | ObjectConstructor)[];
        namespace href {
            const type_1: StringConstructor;
            export { type_1 as type };
        }
        namespace disabled {
            const type_2: BooleanConstructor;
            export { type_2 as type };
            const _default_1: boolean;
            export { _default_1 as default };
        }
        namespace active {
            const type_3: BooleanConstructor;
            export { type_3 as type };
            const _default_2: boolean;
            export { _default_2 as default };
        }
        namespace exact {
            const type_4: BooleanConstructor;
            export { type_4 as type };
            const _default_3: boolean;
            export { _default_3 as default };
        }
        namespace newTab {
            const type_5: BooleanConstructor;
            export { type_5 as type };
            const _default_4: boolean;
            export { _default_4 as default };
        }
        namespace submenu {
            const type_6: BooleanConstructor;
            export { type_6 as type };
            const _default_5: boolean;
            export { _default_5 as default };
        }
        const submenuIcon: StringConstructor;
        namespace divider {
            const type_7: BooleanConstructor;
            export { type_7 as type };
            const _default_6: boolean;
            export { _default_6 as default };
        }
        namespace text {
            const type_8: BooleanConstructor;
            export { type_8 as type };
            const _default_7: boolean;
            export { _default_7 as default };
        }
        namespace header {
            const type_9: BooleanConstructor;
            export { type_9 as type };
            const _default_8: boolean;
            export { _default_8 as default };
        }
    }
    function setup(props: any): {
        className: ComputedRef<any[]>;
        hasLinkOrTag: ComputedRef<boolean>;
        tagName: ComputedRef<any>;
        tab: ComputedRef<"_blank" | null>;
        props: any;
    };
    function setup(props: any): {
        className: ComputedRef<any[]>;
        hasLinkOrTag: ComputedRef<boolean>;
        tagName: ComputedRef<any>;
        tab: ComputedRef<"_blank" | null>;
        props: any;
    };
}
export default _default;
