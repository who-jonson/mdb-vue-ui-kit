import type { ComputedRef, Ref } from 'vue';
declare namespace _default {
    const name: string;
    const inheritAttrs: boolean;
    namespace props {
        export namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        export namespace fadeIn {
            const type_1: StringConstructor;
            export { type_1 as type };
            const _default_1: string;
            export { _default_1 as default };
        }
        export namespace fadeOut {
            const type_2: StringConstructor;
            export { type_2 as type };
            const _default_2: string;
            export { _default_2 as default };
        }
        export namespace animation {
            const type_3: BooleanConstructor;
            export { type_3 as type };
            const _default_3: boolean;
            export { _default_3 as default };
        }
        export namespace dark {
            const type_4: BooleanConstructor;
            export { type_4 as type };
            const _default_4: boolean;
            export { _default_4 as default };
        }
        export namespace _static {
            const type_5: BooleanConstructor;
            export { type_5 as type };
            const _default_5: boolean;
            export { _default_5 as default };
        }
        export { _static as static };
    }
    function setup(props: any): {
        staticStyle: ComputedRef<false | {
            display: string;
            position: string;
        }>;
        showClass: Ref<boolean>;
        className: ComputedRef<any[]>;
        isMounted: ComputedRef<boolean>;
        shouldTeleport: Ref<boolean>;
        externalTarget: boolean;
        root: Ref<string>;
        props: any;
    };
    function setup(props: any): {
        staticStyle: ComputedRef<false | {
            display: string;
            position: string;
        }>;
        showClass: Ref<boolean>;
        className: ComputedRef<any[]>;
        isMounted: ComputedRef<boolean>;
        shouldTeleport: Ref<boolean>;
        externalTarget: boolean;
        root: Ref<string>;
        props: any;
    };
}
export default _default;
