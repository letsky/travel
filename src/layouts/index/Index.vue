<template>
  <tmap-map :mapKey="mapKey" ref="tmap" :events="events" :center="center" :zoom="zoom"
    :doubleClickZoom="doubleClickZoom" :control="control" :draggable="draggable" :libraries="libraries">

    <tmap-multi-marker :styles="markerStyles" :geometries="markerGeometries" ref="markers" @click="print"
      @dblclick="print" />
  </tmap-map>
  <van-floating-panel style="z-index: 1001;" :height="height" :anchors="anchors" contentDraggable @click="print" @height-change="onFloatPanelHeightChange">
    <van-cell-group inset>
      <van-cell>
        <van-search v-model="searchKeyword" placeholder="请输入目的地" clearable input-align="center" @search="onSearchSubmit" @update:model-value="onSearchSuggestion" @click-input="onClickSearchInput"
         @click-right-icon="onSearchClear" />
      </van-cell>
      <van-cell v-for="(item, idx) in suggestions" :key="item.id" :title="item.title" :label="item.address" size="large"
        icon="location" clickable @click="onPoiClick(item.id)">
        <template #right-icon>
          <van-icon name="guide-o" class="navigation-icon" />
        </template>

      </van-cell>
    </van-cell-group>
  </van-floating-panel>

</template>

<script setup>
import { ref } from 'vue';
const mapKey = ref(import.meta.env.VITE_MAP_KEY)

const center = ref({ lat: 39.984104, lng: 116.307503 });
const zoom = ref(13);
const doubleClickZoom = ref(false);
const draggable = ref(true)
const searchKeyword = ref('');

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

const search = (keyword) => {
  const searchInstance = new TMap.service.Search()
  searchInstance.searchRegion({
    keyword: keyword,
    cityName: '上海市',
    autoExtend: true,
    pageIndex: 1
  }).then(res => print(res))
}

const dblclickSearch = (e) => {
  search('云台小区')
}

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

const anchors = [
  Math.round(0.2 * window.innerHeight),
  Math.round(0.8 * window.innerHeight),
];
const height = ref(anchors[0]);

const onFloatPanelHeightChange = (e) => {
  console.log("heightchange", e)
  height.value = e.height;
}

const onClickSearchInput = (e) => {
  console.log("onClickSearchInput")
  const lastAnchor = anchors[anchors.length - 1]
  console.log("height:", height.value)
  console.log("lastAnchor", lastAnchor)
  if(height.value !== lastAnchor) {
    height.value = lastAnchor
  }
}

const onSearchSubmit = () => {

}

const suggestions = ref([])

const clearSearchState = () => {
  searchKeyword.value = ""
  suggestions.value = []
  console.log("clear")
}

const onSearchSuggestion = (e) => {
  console.log(e)
  if (e === null || e === '') {
    clearSearchState()
    return
  }
  const option = {
    pageSize: 10,

  }
  const suggestionInstance = new TMap.service.Suggestion(option);

  const params = {
    keyword: e,
    getSubpois: true
  }
  suggestionInstance.getSuggestions(params).then(res => {
    if (res.status === 0) {
      suggestions.value = res.data
    } else {
      console.error(res)
    }
  });
}

const onSearchClear = (e) => {
  console.log("onSearchClear")
  clearSearchState()
}

const onPoiClick = (poiId) => {
  const searchInstance = new TMap.service.Search()
  const param = {
    "id": poiId
  }
  searchInstance.searchPoiId(param).then(res => {
    if(res.status === 0) {
      const info = res.data[0]
      const position = info.location
      const id = "markerPosition"
      const marker = {
        id: id,
        styleId: "start",
        position: position
      }
      const otherMarkerGeometries = markerGeometries.value.filter(e => e.id != id)
      markerGeometries.value = [...otherMarkerGeometries, marker]
      move(position)
    }
  })
}

</script>

<style scoped>
.navigation-icon {
  font-size: 16px;
  line-height: inherit;
  vertical-align: middle;
}
</style>
