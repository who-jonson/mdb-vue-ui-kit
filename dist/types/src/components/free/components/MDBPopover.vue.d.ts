import type { ComputedRef, Ref } from 'vue';
declare namespace _default {
    const name: string;
    namespace directives {
        export { mdbClickOutside };
    }
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        const modelValue: BooleanConstructor;
        const reference: StringConstructor;
        const popover: StringConstructor;
        namespace options {
            const type_1: (ObjectConstructor | FunctionConstructor)[];
            export { type_1 as type };
            function _default(): {};
            function _default(): {};
            export { _default as default };
        }
        namespace boundary {
            const type_2: StringConstructor;
            export { type_2 as type };
            const _default_1: string;
            export { _default_1 as default };
        }
        namespace fallbackPlacements {
            const type_3: ArrayConstructor;
            export { type_3 as type };
            function _default_2(): string[];
            export { _default_2 as default };
        }
        namespace offset {
            const type_4: StringConstructor;
            export { type_4 as type };
            const _default_3: string;
            export { _default_3 as default };
        }
        namespace direction {
            const type_5: StringConstructor;
            export { type_5 as type };
            const _default_4: string;
            export { _default_4 as default };
            export function validator(value: any): boolean;
        }
        namespace maxWidth {
            const type_6: NumberConstructor;
            export { type_6 as type };
            const _default_5: number;
            export { _default_5 as default };
        }
        namespace arrow {
            const type_7: BooleanConstructor;
            export { type_7 as type };
            const _default_6: boolean;
            export { _default_6 as default };
        }
        namespace dismissible {
            const type_8: BooleanConstructor;
            export { type_8 as type };
            const _default_7: boolean;
            export { _default_7 as default };
        }
        namespace hover {
            const type_9: BooleanConstructor;
            export { type_9 as type };
            const _default_8: boolean;
            export { _default_8 as default };
        }
    }
    const emits: string[];
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        isActive: ComputedRef<boolean>;
        triggerEl: Ref<string>;
        popperEl: Ref<string>;
        widthStyle: ComputedRef<string>;
        handleClickOutside: () => void;
        props: any;
    };
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        isActive: ComputedRef<boolean>;
        triggerEl: Ref<string>;
        popperEl: Ref<string>;
        widthStyle: ComputedRef<string>;
        handleClickOutside: () => void;
        props: any;
    };
}
export default _default;
import mdbClickOutside from "../../../directives/free/mdbClickOutside";
