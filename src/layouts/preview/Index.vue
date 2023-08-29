<template>
  <div>
    <van-nav-bar :title="data.groupName">
      <template #left>
        <van-icon name="arrow-left" size="24" />
      </template>
      <template #right>
        <van-icon name="share-o" size="24" />
      </template>
    </van-nav-bar>

    <tmap-map :mapKey="mapKey" ref="tmap" :events="events" :center="center" :zoom="zoom"
      :doubleClickZoom="doubleClickZoom" :control="control" :draggable="draggable" :libraries="libraries">

      <tmap-multi-marker :styles="markerStyles" :geometries="markerGeometries" ref="markers" @click="print"
        @dblclick="print" />
    </tmap-map>

    <van-floating-panel style="z-index: 1001;" :height="height" :anchors="anchors" contentDraggable @click="print"
      @height-change="onFloatPanelHeightChange">
      <van-cell-group inset>
        <van-cell v-for="(item, idx) in geometries" :key="item.id" :title="item.title" :label="item.address" size="large"
          icon="location" @click="onPositionClick(item)">
          <template #extra>
            <van-button icon="add-o" plain type="default" @click="onAddClick(item)"></van-button>
          </template>
        </van-cell>
      </van-cell-group>
    </van-floating-panel>

    <van-dialog v-model:show="showDialog" title="添加地点" showCancelButton confirmButtonText="添加" :open="onDialogOpen"
      :close="onDialogClose">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="formData.title" name="地点" label="地点" placeholder="地点"
            :rules="[{ required: true, message: '请填写地点' }]" disabled />

          <van-field v-model="formData.date" is-link readonly name="datePicker" label="日期" placeholder="点击选择日期"
            @click="showDatePicker = true" />
          <van-field v-model="formData.time" is-link readonly name="timePicker" label="时间" placeholder="点击选择时间"
            @click="showTimePicker = true" />
          <!-- date -->
          <van-popup v-model:show="showDatePicker" position="bottom">
            <van-date-picker @confirm="onDateConfirm" @cancel="showDatePicker = false" />
          </van-popup>
          <!-- time -->
          <van-popup v-model:show="showTimePicker" position="bottom">
            <van-time-picker @confirm="onTimeConfirm" @cancel="showTimePicker = false" />
          </van-popup>
        </van-cell-group>
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </van-form>
    </van-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const mapKey = ref(import.meta.env.VITE_MAP_KEY)
const route = useRoute()
const router = useRouter()

const groupId = route.params.groupId;
// 列表标点数据
const geometries = ref([])

const data = ref({
  groupId: "default",
  groupName: "默认",
  geometries: [
    { id: 1, title: "清华大学", address: "北京市海淀区双清路30号", position: { lat: 40.003643, lng: 116.323044 } },
    { id: 2, title: "深圳清华大学研究院", address: "广东省深圳市南山区高新南七道19号东门(粤海门地铁站A口步行450米)", position: { lat: 22.53302, lng: 113.942753 } },
    { id: 3, title: "北京航空航天大学", address: "学院路37号", position: { lat: 39.981795, lng: 116.347127 } }
  ]
})

const showDialog = ref(false);
const showDatePicker = ref(false);
const showTimePicker = ref(false);
const formData = ref({})

const onDataFinished = (data) => {
  geometries.value = data.value.geometries
}

onDataFinished(data)

const onLeftClick = (e) => {
  router.push({ path: "/" })
}

const center = ref({ lat: 39.984104, lng: 116.307503 });
const zoom = ref(13);
const doubleClickZoom = ref(false);
const draggable = ref(true)

const libraries = ref(['service'])
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

const markerGeometries = ref([])

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

//浮动面板
const anchors = [
  Math.round(0.2 * window.innerHeight),
  Math.round(0.8 * window.innerHeight),
];
const height = ref(anchors[0]);

const onFloatPanelHeightChange = (e) => {
  console.log("heightchange", e)
  height.value = e.height;
}

const onPositionClick = (item) => {
  const marker = {
    id: item.id,
    styleId: "start",
    position: item.position
  }
  markerGeometries.value = [marker]
  move(item.position)
}

const onAddClick = (item) => {
  console.log("add", item)
  showDialog.value = true
  formData.value = { id: item.id, title: item.title, position: item.position }
  console.log(formData.value)
}

const onDialogOpen = () => {
  console.log(item)

}

const onDialogClose = () => {
  formData.value = {}
}

const onSubmit = () => {
  console.log("submit")
}

const onDateConfirm = () => {

}

</script>

<style lang="scss" scoped></style>
