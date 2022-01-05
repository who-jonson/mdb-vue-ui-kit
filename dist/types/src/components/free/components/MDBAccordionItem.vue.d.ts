import type { Ref, ComputedRef } from 'vue';
declare namespace _default {
    const name: string;
    namespace components {
        export { MDBCollapse };
    }
    namespace props {
        namespace tag {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
        namespace collapseId {
            const type_1: StringConstructor;
            export { type_1 as type };
            export const required: boolean;
        }
        const headerTitle: StringConstructor;
        const headerClasses: StringConstructor;
        const bodyClasses: StringConstructor;
        const itemClasses: StringConstructor;
    }
    function setup(props: any): {
        itemRef: Ref<null>;
        itemClassName: ComputedRef<any[]>;
        headerClassName: ComputedRef<any[]>;
        bodyClassName: ComputedRef<any[]>;
        buttonClassName: ComputedRef<(string | false)[]>;
        toggleAccordion: () => void;
        isActive: Ref<boolean>;
    };
    function setup(props: any): {
        itemRef: Ref<null>;
        itemClassName: ComputedRef<any[]>;
        headerClassName: ComputedRef<any[]>;
        bodyClassName: ComputedRef<any[]>;
        buttonClassName: ComputedRef<(string | false)[]>;
        toggleAccordion: () => void;
        isActive: Ref<boolean>;
    };
}
export default _default;
import MDBCollapse from "./MDBCollapse.vue";
