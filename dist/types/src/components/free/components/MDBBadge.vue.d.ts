import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        const color: StringConstructor;
        const pill: BooleanConstructor;
        const dot: BooleanConstructor;
        const notification: BooleanConstructor;
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
    }
    function setup(props: any, { attrs }: {
        attrs: any;
    }): {
        className: ComputedRef<any[]>;
        attrs: any;
        props: any;
    };
    function setup(props: any, { attrs }: {
        attrs: any;
    }): {
        className: ComputedRef<any[]>;
        attrs: any;
        props: any;
    };
}
export default _default;
