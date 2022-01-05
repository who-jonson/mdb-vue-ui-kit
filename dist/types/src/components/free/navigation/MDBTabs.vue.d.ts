import type { Ref } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace modelValue {
            const type_1: StringConstructor;
            export { type_1 as type };
            export const required: boolean;
        }
        namespace vertical {
            const type_2: (StringConstructor | BooleanConstructor)[];
            export { type_2 as type };
            const _default_1: boolean;
            export { _default_1 as default };
        }
    }
    const emits: string[];
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        isVertical: Ref<boolean>;
        props: any;
    };
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        isVertical: Ref<boolean>;
        props: any;
    };
}
export default _default;
