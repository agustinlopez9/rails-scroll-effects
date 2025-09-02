import { Controller } from "@hotwired/stimulus";

const DIRECTIONS = {
  up: "translateY(-20%)",
  down: "translateY(20%)",
  left: "translateX(-20%)",
  right: "translateX(20%)",
};

export default class extends Controller {
  static targets = ["element"];
  static values = {
    duration: { type: Number, default: 500 },
    delay: { type: Number, default: 0 },
    direction: { type: String, default: "up" },
    trigger: { type: String, default: "connect" },
  };

  previousIntersectionRatio = 0;
  childElement = this.element.children[0];

  connect() {
    this.setupInitialState();

    // Animate based on trigger type
    if (this.triggerValue === "connect") {
      this.startSlide();
    } else if (this.triggerValue === "scroll") {
      this.setupScrollObserver();
    }
  }

  setupInitialState() {
    this.childElement.style.opacity = "0";
    this.childElement.style.transform = DIRECTIONS[this.directionValue];
  }

  startSlide() {
    setTimeout(() => {
      this.childElement.style.opacity = "1";
      this.childElement.style.transform = "translateY(0)";
      this.childElement.style.transition = `opacity ${this.durationValue}ms ease-out, transform ${this.durationValue}ms ease-out`;
    }, this.delayValue);
  }

  click() {
    this.childElement.style.transition = "";
    this.setupInitialState();
    this.startSlide();
  }

  handleElementIntersect = (entry) => {
    if (
      entry.isIntersecting &&
      entry.intersectionRatio > this.previousIntersectionRatio
    ) {
      this.startSlide();
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
