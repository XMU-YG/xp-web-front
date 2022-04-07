import {
  Button,
  Form,
  Layout,
  Row,
  Col,
  Input,
  Menu,
  Dropdown,
  Badge,
  Breadcrumb,
  Tabs,
  Tree,
  DirectoryTree,
  Spin,
  DatePicker,
  ConfigProvider,
  Space,
  Table,
  Select,
  Popover,
  Modal,
  UploadDragger,
  Upload,
  SelectOption,
  Descriptions,
  Cascader,
  TreeSelect,
  Tag,
  Rate,
  Checkbox,
  Radio,
  Steps,
  Carousel,
  Pagination
} from 'ant-design-vue'
import * as icons from '@ant-design/icons-vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'

const myIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2656647_ncy3uyf03v7.js'
})

export default function (vue) {
  vue.use(SelectOption)
  vue.use(Descriptions)
  vue.use(Upload)
  vue.use(UploadDragger)
  vue.use(Modal)
  vue.use(ConfigProvider)
  vue.use(Spin)
  vue.use(DirectoryTree)
  vue.use(Tree)
  vue.use(Button)
  vue.use(Form)
  vue.use(Layout)
  vue.use(Row)
  vue.use(Col)
  vue.use(Input)
  vue.use(Menu)
  vue.use(Dropdown)
  vue.use(Badge)
  vue.use(Breadcrumb)
  vue.use(Tabs)
  vue.use(DatePicker)
  vue.use(Space)
  vue.use(Table)
  vue.use(Select)
  vue.use(Popover)
  vue.use(Cascader)
  vue.use(TreeSelect)
  vue.use(Tag)
  vue.use(Rate)
  vue.use(Checkbox)
  vue.use(Radio)
  vue.use(Steps)
  vue.use(Pagination)
  vue.use(Carousel)
  vue.component('MyIcon', myIcon)
  Object.keys(icons).forEach(item => {
    vue.component(item, icons[item])
  })
}
