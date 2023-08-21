<template>
  <ATabs default-active-key="25" position="left">
    <ATabsPanel key="1" title="Button 按钮">
      <AButton type="primary">primary</AButton>
    </ATabsPanel>
    <ATabsPanel key="2" title="Collapse 折叠面板">
      <ACollapse v-model="activatCollapes">
        <ACollapseItem title="Consistency" name="1">
          <AButton closeable>test</AButton>
          <AButton closeable type="success">YJJ</AButton>
          <AButton closeable type="warning">Big龙</AButton>
          <AButton closeable type="danger">嘿毛</AButton>
          <AButton closeable type="info">嫖瓜</AButton>
        </ACollapseItem>
        <ACollapseItem title="Feedback" name="2">
          <div>
            Operation feedback: enable the users to clearly perceive their
            operations by style updates and interactive effects;
          </div>
          <div>
            Visual feedback: reflect current state by updating or rearranging
            elements of the page.
          </div>
        </ACollapseItem>
        <ACollapseItem title="Efficiency" name="3">
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
        </ACollapseItem>
      </ACollapse>
    </ATabsPanel>
    <ATabsPanel key="3" title="Rate 评分">
      <ARate v-model="rateValue"></ARate>
    </ATabsPanel>
    <ATabsPanel key="4" title="DatePicker 日期选择">
      <ADatePicker v-model="dateValue" />
      <ADatePicker v-model="dateValue1" />
    </ATabsPanel>
    <ATabsPanel key="5" title="Input 输入框">
      <AInput type="password" placeholder="请输入密码" v-model="dateValue" clearable showPassword />
    </ATabsPanel>
    <ATabsPanel key="6" title="Form 表单">
      <AForm :model="formState" :rules="rules" ref="formRef">
        <AFormItem label="姓名:" prop="name">
          <AInput placeholder="请输入姓名" v-model="formState.name" />
        </AFormItem>
        <AFormItem label="年龄:" prop="age">
          <AInput type="number" show-password placeholder="请输入年龄" v-model="formState.age" />
        </AFormItem>
        <AFormItem label="家庭住址:" prop="address">
          <AInput clearable placeholder="请输入家庭住址" v-model="formState.address" />
        </AFormItem>
        <AFormItem label="出生日期:" prop="birthday">
          <ADatePicker v-model="formState.birthday" />
        </AFormItem>
        <AFormItem label="学校:" prop="school">
          <ASelect :options="options1.slice(0, 6)" placeholder="请选择学校" v-model="formState.school">
          </ASelect>
        </AFormItem>
        <AFormItem>
          <AButton @click="onSubmit" type="primary">Submit</AButton>
          <AButton @click="onReset">Reset</AButton>
        </AFormItem>
      </AForm>
    </ATabsPanel>
    <ATabsPanel key="7" title="Menu 侧边栏">
      <AMenu default-active="5-1-2" dark>
        <AMenuItem index="1">
          <template #icon>◎</template>
          <span>Dashboard</span>
        </AMenuItem>
        <AMenuItem index="2">
          <template #icon>◎</template>
          <span>Revenue</span>
        </AMenuItem>
        <AMenuItem index="3">
          <template #icon> ◎ </template>
          <span>Notifications</span>
        </AMenuItem>
        <ASubMenu index="5">
          <template #icon><svg style="height: 20px" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">
              <path
                d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1 0 80 0a40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0a40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0a40 40 0 1 0-80 0z"
                fill="currentColor"></path>
            </svg></template>
          <template #title>SubItem</template>
          <ASubMenu index="5-1">
            <template #icon> ◎ </template>
            <template #title>SubItem</template>
            <AMenuItem index="5-1-2">
              <template #icon> ◎ </template>
              <span>Sub-test1</span>
            </AMenuItem>
          </ASubMenu>
          <AMenuItem index="5-2">
            <template #icon> ◎ </template>
            <span>Sub-Revenue</span>
          </AMenuItem>
          <AMenuItem index="5-3">
            <template #icon> ◎ </template>
            <span>Sub-Notif</span>
          </AMenuItem>
        </ASubMenu>
        <ASubMenu index="6">
          <template #icon>
            <svg style="height: 20px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 1024 1024">
              <path
                d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1 0 80 0a40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0a40 40 0 1 0-80 0zm0 144a40 40 0 1 0 80 0a40 40 0 1 0-80 0z"
                fill="currentColor" />
            </svg>
          </template>
          <template #title>Sub1Item</template>
          <AMenuItem index="6-1">
            <template #icon> ◎ </template>
            <span>Sub1-Wallets</span>
          </AMenuItem>
          <AMenuItem index="6-2">
            <template #icon> ◎ </template>
            <span>Sub1-Revenue</span>
          </AMenuItem>
          <AMenuItem index="6-3">
            <template #icon> ◎ </template>
            <span>Sub1-Notif</span>
          </AMenuItem>
        </ASubMenu>
        <AMenuItem index="4">
          <template #icon> ◎ </template>
          <span>Wallesfts</span>
        </AMenuItem>
        <AMenuItem index="7">
          <template #icon> ◎ </template>
          <span>Dragast</span>
        </AMenuItem>
        <AMenuItem index="8">
          <template #icon> ◎ </template>
          <span>Hallets</span>
        </AMenuItem>
      </AMenu>
    </ATabsPanel>
    <ATabsPanel key="8" title="Drawer 抽屉">
      <AButton type="primary" @click="showDrawer = true">open</AButton>
      <ADrawer v-model="showDrawer" closeOnClickModal size="40%" title="编辑Big龙" :beforeClose="beforeClose"
        @opened="() => AMessage.success({ message: '打开成功' })" @closed="() => AMessage.message({ message: '关闭成功' })">
        <template #default>
          <!-- <YTable
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
            </YTable> -->
          <AForm :model="formState" :rules="rules" ref="formRef">
            <AFormItem label="姓名:" prop="name">
              <AInput placeholder="请输入姓名" v-model="formState.name" />
            </AFormItem>
            <AFormItem label="年龄:" prop="age">
              <AInput type="password" show-password placeholder="请输入年龄" v-model="formState.age" />
            </AFormItem>
            <AFormItem label="家庭住址:" prop="address">
              <AInput clearable placeholder="请输入家庭住址" v-model="formState.address" />
            </AFormItem>
            <AFormItem label="出生日期:" prop="birthday">
              <ADatePicker v-model="formState.birthday" />
            </AFormItem>
            <AFormItem label="学校:" prop="school">
              <ASelect :options="options1.slice(0, 6)" placeholder="请选择学校" v-model="formState.school">
              </ASelect>
            </AFormItem>
          </AForm>
        </template>
        <template #footer>
          <AButton @click="onReset">取消</AButton>
          <AButton @click="onSubmit" type="primary">提交订单</AButton>
        </template>
      </ADrawer>
    </ATabsPanel>
    <ATabsPanel key="9" title="Checkbox 复选框">
      <ACheckboxGroup v-model="checkedList" :options="options"></ACheckboxGroup>
    </ATabsPanel>
    <ATabsPanel key="10" title="Switch 开关">
      <ASwitch size="large" v-model="value" open-title="是" off-title="否" :disabled="true"></ASwitch>
      <ASwitch v-model="value" open-title="开" off-title="关"></ASwitch>
      <ASwitch size="small" v-model="value" open-title="上" off-title="下"></ASwitch>
    </ATabsPanel>
    <ATabsPanel key="11" title="Loading 加载">
      <AButton @click="handelLoading">show loading</AButton>
      <ALoading v-model="showLoading" global title="please loading..." />

      <ALoading v-model="showLoading" title="please loading...">
        <ATable width="1000px" :tableData="tableData.tBody" :tableColumn="tableData.tHead" @editData="editData">
          <template #table="{ tableColumn, tableData }">
            <a-tag type="success" v-if="tableColumn.key === 'age'">{{
              tableData.age + " 岁"
            }}</a-tag>
          </template>
          <template #operation="{ item, index }">
            <a-button type="info" size="small">Edit</a-button>
            <a-button type="danger" size="small" :disabled="false" @click="deleteItem(item.id)">Delete</a-button>
          </template>
        </ATable>
      </ALoading>
    </ATabsPanel>
    <ATabsPanel key="12" title="Tag 标签">
      <ATag closeable>test</ATag>
      <ATag closeable type="success">YJJ</ATag>
      <ATag closeable type="warning">Big龙</ATag>
      <ATag closeable type="danger">嘿毛</ATag>
      <ATag closeable type="info">嫖瓜</ATag>
    </ATabsPanel>
    <ATabsPanel key="13" title="InputNumber 数字输入框">
      <AInputNumber placeholder="请输入" :min="-200" :max="200" :step="20" v-model="numberValue" />
      {{ numberValue }}
    </ATabsPanel>
    <ATabsPanel key="14" title="Tree 树形控件">
      <ATree @node-click="treeNodeClick" @checked="treeChecked" :default-checked-keys="[90026, 90037]" node-key="key" :expand="true" :isSelect="isSelect" :data="treeData">
      </ATree>
    </ATabsPanel>
    <ATabsPanel key="15" title="Message 消息">
      <ADatePicker v-model="dateValue" />
    </ATabsPanel>
    <ATabsPanel key="16" title="MessageBox 对话框">
      <ADatePicker v-model="dateValue" />
    </ATabsPanel>
    <ATabsPanel key="17" title="Tabs 导航栏">
      <ADatePicker v-model="dateValue" />
    </ATabsPanel>
    <ATabsPanel key="18" title="Radio 单选框">
      <ARadioGroup v-model="value1" :options="optionsRadio"></ARadioGroup>
    </ATabsPanel>
    <ATabsPanel key="19" title="Rotation 轮播图">
      <ARotation :autoplay="true" :duration="3000" :initial="1" :hasDot="true" dotPositon="center" :hasDirector="true">
        <ARotationItem v-for="(item, index) in picList" :key="index">
          <img height="500" :src="item.path" alt="" />
        </ARotationItem>
      </ARotation>
    </ATabsPanel>
    <ATabsPanel key="20" title="Table 表格">
      <ATable width="1000px" :tableData="tableData.tBody" :tableColumn="tableData.tHead" @editData="editData">
        <template #table="{ tableColumn, tableData }">
          <a-tag type="success" v-if="tableColumn.key === 'age'">{{
            tableData.age + " 岁"
          }}</a-tag>
        </template>
        <template #operation="{ item, index }">
          <a-button type="info" size="small">Edit</a-button>
          <a-button type="danger" size="small" :disabled="false" @click="deleteItem(item.id)">Delete</a-button>
        </template>
      </ATable>
    </ATabsPanel>
    <ATabsPanel key="21" title="Select 选择器">
      <ASelect v-model="value1" :options="options1.slice(0, 2)" @setItemValue="setItemValue" placeholder="请选择一个小可爱">
      </ASelect>
    </ATabsPanel>
    <ATabsPanel key="22" title="Pagination 分页">
      <APagination background v-tooltip.bottom="'显示在下部'" :current-page="currentPage" total="50" @page-change="pageChange"
        @size-change="sizeChange">
      </APagination>
      <a-tag v-tooltip="'显示在下部'">123</a-tag>
      <a-button v-tooltip.top="{
        text: '显示在下方',
        bgColor: 'orange',
      }" type="primary">
        <template #icon>
          <a-icon name="upload" />
        </template>
        success
      </a-button>
    </ATabsPanel>
    <ATabsPanel key="23" title="Breadcrumb 面包屑">
      <ABreadcrumb flag="/" @pathClick="pathClick">
        <ABreadcrumbItem path="/Application">
          <a-icon name="home"></a-icon>
          home
        </ABreadcrumbItem>
        <ABreadcrumbItem path="/Application/list">
          <a-icon name="chart-bar"></a-icon> 
          Application List
        </ABreadcrumbItem>
        <ABreadcrumbItem path="/Application/list/item">
          Application
        </ABreadcrumbItem>
      </ABreadcrumb>
    </ATabsPanel>
    <ATabsPanel key="24" title="Slider 滑块">
     <div style="width: 800px;">
      <ASlider v-model="sliderValue" :step="10" showStops showInput @change="sliderChange" /> {{ sliderValue }}
     </div>
    </ATabsPanel>
    <ATabsPanel key="25" title="Progress 进度条">
      <AProgress style="width: 500px;" :percentage="50" />
      <AProgress style="width: 500px;" :percentage="100" :format="format"/>
      <AProgress style="width: 500px;" :percentage="100" status="success"/>
      <AProgress style="width: 500px;" :percentage="100" status="prompt"/>
      <AProgress style="width: 500px;" :percentage="50" status="error"/>
      <AProgress style="width: 500px;margin-bottom: 10px;" :percentage="percentage" :strokeWidth="20"  textInside status="success"/>
      <AProgress style="width: 500px;" :percentage="percentage" :strokeWidth="30"  textInside status="error"/>
      <a-input-number v-model="percentage" :min="0" :step="1" style="margin-top: 10px;"/>
    </ATabsPanel>
  </ATabs>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
