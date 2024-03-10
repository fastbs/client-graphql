import { createApp, provide, h } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import { QuillEditor } from "@vueup/vue-quill";

import AutoComplete from "primevue/autocomplete";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
import Badge from "primevue/badge";
import BadgeDirective from "primevue/badgedirective";
import BlockUI from "primevue/blockui";
import Button from "primevue/button";
import Breadcrumb from "primevue/breadcrumb";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import CascadeSelect from "primevue/cascadeselect";
import Carousel from "primevue/carousel";
import Checkbox from "primevue/checkbox";
import Chip from "primevue/chip";
import Chips from "primevue/chips";
import ColorPicker from "primevue/colorpicker";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmPopup from "primevue/confirmpopup";
import ConfirmationService from "primevue/confirmationservice";
import ContextMenu from "primevue/contextmenu";
import DataTable from "primevue/datatable";
import DataView from "primevue/dataview";
import DataViewLayoutOptions from "primevue/dataviewlayoutoptions";
import DeferredContent from "primevue/deferredcontent";
import Dialog from "primevue/dialog";
import DialogService from "primevue/dialogservice"
import Divider from "primevue/divider";
import Dock from "primevue/dock";
import Dropdown from "primevue/dropdown";
import DynamicDialog from "primevue/dynamicdialog";
import Fieldset from "primevue/fieldset";
import FileUpload from "primevue/fileupload";
import FocusTrap from "primevue/focustrap";
import Galleria from "primevue/galleria";
import Image from "primevue/image";
import InlineMessage from "primevue/inlinemessage";
import Inplace from "primevue/inplace";
import InputSwitch from "primevue/inputswitch";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import Knob from "primevue/knob";
import Listbox from "primevue/listbox";
import MegaMenu from "primevue/megamenu";
import Menu from "primevue/menu";
import Menubar from "primevue/menubar";
import Message from "primevue/message";
import MultiSelect from "primevue/multiselect";
import OrderList from "primevue/orderlist";
import OrganizationChart from "primevue/organizationchart";
import OverlayPanel from "primevue/overlaypanel";
import Paginator from "primevue/paginator";
import Panel from "primevue/panel";
import PanelMenu from "primevue/panelmenu";
import Password from "primevue/password";
import PickList from "primevue/picklist";
import ProgressBar from "primevue/progressbar";
import ProgressSpinner from "primevue/progressspinner";
import Rating from "primevue/rating";
import RadioButton from "primevue/radiobutton";
import Ripple from "primevue/ripple";
import Row from "primevue/row";
import SelectButton from "primevue/selectbutton";
import ScrollPanel from "primevue/scrollpanel";
import ScrollTop from "primevue/scrolltop";
import Skeleton from "primevue/skeleton";
import Slider from "primevue/slider";
import Sidebar from "primevue/sidebar";
import SpeedDial from "primevue/speeddial";
import SplitButton from "primevue/splitbutton";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Steps from "primevue/steps";
import StyleClass from "primevue/styleclass";
import TabMenu from "primevue/tabmenu";
import TieredMenu from "primevue/tieredmenu";
import Textarea from "primevue/textarea";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import Toolbar from "primevue/toolbar";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Tag from "primevue/tag";
import Terminal from "primevue/terminal";
import Timeline from "primevue/timeline";
import ToggleButton from "primevue/togglebutton";
import Tooltip from "primevue/tooltip";
import Tree from "primevue/tree";
import TreeSelect from "primevue/treeselect";
import TreeTable from "primevue/treetable";
import TriStateCheckbox from "primevue/tristatecheckbox";
import VirtualScroller from "primevue/virtualscroller";

import '@/assets/styles.scss';
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import "@mdi/font/css/materialdesignicons.css";

import { provideApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./services/ApolloClient";


const app = createApp({
  setup() {
    provideApolloClient(apolloClient);
  },

  render: () => h(App),
});

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  ripple: true,
  locale: {
    "startsWith": "Начинается с",
    "contains": "Содержит",
    "notContains": "Не содержит",
    "endsWith": "Заканчивается",
    "equals": "Равно",
    "notEquals": "Не равно",
    "noFilter": "Нет фильтра",
    "filter": "Фильтр",
    "lt": "Меньше чем",
    "lte": "Меньше чем или равно",
    "gt": "Более чем",
    "gte": "Более чем или равно",
    "dateIs": "Дата равна",
    "dateIsNot": "Дата не равна",
    "dateBefore": "Дата до",
    "dateAfter": "Дата после",
    "custom": "Пользовательский",
    "clear": "Очистить",
    "apply": "Принять",
    "matchAll": "Сопоставить все",
    "matchAny": "Совпадение с любым",
    "addRule": "Добавить правило",
    "removeRule": "Удалить правило",
    "accept": "Да",
    "reject": "Нет",
    "choose": "Выбрать",
    "upload": "Загрузить",
    "cancel": "Отмена",
    "completed": "Завершено",
    "pending": "В ожидании",
    "dayNames": ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    "dayNamesShort": ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"],
    "dayNamesMin": ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    "monthNames": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    "monthNamesShort": ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    "chooseYear": "Выбрать год",
    "chooseMonth": "Выбрать месяц",
    "chooseDate": "Выбрать дату",
    "prevDecade": "Предыдущее десятилетие",
    "nextDecade": "Следующее десятилетие",
    "prevYear": "Предыдущий год",
    "nextYear": "Следующий год",
    "prevMonth": "Предыдущий месяц",
    "nextMonth": "Следующий месяц",
    "prevHour": "Предыдущий час",
    "nextHour": "Следующий час",
    "prevMinute": "Предыдущая минута",
    "nextMinute": "Следующая минута",
    "prevSecond": "Предыдущая секунда",
    "nextSecond": "Следующая секунда",
    "am": "до полудня",
    "pm": "после полудня",
    "today": "Сегодня",
    "weekHeader": "Нед.",
    "firstDayOfWeek": 1,
    "dateFormat": "dd.mm.yyyy",
    "weak": "Простой",
    "medium": "Нормальный",
    "strong": "Хороший",
    "passwordPrompt": "Введите пароль",
    "emptyFilterMessage": "Результатов не найдено",
    "searchMessage": "{0} результатов доступно",
    "selectionMessage": "{0} элементов выбрано",
    "emptySelectionMessage": "Нет выбранного элемента",
    "emptySearchMessage": "Результатов не найдено",
    "emptyMessage": "Нет доступных вариантов",
    "aria": {
      "trueLabel": "Верно",
      "falseLabel": "Неверно",
      "nullLabel": "Не выбран",
      "star": "1 звезда",
      "stars": "{star} звёзд",
      "selectAll": "Выбраны все элементы",
      "unselectAll": "Все элементы не выбраны",
      "close": "Закрыть",
      "previous": "Предыдущий",
      "next": "Следующий",
      "navigation": "Навигация",
      "scrollTop": "Прокрутить в начало",
      "moveTop": "Переместить в начало",
      "moveUp": "Переместить вверх",
      "moveDown": "Переместить вниз",
      "moveBottom": "Переместить в конец",
      "moveToTarget": "Переместить в приёмник",
      "moveToSource": "Переместить в источник",
      "moveAllToTarget": "Переместить всё в приёмник",
      "moveAllToSource": "Переместить всё в источник",
      "pageLabel": "{page}",
      "firstPageLabel": "Первая страница",
      "lastPageLabel": "Последняя страница",
      "nextPageLabel": "Следующая страница",
      "previousPageLabel": "Предыдущая страница",
      "rowsPerPageLabel": "Строк на странице",
      "jumpToPageDropdownLabel": "Перейти к раскрывающемуся списку страниц",
      "jumpToPageInputLabel": "Перейти к вводу страницы",
      "selectRow": "Выбрана строка",
      "unselectRow": "Строка не выбрана",
      "expandRow": "Строка развёрнута",
      "collapseRow": "Строка свёрнута",
      "showFilterMenu": "Показать меню фильтра",
      "hideFilterMenu": "Скрыть меню фильтра",
      "filterOperator": "Оператор фильтра",
      "filterConstraint": "Ограничение фильтра",
      "editRow": "Редактирование строки",
      "saveEdit": "Сохранить правку",
      "cancelEdit": "Отменить правку",
      "listView": "В виде списка",
      "gridView": "В виде сетки",
      "slide": "Слайд",
      "slideNumber": "{slideNumber}",
      "zoomImage": "Увеличить изображение",
      "zoomIn": "Увеличить",
      "zoomOut": "Уменьшить",
      "rotateRight": "Повернуть вправо",
      "rotateLeft": "Повернуть влево"
    }
  }
});

