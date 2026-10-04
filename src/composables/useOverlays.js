import { reactive } from 'vue'

// Site-wide panels (cart drawer, catering enquiry) that any button can open.
export const overlays = reactive({ cart: false, catering: false })

export const openOverlay = (name) => {
  for (const key of Object.keys(overlays)) overlays[key] = key === name
}

export const closeOverlays = () => {
  for (const key of Object.keys(overlays)) overlays[key] = false
}
