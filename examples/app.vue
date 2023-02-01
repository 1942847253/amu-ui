<template>
  <div>
    <YTabs default-active-key="21" position="left" @change="onTabsChange">
      <YTabsPanel key="1" title="Button 按钮">
        <YButton @click="value1 = 1" type="primary">Primary</YButton>
        <YButton type="danger" @click="showError">Danger</YButton>
        <YButton type="success" @click="showSuccess">Success</YButton>
        <YButton type="warning" @click="showWarning">Warning</YButton>
        <YButton type="info" @click="showMessage">Info </YButton>
        <YButton size="small">编辑</YButton>
        <YButton type="danger" size="small">删除</YButton>
      </YTabsPanel>
      <YTabsPanel key="2" title="Checkbox 复选框">
        <YCheckboxGroup
          v-model="checkedList"
          :options="options"
        ></YCheckboxGroup>
      </YTabsPanel>
      <YTabsPanel key="3" title="Switch 开关">
        <YSwitch
          size="large"
          v-model="value"
          open-title="是"
          off-title="否"
          :disabled="true"
        ></YSwitch>
        <YSwitch v-model="value" open-title="开" off-title="关"></YSwitch>
        <YSwitch
          size="small"
          v-model="value"
          open-title="上"
          off-title="下"
        ></YSwitch>
      </YTabsPanel>
      <YTabsPanel key="4" title="Selector 选择器">
        <YSelector
          v-model="value1"
          :options="options1.slice(0, 6)"
          @setItemValue="setItemValue"
          placeholder="请选择一个小可爱"
        >
        </YSelector>
      </YTabsPanel>
      <YTabsPanel key="5" title="Radio 单选框">
        <YRadioGroup v-model="value1" :options="options"></YRadioGroup>
      </YTabsPanel>
      <YTabsPanel key="6" title="Rotation 轮播图">
        <YRotation
          :autoplay="true"
          :duration="3000"
          :initial="1"
          :hasDot="true"
          dotPositon="center"
          :hasDirector="true"
        >
          <YRotationItem v-for="(item, index) in picList" :key="index">
            <img height="500" :src="item.path" alt="" />
          </YRotationItem>
        </YRotation>
      </YTabsPanel>
      <YTabsPanel key="7" title="Table 表格">
        <YTable
          width="1000px"
          :tableData="tableData.tBody"
          :tableColumn="tableData.tHead"
          @editData="editData"
        >
          <template #table="{ tableColumn, tableData }">
            <y-tag type="success" v-if="tableColumn.key === 'age'">{{
              tableData.age + " 岁"
            }}</y-tag>
          </template>
          <template #operation="{ item, index }">
            <y-button type="info" size="small">Edit</y-button>
            <y-button
              type="danger"
              size="small"
              :disabled="false"
              @click="deleteItem(item.id)"
              >Delete</y-button
            >
          </template>
        </YTable>
      </YTabsPanel>
      <YTabsPanel key="8" title="Tag 标签">
        <YTag closeable>test</YTag>
        <YTag closeable type="success">YJJ</YTag>
        <YTag closeable type="warning">Big龙</YTag>
        <YTag closeable type="danger">嘿毛</YTag>
        <YTag closeable type="info">嫖瓜</YTag>
      </YTabsPanel>
      <YTabsPanel key="9" title="Tree 树形控件">
        <YTree
          :default-checked-keys="[90001]"
          node-key="key"
          :expand="true"
          :isSelect="isSelect"
          :data="treeData"
        >
        </YTree>
      </YTabsPanel>
      <YTabsPanel key="10" title="Collapes 折叠面板">
        {{ activatCollapes }}
        <YCollapse v-model="activatCollapes" accordion>
          <YCollapesItem title="Consistency" name="1">
            <YTag closeable>test</YTag>
            <YTag closeable type="success">YJJ</YTag>
            <YTag closeable type="warning">Big龙</YTag>
            <YTag closeable type="danger">嘿毛</YTag>
            <YTag closeable type="info">嫖瓜</YTag>
          </YCollapesItem>
          <YCollapesItem title="Feedback" name="2">
            <div>
              Operation feedback: enable the users to clearly perceive their
              operations by style updates and interactive effects;
            </div>
            <div>
              Visual feedback: reflect current state by updating or rearranging
              elements of the page.
            </div>
          </YCollapesItem>
          <YCollapesItem title="Efficiency" name="3">
            <div>
              Simplify the process: keep operating process simple and intuitive;
            </div>
            <div>
              Definite and clear: enunciate your intentions clearly so that the
              users can quickly understand and make decisions;
            </div>
            <div>
              Easy to identify: the interface should be straightforward, which
              helps the users to identify and frees them from memorizing and
              recalling.
            </div>
          </YCollapesItem>
        </YCollapse>
      </YTabsPanel>
      <YTabsPanel key="11" title="Rate 评分">
        <YRate v-model="rateValue"></YRate>
      </YTabsPanel>
      <YTabsPanel key="12" title="DatePicker 日期选择">
        <YDatePicker v-model="dateValue" />
        <YDatePicker v-model="dateValue1" />
      </YTabsPanel>
      <YTabsPanel key="13" title="Message 消息">
        <YDatePicker v-model="dateValue" />
      </YTabsPanel>
      <YTabsPanel key="14" title="MessageBox 对话框">
        <YDatePicker v-model="dateValue" />
      </YTabsPanel>
      <YTabsPanel key="15" title="Tabs 导航栏">
        <YDatePicker v-model="dateValue" />
      </YTabsPanel>
      <YTabsPanel key="16" title="Menu 侧边栏">
        <YMenu default-active="5-1-2" dark>
          <YMenuItem index="1">
            <template #icon>◎</template>
            <span>Dashboard</span>
          </YMenuItem>
          <YMenuItem index="2">
            <template #icon>◎</template>
            <span>Revenue</span>
          </YMenuItem>
          <YMenuItem index="3">
            <template #icon> ◎ </template>
            <span>Notifications</span>
          </YMenuItem>
          <YSubMenu index="5">
            <template #icon
              ><svg
                style="height: 20px"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 1024 1024"
              >
                <path
                  d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1 0 80 0a40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0a40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0a40 40 0 1 0-80 0z"
                  fill="currentColor"
                ></path></svg
            ></template>
            <template #title>SubItem</template>
            <YSubMenu index="5-1">
              <template #icon> ◎ </template>
              <template #title>SubItem</template>
              <YMenuItem index="5-1-2">
                <template #icon> ◎ </template>
                <span>Sub-test1</span>
              </YMenuItem>
            </YSubMenu>
            <YMenuItem index="5-2">
              <template #icon> ◎ </template>
              <span>Sub-Revenue</span>
            </YMenuItem>
            <YMenuItem index="5-3">
              <template #icon> ◎ </template>
              <span>Sub-Notif</span>
            </YMenuItem>
          </YSubMenu>
          <YSubMenu index="6">
            <template #icon
              ><svg
                style="height: 20px"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 1024 1024"
              >
                <path
                  d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1 0 80 0a40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0a40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0a40 40 0 1 0-80 0z"
                  fill="currentColor"
                ></path></svg
            ></template>
            <template #title>Sub1Item</template>
            <YMenuItem index="6-1">
              <template #icon> ◎ </template>
              <span>Sub1-Wallets</span>
            </YMenuItem>
            <YMenuItem index="6-2">
              <template #icon> ◎ </template>
              <span>Sub1-Revenue</span>
            </YMenuItem>
            <YMenuItem index="6-3">
              <template #icon> ◎ </template>
              <span>Sub1-Notif</span>
            </YMenuItem>
          </YSubMenu>
          <YMenuItem index="4">
            <template #icon> ◎ </template>
            <span>Wallesfts</span>
          </YMenuItem>
          <YMenuItem index="7">
            <template #icon> ◎ </template>
            <span>Dragast</span>
          </YMenuItem>
          <YMenuItem index="8">
            <template #icon> ◎ </template>
            <span>Hallets</span>
          </YMenuItem>
        </YMenu>
      </YTabsPanel>
      <YTabsPanel key="17" title="Input 输入框">
        <YInput
          type="password"
          placeholder="请输入密码"
          v-model="dateValue"
          clearable
          showPassword
        />
      </YTabsPanel>
      <YTabsPanel key="18" title="Form 表单">
        <YForm :model="formState" :rules="rules" ref="formRef">
          <YFormItem label="姓名:" prop="name">
            <YInput placeholder="请输入姓名" v-model="formState.name" />
          </YFormItem>
          <YFormItem label="年龄:" prop="age">
            <YInput
              type="number"
              show-password
              placeholder="请输入年龄"
              v-model="formState.age"
            />
          </YFormItem>
          <YFormItem label="家庭住址:" prop="address">
            <YInput
              clearable
              placeholder="请输入家庭住址"
              v-model="formState.address"
            />
          </YFormItem>
          <YFormItem label="出生日期:" prop="birthday">
            <YDatePicker v-model="formState.birthday" />
          </YFormItem>
          <YFormItem label="学校:" prop="school">
            <YSelector
              :options="options1.slice(0, 6)"
              placeholder="请选择学校"
              v-model="formState.school"
            >
            </YSelector>
          </YFormItem>
          <YFormItem>
            <YButton @click="onSubmit" type="primary">Submit</YButton>
            <YButton @click="onReset">Reset</YButton>
          </YFormItem>
        </YForm>
      </YTabsPanel>
      <YTabsPanel key="19" title="Drawer 抽屉">
        <YButton type="primary" @click="showDrawer = true">open</YButton>
        <YDrawer
          v-model="showDrawer"
          closeOnClickModal
          size="40%"
          title="编辑Big龙"
          @opened="() => YMessage.success({ message: '打开成功' })"
          @closed="() => YMessage.message({ message: '关闭成功' })"
        >
          <template #default>
            <YTable
              :tableData="tableData.tBody"
              :tableColumn="tableData.tHead"
              @editData="editData"
            >
              <template #table="{ tableColumn, tableData }">
                <y-tag type="success" v-if="tableColumn.key === 'age'">{{
                  tableData.age + " 岁"
                }}</y-tag>
              </template>
              <template #operation="{ item, index }">
                <y-button type="info" size="small">Edit</y-button>
                <y-button
                  type="danger"
                  size="small"
                  :disabled="false"
                  @click="deleteItem(item.id)"
                  >Delete</y-button
                >
              </template>
            </YTable>
            <YTable
              :tableData="tableData.tBody"
              :tableColumn="tableData.tHead"
              @editData="editData"
            >
              <template #table="{ tableColumn, tableData }">
                <y-tag type="success" v-if="tableColumn.key === 'age'">{{
                  tableData.age + " 岁"
                }}</y-tag>
              </template>
              <template #operation="{ item, index }">
                <y-button type="info" size="small">Edit</y-button>
                <y-button
                  type="danger"
                  size="small"
                  :disabled="false"
                  @click="deleteItem(item.id)"
                  >Delete</y-button
                >
              </template>
            </YTable>
            <YForm :model="formState" :rules="rules" ref="formRef">
              <YFormItem label="姓名:" prop="name">
                <YInput placeholder="请输入姓名" v-model="formState.name" />
              </YFormItem>
              <YFormItem label="年龄:" prop="age">
                <YInput
                  type="password"
                  show-password
                  placeholder="请输入年龄"
                  v-model="formState.age"
                />
              </YFormItem>
              <YFormItem label="家庭住址:" prop="address">
                <YInput
                  clearable
                  placeholder="请输入家庭住址"
                  v-model="formState.address"
                />
              </YFormItem>
              <YFormItem label="出生日期:" prop="birthday">
                <YDatePicker v-model="formState.birthday" />
              </YFormItem>
              <YFormItem label="学校:" prop="school">
                <YSelector
                  :options="options1.slice(0, 6)"
                  placeholder="请选择学校"
                  v-model="formState.school"
                >
                </YSelector>
              </YFormItem>
            </YForm>
          </template>
          <template #footer>
            <YButton @click="onReset">取消</YButton>
            <YButton @click="onSubmit" type="primary">提交订单</YButton>
          </template>
        </YDrawer>
      </YTabsPanel>
      <YTabsPanel key="20" title="Loading 加载">
        <YButton @click="handelLoading">show loading</YButton>
        <YLoading v-model="showLoading">
          <div>123</div>
        </YLoading>
      </YTabsPanel>
      <YTabsPanel key="21" title="InputNumber 数字输入框">
        <YInputNumber v-model="numberValue" />
      </YTabsPanel>
    </YTabs>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from "vue";
