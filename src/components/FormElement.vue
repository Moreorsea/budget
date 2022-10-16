<template>
  <ElCard class="form-card">
    <ElForm :model="formData" :rules="rules" label-position="top" ref="addItemForm">
        <ElSelect class="type-select" label="Type" prop="type" v-model="formData.type" placeholder="Choose type...">
          <ElOption label="Income" value="INCOME" />
          <ElOption label="Outcome" value="OUTCOME" />
        </ElSelect>

        <ElFormItem label="Comments" prop="comment">
          <ElInput v-model="formData.comment" />
        </ElFormItem>

        <ElFormItem label="Value" prop="value">
          <ElInput v-model.number="formData.value" />
        </ElFormItem>
        <ElButton type="primary" @click="onSubmit">Submit</ElButton>
    </ElForm>
  </ElCard>
</template>

<script>
export default {
  name: "FormElement",
  data: () => ({
    formData: {
      type: "INCOME",
      comment: "",
      value: 0,
      icon: "",
      classTitle: ""
    },
    rules: {
      type: [
        {required: true, message: 'Please select type', trigger: 'blur'}
      ],
      comment: [
        {required: true, message: 'Please input comment', trigger: 'blur'}
      ],
      value: [
        {required: true, message: 'Please input value', trigger: 'change'},
        {type: 'number', message: 'Value must be a number', trigger: 'change'}
      ]
    }
  }),
  methods: {
    onSubmit() {
      this.$refs.addItemForm.validate((value) => {
        if(value) {
          this.$emit('submitForm', {...this.formData});
          this.$refs.addItemForm.resetFields();
        }
      })
    }
  }
}
</script>

<style>
  .form-card {
    max-width: 500px;
    margin: auto;
  }

  .type-select {
    width: 100%;
  }

  .el-form-item__label {
    padding: 0 !important;
    margin: 0 auto 0 0;
  }
</style>