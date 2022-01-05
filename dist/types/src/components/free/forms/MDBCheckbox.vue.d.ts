import type { Ref, ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    const inheritAttrs: boolean;
    namespace props {
        const id: StringConstructor;
        const label: StringConstructor;
        const modelValue: BooleanConstructor;
        const inline: BooleanConstructor;
        const wrapperClass: StringConstructor;
        const labelClass: StringConstructor;
        const inputClass: StringConstructor;
        const btnCheck: BooleanConstructor;
        const required: BooleanConstructor;
        const validateOnChange: BooleanConstructor;
        const isValidated: BooleanConstructor;
        const isValid: BooleanConstructor;
        const validFeedback: StringConstructor;
        const invalidFeedback: StringConstructor;
        namespace tooltipFeedback {
            export const type: BooleanConstructor;
            const _default: boolean;
            export { _default as default };
        }
        namespace wrap {
            const type_1: BooleanConstructor;
            export { type_1 as type };
            const _default_1: boolean;
            export { _default_1 as default };
        }
        namespace formCheck {
            const type_2: BooleanConstructor;
            export { type_2 as type };
            const _default_2: boolean;
            export { _default_2 as default };
        }
        namespace tag {
            const type_3: StringConstructor;
            export { type_3 as type };
            const _default_3: string;
            export { _default_3 as default };
        }
    }
    const emits: string[];
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        inputRef: Ref<string>;
        wrapperClassName: ComputedRef<any[]>;
        inputClassName: ComputedRef<any[]>;
        labelClassName: ComputedRef<any[]>;
        validFeedbackClassName: ComputedRef<"valid-tooltip" | "valid-feedback">;
        invalidFeedbackClassName: ComputedRef<"invalid-tooltip" | "invalid-feedback">;
        inputValue: any;
        handleChange: () => void;
        uid: any;
        props: any;
    };
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        inputRef: Ref<string>;
        wrapperClassName: ComputedRef<any[]>;
        inputClassName: ComputedRef<any[]>;
        labelClassName: ComputedRef<any[]>;
        validFeedbackClassName: ComputedRef<"valid-tooltip" | "valid-feedback">;
        invalidFeedbackClassName: ComputedRef<"invalid-tooltip" | "invalid-feedback">;
        inputValue: any;
        handleChange: () => void;
        uid: any;
        props: any;
    };
}
export default _default;
