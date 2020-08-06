import { useCMS, Form } from 'tinacms'
import { useEffect } from 'react'
import createDecorator, { Calculation } from 'final-form-calculate'

export function useLastEdited(form: Form) {
  useFormDecorator(form, {
    field: /.*/,
    updates: {
      'frontmatter.last_edited': () => new Date().toISOString(),
    },
  })
}

function useFormDecorator(form: Form, ...calculations: Calculation[]) {
  const cms = useCMS()

  useEffect(() => {
    if (cms.disabled) {
      return
    }

    const decorator = createDecorator(...calculations)

    return decorator(form.finalForm)
  }, [form.id])
}
