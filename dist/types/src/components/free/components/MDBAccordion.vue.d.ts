import type { Ref, ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        const modelValue: StringConstructor;
        const stayOpen: BooleanConstructor;
        const flush: BooleanConstructor;
        const classes: StringConstructor;
    }
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        accordionRef: Ref<null>;
        setActiveItem: (item: any) => void;
        className: ComputedRef<any[]>;
    };
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        accordionRef: Ref<null>;
        setActiveItem: (item: any) => void;
        className: ComputedRef<any[]>;
    };
}
export default _default;
