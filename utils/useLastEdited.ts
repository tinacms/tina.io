import { useCMS } from "tinacms"
import { useEffect } from "react"
import createDecorator from "final-form-calculate"
import { formatDate } from "./blog_helpers"


export function useLastEdited(form) {
    const cms = useCMS()

    useEffect(() => {
        if (cms.disabled) { return }
        const decorator = createDecorator(
            {
                field: /.*/,
                updates: {
                    'frontmatter.last_edited': () => (new Date()).toISOString()
                }
            }
        )
        return decorator(form.finalForm)
    }, [form.id])
}