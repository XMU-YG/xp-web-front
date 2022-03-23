import { Modal } from 'ant-design-vue'
import { createVNode } from 'vue'

export const deleteModal = params => {
  Modal.confirm({
    dialogClass: 'custom-modal',
    wrapClassName: 'customWrapper',
    class: 'custom-modal',
    closable: true,
    title: createVNode(<span class="custom-title">{params.title}</span>),
    icon: null,
    content: createNode(params.content, params.description),
    okText: '确认',
    cancelText: '取消',
    okButtonProps: {
      class: 'primary-btn'
    },
    cancelButtonProps: {
      class: 'default-btn'
    },
    onOk: params.onOk,
    onCancel: params.onCancel
  })
}

function createNode(content, description) {
  const node = (
    <div class="custom-body">
      <div class="custom-one-row">
        <div class="icon">!</div>
        <span>{content}</span>
      </div>
      <div class="custom-two-row">{description}</div>
    </div>
  )
  return createVNode(node)
}
