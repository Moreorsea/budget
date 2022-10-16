<template>
  <ElDialog
      width="40%"
      :before-close="onClose"
      :visible="this.visible"
      >
    <p class="dialog-text">Вы уверены, что хотите удалить элемент из списка?</p>
    <br />
    <ElButton type="success" size="mini" @click="onContinue">Продолжить</ElButton>
    <ElButton type="danger" size="mini" @click="$emit('toggle-dialog-visible')">Отмена</ElButton>
  </ElDialog>
</template>

<script>
export default {
  name: "DialogComponent",
  props: {
    visible: {
      type: Boolean,
    }
  },
  methods: {
    onClose() {
      this.$emit('toggle-dialog-visible');
      sessionStorage.removeItem('itemId');
    },
    onContinue() {
      const id = sessionStorage.getItem('itemId');
      this.$emit('deleteIItem', id);
    }
  }
}
</script>

<style>
</style>
