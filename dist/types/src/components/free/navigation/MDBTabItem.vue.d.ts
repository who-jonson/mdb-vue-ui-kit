import type { Ref, ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    const inheritAttrs: boolean;
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
        const href: StringConstructor;
    }
    function setup(props: any): {
        item: Ref<string>;
        uid: ComputedRef<string>;
        controls: ComputedRef<string>;
        className: ComputedRef<(string | false)[]>;
        handleClick: () => void;
        props: any;
    };
    function setup(props: any): {
        item: Ref<string>;
        uid: ComputedRef<string>;
        controls: ComputedRef<string>;
        className: ComputedRef<(string | false)[]>;
        handleClick: () => void;
        props: any;
    };
}
export default _default;
