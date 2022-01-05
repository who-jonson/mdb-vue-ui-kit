import type { ComputedRef, Ref } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace captionsClass {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace controls {
            const type_1: BooleanConstructor;
            export { type_1 as type };
            const _default_1: boolean;
            export { _default_1 as default };
        }
        const dark: BooleanConstructor;
        const fade: BooleanConstructor;
        namespace indicators {
            const type_2: BooleanConstructor;
            export { type_2 as type };
            const _default_2: boolean;
            export { _default_2 as default };
        }
        namespace interval {
            const type_3: (BooleanConstructor | NumberConstructor)[];
            export { type_3 as type };
            const _default_3: number;
            export { _default_3 as default };
        }
        namespace items {
            const type_4: ArrayConstructor;
            export { type_4 as type };
            export const reguired: boolean;
        }
        namespace itemsClass {
            const type_5: StringConstructor;
            export { type_5 as type };
            const _default_4: string;
            export { _default_4 as default };
        }
        namespace keyboard {
            const type_6: BooleanConstructor;
            export { type_6 as type };
            const _default_5: boolean;
            export { _default_5 as default };
        }
        namespace modelValue {
            const type_7: NumberConstructor;
            export { type_7 as type };
            const _default_6: number;
            export { _default_6 as default };
        }
        namespace pause {
            const type_8: (StringConstructor | BooleanConstructor)[];
            export { type_8 as type };
            const _default_7: string;
            export { _default_7 as default };
        }
        namespace tag {
            const type_9: StringConstructor;
            export { type_9 as type };
            const _default_8: string;
            export { _default_8 as default };
        }
        namespace touch {
            const type_10: BooleanConstructor;
            export { type_10 as type };
            const _default_9: boolean;
            export { _default_9 as default };
        }
    }
    const emits: string[];
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        className: ComputedRef<any[]>;
        carouselInnerRef: Ref<null>;
        activeItemKey: any;
        handleMouseenter: () => void;
        handleMouseleave: () => void;
        handleRight: () => void;
        handleLeft: () => void;
        handleTouchstart: (event: any) => void;
        handleTouchmove: (event: any) => void;
        handleTouchend: (event: any) => void;
        slideTo: (target: any) => void;
        next: () => void;
        prev: () => void;
    };
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        className: ComputedRef<any[]>;
        carouselInnerRef: Ref<null>;
        activeItemKey: any;
        handleMouseenter: () => void;
        handleMouseleave: () => void;
        handleRight: () => void;
        handleLeft: () => void;
        handleTouchstart: (event: any) => void;
        handleTouchmove: (event: any) => void;
        handleTouchend: (event: any) => void;
        slideTo: (target: any) => void;
        next: () => void;
        prev: () => void;
    };
}
export default _default;