import {
  YButton,
  YCheckboxGroup,
  YSwitch,
  YMessage,
  YMessageBox,
  YSelector,
  YTabs,
  YTabsPanel,
  YRadioGroup,
  YRotation,
  YRotationItem,
  YTable,
  YTag,
  YTree,
  YCollapse,
  YCollapesItem,
  YRate,
  YDatePicker,
  YMenu,
  YMenuItem,
  YSubMenu,
  YInput,
  YForm,
  YFormItem,
  YDrawer,
  YLoading,
  YInputNumber,
} from "y-ui";

const numberValue = ref(0)
const showLoading = ref(false);
const showDrawer = ref(false);
const formRef = ref();
const formState = reactive({
  name: "杨俊杰",
  age: "",
  address: "",
  school: 2,
  birthday: "",
});

const handelLoading = () => {
  showLoading.value = true;
  setTimeout(() => {
    showLoading.value = false;
  }, 4000);
};

const beforeClose = (done: () => void) => {
  YMessageBox({
    title: "提示",
    content: "确认关闭当前抽屉吗",
    showCancelBtn: true,
  }).then(() => {
    done();
  });
};

const onSubmit = () => {
  formRef.value
    .validate()
    .then((res) => {
      console.log(formState);
      YMessage.success({
        message: "提交成功",
      });
    })
    .catch((err) => {
      YMessage.error({
        message: err,
      });
      console.log(err);
    });
};

