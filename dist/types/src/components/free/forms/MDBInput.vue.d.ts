import type { Ref, ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace directives {
        export { mdbClickOutside };
    }
    const inheritAttrs: boolean;
    namespace props {
        const id: StringConstructor;
        const label: StringConstructor;
        const labelClass: StringConstructor;
        const modelValue: (StringConstructor | NumberConstructor | DateConstructor)[];
        const size: StringConstructor;
        namespace formOutline {
            export const type: BooleanConstructor;
            const _default: boolean;
            export { _default as default };
        }
        const wrapperClass: StringConstructor;
        namespace inputGroup {
            const type_1: (StringConstructor | BooleanConstructor)[];
            export { type_1 as type };
            const _default_1: boolean;
            export { _default_1 as default };
        }
        namespace wrap {
            const type_2: BooleanConstructor;
            export { type_2 as type };
            const _default_2: boolean;
            export { _default_2 as default };
        }
        const formText: StringConstructor;
        const white: BooleanConstructor;
        const validationEvent: StringConstructor;
        const isValidated: BooleanConstructor;
        const isValid: BooleanConstructor;
        const validFeedback: StringConstructor;
        const invalidFeedback: StringConstructor;
        namespace tooltipFeedback {
            const type_3: BooleanConstructor;
            export { type_3 as type };
            const _default_3: boolean;
            export { _default_3 as default };
        }
        namespace tag {
            const type_4: StringConstructor;
            export { type_4 as type };
            const _default_4: string;
            export { _default_4 as default };
        }
        const helper: StringConstructor;
        const counter: BooleanConstructor;
        namespace maxlength {
            const type_5: NumberConstructor;
            export { type_5 as type };
            const _default_5: number;
            export { _default_5 as default };
        }
    }
    const emits: string[];
    function setup(props: any, { attrs, emit }: {
        attrs: any;
        emit: any;
    }): {
        inputRef: Ref<string>;
        uid: any;
        inputValue: any;
        labelRef: Ref<null>;
        handleInput: (e: any) => void;
        wrapperClassName: ComputedRef<any[]>;
        inputClassName: ComputedRef<any[]>;
        labelClassName: ComputedRef<any[]>;
        validFeedbackClassName: ComputedRef<"valid-tooltip" | "valid-feedback">;
        invalidFeedbackClassName: ComputedRef<"invalid-tooltip" | "invalid-feedback">;
        validationStyle: ComputedRef<"" | {
            marginBottom: string;
        }>;
        customInvalidFeedback: ComputedRef<any>;
        notchLeadingWidth: Ref<number>;
        notchMiddleWidth: Ref<number>;
        clickOutside: () => void;
        props: any;
        currentLength: Ref<number>;
    };
    function setup(props: any, { attrs, emit }: {
        attrs: any;
        emit: any;
    }): {
        inputRef: Ref<string>;
        uid: any;
        inputValue: any;
        labelRef: Ref<null>;
        handleInput: (e: any) => void;
        wrapperClassName: ComputedRef<any[]>;
        inputClassName: ComputedRef<any[]>;
        labelClassName: ComputedRef<any[]>;
        validFeedbackClassName: ComputedRef<"valid-tooltip" | "valid-feedback">;
        invalidFeedbackClassName: ComputedRef<"invalid-tooltip" | "invalid-feedback">;
        validationStyle: ComputedRef<"" | {
            marginBottom: string;
        }>;
        customInvalidFeedback: ComputedRef<any>;
        notchLeadingWidth: Ref<number>;
        notchMiddleWidth: Ref<number>;
        clickOutside: () => void;
        props: any;
        currentLength: Ref<number>;
    };
}
export default _default;
import mdbClickOutside from "../../../directives/free/mdbClickOutside";
