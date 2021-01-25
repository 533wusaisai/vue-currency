<template>
  <div>
    <a-form layout="horizontal">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCal"
      >
        <a-input> sss </a-input>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  data() {
    this.form = this.$form.craateForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCal: { span: 4 }
      }
    };
  }
};
</script>
