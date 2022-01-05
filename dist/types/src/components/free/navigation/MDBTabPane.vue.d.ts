import type { Ref, ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace tabId {
            const type_1: StringConstructor;
            export { type_1 as type };
            export const required: boolean;
        }
    }
    function setup(props: any): {
        isActive: Ref<boolean>;
        item: Ref<string>;
        uid: ComputedRef<string>;
        labelledby: ComputedRef<string>;
        afterEnter: (el: any) => void;
        enter: (el: any) => void;
        beforeLeave: (el: any) => void;
        afterLeave: (el: any) => void;
        className: ComputedRef<(string | false)[]>;
        props: any;
    };
    function setup(props: any): {
        isActive: Ref<boolean>;
        item: Ref<string>;
        uid: ComputedRef<string>;
        labelledby: ComputedRef<string>;
        afterEnter: (el: any) => void;
        enter: (el: any) => void;
        beforeLeave: (el: any) => void;
        afterLeave: (el: any) => void;
        className: ComputedRef<(string | false)[]>;
        props: any;
    };
}
export default _default;
