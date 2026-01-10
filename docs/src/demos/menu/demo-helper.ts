import { AmuMenu, AmuMenuItem, AmuSubMenu, AmuMenuGroup } from 'amu-ui/menu'
// Fix for TS unable to infer multiple exports from a SFC file if not re-exported properly locally, 
// using generic imports for demo to work

export const DefaultMenu = AmuMenu
export const Item = AmuMenuItem
export const Sub = AmuSubMenu
export const Group = AmuMenuGroup
