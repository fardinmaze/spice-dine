import { reactive } from 'vue'

// Site-wide panels (catering enquiry) that any button can open.
export const overlays = reactive({ catering: false })

export const openOverlay = (name) => {
  for (const key of Object.keys(overlays)) overlays[key] = key === name
}

export const closeOverlays = () => {
  for (const key of Object.keys(overlays)) overlays[key] = false
}
