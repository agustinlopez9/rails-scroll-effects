import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["direction", "container"]

  select() {
    this.updateDirection()
  }

  updateDirection() {
    const selectedDirection = this.directionTargets.find(input => input === event.currentTarget)?.value
    const slideElement = this.containerTarget.querySelector('[data-controller="slide"]')
    if(selectedDirection && slideElement) {
      slideElement.dataset.slideDirectionValue = selectedDirection
      slideElement.dispatchEvent(new CustomEvent("direction:changed", {
        detail: { direction: selectedDirection }
      }))
    }
  }
}