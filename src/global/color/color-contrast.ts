import { GS_BLUE } from "../consts/colors";

export function manageTitleColorContrast(card: HTMLElement | null) {
  if (!card) return
  const on_color = card.querySelector(".title-on-color") as HTMLElement | null
  const target = card.querySelector(".title-blue") as HTMLElement | null
  updateTitleColor(target, on_color)
  // if (!on_color) return;
  // if (on_color.style.color === "white") {
  //   const story_title = card.querySelector(".title-blue") as HTMLElement | null
  //   // if (!story_title) return
  //   console.log(story_title, !!story_title)
  //   if (story_title === null) return
  //   story_title.style.color = GS_BLUE;
  // }
}

export function updateTitleColor(target: HTMLElement | null, on_color: HTMLElement | null) {
  if (!target || !on_color) return
  if (on_color.style.color === "white") {
    target.style.color = GS_BLUE
  }

}

export function manageColorContrast() {
  console.log("[gs-cdnflow/global]: managing title color contrast...")
  const cards = document.querySelectorAll(".card-label") as NodeListOf<HTMLElement>;
  for (let card of cards) {
    manageTitleColorContrast(card)
  }
}
