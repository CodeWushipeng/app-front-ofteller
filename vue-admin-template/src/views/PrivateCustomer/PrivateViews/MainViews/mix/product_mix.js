import productCard from "../components/productCard";
import productSidebarItem from '../components/productSidebarItem'
import variables from '@/styles/variables.scss'
import { mapState, mapActions } from "vuex";
import { ajaxProductTree, ajaxQueryProdListForCategory  } from './func_product.js';//产品相关方法
import Bus from "@/bus";

export default {
  data() {
    return {
      selectProductInfo: {},
      menuSelected: "",
      flowIframeUrl: "",
      productTree: [],
    };
  },
  components: {productCard ,productSidebarItem},
  computed: {
    variables() {
      return variables
    },
    ...mapState({
      iframePrivateView:state=>state.privateViewMain.iframePrivateView,
    })
  },
  methods: {
    async init(catalogAlias) {
      this.productTree = await ajaxProductTree(catalogAlias);
    },

    async handleSelect(key, keyPath) {
      let selectCategoryId = keyPath.length > 1 ? keyPath[keyPath.length - 2] : keyPath[0];
      this.selectProductInfo = await ajaxQueryProdListForCategory(selectCategoryId , key)
      Bus.$emit("productInfoFun",this.selectProductInfo);
      this.menuSelected = key
    },
  },

};
