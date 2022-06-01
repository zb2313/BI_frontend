<template>
  <div class="sidebar">
    <el-menu
        class="sidebar-el-menu"
        :default-active="onRoutes"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
        unique-opened
        router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                  v-if="subItem.subs"
                  :index="subItem.index"
                  :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                    v-for="(threeItem, i) in subItem.subs"
                    :key="i"
                    :index="threeItem.index"
                >
                  {{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index"
              >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-s-custom",
          index: "/dashboard",
          title: "数据概览",
        },
        {
          icon: "el-icon-s-grid",
          index: "/DUnit",
          title: "关键单位查询",
          // subs: [
          //   {
          //     index: "/AttractionOrder",
          //     title: "景点门票",
          //   },
          //   {
          //     index: "/TrafficOrder",
          //     title: "交通票",
          //   },
          //   {
          //     index: "/HotelOrder",
          //     title: "酒店订单",
          //   },
          // ],
        },
        {
          icon: "el-icon-tickets",
          index: "/DAuthor",
          title: "关键作者查询",
        },
        {
          icon: "el-icon-tickets",
          index: "/DCJournal",
          title: "关键会议/期刊查询",
        },
        {
          icon: "el-icon-document-copy",
          index: "/DDAUnit",
          title: "关键会议/期刊查询-2",
        },
        {
          icon: "el-icon-s-opportunity",
          index: "/Graph",
          title: "统计数据2",
        },
        {
          icon: "el-icon-s-comment",
          index: "/Cooperation",
          title: "合作查询比较（neo4j）",
        },
        {
          icon: "el-icon-s-comment",
          index: "/DateCompare",
          title: "日期查询比较",
        },
        {
          icon: "el-icon-s-promotion",
          index: "/TraceSource",
          title: "溯源查询",
        },
        {
          icon: "el-icon-s-management",
          index: "/ImdbRank",
          title: "Imdb榜单",
        },
        {
          icon: "el-icon-s-management",
          index: "/AsinDetails",
          title: "asin详细信息",
        }
      ],
      onRoutes: "",
    };
  },
  created() {
    this.onRoutes = this.$route.path;
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
