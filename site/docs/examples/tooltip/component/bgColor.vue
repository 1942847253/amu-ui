<template>
 <a-button v-tooltip="{ text: 'tip-default', bgColor: '#dcdcdc' }">default</a-button>
  <a-button v-tooltip="{ text: 'tip-primary', bgColor: '#0468dc' }" type="primary">primary</a-button>
  <a-button v-tooltip="{ text: 'tip-success', bgColor: '#18a058' }" type="success">success</a-button>
  <a-button v-tooltip="{ text: 'tip-warning', bgColor: '#d69800' }" type="warning">warning</a-button>
  <a-button v-tooltip="{ text: 'tip-danger', bgColor: '#e53935' }" type="danger">danger</a-button>
  <a-button v-tooltip="{ text: 'tip-info', bgColor: '#3f5e7de0' }" type="info">info</a-button>
</template>

