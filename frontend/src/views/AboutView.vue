<script setup>
import { NCard, NResult } from 'naive-ui';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();
const about = md.render(`# 关于摸鱼办

这个人很懒，什么都没留下

![logo](/images/pwa-192x192.png)

`);
</script>

<template>
  <main>
    <n-card>
      <div class="result" v-html="about"></div>
    </n-card>
  </main>
</template>