const onReset = () => {
  formRef.value.resetFields();
};
onMounted(() => {
  console.log(formRef.value);
});

const checkAddress = (rule: any, value: string, callback: any) => {
  if (value.indexOf("中国") === -1) {
    return callback(new Error("地址不在中国范围内，不正确！"));
  } else {
    callback();
  }
};
const rules = {
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  age: [
    { required: true, message: "Please input Activity age", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  address: [
    {
      required: true,
      message: "Please input Activity address",
      trigger: "blur",
    },
    { min: 4, max: 15, message: "Length should be 5 to 15", trigger: "change" },
  ],
  birthday: [{ required: true, message: "请选择出生日期", trigger: "change" }],
  school: [{ required: true, message: "请选择学校", trigger: "change" }],
};

const value = ref(false);
const value1 = ref();
const rateValue = ref(3);
const checkedList = ref([1, 2]);
const options = ref([
  {
    label: "杨俊杰",
    value: 1,
    disabled: true,
  },
  {
    label: "big龍",
    value: 2,
  },
  {
    label: "嘿毛",
    value: 3,
  },
]);
const activatCollapes = ref("2");
const dateValue = ref("2022-11-14");
const dateValue1 = ref("");
const isSelect = ref(true);
const treeData = ref([
  {
    key: 1,
    title: "一级机构部门",
    children: [
      {
        key: 90001,
        title: "测试机构111",
        children: [
          {
            key: 90019,
            title: "测试机构111-2",
          },
          {
            key: 90025,
            title: "机构机构",
            children: [
              {
                key: 90026,
                title: "机构机构-2",
              },
            ],
          },
        ],
      },
      {
        key: 90037,
        title: "另一个机构部门",
      },
    ],
  },
  {
    key: 2,
    title: "小卖部总舵",
    children: [
      {
        key: 90037,
        title: "小卖部河边分部",
      },
    ],
  },
]);

const options1 = ref([
  {
    value: 1,
    text: "杨俊杰",
  },
  {
    value: 2,
    text: "Big龙",
  },
  {
    value: 3,
    text: "嘿毛",
  },
  {
    value: 4,
    text: "嫖瓜",
  },
  {
    value: 5,
    text: "吊毛",
  },
  {
    value: 6,
    text: "吴彦祖",
  },
  {
    value: 7,
    text: "陈冠希",
  },
  {
    value: 8,
    text: "林俊杰",
  },
]);

const picList = [
  {
    id: 1,
    path: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a7f4917c0a8eb1dc952baa2f0a75e509.jpg?w=2452&h=920",
  },
  {
    id: 2,
    path: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/cc04061612b77ff4112c399ce461dc58.jpg?thumb=1&w=2452&h=920&f=webp&q=90",
  },
  {
    id: 3,
    path: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/cc7066c191db41583516f8b49c78c503.jpg?thumb=1&w=2452&h=920&f=webp&q=90",
  },
];

const tableData = ref({
  tHead: [
    {
      key: "id",
      text: "学号",
    },
    {
      key: "name",
      text: "姓名",
    },
    {
      key: "age",
      text: "年龄",
    },
    {
      key: "chinese",
      text: "语文",
    },
    {
      key: "math",
      text: "数学",
    },
    {
      key: "english",
      text: "英语",
    },
    {
      key: "operation",
      text: "操作",
    },
  ],
  tBody: [
    {
      id: 1,
      name: "Yjj",
      age: 21,
      chinese: 121,
      math: 90,
      english: 138,
    },
    {
      id: 2,
      name: "嘿毛",
      age: 20,
      chinese: 111,
      math: 32,
      english: 43,
    },
    {
      id: 3,
      name: "big龙",
      age: 19,
      chinese: 44,
      math: 21,
      english: 11,
    },
    {
      id: 4,
      name: "嫖瓜",
      age: 21,
      chinese: 80,
      math: 40,
      english: 45,
    },
  ],
}) as any;

watch(
  () => activatCollapes.value,
  (val) => {}
);

watch(
  () => value1.value,
  (val) => {
    console.log(val);
  }
);

watch(
  () => checkedList.value,
  (val) => {
    console.log(val);
  }
);

const showError = () => {
  YMessage.error({
    message:
      "this is a error message when you click the button error message when you click the button",
  });
};

const showSuccess = () => {
  YMessageBox({
    title: "测试",
    content: "点击确定按钮将会出现一个成功的message 他会返回一个成功的Promise",
    showCancelBtn: true,
  }).then(() => {
    YMessage.success({
      message: "success",
    });
  });
};

const showWarning = () => {
  YMessage.warning({
    message: "this is a warning message",
  });
};

const showMessage = () => {
  YMessage.message({
    message: "this is a info message",
  });
};

const setItemValue = (item) => {
  console.log(item);
};

const onTabsChange = (item: any) => {
  console.log(item);
};

const editData = ({ index, key, value, text }: any) => {
  tableData.value.tBody[index][key] = value;
};
const deleteItem = (id) => {
  YMessageBox({
    showCancelBtn: true,
    title: "提示",
    confirmBtnText: "确认",
    cancelBtnText: "取消",
    content: "确认删除当前学生吗？",
  }).then(() => {
    tableData.value.tBody = tableData.value.tBody.filter(
      (item) => item.id !== id
    );
  });
};
</script>
<style lang="less" scoped></style>
