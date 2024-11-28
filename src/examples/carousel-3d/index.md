---
aside: false
prev: false
next: false
---

<span class="my-title">3D 轮播图</span>

<script setup lang="ts">
import Carousel3D from "./Carousel3D/Carousel3D.vue"
import CarouselSlide from "./Carousel3D/CarouselSlide.vue"

const slides = [
  {
    title: "Slide 1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.",
    src: "https://placehold.it/360x270"
  },
  {
    title: "Slide 2",
    desc: "Lorem ipsum dolor sit amet ",
    src: "https://placehold.it/360x270"
  },
  {
    title: "Slide 3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. ",
    src: "https://placehold.it/360x270"
  },
  {
    title: "Slide 4",
    desc: "Lorem ipsum dolor sit amet,  Enim, maxime.",
    src: "https://placehold.it/360x270"
  },
  {
    title: "Slide 5",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.",
    src: "https://placehold.it/360x270"
  },
  {
    title: "Slide 6",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.",
    src: "https://placehold.it/360x270"
  },
  {
    title: "Slide 7",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.",
    src: "https://placehold.it/360x270"
  },
  {
    title: "Slide 8",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.",
    src: "https://placehold.it/360x270"
  },
  {
    title: "Slide 9",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.",
    src: "https://placehold.it/360x270"
  },
  {
    title: "Slide 10",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim, maxime.",
    src: "https://placehold.it/360x270"
  }
]
</script>

::: raw
<Carousel3D display="5" startIndex="4" :width="150" :height="200" :perspective="0">
  <CarouselSlide
    v-for="(slide, i) in slides"
    :index="i"
    :key="i"
    #default="{ index, isCurrent, leftIndex, rightIndex }"
  >
    <h1>{{ slide.title }}</h1>
    <p>{{ index }}</p>
    <p>{{ isCurrent }}</p>
    <p>{{ leftIndex }}</p>
    <p>{{ rightIndex }}</p>
  </CarouselSlide>
</Carousel3D>
:::

<style scoped>
.carousel-3d-container {
  height: 220px !important;
}
.current {
  box-shadow: 0px 0px 20px 5px #ffdf5e;
}
</style>