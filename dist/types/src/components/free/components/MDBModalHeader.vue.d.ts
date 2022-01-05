import type { ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace components {
        export { MDBBtnClose };
    }
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace close {
            const type_1: BooleanConstructor;
            export { type_1 as type };
            const _default_1: boolean;
            export { _default_1 as default };
        }
        namespace closeWhite {
            const type_2: BooleanConstructor;
            export { type_2 as type };
            const _default_2: boolean;
            export { _default_2 as default };
        }
        const color: StringConstructor;
    }
    function setup(props: any): {
        className: ComputedRef<any[]>;
        closeModal: boolean;
        props: any;
    };
    function setup(props: any): {
        className: ComputedRef<any[]>;
        closeModal: boolean;
        props: any;
    };
}
export default _default;
import MDBBtnClose from "./MDBBtnClose.vue";
