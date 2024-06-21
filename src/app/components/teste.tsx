import React, { Component } from 'react'

interface DialogflowMessengerProps {
  intent: string
  chatTitle: string
  agentId: string
  languageCode: string
}

class DialogflowMessenger extends Component<DialogflowMessengerProps> {
  componentDidMount() {
    // Carrega o script do Dialogflow Messenger
    const script = document.createElement('script')
    script.src =
      'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1'
    script.async = true
    document.body.appendChild(script)

    // Inicializa o widget do Dialogflow Messenger
    script.onload = () => {
      ;(window as unknown).dfMessenger = {
        intent: this.props.intent,
        chatTitle: this.props.chatTitle,
        agentId: this.props.agentId,
        languageCode: this.props.languageCode,
      }
    }
  }

  componentWillUnmount() {
    // Limpa o script do Dialogflow Messenger ao desmontar o componente
    document.body.removeChild(document.body.lastChild!)
  }

  render() {
    return <df-messenger />
  }
}

export default DialogflowMessenger
