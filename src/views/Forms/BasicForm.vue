<template>
  <a-form :layout="formLayout">
    <a-form-item
      label="Form Layout"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-radio-group
        default-value="horizontal"
        @change="handleFormLayoutChange"
      >
        <a-radio-button value="horizontal">
          Horizontal
        </a-radio-button>
        <a-radio-button value="vertical">
          Vertical
        </a-radio-button>
        <a-radio-button value="inline">
          Inline
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="Field A"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      :validateStatus="validataStatus"
      :help="helpStatus"
    >
      <a-input placeholder="input placeholder" v-model="fieldA" />
    </a-form-item>
    <a-form-item
      label="Field B"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      :validateStatus="validataStatus"
      :help="helpStatus"
    >
      <a-input placeholder="input placeholder" v-model="fieldB" />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      formLayout: "horizontal",
      fieldA: "",
      fieldB: "",
      validataStatus: "",
      helpStatus: ""
    };
  },
  // 动态校验 监听变化
  watch: {
    fieldA(val) {
      if (val.length <= 5) {
        (this.validataStatus = "error"), (this.helpStatus = "这事不行");
      } else {
        (this.validataStatus = ""), (this.helpStatus = "");
      }
    }
  },

  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : {};
    }
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmit() {
      if (this.fiedA.length <= 5) {
        (this.validataStatus = "error"), (this.helpStatus = "这事不行");
      } else {
        console.log(1213);
      }
    }
  }
};
</script>
