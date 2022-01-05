import type { ComputedRef, Ref } from 'vue';
declare namespace _default {
    const name: string;
    namespace components {
        export { MDBIcon };
    }
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace target {
            const type_1: StringConstructor;
            export { type_1 as type };
            const _default_1: string;
            export { _default_1 as default };
        }
        namespace togglerClass {
            const type_2: StringConstructor;
            export { type_2 as type };
        }
        namespace togglerIcon {
            const type_3: StringConstructor;
            export { type_3 as type };
            const _default_2: string;
            export { _default_2 as default };
        }
        namespace togglerSize {
            const type_4: StringConstructor;
            export { type_4 as type };
            const _default_3: string;
            export { _default_3 as default };
        }
        namespace iconStyle {
            const type_5: StringConstructor;
            export { type_5 as type };
            const _default_4: string;
            export { _default_4 as default };
        }
    }
    function setup(props: any): {
        navTogglerClass: ComputedRef<any[]>;
        handleClick: () => void;
        isExpanded: Ref<boolean>;
        props: any;
    };
    function setup(props: any): {
        navTogglerClass: ComputedRef<any[]>;
        handleClick: () => void;
        isExpanded: Ref<boolean>;
        props: any;
    };
}
export default _default;
import { MDBIcon } from "../../../index";
