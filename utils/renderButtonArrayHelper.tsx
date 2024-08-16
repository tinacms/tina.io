import React from 'react'
import { Actions } from 'components/blocks/ActionsButton'
import { ModalB } from 'components/blocks/ModalButton'
import { CodeButton } from 'components/blocks/CodeButton'

const RenderButton = ({ button, index }) => {
  if (button.__typename.includes('Actions')) {
    return <div className=''><Actions key={index} items={[button]} />
      </div>
  } else if (button.__typename.includes('ModalButton')) {
    return <ModalB key={index} items={[button]} />
  } else if (button.__typename.includes('CodeButton')) {
    return (
      <CodeButton key={index} id={button.id} label={button.label}>
        {button.children}
      </CodeButton>
    )
  } else {
    return null
  }
}

export default RenderButton
