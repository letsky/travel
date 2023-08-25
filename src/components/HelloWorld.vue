<template>
  <tmap-map mapKey="6PTBZ-MCAW5-6ZHIM-Q6IT2-PDKMF-73FXO" :events="events" :center="center" :zoom="zoom"
    :doubleClickZoom="doubleClickZoom" :control="control" :draggable="draggable" >

    <tmap-multi-marker :styles="markerStyles" :geometries="markerGeometries" ref="markers" @click="print"
      @dblclick="print" />
  </tmap-map>
  <van-floating-panel style="z-index: 999;" :height="height" :anchors="anchors" contentDraggable @dragstart="dragstart" @click.prevent="preventClick" @click="print">
    <van-cell-group inset>
      <van-cell v-for="(item, idx) in items" :key="item.id" :title="item.name" size="large" :label="item.position"
        icon="location" clickable @click="move(item.position)">
        <template #right-icon>
          <van-icon name="guide-o" class="navigation-icon" />
        </template>

      </van-cell>
    </van-cell-group>
  </van-floating-panel>

</template>

<script setup>
import { ref } from 'vue';

const center = ref({ lat: 39.984104, lng: 116.307503 });
const zoom = ref(13);
const doubleClickZoom = ref(false);
const draggable = ref(true)
const print = (e) => {
  console.log(e);
};

const control = ref({
  scale: {},
  zoom: {
    position: 'topRight',
  },
});

const events = ref({
  dblclick: print,
});

const move = (pos) => {
  center.value = pos
}

const markerGeometries = ref([
  {
    id: 'start',
    styleId: 'start',
    position: { lat: 39.98481500648338, lng: 116.30571126937866 },
  },
  {
    id: 'end',
    styleId: 'end',
    position: { lat: 39.978813710266024, lng: 116.31699800491333 },
  },
])

const items = ref([
  { id: 1, name: "清华大学", date: "2023-10-01 09:00", position: { lat: 39.98481500648338, lng: 116.30571126937866 } },
  { id: 2, name: "中关村", date: "2023-10-01 13:00", position: { lat: 39.978813710266024, lng: 116.31699800491333 } },
  { id: 1, name: "清华大学", date: "2023-10-01 09:00", position: { lat: 39.98481500648338, lng: 116.30571126937866 } },
  { id: 2, name: "中关村", date: "2023-10-01 13:00", position: { lat: 39.978813710266024, lng: 116.31699800491333 } },
  { id: 1, name: "清华大学", date: "2023-10-01 09:00", position: { lat: 39.98481500648338, lng: 116.30571126937866 } },
  { id: 2, name: "中关村", date: "2023-10-01 13:00", position: { lat: 39.978813710266024, lng: 116.31699800491333 } },
  { id: 1, name: "清华大学", date: "2023-10-01 09:00", position: { lat: 39.98481500648338, lng: 116.30571126937866 } },
  { id: 2, name: "中关村", date: "2023-10-01 13:00", position: { lat: 39.978813710266024, lng: 116.31699800491333 } },
  { id: 1, name: "清华大学", date: "2023-10-01 09:00", position: { lat: 39.98481500648338, lng: 116.30571126937866 } },
  { id: 2, name: "中关村", date: "2023-10-01 13:00", position: { lat: 39.978813710266024, lng: 116.31699800491333 } },
  { id: 1, name: "清华大学", date: "2023-10-01 09:00", position: { lat: 39.98481500648338, lng: 116.30571126937866 } },
  { id: 2, name: "中关村", date: "2023-10-01 13:00", position: { lat: 39.978813710266024, lng: 116.31699800491333 } },
  { id: 1, name: "清华大学", date: "2023-10-01 09:00", position: { lat: 39.98481500648338, lng: 116.30571126937866 } },
  { id: 2, name: "中关村", date: "2023-10-01 13:00", position: { lat: 39.978813710266024, lng: 116.31699800491333 } },
])

const markerStyles = ref({
  start: {
    width: 25,
    height: 35,
    anchor: { x: 16, y: 32 },
    src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png',
  },
  end: {
    width: 25,
    height: 35,
    anchor: { x: 16, y: 32 },
    src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png',
  },
})

const anchors = [
  200,
  Math.round(0.4 * window.innerHeight),
  Math.round(0.7 * window.innerHeight),
];
const height = ref(anchors[0]);

const dragstart = (e) => console.log("drag", e)
const preventClick = (e) => e.stopPropagation()
</script>

<style scoped>
.navigation-icon {
  font-size: 16px;
  line-height: inherit;
  vertical-align: middle;
}
</style>
