<template>
  <div id="nav">
    <a-menu mode="horizontal">
      <a-menu-item key="/" @click.native="_navigate('/')"><appstore-outlined />Webbase-Home </a-menu-item>
      <a-menu-item key="/about" @click.native="_navigate('/about')"><appstore-outlined />Webbase-About </a-menu-item>
      <!-- Angular app -->
      <a-menu-item key="/ng-sub" @click.native="_navigate('/ng-sub')"><appstore-outlined />NG-Home </a-menu-item>
      <a-menu-item key="/ng-sub/dev" @click.native="_navigate('/ng-sub/dev')"><appstore-outlined />NG-Dev </a-menu-item>
      <!-- Vue app -->
      <a-menu-item key="/vue-sub" @click.native="_navigate('/vue-sub')"><appstore-outlined />Vue-Home </a-menu-item>
      <a-menu-item key="/vue-sub/about" @click.native="_navigate('/vue-sub/about')"><appstore-outlined />Vue-About </a-menu-item>
      <!-- React app -->
      <a-menu-item key="/react-sub" @click.native="_navigate('/react-sub')"><appstore-outlined />React-Home </a-menu-item>
      <a-menu-item key="/react-sub/about" @click.native="_navigate('/react-sub/about')"><appstore-outlined />React-About </a-menu-item>
    </a-menu>

    <!-- <router-view /> -->
    <template v-if="!isSupApp">
      <router-view/>
    </template>

    <!-- micro app container -->
    <div id="sub-root"></div>
  </div>
</template>

<script lang="ts">
import { AppstoreOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref,getCurrentInstance } from "vue";
import { navigateToUrl } from './utils/navigate';
import { apps } from './micro';

export default defineComponent({
  data(){
    return {
      // 当前引入的是否为子应用
      isSupApp:false
    }
  },
  components: {
    AppstoreOutlined,
  },
  setup() {

    // @ts-ignore
    const { ctx } = getCurrentInstance();

    const _log = () => {

      console.log("App setup run");
    };

    const _navigate = (url: string,title="subApp") => {
      console.log(`navigate to : ${url}`);

      // 主应用时候通过vue-router跳转
      if(apps.map(t=>t.activeRule)){

        ctx.isSupApp = false;
        console.log(ctx)
        ctx.$router.push(url)
      }else{// 子应用时候通过pushState跳转

        navigateToUrl(url,title);
        
        setTimeout(()=>ctx.isSupApp = true,0);
      }
    };


    return { _log, _navigate };
  },
  methods:{
   
  },
  computed:{
    
  },
  mounted(){

    // console.log(this.$route)
  }
});
</script>
<style src="./style.scss" lang="scss" scoped></style>>
