<template>
  <v-container>
    <div class="map-box">
      <tmap-map mapKey="6PTBZ-MCAW5-6ZHIM-Q6IT2-PDKMF-73FXO" :events="events" :center="center" :zoom="zoom"
        :doubleClickZoom="doubleClickZoom" :control="control">

        <tmap-multi-marker :styles="markerStyles" :geometries="markerGeometries" ref="markers" @click="print"
          @dblclick="print" />
      </tmap-map>
    </div>
    <v-card class="mx-auto">
      <v-list>
        <v-list-item v-for="(item, idx) in items" :key="item.id" :title="item.name" :subtitle="item.date"
          :value="item.position" @click="move(item.position)">
          <template v-slot:prepend>
            <v-icon icon="mdi-flag"></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const center = ref({ lat: 39.984104, lng: 116.307503 });
const zoom = ref(13);
const doubleClickZoom = ref(true);
const print = (e) => {
  console.log(e);
};

const control = ref({
  scale: {},
  zoom: {
    position: 'bottomRight',
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

const onPositionClick = (e) => {
  console.log(e)
  const position = e.target
  move(position)
}

</script>

<style scoped>
.map-box {
  height: 300px;
}
</style>
