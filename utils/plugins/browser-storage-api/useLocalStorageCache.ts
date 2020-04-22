import { Form, useCMS, useWatchFormValues } from 'tinacms'
import { useCallback, useEffect } from 'react'
import { flattenFormData } from './flatten-form-data'

// persist pending changes to localStorage,
// and load from localstorage on boot
export const useLocalStorageCache = (
  path: string,
  form: Form<any>,
  preview: boolean
) => {
  const cms = useCMS()

  const saveToStorage = useCallback(
    _formData => {
      cms.api.storage.save(path, flattenFormData(form.finalForm))
    },
    [path]
  )

  // save to storage on change
  useWatchFormValues(form, saveToStorage)

  // load from storage on boot
  useEffect(() => {
    if (!preview) return

    const values = cms.api.storage.load(path)
    if (values) {
      form.updateValues(values)
    }
  }, [form, preview])
}
