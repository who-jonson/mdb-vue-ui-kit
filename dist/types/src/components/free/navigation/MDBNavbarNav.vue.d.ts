import type { Ref, ComputedRef } from 'vue';
declare const _default: {
    name: string;
    components: {
        MDBCollapse: {
            name: string;
            props: {
                tag: {
                    type: StringConstructor;
                    default: string;
                };
                modelValue: BooleanConstructor;
                id: StringConstructor;
                collapseClass: StringConstructor;
                duration: {
                    type: NumberConstructor;
                    default: number;
                };
                sidenav: {
                    type: BooleanConstructor;
                    default: boolean;
                };
            };
            emits: string[];
            setup(props: any, { emit }: {
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
        };
    };
    props: {
        tag: {
            type: StringConstructor;
            default: string;
        };
        right: {
            type: BooleanConstructor;
            default: boolean;
        };
        center: {
            type: BooleanConstructor;
            default: boolean;
        };
        vertical: {
            type: BooleanConstructor;
            default: boolean;
        };
        justifyAround: {
            type: BooleanConstructor;
            default: boolean;
        };
        class: {
            type: StringConstructor;
        };
        nav: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    setup(props: any): {
        props: any;
        className: ComputedRef<any[]>;
    };
};
export default _default;
