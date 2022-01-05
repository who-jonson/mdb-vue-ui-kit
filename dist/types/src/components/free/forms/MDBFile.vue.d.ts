import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        const id: StringConstructor;
        const inputClass: StringConstructor;
        const invalidFeedback: StringConstructor;
        const isInvalid: BooleanConstructor;
        const isValid: BooleanConstructor;
        const isValidated: BooleanConstructor;
        const label: StringConstructor;
        const labelClass: StringConstructor;
        namespace modelValue {
            export const type: (ArrayConstructor | {
                new (): FileList;
                prototype: FileList;
            })[];
            function _default(): never[];
            export { _default as default };
        }
        const size: StringConstructor;
        const tooltipFeedback: BooleanConstructor;
        const validFeedback: StringConstructor;
        const validateOnChange: BooleanConstructor;
    }
    const emits: string[];
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        uid: any;
        inputClassName: ComputedRef<any[]>;
        labelClassName: ComputedRef<any[]>;
        validFeedbackClassName: ComputedRef<"valid-tooltip" | "valid-feedback">;
        invalidFeedbackClassName: ComputedRef<"invalid-tooltip" | "invalid-feedback">;
        handleChange: (event: any) => void;
    };
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        uid: any;
        inputClassName: ComputedRef<any[]>;
        labelClassName: ComputedRef<any[]>;
        validFeedbackClassName: ComputedRef<"valid-tooltip" | "valid-feedback">;
        invalidFeedbackClassName: ComputedRef<"invalid-tooltip" | "invalid-feedback">;
        handleChange: (event: any) => void;
    };
}
export default _default;
