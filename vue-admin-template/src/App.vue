<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import  {mapMutations,mapState,mapGetters} from  'vuex'
  var  confPara = require ('../mock/conf.para.json')
  import WebSocketClass from './utils/WebSocketClass'

  export default {
    name: "App",
    data(){
      return {
        ws:null,
      }
    },
    computed: {
      /*...mapState({
        // nodesys: state=> state.nodesys.nodesys
        nodesys: function(state) { return state.nodesys.nodesys}
      }),*/
      ...mapGetters([
        'commonPara','userPara'
      ])
    },
    created() {
      const _this = this;
      _this.setUserPara();
      this.$nextTick((_) => {
        var callback = function () {
          console.log("WebSocketClass.ws.readyState:" + WebSocketClass.ws.readyState)
          //window.WebSocketClass.onsentContent("++++++++++++++++++++++")
          //WebSocketClass.onsentContent("==============================")

          var message = function (val) {
            if(val){
              var commonParaSigObj = JSON.parse(val);
              var commonParaAllObj =  _this.commonPara ? JSON.parse(_this.commonPara) : "";
              if(commonParaSigObj.purposeId && commonParaAllObj){
                var findIf = false;
                Object.keys(commonParaAllObj).forEach(function(key){
                  if(key == commonParaSigObj.purposeId){
                    findIf = true;
                    commonParaAllObj[key] = commonParaSigObj;
                  }
                })
                if (!findIf){
                  commonParaAllObj[commonParaSigObj.purposeId] = commonParaSigObj
                }
              }else{
                var commonParaAllObj = commonParaAllObj ? commonParaAllObj : {}
                var keyTemp = commonParaSigObj.purposeId ? commonParaSigObj.purposeId : new Date().getTime()
                commonParaAllObj[keyTemp] = commonParaSigObj;
              }
            }
            _this.$handleSuccess(val)
            _this.$store.dispatch("nodesys/commonPara",val)
          }
          WebSocketClass.getMessage(message)
        }
        WebSocketClass.connect(callback);
      })

      //this.start();
    },
    methods:{
      ...mapMutations('nodesys',[
        'setCommonPara','setUserPara'
      ]),
    }
  }


</script>
