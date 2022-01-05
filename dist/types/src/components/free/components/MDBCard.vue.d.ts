import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace border {
            const type_1: StringConstructor;
            export { type_1 as type };
        }
        namespace bg {
            const type_2: StringConstructor;
            export { type_2 as type };
        }
        namespace text {
            const type_3: (StringConstructor | ArrayConstructor)[];
            export { type_3 as type };
        }
        namespace shadow {
            const type_4: StringConstructor;
            export { type_4 as type };
        }
    }
    function setup(props: any): {
        className: ComputedRef<any[]>;
        props: any;
    };
    function setup(props: any): {
        className: ComputedRef<any[]>;
        props: any;
    };
}
export default _default;
