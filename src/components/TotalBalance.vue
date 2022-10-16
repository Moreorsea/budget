<template>
  <div class="total-value" :class="cls">Balance: {{total}}</div>
</template>

<script>
export default {
  name: "TotalBalance",
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    cls: 'normal',
  }),
  watch: {
    total: {
      handler(newVal) {
        this.computedTitleColor(newVal);
      }
    }
  },
  methods: {
    computedTitleColor(value) {
      if(value === 0) {
          this.cls = 'normal';
        } else if(value < 0) {
          this.cls ='critical';
        } else {
          this.cls ='success';
        }
    }
  }
}
</script>

<style scoped>
  .total-value {
    font-size: 26px;
    text-transform: uppercase;
    padding: 20px;
    text-align: center;
  }

  .normal {
    color: #000000;
  }

  .critical {
    color: #ff0000;
  }

  .success {
    color: #0dbd13;
  }
</style>
