import type { Ref, ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        const modelValue: BooleanConstructor;
        const id: StringConstructor;
        const collapseClass: StringConstructor;
        namespace duration {
            const type_1: NumberConstructor;
            export { type_1 as type };
            const _default_1: number;
            export { _default_1 as default };
        }
        namespace sidenav {
            const type_2: BooleanConstructor;
            export { type_2 as type };
            const _default_2: boolean;
            export { _default_2 as default };
        }
    }
    const emits: string[];
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        collapse: Ref<null>;
        className: ComputedRef<any[]>;
        isActive: any;
        uid: ComputedRef<any>;
        beforeEnter: (el: any) => void;
        enter: (el: any) => void;
        afterEnter: (el: any) => void;
        beforeLeave: (el: any) => void;
        leave: (el: any) => void;
        afterLeave: (el: any) => void;
        props: any;
    };
    function setup(props: any, { emit }: {
        emit: any;
    }): {
        collapse: Ref<null>;
        className: ComputedRef<any[]>;
        isActive: any;
        uid: ComputedRef<any>;
        beforeEnter: (el: any) => void;
        enter: (el: any) => void;
        afterEnter: (el: any) => void;
        beforeLeave: (el: any) => void;
        leave: (el: any) => void;
        afterLeave: (el: any) => void;
        props: any;
    };
}
export default _default;
