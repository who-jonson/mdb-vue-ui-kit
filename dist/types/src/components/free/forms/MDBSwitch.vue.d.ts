import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    const inheritAttrs: boolean;
    namespace props {
        const id: StringConstructor;
        const inputClass: StringConstructor;
        const label: StringConstructor;
        const labelClass: StringConstructor;
        namespace modelValue {
            export const type: BooleanConstructor;
            const _default: boolean;
            export { _default as default };
        }
        namespace tag {
            const type_1: StringConstructor;
            export { type_1 as type };
            const _default_1: string;
            export { _default_1 as default };
        }
        const wrapperClass: StringConstructor;
    }
    const emits: string[];
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        inputValue: any;
        uid: any;
        wrapperClassName: ComputedRef<any[]>;
        inputClassName: ComputedRef<any[]>;
        labelClassName: ComputedRef<any[]>;
        handleChange: () => void;
    };
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        inputValue: any;
        uid: any;
        wrapperClassName: ComputedRef<any[]>;
        inputClassName: ComputedRef<any[]>;
        labelClassName: ComputedRef<any[]>;
        handleChange: () => void;
    };
}
export default _default;
