import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["direction", "container"];
  static values = {
    effect: { type: String },
  };

  select() {
    this.updateDirection();
  }

  updateDirection() {
    const effectName = this.effectValue;
    const selectedDirection = this.directionTargets.find(
      (input) => input === event.currentTarget
    )?.value;
    const effectElement = this.containerTarget.querySelector(
      `[data-controller="${effectName}"]`
    );
    if (selectedDirection && effectElement) {
      effectElement.dataset[`${effectName}DirectionValue`] = selectedDirection;
      effectElement.dispatchEvent(
        new CustomEvent(`${effectName}-direction:changed`, {
          detail: { direction: selectedDirection },
        })
      );
    }
  }
}
