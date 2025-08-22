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
    this.element.style.opacity = "0";
    this.element.style.scale = "0.75";
    this.element.style.transition = `opacity ${this.durationValue}ms ease-out, scale ${this.durationValue}ms ease-out, transform ${this.durationValue}ms ease-out`;
  }

  startZoomIn() {
    setTimeout(() => {
      this.element.style.opacity = "1";
      this.element.style.scale = "1";
    }, this.delayValue);
  }

  handleElementIntersect = (entry) => {
    if (
      entry.boundingClientRect.y >= 0 &&
      entry.intersectionRatio < this.previousIntersectionRatio
    ) {
      this.setupInitialState();
    } else if (
      entry.isIntersecting &&
      entry.intersectionRatio > this.previousIntersectionRatio
    ) {
      this.startZoomIn();
    }
    this.previousY = entry.boundingClientRect.y;
    this.previousIntersectionRatio = entry.intersectionRatio;
  };

  setupScrollObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.handleElementIntersect(entry);
          this.observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(this.element);
  }
}
