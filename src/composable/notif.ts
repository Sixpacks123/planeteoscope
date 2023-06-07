import { toast } from 'vue3-toastify'


export const useWarning = (astre: string) => {
  toast.error(`${astre} supprimé des favoris`, {
    position: toast.POSITION.TOP_RIGHT,
  })
}

export const useSuccess = (astre : string) => {
  toast.success(`${astre} ajouté au favoris`, {
    position: toast.POSITION.TOP_RIGHT,
  })
}
