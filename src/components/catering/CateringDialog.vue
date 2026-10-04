<script setup>
import { ref, watch } from 'vue'
import AppDialog from '../ui/AppDialog.vue'
import EnquiryForm from '../ui/EnquiryForm.vue'
import BaseButton from '../ui/BaseButton.vue'
import { overlays } from '../../composables/useOverlays'
import { sendCateringEnquiry } from '../../services/contact'
import { cateringForm } from '../../data/forms'
import { site } from '../../config/site'
import { copy } from '../../data/copy'

const t = copy.catering

// Fresh form each time the dialog opens
const formKey = ref(0)
watch(() => overlays.catering, (open) => open && formKey.value++)
</script>

<template>
  <AppDialog :open="overlays.catering" :title="t.title" @close="overlays.catering = false">
    <div class="catering">
      <p class="catering__lead">
        {{ t.lead }} {{ t.phonePrompt }} <a :href="site.phoneHref">{{ site.phone }}</a>.
      </p>
      <EnquiryForm :key="formKey" :form="cateringForm" :send="sendCateringEnquiry">
        <template #done>
          <BaseButton :label="t.close" variant="secondary" @click="overlays.catering = false" />
        </template>
      </EnquiryForm>
    </div>
  </AppDialog>
</template>

<style scoped>
.catering {
  display: grid;
  gap: var(--space-6);
}

.catering__lead {
  color: var(--text-muted);
}

.catering__lead a {
  color: var(--action);
  font-weight: 700;
  white-space: nowrap;
}
</style>
