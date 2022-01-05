import type { ComputedRef, Ref } from 'vue';
declare namespace _default {
    const name: string;
    namespace components {
        export { MDBBtn };
    }
    namespace directives {
        export { mdbClickOutside };
    }
    const props: {
        tag: {
            type: StringConstructor;
            default: string;
        };
        href: (StringConstructor | null)[];
        split: {
            type: BooleanConstructor;
            default: boolean;
        };
        color: StringConstructor;
        size: StringConstructor;
        outline: StringConstructor;
        rounded: BooleanConstructor;
        floating: BooleanConstructor;
        toggler: BooleanConstructor;
        toggle: BooleanConstructor;
        role: {
            type: StringConstructor;
            default: string;
        };
        type: {
            type: StringConstructor;
            default: string;
        };
        block: {
            type: BooleanConstructor;
            default: boolean;
        };
        ripple: {
            type: (BooleanConstructor | ObjectConstructor)[];
            default: (props: any) => true | {
                color: string;
            };
        };
        picker: BooleanConstructor;
    };
    const emits: string[];
    function setup(props: any): {
        className: ComputedRef<any[]>;
        expanded: Ref<boolean>;
        toggle: () => void;
        handleClickOutside: (e: any) => void;
        props: any;
    };
    function setup(props: any): {
        className: ComputedRef<any[]>;
        expanded: Ref<boolean>;
        toggle: () => void;
        handleClickOutside: (e: any) => void;
        props: any;
    };
}
export default _default;
import MDBBtn from "./MDBBtn.vue";
import mdbClickOutside from "../../../directives/free/mdbClickOutside";