import { AMessage, AMessageBox } from '@amu-ui/components';

const numberValue = ref();
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
const percentage = ref(0)
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`)
const currentPage = ref(1);
const sliderValue = ref(20)
const pageChange = (page: number) => {
  console.log(page);
  currentPage.value = page;
};

const pathClick = (path)=>{
  console.log(path);
}

const sliderChange = (val)=>{
  console.log(val);
  
}

const sizeChange = (val: any) => {
  console.log(val);
};

const handelLoading = () => {
  showLoading.value = true;
  setTimeout(() => {
    showLoading.value = false;
  }, 4000);
};

const treeNodeClick = (val)=>{
  console.log(val);
  
}

const treeChecked = (val)=>{
  console.log(val);
  
}

const beforeClose = (done: () => void) => {
  AMessageBox({
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
      AMessage.success({
        message: "提交成功",
      });
    })
    .catch((err) => {
      AMessage.error({
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
const value1 = ref(1);
const rateValue = ref(3);
const checkedList = ref([1, 2]);
const options = ref([
  {
    label: "杨俊杰",
    value: 1,
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
const optionsRadio = ref([
  {
    label: "杨俊杰",
    value: 1,
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
              {
                key: 90027,
                title: "机构机构-3",
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
  (val) => { }
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
  AMessage.error({
    message:
      "this is a error message when you click the button error message when you click the button",
  });
};

const showSuccess = () => {
  AMessageBox({
    title: "测试",
    content: "点击确定按钮将会出现一个成功的message 他会返回一个成功的Promise",
    showCancelBtn: true,
  }).then(() => {
    AMessage.success({
      message: "success",
    });
  });
};

const showWarning = () => {
  AMessage.warning({
    message: "this is a warning message",
  });
};

const showMessage = () => {
  AMessage.message({
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
  AMessageBox({
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
