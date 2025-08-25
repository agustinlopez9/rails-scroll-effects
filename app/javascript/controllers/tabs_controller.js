import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static classes = [ "active", "hidden" ]
  static targets = ["tab", "content"]
  static values = { tabId: String, defaultTab: String };

  connect() {
    const defaultTab = this.tabTargets.find(element => element.dataset.tabId === this.defaultTabValue);
    const defaultContent = this.contentTargets.find(element => element.dataset.tabId === this.defaultTabValue);
    
    if (!defaultTab || !defaultContent) return
    
    // Reset all tabs and contents
    this.reset();

    defaultTab.classList.add(this.activeClass);
    defaultContent.classList.remove(this.hiddenClass);
  }

  select(event) {
    this.reset();

    const tab = event.currentTarget;
    tab.classList.add(this.activeClass);

    const contentTarget = this.contentTargets.find(element => element.dataset.tabId === tab.dataset.tabId);
    contentTarget.classList.remove(this.hiddenClass);
  }

  reset() {
    this.tabTargets.forEach(element => element.classList.remove(this.activeClass));
    this.contentTargets.forEach(element => element.classList.add(this.hiddenClass));
  }
}