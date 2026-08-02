/**
 * Cross-section channel for opening the chat widget.
 *
 * The hero, AI section and contact section all need to open the assistant, but
 * none of them own its state. A DOM event keeps them decoupled without lifting
 * chat state into a provider that would force the whole page client-side.
 */
export const ASSISTANT_OPEN_EVENT = "open-asif-ai-chat";

export function openAssistant() {
  window.dispatchEvent(new Event(ASSISTANT_OPEN_EVENT));
}