app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);


app.directive("tooltip", Tooltip);
app.directive("badge", BadgeDirective);
app.directive("ripple", Ripple);
app.directive("styleclass", StyleClass);
app.directive("focustrap", FocusTrap);

app.component("pAccordion", Accordion);
app.component("pAccordionTab", AccordionTab);
app.component("pAutoComplete", AutoComplete);
app.component("pAvatar", Avatar);
app.component("pAvatarGroup", AvatarGroup);
app.component("pBadge", Badge);
app.component("pBlockUI", BlockUI);
app.component("pBreadcrumb", Breadcrumb);
app.component("pButton", Button);
app.component("pCalendar", Calendar);
app.component("pCard", Card);
app.component("pCarousel", Carousel);
app.component("pCascadeSelect", CascadeSelect);
app.component("pCheckbox", Checkbox);
app.component("pChip", Chip);
app.component("pChips", Chips);
app.component("pColorPicker", ColorPicker);
app.component("pColumn", Column);
app.component("pColumnGroup", ColumnGroup);
app.component("pConfirmDialog", ConfirmDialog);
app.component("pConfirmPopup", ConfirmPopup);
app.component("pContextMenu", ContextMenu);
app.component("pDataTable", DataTable);
app.component("pDataView", DataView);
app.component("pDataViewLayoutOptions", DataViewLayoutOptions);
app.component("pDeferredContent", DeferredContent);
app.component("pDialog", Dialog);
app.component("pDivider", Divider);
app.component("pDock", Dock);
app.component("pDropdown", Dropdown);
app.component("pDynamicDialog", DynamicDialog);
app.component("pFieldset", Fieldset);
app.component("pFileUpload", FileUpload);
app.component("pGalleria", Galleria);
app.component("pImage", Image);
app.component("pInlineMessage", InlineMessage);
app.component("pInplace", Inplace);
app.component("pInputMask", InputMask);
app.component("pInputNumber", InputNumber);
app.component("pInputSwitch", InputSwitch);
app.component("pInputText", InputText);
app.component("pKnob", Knob);
app.component("pListbox", Listbox);
app.component("pMegaMenu", MegaMenu);
app.component("pMenu", Menu);
app.component("pMenubar", Menubar);
app.component("pMessage", Message);
app.component("pMultiSelect", MultiSelect);
app.component("pOrderList", OrderList);
app.component("pOrganizationChart", OrganizationChart);
app.component("pOverlayPanel", OverlayPanel);
app.component("pPaginator", Paginator);
app.component("pPanel", Panel);
app.component("pPanelMenu", PanelMenu);
app.component("pPassword", Password);
app.component("pPickList", PickList);
app.component("pProgressBar", ProgressBar);
app.component("pProgressSpinner", ProgressSpinner);
app.component("pRadioButton", RadioButton);
app.component("pRating", Rating);
app.component("pRow", Row);
app.component("pSelectButton", SelectButton);
app.component("pScrollPanel", ScrollPanel);
app.component("pScrollTop", ScrollTop);
app.component("pSlider", Slider);
app.component("pSidebar", Sidebar);
app.component("pSkeleton", Skeleton);
app.component("pSpeedDial", SpeedDial);
app.component("pSplitButton", SplitButton);
app.component("pSplitter", Splitter);
app.component("pSplitterPanel", SplitterPanel);
app.component("pSteps", Steps);
app.component("pTabMenu", TabMenu);
app.component("pTabView", TabView);
app.component("pTabPanel", TabPanel);
app.component("pTag", Tag);
app.component("pTextarea", Textarea);
app.component("pTerminal", Terminal);
app.component("pTieredMenu", TieredMenu);
app.component("pTimeline", Timeline);
app.component("pToast", Toast);
app.component("pToolbar", Toolbar);
app.component("pToggleButton", ToggleButton);
app.component("pTree", Tree);
app.component("pTreeSelect", TreeSelect);
app.component("pTreeTable", TreeTable);
app.component("pTriStateCheckbox", TriStateCheckbox);
app.component("pVirtualScroller", VirtualScroller);

app.component("QuillEditor", QuillEditor);


app.mount("#app");
