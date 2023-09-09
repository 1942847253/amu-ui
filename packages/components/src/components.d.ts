import * as components from "../index";
declare module "vue" {
    export interface GlobalComponents {
        AButton: typeof components.AButton;
        AIcon: typeof components.AIcon;
        ACollapse: typeof components.ACollapse;
        ACollapeItem: typeof components.ACollapseItem;
        ATabs: typeof components.ATabs;
        ATabsPanel: typeof components.ATabsPanel;
        ARate: typeof components.ARate;
        ADatePicker: typeof components.ADatePicker;
        AInput: typeof components.AInput;
        AForm: typeof components.AForm;
        AFormItem: typeof components.AFormItem;
        ASelect: typeof components.ASelect;
        AMenu: typeof components.AMenu;
        AMenuItem: typeof components.AMenuItem;
        ASubMenu: typeof components.ASubMenu;
        ADrawer: typeof components.ADrawer;
        ACheckbox: typeof components.ACheckbox;
        ACheckboxGroup: typeof components.ACheckboxGroup;
        ASwitch: typeof components.ASwitch;
        ATag: typeof components.ATag;
        ALoading: typeof components.ALoading;
        AInputNumber: typeof components.AInputNumber;
        ATree: typeof components.ATree;
        ARadio: typeof components.ARadio;
        ARadioGroup: typeof components.ARadioGroup;
        ATable: typeof components.ATable;
        ARotation: typeof components.ARotation;
        ARotationItem: typeof components.ARotationItem;
        APagination: typeof components.APagination;
        ATooltip: typeof components.ATooltip;
        ABreadcrumb: typeof components.ABreadcrumb;
        ABreadcrumbItem: typeof components.ABreadcrumbItem;
        ASlider: typeof components.ASlider;
        AProgress: typeof components.AProgress;
        APopover: typeof components.APopover;
    }
}
