---
# aside: false
# prev: false
# next: false
---

# 评分

## 01 使用两张图片加偏移

::: raw

<script setup lang="ts">
import StarsRate from "./StarsRate/index.vue"
</script>

<StarsRate :value="6.4" />
:::

::: details StarsRate.vue

```vue
<!-- 评分组件 -->
<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    value?: number;
  }>(),
  {
    value: 0,
  }
);

const style = computed(() => ({
  "clip-path": `inset(0 ${(10 - props.value) * 10}% 0 0)`,
}));
</script>

<template>
  <div class="container">
    <img src="./stars.webp" class="background-image" aria-hidden="true" />
    <img src="./stars-filled.webp" class="foreground-image" aria-hidden="true" :style="style" />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 200px;
  position: relative;
  aspect-ratio: 11 / 2; // 宽高比
  filter: hue-rotate(320deg); // 调整元素的色相（hue）

  .background-image,
  .foreground-image {
    position: absolute;
    inset: 0; // 等价于 top: 0; right: 0; bottom: 0; left: 0;
  }
}
</style>
```

:::

::: details App.vue

```vue
<script setup lang="ts">
import StarsRate from "./StarsRate.vue";
</script>

<template>
  <StarsRate :value="6.4" />
</template>
```

:::
