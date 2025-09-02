import { Controller } from "@hotwired/stimulus";

const DIRECTIONS = {
  left: "rotateY(-90deg)",
  right: "rotateY(90deg)",
  up: "rotateX(90deg)",
  down: "rotateX(-90deg)",
};

export default class extends Controller {
  static targets = ["element"];
  static values = {
    duration: { type: Number, default: 500 },
    delay: { type: Number, default: 0 },
    direction: { type: String, default: "left" },
    trigger: { type: String, default: "connect" },
  };

  childElement = this.element.children[0];
  previousIntersectionRatio = 0;

  connect() {
    this.setupInitialState();

    // Animate based on trigger type
    if (this.triggerValue === "connect") {
      this.startFlip();
    } else if (this.triggerValue === "scroll") {
      this.setupScrollObserver();
    }
  }

  setupInitialState() {
    this.childElement.style.opacity = "0";
    this.childElement.style.transform = `perspective(600px) ${
      DIRECTIONS[this.directionValue]
    }`;
  }

  startFlip() {
    setTimeout(() => {
      this.childElement.style.transition = `opacity ${this.durationValue}ms ease-out, transform ${this.durationValue}ms ease-out`;
      this.childElement.style.opacity = "1";
      this.childElement.style.transform = "perspective(600px) rotateY(0deg)";
    }, this.delayValue);
  }

  click() {
    console.log(this.directionValue);
    this.childElement.style.transition = "";
    this.setupInitialState();
    this.startFlip();
  }

  handleElementIntersect = (entry) => {
    if (
      entry.isIntersecting &&
      entry.intersectionRatio >= this.previousIntersectionRatio
    ) {
      this.startFlip();
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
