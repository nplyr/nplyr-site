<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <div class="home-badge-row">
    <a
      href="https://apps.apple.com/app/id6793567982" target="_blank" rel="noopener noreferrer"
      class="store-badge-link"
      aria-label="Download nPlyr"
    >
      <img
        :src="withBase('/badges/Mac-App-Store.png')"
        alt="Download on the Mac App Store"
        class="store-badge"
        width="156"
        height="46"
      />
    </a>
    <a
      href="https://github.com/nPlyr"
      target="_blank"
      rel="noopener noreferrer"
      class="btn-github"
      aria-label="nPlyr on GitHub"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.73 18.27.5 12 .5z"/>
      </svg>
      <span>View on GitHub</span>
    </a>
  </div>
</template>

<style scoped>
.home-badge-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 36px;
  justify-content: left;
}

.store-badge-link {
  display: inline-flex;
  border-radius: 10px;
  transition: opacity 0.18s ease, transform 0.18s ease;
  outline-offset: 3px;
}

.store-badge-link:hover {
  opacity: 0.82;
  transform: translateY(-1px);
}

.btn-github {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  height: 46px;
  border-radius: 10px;
  background: transparent;
  color: var(--vp-c-text-1);
  border: 1.5px solid var(--vp-c-divider);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.btn-github:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}
</style>
