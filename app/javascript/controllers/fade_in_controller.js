import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["element"];
  static values = {
    duration: { type: Number, default: 500 },
    delay: { type: Number, default: 0 },
    trigger: { type: String, default: "connect" },
  };

  previousY = 0;
  previousRatio = 0;

  connect() {
    this.setupInitialState();

    // Animate based on trigger type
    if (this.triggerValue === "connect") {
      this.startFadeIn();
    } else if (this.triggerValue === "scroll") {
      this.setupScrollObserver();
    }
  }

  setupInitialState() {
    this.element.style.opacity = "0";
    this.element.style.transition = `opacity ${this.durationValue}ms ease-out, transform ${this.durationValue}ms ease-out`;
  }

  startFadeIn() {
    setTimeout(() => {
      this.element.style.opacity = "1";
    }, this.delayValue);
  }

  handleElementIntersect = (entry) => {
    if (
      entry.boundingClientRect.y > this.previousY &&
      entry.intersectionRatio < this.previousRatio
    ) {
      this.setupInitialState();
    } else if (
      entry.isIntersecting &&
      entry.boundingClientRect.y <= this.previousY &&
      entry.intersectionRatio > this.previousRatio
    ) {
      this.startFadeIn();
    }
    this.previousY = entry.boundingClientRect.y;
    this.previousRatio = entry.intersectionRatio;
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
        threshold: 0.1,
        rootMargin: "0px 0px -200px 0px",
      }
    );

    observer.observe(this.element);
  }
}
