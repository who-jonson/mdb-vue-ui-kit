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
        namespace variant {
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
        namespace border {
            const type_4: (StringConstructor | BooleanConstructor)[];
            export { type_4 as type };
            const _default_3: boolean;
            export { _default_3 as default };
        }
        namespace borderless {
            const type_5: BooleanConstructor;
            export { type_5 as type };
            const _default_4: boolean;
            export { _default_4 as default };
        }
        namespace striped {
            const type_6: BooleanConstructor;
            export { type_6 as type };
            const _default_5: boolean;
            export { _default_5 as default };
        }
        namespace hover {
            const type_7: BooleanConstructor;
            export { type_7 as type };
            const _default_6: boolean;
            export { _default_6 as default };
        }
        namespace responsive {
            const type_8: (StringConstructor | BooleanConstructor)[];
            export { type_8 as type };
            const _default_7: boolean;
            export { _default_7 as default };
        }
        namespace align {
            const type_9: StringConstructor;
            export { type_9 as type };
        }
        namespace sm {
            const type_10: BooleanConstructor;
            export { type_10 as type };
            const _default_8: boolean;
            export { _default_8 as default };
        }
        namespace tableStyle {
            const type_11: StringConstructor;
            export { type_11 as type };
        }
        namespace captionTop {
            const type_12: BooleanConstructor;
            export { type_12 as type };
            const _default_9: boolean;
            export { _default_9 as default };
        }
    }
    function setup(props: any): {
        wrapperClasses: ComputedRef<string | false>;
        tableClasses: ComputedRef<any[]>;
        props: any;
    };
    function setup(props: any): {
        wrapperClasses: ComputedRef<string | false>;
        tableClasses: ComputedRef<any[]>;
        props: any;
    };
}
export default _default;
