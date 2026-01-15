import Basic from './demo-basic.vue?raw'
import Validate from './demo-validate.vue?raw'
import Layout from './demo-layout.vue?raw'
import Dynamic from './demo-dynamic.vue?raw'
import CustomValidation from './demo-custom-validation.vue?raw'
import Nested from './demo-nested.vue?raw'
import Size from './demo-size.vue?raw'
import Modal from './demo-modal.vue?raw'
import Grid from './demo-grid.vue?raw'

import BasicComp from './demo-basic.vue'
import ValidateComp from './demo-validate.vue'
import LayoutComp from './demo-layout.vue'
import DynamicComp from './demo-dynamic.vue'
import CustomValidationComp from './demo-custom-validation.vue'
import NestedComp from './demo-nested.vue'
import SizeComp from './demo-size.vue'
import ModalComp from './demo-modal.vue'
import GridComp from './demo-grid.vue'

export const demos = [
  {
    path: 'basic',
    title: {
      'zh-CN': '基本用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': '最基础的表单用法。',
      'en-US': 'Basic usage of form.',
    },
    component: BasicComp,
    code: Basic,
  },
  {
    path: 'layout',
    title: {
      'zh-CN': '表单布局',
      'en-US': 'Form Layout',
    },
    description: {
      'zh-CN': 'Form 组件提供了三种布局方式：horizontal、vertical 和 inline。',
      'en-US': 'Form component provides three layouts: horizontal, vertical and inline.',
    },
    component: LayoutComp,
    code: Layout,
  },
  {
    path: 'grid',
    title: {
      'zh-CN': '复杂布局',
      'en-US': 'Complex Layout',
    },
    description: {
      'zh-CN': '可以使用 Grid 或 Flex 布局来创建复杂的表单结构。',
      'en-US': 'You can use Grid or Flex layout to create complex form structures.',
    },
    component: GridComp,
    code: Grid,
  },
  {
    path: 'size',
    title: {
      'zh-CN': '表单尺寸与禁用',
      'en-US': 'Form Size & Disabled',
    },
    description: {
      'zh-CN': '可以通过 `size` 属性控制表单内组件的尺寸，通过 `disabled` 属性全局禁用表单。',
      'en-US': 'You can control the size of components in the form via the `size` prop using the `disabled` prop to globally disable the form.',
    },
    component: SizeComp,
    code: Size,
  },
  {
    path: 'validate',
    title: {
        'zh-CN': '表单校验',
        'en-US': 'Form Validation',
    },
    description: {
        'zh-CN': 'Form 组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 `Form-Item` 的 `prop` 属性设置为需校验的字段名即可。',
        'en-US': 'Form component provides form validation functionality. You just need to pass in the validation rules via the `rules` attribute and set the `prop` attribute of `Form-Item` to the field name that needs to be validated.'
    },
    component: ValidateComp,
    code: Validate,
  },
  {
    path: 'custom-validation',
    title: {
      'zh-CN': '自定义校验规则',
      'en-US': 'Custom Validation Rules',
    },
    description: {
      'zh-CN': '这个例子中展示了如何使用自定义验证规则来完成密码的二次验证，以及自定义异步校验。',
      'en-US': 'This example shows how to use custom validation rules to complete the secondary verification of the password, and custom asynchronous validation.',
    },
    component: CustomValidationComp,
    code: CustomValidation,
  },
  {
    path: 'modal',
    title: {
      'zh-CN': '弹窗表单',
      'en-US': 'Form in Modal',
    },
    description: {
      'zh-CN': '在对话框中编辑表单也是常用场景。',
      'en-US': 'Editing forms in a dialog is also a common scenario.',
    },
    component: ModalComp,
    code: Modal,
  },
  {
    path: 'dynamic',
    title: {
      'zh-CN': '动态表单项',
      'en-US': 'Dynamic Form Item',
    },
    description: {
      'zh-CN': '动态增加、减少表单项。',
      'en-US': 'Dynamically add or remove form items.',
    },
    component: DynamicComp,
    code: Dynamic,
  },
  {
    path: 'nested',
    title: {
      'zh-CN': '嵌套表单',
      'en-US': 'Nested Form',
    },
    description: {
      'zh-CN': '支持嵌套对象的数据绑定，如 `name.first`。',
      'en-US': 'Support nested object data binding, such as `name.first`.',
    },
    component: NestedComp,
    code: Nested,
  }
]
