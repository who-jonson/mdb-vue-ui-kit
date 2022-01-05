import type { ComputedRef, Ref } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace boundary {
            const type_1: StringConstructor;
            export { type_1 as type };
            const _default_1: string;
            export { _default_1 as default };
        }
        namespace btnGroup {
            const type_2: BooleanConstructor;
            export { type_2 as type };
            const _default_2: boolean;
            export { _default_2 as default };
        }
        namespace dropup {
            const type_3: BooleanConstructor;
            export { type_3 as type };
            const _default_3: boolean;
            export { _default_3 as default };
        }
        namespace dropend {
            const type_4: BooleanConstructor;
            export { type_4 as type };
            const _default_4: boolean;
            export { _default_4 as default };
        }
        namespace dropstart {
            const type_5: BooleanConstructor;
            export { type_5 as type };
            const _default_5: boolean;
            export { _default_5 as default };
        }
        namespace align {
            const type_6: (StringConstructor | ArrayConstructor)[];
            export { type_6 as type };
            const _default_6: string;
            export { _default_6 as default };
        }
        namespace offset {
            const type_7: (StringConstructor | ArrayConstructor | FunctionConstructor)[];
            export { type_7 as type };
            function _default_7(): number[];
            export { _default_7 as default };
        }
        const popperConfig: (ObjectConstructor | FunctionConstructor | null)[];
        const target: StringConstructor;
        const modelValue: BooleanConstructor;
    }
    const emits: string[];
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        className: ComputedRef<any[]>;
        root: Ref<string>;
        props: any;
    };
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        className: ComputedRef<any[]>;
        root: Ref<string>;
        props: any;
    };
}
export default _default;
