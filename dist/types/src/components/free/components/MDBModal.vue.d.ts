import type { ComputedRef, Ref } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        const modelValue: BooleanConstructor;
        namespace size {
            const type_1: StringConstructor;
            export { type_1 as type };
            export function validator(value: any): boolean;
        }
        namespace removeBackdrop {
            const type_2: BooleanConstructor;
            export { type_2 as type };
            const _default_1: boolean;
            export { _default_1 as default };
        }
        namespace staticBackdrop {
            const type_3: BooleanConstructor;
            export { type_3 as type };
            const _default_2: boolean;
            export { _default_2 as default };
        }
        namespace centered {
            const type_4: BooleanConstructor;
            export { type_4 as type };
            const _default_3: boolean;
            export { _default_3 as default };
        }
        namespace bgSrc {
            const type_5: StringConstructor;
            export { type_5 as type };
            const _default_4: string;
            export { _default_4 as default };
        }
        namespace scrollable {
            const type_6: BooleanConstructor;
            export { type_6 as type };
            const _default_5: boolean;
            export { _default_5 as default };
        }
        namespace duration {
            const type_7: NumberConstructor;
            export { type_7 as type };
            const _default_6: number;
            export { _default_6 as default };
        }
        const labelledby: StringConstructor;
        namespace fullscreen {
            const type_8: (StringConstructor | BooleanConstructor)[];
            export { type_8 as type };
            const _default_7: boolean;
            export { _default_7 as default };
        }
        namespace animation {
            const type_9: BooleanConstructor;
            export { type_9 as type };
            const _default_8: boolean;
            export { _default_8 as default };
        }
        namespace dialogClasses {
            const type_10: StringConstructor;
            export { type_10 as type };
        }
        const transform: StringConstructor;
        namespace keyboard {
            const type_11: BooleanConstructor;
            export { type_11 as type };
            const _default_9: boolean;
            export { _default_9 as default };
        }
        namespace focus {
            const type_12: BooleanConstructor;
            export { type_12 as type };
            const _default_10: boolean;
            export { _default_10 as default };
        }
    }
    const emits: string[];
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        wrapperClass: ComputedRef<any[]>;
        dialogClass: ComputedRef<any[]>;
        backdropStyle: ComputedRef<false | {
            'background-color': string;
        }>;
        backdropOverflowStyle: ComputedRef<"overflow: hidden" | undefined>;
        computedContentStyle: ComputedRef<false | {
            'background-image': string;
        }>;
        root: Ref<string>;
        dialog: Ref<string>;
        isActive: any;
        closeModal: () => void;
        animateStaticBackdrop: () => void;
        enter: (el: any) => void;
        afterEnter: (el: any) => void;
        beforeLeave: (el: any) => void;
        afterLeave: () => void;
        props: any;
    };
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        wrapperClass: ComputedRef<any[]>;
        dialogClass: ComputedRef<any[]>;
        backdropStyle: ComputedRef<false | {
            'background-color': string;
        }>;
        backdropOverflowStyle: ComputedRef<"overflow: hidden" | undefined>;
        computedContentStyle: ComputedRef<false | {
            'background-image': string;
        }>;
        root: Ref<string>;
        dialog: Ref<string>;
        isActive: any;
        closeModal: () => void;
        animateStaticBackdrop: () => void;
        enter: (el: any) => void;
        afterEnter: (el: any) => void;
        beforeLeave: (el: any) => void;
        afterLeave: () => void;
        props: any;
    };
}
export default _default;
