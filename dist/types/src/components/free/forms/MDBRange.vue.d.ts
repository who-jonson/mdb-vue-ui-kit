import type { ComputedRef, Ref } from 'vue';
declare namespace _default {
    const name: string;
    const inheritAttrs: boolean;
    namespace props {
        const id: StringConstructor;
        const inputClass: StringConstructor;
        const label: StringConstructor;
        const labelClass: StringConstructor;
        namespace max {
            export const type: NumberConstructor;
            const _default: number;
            export { _default as default };
        }
        namespace min {
            const type_1: NumberConstructor;
            export { type_1 as type };
            const _default_1: number;
            export { _default_1 as default };
        }
        namespace modelValue {
            const type_2: NumberConstructor;
            export { type_2 as type };
            const _default_2: number;
            export { _default_2 as default };
        }
        namespace tag {
            const type_3: StringConstructor;
            export { type_3 as type };
            const _default_3: string;
            export { _default_3 as default };
        }
        namespace thumb {
            const type_4: BooleanConstructor;
            export { type_4 as type };
            const _default_4: boolean;
            export { _default_4 as default };
        }
        const thumbClass: StringConstructor;
        const wrapperClass: StringConstructor;
    }
    const emits: string[];
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        inputValue: any;
        minValue: any;
        maxValue: any;
        uid: any;
        wrapperClassName: ComputedRef<any[]>;
        inputClassName: ComputedRef<any[]>;
        labelClassName: ComputedRef<any[]>;
        thumbClassName: ComputedRef<any[]>;
        thumbLeftPosition: Ref<number>;
        props: any;
        handleInput: (e: any) => void;
        toggleThumb: (isActive: any) => void;
    };
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        inputValue: any;
        minValue: any;
        maxValue: any;
        uid: any;
        wrapperClassName: ComputedRef<any[]>;
        inputClassName: ComputedRef<any[]>;
        labelClassName: ComputedRef<any[]>;
        thumbClassName: ComputedRef<any[]>;
        thumbLeftPosition: Ref<number>;
        props: any;
        handleInput: (e: any) => void;
        toggleThumb: (isActive: any) => void;
    };
}
export default _default;
