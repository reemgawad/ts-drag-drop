import { Component } from "./base-component.js";
import { Validatable, validate } from "../util/validation.js";
import { Autobind  } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";

// ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  fillContent(): void {}

  private getUserInput(): [string, string, number] | void {
    const userTitle = this.titleInputElement.value;
    const userDescription = this.descriptionInputElement.value;
    const userPeople = this.peopleInputElement.value;

    const validatableTitle: Validatable = {
      value: userTitle,
      required: true,
    };
    const validatableDesc: Validatable = {
      value: userDescription,
      required: true,
      minLength: 5,
    };
    const validatablePeople: Validatable = {
      value: userPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(validatableTitle) ||
      !validate(validatableDesc) ||
      !validate(validatablePeople)
    ) {
      alert("This is not a valid input.");
      return;
    } else {
      return [userTitle, userDescription, +userPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}
