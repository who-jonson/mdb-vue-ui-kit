import type { Ref, ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    const inheritAttrs: boolean;
    namespace props {
        const id: StringConstructor;
        namespace rows {
            export const type: (StringConstructor | NumberConstructor)[];
            const _default: number;
            export { _default as default };
        }
        const label: StringConstructor;
        const modelValue: (StringConstructor | NumberConstructor)[];
        const size: StringConstructor;
        namespace formOutline {
            const type_1: BooleanConstructor;
            export { type_1 as type };
            const _default_1: boolean;
            export { _default_1 as default };
        }
        const wrapperClass: StringConstructor;
        namespace inputGroup {
            const type_2: (StringConstructor | BooleanConstructor)[];
            export { type_2 as type };
            const _default_2: boolean;
            export { _default_2 as default };
        }
        namespace wrap {
            const type_3: BooleanConstructor;
            export { type_3 as type };
            const _default_3: boolean;
            export { _default_3 as default };
        }
        const formText: StringConstructor;
        const white: BooleanConstructor;
        const validationEvent: StringConstructor;
        const isValidated: BooleanConstructor;
        const isValid: BooleanConstructor;
        const validFeedback: StringConstructor;
        const invalidFeedback: StringConstructor;
        namespace tooltipFeedback {
            const type_4: BooleanConstructor;
            export { type_4 as type };
            const _default_4: boolean;
            export { _default_4 as default };
        }
        namespace tag {
            const type_5: StringConstructor;
            export { type_5 as type };
            const _default_5: string;
            export { _default_5 as default };
        }
        const helper: StringConstructor;
        const counter: BooleanConstructor;
        namespace maxLength {
            const type_6: NumberConstructor;
            export { type_6 as type };
            const _default_6: number;
            export { _default_6 as default };
        }
    }
    const emits: string[];
    function setup(props: any, { attrs, emit }: {
        attrs: any;
        emit: any;
    }): {
        textareaRef: Ref<string>;
        uid: any;
        textareaValue: any;
        labelRef: Ref<null>;
        handleInput: (e: any) => void;
        wrapperClassName: ComputedRef<any[]>;
        textareaClassName: ComputedRef<any[]>;
        validFeedbackClassName: ComputedRef<"valid-tooltip" | "valid-feedback">;
        invalidFeedbackClassName: ComputedRef<"invalid-tooltip" | "invalid-feedback">;
        validationStyle: ComputedRef<"" | {
            marginBottom: string;
        }>;
        customInvalidFeedback: ComputedRef<any>;
        notchLeadingWidth: Ref<number>;
        notchMiddleWidth: Ref<number>;
        props: any;
        currentLength: Ref<number>;
    };
    function setup(props: any, { attrs, emit }: {
        attrs: any;
        emit: any;
    }): {
        textareaRef: Ref<string>;
        uid: any;
        textareaValue: any;
        labelRef: Ref<null>;
        handleInput: (e: any) => void;
        wrapperClassName: ComputedRef<any[]>;
        textareaClassName: ComputedRef<any[]>;
        validFeedbackClassName: ComputedRef<"valid-tooltip" | "valid-feedback">;
        invalidFeedbackClassName: ComputedRef<"invalid-tooltip" | "invalid-feedback">;
        validationStyle: ComputedRef<"" | {
            marginBottom: string;
        }>;
        customInvalidFeedback: ComputedRef<any>;
        notchLeadingWidth: Ref<number>;
        notchMiddleWidth: Ref<number>;
        props: any;
        currentLength: Ref<number>;
    };
}
export default _default;
