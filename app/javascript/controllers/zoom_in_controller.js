import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["element"];
  static values = {
    duration: { type: Number, default: 500 },
    delay: { type: Number, default: 0 },
    trigger: { type: String, default: "connect" },
  };

  previousIntersectionRatio = 0;

  connect() {
    this.setupInitialState();

    // Animate based on trigger type
    if (this.triggerValue === "connect") {
      this.startZoomIn();
    } else if (this.triggerValue === "scroll") {
      this.setupScrollObserver();
    }
  }

  setupInitialState() {
    const childElement = this.element.children[0];
    childElement.style.opacity = "0";
    childElement.style.scale = "0.75";
    childElement.style.transition = `opacity ${this.durationValue}ms ease-out, scale ${this.durationValue}ms ease-out, transform ${this.durationValue}ms ease-out`;
  }

  startZoomIn() {
    const childElement = this.element.children[0];
    setTimeout(() => {
      childElement.style.opacity = "1";
      childElement.style.scale = "1";
    }, this.delayValue);
  }

  handleElementIntersect = (entry) => {
    if (
      entry.isIntersecting &&
      entry.intersectionRatio > this.previousIntersectionRatio
    ) {
      this.startZoomIn();
    } else if (
      entry.boundingClientRect.y >= 0 &&
      entry.intersectionRatio < this.previousIntersectionRatio
    ) {
      this.setupInitialState();
    }
    this.previousIntersectionRatio = entry.intersectionRatio;
  };

  setupScrollObserver() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.handleElementIntersect(entry);
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    this.intersectionObserver.observe(this.element);
  }

  stopIntersectionObserver() {
    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(this.element);
    }
  }

  disconnect() {
    this.stopIntersectionObserver();
  }
}
