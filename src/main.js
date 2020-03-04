import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
import Button from 'ant-design-vue/lib/button';
import Icon from 'ant-design-vue/lib/icon';
import Modal from 'ant-design-vue/lib/modal';
import form from 'ant-design-vue/lib/form';
import Radio from 'ant-design-vue/lib/radio';
import Input from 'ant-design-vue/lib/input';
import InputNumber from 'ant-design-vue/lib/input-number';
import Alert from 'ant-design-vue/lib/alert';
import PopConfirm from 'ant-design-vue/lib/popconfirm';
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(axios);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Modal);
Vue.use(form);
Vue.use(Radio);
Vue.use(Input);
Vue.use(Alert);
Vue.use(InputNumber);
Vue.use(PopConfirm);
new Vue({

  render: h => h(App),
}).$mount('#app')
