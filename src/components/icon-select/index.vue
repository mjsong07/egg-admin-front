<template>
  <el-popover popper-class="icon-select" placement="right" width="600" trigger="click">
    <el-input
      class="icon-select-input"
      slot="reference"
      :value="value"
      :size="size"
      :disabled="disabled"
      :placeholder="placeholder || '选择图标'"
      style="width:200px"
      @input="$emit('input', $event)"
    >
      <i class="el-input__icon" :class="value" slot="suffix"></i>
    </el-input>
    <el-tabs v-model="activeTab" type="card">
      <el-tab-pane :label="tab.label" :name="tab.name" v-for="(tab, index) in tabs" :key="index">
        <el-input class="icon-list-input" v-model="searchKey" placeholder="输入关键字搜索" clearable></el-input>
        <el-row class="icon-list">
          <el-col
            :span="4"
            class="icon-item"
            v-for="(item, index) in iconList"
            :key="index"
            @click.native="handleSelect(item)"
          >
            <div class="icon-item__icon" :class="item.font_class"></div>
            <div class="icon-item__label">{{ item.name }}</div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>

<script>
/**
 * @component 选择图标组件
 * @prop {String} value 双向绑定的值(图标的class)
 * @prop {String} size 组件大小
 * @prop {String} placeholder 占位符
 * @prop {Boolean} disabled 是否禁用
 */
const iconfontJson = require("./iconfont.json");
const eliconJson = require("./el-icon.json");
const iconList = {
  iconfont: [
    ...iconfontJson.glyphs.map(item => {
      return {
        ...item,
        font_class: iconfontJson.css_prefix_text + item.font_class
      };
    })
  ],
  elicon: eliconJson
};

export default {
  name: "icon-select",
  props: ["value", "size", "disabled", "placeholder"],
  data() {
    return {
      searchKey: "",
      tabs: [
        { label: "Iconfont", name: "iconfont" },
        { label: "Element", name: "elicon" }
      ],
      activeTab: "iconfont"
    };
  },
  computed: {
    iconList() {
      return iconList[this.activeTab].filter(item => {
        return item.name.includes(this.searchKey) || item.font_class.includes(this.searchKey);
      });
    }
  },
  methods: {
    handleSelect(v) {
      this.$emit("input", v.font_class);
      this.visible = false;
    }
  }
};
</script>

<style lang="scss">
.icon-select {
  .icon-list {
    height: 500px;
    text-align: center;
    overflow: auto;
    .icon-item {
      padding: 5px;
      cursor: pointer;
      &__icon {
        height: 32px;
        font-size: 24px;
        &:hover {
          font-size: 32px;
        }
      }
      &__label {
        height: 32px;
      }
    }
  }
}
</style>
